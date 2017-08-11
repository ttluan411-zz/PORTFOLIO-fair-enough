INSERT INTO event (eventName, eventDate, totalExpense, eachPersonExpense, paxCount)
VALUES ($1, $2, 0, 0, 0)
RETURNING *
