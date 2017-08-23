DELETE FROM transactions
WHERE eventid = $1 and borrowerid = $2;
