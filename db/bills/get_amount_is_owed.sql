SELECT SUM(amount) FROM transactions where eventid = $1 and lenderid = $2
