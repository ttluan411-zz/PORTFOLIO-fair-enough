module.exports = {
  getEvents: (req, res, next) => {
    const db = req.app.get('db');
    db.events.get_events()
    .then(allevents => res.status(200).send(allevents))
  },
  createEvent: (req, res, next) => {
    const db = req.app.get('db');
    db.events.create_events([req.body.eventname, req.body.eventtime])
    .then(event => res.status(200).send(event))
  }
}
