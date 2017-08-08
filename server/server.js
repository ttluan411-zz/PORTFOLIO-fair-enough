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
, key=require('./key');

app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize())
app.use(passport.session())

//SET UP PASSPORT
passport.use(new Auth0Strategy({
  domain: key.domain,
  clientID: key.clientID,
  clientSecret: key.clientSecret,
  callbackURL: 'http://localhost:3001/auth/callback'
}, function(accessToken, refreshToken, extraParams, profile, done) {
  //GO TO DB TO FIND AND CREATE USER
  let db = app.get('db')
  ,authId = profile.id
  ,email = profile.emails[0].value
  ,givenName = profile.name.givenname || null
  ,familyName = profile.name.familyname || null
  ,nickName = profile.nickname || null
  ,picture = profile.picture;
  db.users.get_user([authId]).then(res=> {
    if(!res.length){
        db.users.create_user([authId, email, givenName, familyName,nickname, picture])
        .then((userCreated) => {
              return done(null, profile)
            }).catch( (e) => console.log(e))
      } else {
        return done(null, profile);
      }
    }).catch( err => console.log( err )) // GOES TO SERIALIZE-USER WHEN U INVOKE DONE
}));

app.get('/auth/', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {successRedirect: '/me'}))

passport.serializeUser(function(profileToSession, done) {
  done(null, profileToSession); // PUTS 2ND ARGUMENT ON SESSION
});

passport.deserializeUser(function(profileFromSession, done) {
  done(null, profileFromSession); //PUTS 2ND ARGUMENT ON REQ.USER
});

app.get('/me', function(req,res){
    res.send(req.user)
})


// massive({connectionString:MASSIVE_URI})
massive('postgres://smrgpejy:cdyB9uOd1Gh_dCyfrf68-UewysXJOHQj@pellefant.db.elephantsql.com:5432/smrgpejy')
.then( db => {
  app.set('db', db);
  db.create_table();
}).catch(err => console.log(err))
app.listen(port, console.log(`listening on port ${port}`));
