const { stringify } = require('querystring');
var conn = require('../utils/connection');

module.exports = {
    login : (req, res) => {
        console.log("in login method");
        var email = req.body.email;
        var password = req.body.password;

       
        if (email == null || email == "" || email == undefined){
            res.json({'status': 'False' , 'number': '102', 'Message': 'email null' });
        }
        else if (password == null || password == "" || password == undefined){
            res.json({'status': 'False' , 'number': '103', 'Message': 'Password null' });
        }
        else {

            var query1 = "select * from `sql10451610`.`user` where email = '"+email+"' and password = '"+password+"' ";

            conn.query(query1 , (err, result) => {
                if (err) {
                    res.json({'status': 'False' , 'number': '104', 'Message': 'Try Again' });
                }
                else {
                    res.json({'status':'true' , 'number':'107' ,'Message':'Successfully Login'});   
                }
            })
            
        }


    }
    
}