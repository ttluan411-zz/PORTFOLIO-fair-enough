module.exports = {
  getEvents: (req, res, next) => {
    console.log('getevents')
    const db = req.app.get('db');
    db.events.get_events()
    .then(all_events => res.status(200).send(all_events))
  },
  createEvent: (req, res, next) => {
    const db = req.app.get('db');
    db.events.create_events([req.body.eventname, req.body.eventtime])
    .then(event => {
      console.log(event)
      res.status(200).send(event)
    })
  }
}
