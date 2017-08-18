
INSERT INTO friendgroup (friendid, friendname, eventid, borrowed, lent )
select $1, $2, $3, 0, 0
where not exists (select friendid from friendgroup where friendid = $1);
