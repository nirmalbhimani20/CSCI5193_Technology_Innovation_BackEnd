const { stringify } = require('querystring');

var conn = require('../utils/connection');

module.exports = {
    //Fetch all the instructors from the databse
    instructorList : (req, res) => {
            
            var query1 = "select name, email from `csci5193`.`user` where role = 'instructor' ";

            conn.query(query1 , (err, result) => {
                if (err) {
                    res.json({'status': 'False' , 'number': '104', 'Message': 'Try Again' });
                }
                else {
                    res.json({'status':'true' , 'number':'107' ,'Message':'Successfully Login' , 'result': result });   
                }
            })
         
    },
    checkUserIsPresent : (req, res) => {
        //check whether current login instrctor is registered or not
       
        var email = req.body.email;
        var query1 = "select * from `csci5193`.`user` where email = '"+email+"' ";

        conn.query(query1 , (err, result) => {
            if (err) {
                res.json({'status': 'False' , 'number': '104', 'Message': 'Try Again' });
            }
            else {
                res.json({'status':'true' , 'number':'107' ,'Message':'Successfully Login' , 'result': result.length , 'id' : result[0].id});   
            }
        })        
    },
    insertQuery : (req, res) => {
        
        //insert queries in the databse. 
        var useremail = req.body.email;
        instructoremail  = req.body.instructor;
        username =  req.body.name;
        subject = req.body.subject;
        message = req.body.message;
        id = req.body.id;
        var  now = new Date();
       
        var query1 = "insert into `csci5193`.`blogqueries` (name , email, subject, message, useremail, instructoremail, time) Values ('"+username+"' , '"+useremail+"',  '"+subject+"',  '"+message+"' ,  '"+useremail+"' ,  '"+instructoremail+"', '"+new Date().toISOString().slice(0, 19).replace('T', ' ')+"')";
      
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
    },
    fetchQueries :(req, res) => {
        //fetch all the user queries from the database       
        var id = req.body.id;
        var  now = new Date();

        var query1 = "select email, lastLogin from `csci5193`.`user` where id = '"+id+"'";

        conn.query(query1 , (err, result) => {
            if (err) {
                res.json({'status': 'False' , 'number': '104', 'Message': 'Try Again' });
            }
            else {
                
                var query2 = "select * from `csci5193`.`blogqueries` where instructoremail = '"+result[0].email+"'";
              
                conn.query(query2 , (err, result1) => {
                    if (err) {
                        res.json({'status': 'False' , 'number': '104', 'Message': 'Try Again'});
                    }
                    else {
                        res.json({'status': 'True' , 'number': '104', 'Message': 'Try Again', 'data' :  result1});
                    }
                })
            }
        })        
    },
    insertBlog :(req, res) => {
        
        //Store newly created blog details in the database 
        var id = req.body.id;
        var title = req.body.title;
        var shortDescription = req.body.shortDescription;
        var description = req.body.description;

        var query1 = "insert into `csci5193`.`blog` (blogTitle, blogShortDescription, blogDescription, userId, dateAndTime) VALUES ('"+title+"' , '"+shortDescription+"' ,'"+description+"' , '"+id+"','"+new Date().toISOString().slice(0, 19).replace('T', ' ')+"')";

        conn.query(query1 , (err, result) => {
            if (err) {
                res.json({'status': 'False' , 'number': '104', 'Message': 'Try Again' });
            }
            else {
                var query2 = "select * from `csci5193`.`blog` where id = '"+result.insertId+"'";

                conn.query(query2 , (err, result1) => {
                    if (err) {
                        res.json({'status': 'False' , 'number': '104', 'Message': 'Try Again' });
                    }
                    else {
                        
                        res.json({'status': 'True' , 'number': '104', 'Message': 'Try Again', 'data' :  result1});
                        
                    }
                })   
            }
        })        
    },
    fetchBlog :(req, res) => {
        
        //Retrieve published blog of current loging instructor
         var id = req.body.id;
        
        var query1 = "select * from `csci5193`.`blog` where userId = '"+id+"'";

        conn.query(query1 , (err, result) => {
            if (err) {
                res.json({'status': 'False' , 'number': '104', 'Message': 'Try Again' });
            }
            else {
                
                res.json({'status': 'True' , 'number': '104', 'Message': 'Try Again', 'data' :  result});
                
            }
        })        
    },
    updateBlog: (req, res) => {
        //Update blog details
        var id = req.body.id;
        var title = req.body.title;
        var shortDescription = req.body.shortDescription;
        var description = req.body.description;

        var query1 = "update  `csci5193`.`blog` set blogTitle = '"+title+"', blogShortDescription = '"+shortDescription+"', blogDescription = '"+description+"' where id = '"+id+"'";
        
        conn.query(query1 , (err, result) => {
            if (err) {
                res.json({'status': 'False' , 'number': '104', 'Message': 'Try Again' });
            }
            else {
                var query2 = "select * from  `csci5193`.`blog` where id = '"+id+"'";

                conn.query(query2 , (err, result1) => {
                    if (err) {
                        res.json({'status': 'False' , 'number': '104', 'Message': 'Try Again' });
                    }
                    else {
                        res.json({'status': 'True' , 'number': '104', 'Message': 'Try Again', 'data' :  result1});
                        
                    }
                }) 
                
            }
        })      
    },
    deleteBlog: (req,res) => {
        //Delete blog
        var id = req.body.id;
        var query1 = "delete  from `csci5193`.`blog` where id = '"+id+"'";

        conn.query(query1 , (err, result) => {
            if (err) {
                res.json({'status': 'False' , 'number': '104', 'Message': 'Try Again' });
            }
            else {
                res.json({'status': 'True' , 'number': '104', 'Message': 'Try Again'});
                
            }
        })  
    }
    
}