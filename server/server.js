const express = require('express')
, bodyParser = require('body-parser')
, session = require('express-session')
, massive = require('massive')
, passport = require('passport')
, Auth0Strategy = require('passport-auth0')
, cors = require('cors')
, config = require('./config')
, port = config.PORT
, MASSIVE_URI = config.MASSIVEURI
, app = express()
, key=require('./key')
, controller = require(__dirname + '/controllers/controller')

app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize())
app.use(passport.session())

massive(MASSIVE_URI)
.then( db => {
  app.set('db', db);
  db.init.create_table();
}).catch(err => console.log(err))
app.listen(port, console.log(`listening on port ${port}`));


//SET UP PASSPORT
passport.use(new Auth0Strategy({
  domain: key.domain,
  clientID: key.clientID,
  clientSecret: key.clientSecret,
  callbackURL: 'http://localhost:3001/auth/callback'
}, function(accessToken, refreshToken, extraParams, profile, done) {
  //GO TO DB TO FIND AND CREATE USER
  let db = app.get('db')
  ,auth0Id = profile.id
  ,email = profile.emails[0].value
  ,givenName = profile.name.givenName || "anonymous"
  ,familyName = profile.name.familyName || "anonymous"
  ,profileName = profile.nickname || "anonymous"
  ,picture = profile.picture || "http://www.stickpng.com/assets/thumbs/5845e5e9fb0b0755fa99d7e5.png"
  ,userbalance = 0

  db.users.get_user([auth0Id]).then(res=> {
    console.log(res)
    if(!res.length){
        db.users.create_user([auth0Id, givenName, familyName, email, profileName, picture])
        .then((userCreated) => {
          console.log('Logged in user: ',userCreated)
              return done(null, userCreated[0])
            }).catch( (e) => console.log(e))
      } else {
        return done(null, res[0]);
      }
    }).catch( err => console.log( err )) // GOES TO SERIALIZE-USER WHEN U INVOKE DONE
}));

app.get('/auth/', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {successRedirect: 'http://localhost:3000/main'}))

passport.serializeUser(function(profileToSession, done) {
  done(null, profileToSession); // PUTS 2ND ARGUMENT ON SESSION
});

passport.deserializeUser(function(profileFromSession, done) {
  done(null, profileFromSession); //PUTS 2ND ARGUMENT ON REQ.USER
});
app.get('/api/main', function(req,res){
    res.send(req.user)
})

//ENDPOINTS
app.post('/api/main/createEvent', controller.createEvent)
app.post('/api/main/createBill', controller.createBill)


app.get('/api/main/getEvent', controller.getEvents)
app.get('/api/main/getEvent/:id',controller.selectEvent)
app.get('/api/main/getFriends',controller.getFriends)
app.get('/api/main/getBills/:id', controller.getBills)
app.get('/api/main/getEmails', controller.getUserEmails)
app.get('/api/main/searchUser/:email/:eventid', controller.searchUserByEmail)
// app.get('/api/main/searchUser/:email', )

app.get('/api/main/getBalanceByEvent/:id', controller.getBalanceByEvent)


// app.get('/api/main/signout', funtion(req,res){
//   req.logout();
//   res.status(200).redirect('http://localhost:3000')
// })



//STRIPE

app.post('/api/payment', function(req, res, next){
  //convert amount to pennies
  const amountArray = req.body.amount.toString().split('');
  const pennies = [];
  for (var i = 0; i < amountArray.length; i++) {
    if(amountArray[i] === ".") {
      if (typeof amountArray[i + 1] === "string") {
        pennies.push(amountArray[i + 1]);
      } else {
        pennies.push("0");
      }
      if (typeof amountArray[i + 2] === "string") {
        pennies.push(amountArray[i + 2]);
      } else {
        pennies.push("0");
      }
    	break;
    } else {
    	pennies.push(amountArray[i])
    }
  }
  const convertedAmt = parseInt(pennies.join(''));

  const charge = stripe.charges.create({
  amount: convertedAmt, // amount in cents, again
  currency: 'usd',
  source: req.body.token.id,
  description: 'Test charge from react app'
}, function(err, charge) {
    if (err) return res.sendStatus(500)
    return res.sendStatus(200);
  // if (err && err.type === 'StripeCardError') {
  //   // The card has been declined
  // }
});
});
