UPDATE friendgroup
SET lent = lent - $4
WHERE friendid = $2 and eventid = $1;

UPDATE friendgroup
SET borrowed = borrowed - $4
WHERE friendid = $3 and eventid = $1;
