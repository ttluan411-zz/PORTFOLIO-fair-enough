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
    const db = req.app.get('db');
    db.friends.get_friends()
    .then(all_friends => res.status(200).send(all_friends)).catch(err=>console.log(err))
  },
  createBill: (req, res, next) => {
    console.log(req.body)
    const db = req.app.get('db');
    let average = req.body.amount/req.body.friendGroup.length;
    db.bills.create_bill([req.body.billName, req.body.amount, moment(req.body.date).format("MMM Do YY"), req.body.currency, req.body.paidUserId, req.body.eventId, req.body.devideMethod, req.body.isSettled])
    .then((bill)=> {
      req.body.friendGroup.forEach((person)=> {
        if(person !== req.body.paidUserId){
        db.bills.create_transaction([average,moment(req.body.date).format("MMM Do YY"),person,req.body.paidUserId,req.body.eventId, bill[0].billid ])
      .catch(err => console.log(err))}
      })
    }).then((bill) => {
      console.log(bill)
      res.status(200).send(bill)
    }).catch(err => console.log(err))
  },
  getBills: (req, res, next) => {
    const db = req.app.get('db');
    db.bills.get_bills([req.params.id])
    .then(bills => {
      res.status(200).send(bills)
    }).catch(err=> console.log(err))
  },
//   getBalanceByEvent: (req, res, next) => {
//     let amount_lended = 0
//     let balance = 0
//     let amount_borrowed = 0
//     const db = req.app.get('db');
//     console.log('here',req.body)
//     req.body.friendList.forEach((person)=>{
//       db.bills.get_amount_is_owed([req.body.match.params.id, person.userid])
//       .then(amount_lended => {
//         amount_lended = !amount_lended ? 0 : amount_lended
//         console.log(amount_lended)
//       db.bills.get_amount_owes([req.body.match.params.id, person.userid])
//     }).then(amount_borrowed => {
//         // amount_borrowed = !amount_borrowed ? 0 : amount_borrowed
//
//       res.status(200).send(amount_borrowed)
//     }).catch(err => console.log(err))
//   })
//   },
// }
