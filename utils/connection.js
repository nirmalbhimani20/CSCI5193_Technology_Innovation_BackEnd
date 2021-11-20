var mysql = require("mysql");

// for estableshing connection
// local credential 
var con = mysql.createConnection({
    host:"sql10.freesqldatabase.com",
    user:"sql10451610",
    password:"C73UAea7wD",
    database:"sql10451610",
    multipleStatements: true
});


con.connect(function(err){
    if(err) throw err
    console.log('connected database ');
});

const sequelize = require('../utils/utils') 

sequelize.sync();  



module.exports = con;