var conn = require('../utils/connection');

module.exports = {

    get: (req, res) => {
        let query = "select * from `csci5193`.`UserProfile` where `id` = ?"
        conn.query(query,req.query.id, (err, qRes) => {
            if(err){
                console.log("Error while making DB query: " + err);
                res.status(500).end();
            }else{
                res.json(qRes[0])
            }
        })
    },

    update: (req,res) => {
        let query = "START TRANSACTION;" +
            "UPDATE `csci5193`.`user` SET `user`.`name` = ?, `email` = ?" +
            "WHERE id = ?;" +
            "UPDATE `csci5193`.`profile` SET `profile`.`about` = ?" +
            "WHERE id = ?;" +
            "COMMIT";
        conn.query(query, [req.body.name, req.body.email, req.body.id, req.body.about, req.body.id], (err, result) => {
            if(err){
                console.log("Error while making DB query: " + err);
                res.status(500).end();
            }else{
                res.status(200).end();
            }
        })
    }
}