const { stringify } = require('querystring');
var conn = require('../utils/connection');

module.exports = {
    register : (req, res) => {
        console.log("in register method");
        var fullName = req.body.fullName;
        var email = req.body.email;
        var password = req.body.password;
        var role = req.body.role;

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
            console.log(query1);
            conn.query(query1 , (err, result) => {
                if (err) {
                    res.json({'status': 'False' , 'number': '104', 'Message': 'Try Again' });
                }
                else if(result.length > 0) {
                    res.json({'status': 'False' , 'number': '105', 'Message': 'Email Address is already present' });
                }
                else {
                    var query2 = "Insert into `csci5193`.`user` (name , email, password,role) values ('"+fullName+"','"+email+"','"+password+"','"+role+"')";
                    console.log("query2 "+query2);
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