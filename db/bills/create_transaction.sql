INSERT INTO transactions (amount, createtime, borrowerId, lenderId, eventId, billId)
VALUES ($1,$2,$3,$4,$5,$6)
RETURNING *;
