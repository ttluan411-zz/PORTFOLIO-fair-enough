UPDATE friendgroup
SET lent = lent + $2
WHERE friendid = $1
