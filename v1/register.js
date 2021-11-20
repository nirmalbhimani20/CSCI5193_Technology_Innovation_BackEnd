const { stringify } = require('querystring');
var conn = require('../utils/connection');

module.exports = {
    register : (req, res) => {
        console.log("in register method");
        console.log("responce" +JSON.stringify(req.body));

        console.log("email" +JSON.stringify(req.body.email));
        return true;
    },
    test : (req , res) => {
        console.log("in test method");
        res.JSON({message: "Backend running successfully"});
    }
}