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
, control = require(__dirname + '/controllers/usersCtrl')

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
    if(!res.length){
        db.users.create_user([auth0Id, givenName, familyName, email, profileName, picture, userbalance])
        .then((userCreated) => {
              return done(null, profile)
            }).catch( (e) => console.log(e))
      } else {
        return done(null, profile);
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
app.post('/api/main/createEvent', control.createEvent)
app.get('/api/main/getEvent', control.getEvents)
