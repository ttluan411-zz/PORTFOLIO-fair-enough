select *, lent - borrowed as Balance from friendgroup where eventid = $1;
