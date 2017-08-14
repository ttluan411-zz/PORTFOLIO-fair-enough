INSERT INTO bills (billsName, amount, createTime, currency , userId, eventId, splitType, isSettled, amountSettled)
VALUES ($1,$2,$3,$4,$5,$6,$7,$8,0)
RETURNING *
