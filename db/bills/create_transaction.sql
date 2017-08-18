
INSERT INTO transactions (amount, createtime, borrowerId, lenderId, eventId, billId)
VALUES ($1,$2,$3,$4,$5,$6)
RETURNING *;


UPDATE friendgroup
SET borrowed = borrowed + $1
WHERE friendid = $3
