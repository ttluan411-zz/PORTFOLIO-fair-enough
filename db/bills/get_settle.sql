-- SELECT * FROM transactions inner join friendgroup ON transactions.borrowerid = friendgroup.friendid
-- WHERE transactions.eventid =$1 and friendgroup.eventid=$1 and borrowerid = $2


SELECT sum(amount), lenderid as lender FROM transactions inner join friendgroup ON transactions.borrowerid = friendgroup.friendid
WHERE transactions.eventid =$1 and friendgroup.eventid=$1 and borrowerid = $2
group by lenderid
