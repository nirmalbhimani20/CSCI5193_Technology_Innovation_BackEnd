var conn = require('../utils/connection');

module.exports = {


      //fetch instructor list for contact 
      instructorList : (req, res) => {
        console.log("in instuctor list method");

        var id = req.body.id;
       
            var query1 = "SELECT name, email FROM  csci5193.user as a  Inner join csci5193.instructorsUser as b on  b.instructorId = a.id   where `userid` = '"+id+"'; ";

            conn.query(query1 , (err, result) => {
                if (err) {
                    res.json({'status': 'False' , 'number': '104', 'Message': 'Try Again' });
                }
                else {
                    res.json({'status':'true' , 'number':'107' ,'Message':'Successfully Login' , 'result': result });   
                }
            })
         
    },

    // check user is present or not for registration
    checkUserIsPresent : (req, res) => {
        console.log("check user is present or not in method");
        var email = req.body.email;
        var query1 = "select * from `csci5193`.`user` where email = '"+email+"' ";

        conn.query(query1 , (err, result) => {
            if (err) {
                res.json({'status': 'False' , 'number': '104', 'Message': 'Try Again' });
            }
            else {
                console.log("----");
                console.log("----")
                res.json({'status':'true' , 'number':'107' ,'Message':'Successfully Login' , 'result': result.length });   
            }
        })        
    },

    // insert query
    insertQuery : (req, res) => {
        console.log("Insert Queries Method");
       
        instructoremail  = req.body.instructor;
        username =  req.body.name;
        subject = req.body.subject;
        message = req.body.message;
        id = req.body.id;
        var  now = new Date();
        console.log("---",now);
        var query1 = "insert into `csci5193`.`blogqueries` (name , subject, message, instructoremail, time) Values ('"+username+"' ,   '"+subject+"',  '"+message+"' ,   '"+instructoremail+"', '"+new Date().toISOString().slice(0, 19).replace('T', ' ')+"')";
        console.log(query1);
        conn.query(query1 , (err, result) => {
            if (err) {
                console.log(err);
                res.json({'status': 'False' , 'number': '104', 'Message': 'Try Again' });
            }
            else {
                console.log("--");
                res.json({'status':'true' , 'number':'107' ,'Message':'Successfully  Inserted' });   
            }
        })        
    }
    
    
}