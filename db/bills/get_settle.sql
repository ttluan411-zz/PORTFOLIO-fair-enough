SELECT * FROM transactions
inner JOIN friendgroup ON transactions.borrowerid = friendgroup.friendid
where transactions.eventid =$1 and friendgroup.eventid = $1 and borrowerid = $2
