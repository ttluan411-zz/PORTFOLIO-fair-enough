INSERT INTO event (eventName, eventDate, userid, totalExpense, eachPersonExpense, splitType )
VALUES ($1, $2, $3, 0, 0, 0)
RETURNING *
