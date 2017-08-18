var moment = require('moment');
module.exports = {
  getEvents: (req, res, next) => {
    const db = req.app.get('db');
    db.events.get_events()
    .then(all_events => res.status(200).send(all_events)).catch(err=>console.log(err))
  },
  createEvent: (req, res, next) => {
    const db = req.app.get('db');
    db.events.create_event([req.body.eventname, req.body.eventdate, req.user.userid])
    .then(event => res.status(200).send(event)).catch(err => console.log(err))
  },
  selectEvent: (req, res, next) => {
    const db = req.app.get('db');
    db.events.selectEvent([req.params.id])
    .then(event => res.status(200).send(event)).catch(err => console.log(err))
  },
  getFriends: (req, res, next) => {
    const db = req.app.get('db')
    db.friends.get_friends()
    .then(all_friends => res.status(200).send(all_friends)).catch(err=>console.log(err))
  },
  createBill: (req, res, next) => {
    console.log(req.body)
    const db = req.app.get('db');
    let average = req.body.amount/req.body.sharingFriend.length;
    db.bills.create_bill([req.body.billName, req.body.amount, moment(req.body.date).format("MMM Do YY"),
                          req.body.currency, req.body.paidUserId, req.body.eventId, req.body.devideMethod, req.body.isSettled])
    .then((created)=> {
        db.bills.update_lent_amount([req.body.paidUserId, req.body.amount - average])
        .then(updated_lent => {
          console.log('toi day')
          req.body.sharingFriend.forEach((person)=> {
            if(person !== req.body.paidUserId){

            db.bills.create_transaction([average,moment(req.body.date).format("MMM Do YY"),person,req.body.paidUserId,req.body.eventId, created[0].billid ])
          }
        })
        res.status(200).send('successed')
      }).catch( err => res.status(500).send(err))
    })
  },
  getBills: (req, res, next) => {

    const db = req.app.get('db');
    db.bills.get_bills([req.params.id])
    .then(bills => {
      console.log('got bills')
      res.status(200).send(bills)
    }).catch(err=> console.log(err))
  },
  getUserEmails: (req, res, next) => {
    const db = req.app.get('db');
    db.users.get_emails()
    .then(emails => res.status(200).send(emails)).catch(err => console.log(err))
  },
  searchUserByEmail: (req,res,next) => {
    console.log('email here',req.params)
    const db = req.app.get('db');
    db.users.search_user(req.params.email)
    .then(user => {
      //first check friendsgroup is userid = friendid and eventid = eventid exists
      //then post if not
      db.friends.create_friend([user[0].userid, user[0].givenname, req.params.eventid])
      console.log(user);
      res.status(200).send(user)}).catch(err => console.log(err))
  },

  getBalanceByEvent: (req, res, next) => {
    console.log(req.params.id)
    const db = req.app.get('db');
    db.friends.get_friends_balance(req.params.id)
    .then(balance => res.status(200).send(balance)).catch(err => console.log(err))
  },
}
