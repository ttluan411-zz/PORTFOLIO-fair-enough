INSERT INTO transactions (amount, createtime, borrowerid, lenderid, eventid)
VALUES ($1,$2,$3,$4,$5)
RETURNING *;
