var utils = require('../utils/utils');
var conn = require('../utils/connection');
var crypto = require('crypto');

module.exports = {

    // register for user and instructor
    register : (req, res) => {
        var fullName = req.body.fullName;
        var email = req.body.email;
        var password = req.body.password;
        var role = req.body.role;

        //Encrypt password
        var cipher = crypto.createCipher(utils.algorithm,utils.key);  
        var encryptedPassword = cipher.update(password, 'utf8', 'hex') + cipher.final('hex');


        if(fullName == null || fullName == "" || fullName == undefined){
            res.json({'status': 'False' , 'number': '101', 'Message': 'Full Name null' });
        }
        else if (email == null || email == "" || email == undefined){
            res.json({'status': 'False' , 'number': '102', 'Message': 'email null' });
        }
        else if (password == null || password == "" || password == undefined){
            res.json({'status': 'False' , 'number': '103', 'Message': 'Password null' });
        }
        else if (role == null || role == "" || role == undefined){
            res.json({'status': 'False' , 'number': '108', 'Message': 'roll null' });
        }
        else {

            var query1 = "select * from `csci5193`.`user` where email = '"+email+"'  "
            conn.query(query1 , (err, result) => {
                if (err) {
                    res.json({'status': 'False' , 'number': '104', 'Message': 'Try Again' });
                }
                else if(result.length > 0) {
                    res.json({'status': 'False' , 'number': '105', 'Message': 'Email Address is already present' });
                }
                else {
                    var query2 = "Insert into `csci5193`.`user` (name , email, password,role) values ('"+fullName+"','"+email+"','"+encryptedPassword+"','"+role+"')";
                    conn.query(query2 , (err , result2) => {
                        if (err) {
                            res.json({'status': 'False' , 'number': '106', 'Message': 'Try Again' });
                
                        }else {
                            res.json({'status':'true' , 'number':'107' ,'Message':'Successfully Inserted'});
                        }

                    })

                }
            })
            
        }


    },

}