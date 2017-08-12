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
  }
}
