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
, app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: 'secret'
}));
////Authentication


massive({connectionString:MASSIVE_URI})
.then( db => {
  app.set('db', db)
  db.table_init();
  app.listen(port, console.log(`listening on port ${port}`));

}).catch(err => console.log(err))
