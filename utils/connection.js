var mysql = require("mysql");

// for estableshing connection
// local credential 
var con = mysql.createConnection({
    host:"database-1.cynphvvikx48.us-east-1.rds.amazonaws.com",
    user:"admin",
    password:"csci5193",
    database:"",
    multipleStatements: true
});


con.connect(function(err){
    if(err) throw err
    console.log('connected database ');
});

// const sequelize = require('../utils/utils') 

// sequelize.sync();  



module.exports = con;