SELECT SUM(amount) FROM transactions where eventid = $1 and borrowerid = $2
