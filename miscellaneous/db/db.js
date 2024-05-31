const mysql = require('mysql');

global.connection = mysql.createConnection({
  host     : process.env['DB_HOST'], 
  user     : process.env['DB_USERNAME'], 
  password : process.env['DB_USERPASSWORD'], 
  databse  : process.env['DB_NAME'] 
});


connection.connect(function(err) {
  if (err) { console.error('Error Connecting: ' + err.stack); return; }
  console.log('Connected to mySQL as ID ' + connection.threadId);
  is_mySQL_connected = true
});