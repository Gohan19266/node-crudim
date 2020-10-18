const express = require('express');
const mysql = require('mysql');
const PORT = process.env.PORT || 3050;

const app = express()

//Conenction 

var connection = mysql.createConnection({
  host     : 'birvxmqrxnbzpdvm0ogz-mysql.services.clever-cloud.com',
  user     : 'uysv9t18xsovpgmn',
  password : 'lqXoWZythDxqtkIJbcOp',
  database : 'birvxmqrxnbzpdvm0ogz'
});
 
//Connection if
connection.connect(error => {
    if(error) throw error;
    console.log('Database server running!');
})

app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));