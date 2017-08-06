const express = require('express')
, bodyParser = require('body-parser')
, session = require('express-session')
, massive = require('massive')
, passport = require('passport')
, Auth0Strategy = require('passport-auth0')
, cors = require('cors')
, config = require('./config')
, port = config.PORT
, MASSIVE_URI = config.MASSIVE_URI
, app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: 'secret'
}));
////Authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new Auth0Strategy({
  domain: config.DOMAIN,
  clientID: config.CLIENTID,
  clientSecret: config.CLIENTSECRET,
  callbackURL: config.CALLBACKURL
}, function(accessToken, refreshToken, extraParams, profile, done) {
  let db = app.get('db')
    , authId = profile.id
    , email = profile.emails[0].value
    , givenName = profile.name.givenName || null
    , familyName = profile.name.familyName || null
    , nickname = profile.nickname || null
    , picture = profile.picture;
  db.users.get_user([authId]).then( res => {
    if(!res.length){
      db.users.create_user([authId, email, givenName, familyName,nickname, picture])
      .then((userCreated) => {
            return done(null, profile)
          }).catch( (e) => console.log(e))
    } else {
      return done(null, profile);
    }
  }).catch( err => console.log( err ))
}));
app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
  successRedirect: 'http://localhost:3000',
  failureRedirect: '/auth'
}))
passport.serializeUser(function(user, done) {
  return done(null, user);
});
passport.deserializeUser(function(obj, done) {
  return done(null, obj);
});

///////////User endpoints
const userCtrl = require('./controllers/usersCtrl.js')
app.get('/api/users/getuser', userCtrl.getUser);
app.get('/auth/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})

massive({connectionString: MASSIVE_URI})
.then( db => {
  app.set('db', db)

  db.init.user_create().then(response => {
    console.log('User table init');
    db.init.bill_create().then(response => {
      console.log('Bills table init');
    })
  })
})

app.listen(port, console.log(`listening on port ${port}`));