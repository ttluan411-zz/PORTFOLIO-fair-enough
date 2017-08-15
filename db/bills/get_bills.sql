select row_to_json(t) as bills
from (
    select billid,amount, billsname, createtime, userid,
    (
        select array_to_json(array_agg(row_to_json(d)))
        from (
            select billid, amount, lenderid, borrowerid, createtime
            from transactions
            where transactions.billid = bills.billid
        ) d
    ) as nestedlist
    from bills where bills.eventid = ($1)
    order by createtime
) t
