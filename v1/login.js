var utils = require('../utils/utils');
var conn = require('../utils/connection');
var crypto = require('crypto');

module.exports = {

    // login for user and instructor
    login: (req, res) => {
        console.log("in login method");
        var email = req.body.email;
        var password = req.body.password;

        var cipher = crypto.createCipher(utils.algorithm, utils.key);
        var encryptedPassword = cipher.update(password, 'utf8', 'hex') + cipher.final('hex');

        //         var decipher = crypto.createDecipher(utils.algorithm, utils.key);
        // var decrypted = decipher.update(, 'hex', 'utf8') + decipher.final('utf8');

        if (email == null || email == "" || email == undefined) {
            res.json({ 'status': 'False', 'number': '102', 'Message': 'email null' });
        }
        else if (password == null || password == "" || password == undefined) {
            res.json({ 'status': 'False', 'number': '103', 'Message': 'Password null' });
        }
        else {
            var now = new Date();

            var query2 = "update `csci5193`.`user` set lastLogin = '" + new Date().toISOString().slice(0, 19).replace('T', ' ') + "' where email = '" + email + "' and password = '" + password + "' ";

            conn.query(query2, (err, result) => {

                if (err) {
                   
                    res.json({ 'status': 'False', 'number': '104', 'Message': 'Try Again' });
                }
                else {

                    var query1 = "select * from `csci5193`.`user` where email = '" + email + "' and password = '" + encryptedPassword + "' ";

                    conn.query(query1, (err, result1) => {

                        if (err) {
                            res.json({ 'status': 'False', 'number': '104', 'Message': 'Try Again' });
                        }
                        else {
                            if (result1.length > 0) {

                                res.json({ 'status': 'true', 'number': '107', 'Message': 'Successfully Login', "abc": 'abc', 'result': result1[0] });

                            }
                            else {
                                res.json({ 'status': 'False', 'number': '104', 'Message': 'Try Again' });
                            }
                        }
                    })


                }
            })

        }
    }
}