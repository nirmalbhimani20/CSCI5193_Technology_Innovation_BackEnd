const { stringify } = require('querystring');

var conn = require('../utils/connection');

module.exports = {
    instructorList : (req, res) => {
        console.log("in instuctor list method");
       
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
        console.log("check user is present or not in method");
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
        console.log("Insert Queries Method");
        var useremail = req.body.email;
        instructoremail  = req.body.instructor;
        username =  req.body.name;
        subject = req.body.subject;
        message = req.body.message;
        id = req.body.id;
        var  now = new Date();
        console.log("---",now);
        var query1 = "insert into `csci5193`.`blogqueries` (name , email, subject, message, useremail, instructoremail, time) Values ('"+username+"' , '"+useremail+"',  '"+subject+"',  '"+message+"' ,  '"+useremail+"' ,  '"+instructoremail+"', '"+new Date().toISOString().slice(0, 19).replace('T', ' ')+"')";
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
    },
    fetchQueries :(req, res) => {
        console.log("Fetch Queries Method");
       
         var id = req.body.id;
        var  now = new Date();


        var query1 = "select email, lastLogin from `csci5193`.`user` where id = '"+id+"'";

        conn.query(query1 , (err, result) => {
            if (err) {
                console.log(err);
                res.json({'status': 'False' , 'number': '104', 'Message': 'Try Again' });
            }
            else {
                console.log("---",result[0].email);

                var query2 = "select * from `csci5193`.`blogqueries` where instructoremail = '"+result[0].email+"'";
                console.log(query2)
                conn.query(query2 , (err, result1) => {
                    if (err) {
                        console.log(err);
                        res.json({'status': 'False' , 'number': '104', 'Message': 'Try Again'});
                    }
                    else {
                        console.log("---++++",result1);
                        res.json({'status': 'True' , 'number': '104', 'Message': 'Try Again', 'data' :  result1});
                    }
                })
            }
        })        
    },
    insertBlog :(req, res) => {
        console.log("Insert Blog Method");
       
        var id = req.body.id;
        var title = req.body.title;
        var shortDescription = req.body.shortDescription;
        var description = req.body.description;


        var query1 = "insert into `csci5193`.`blog` (blogTitle, blogShortDescription, blogDescription, userId, dateAndTime) VALUES ('"+title+"' , '"+shortDescription+"' ,'"+description+"' , '"+id+"','"+new Date().toISOString().slice(0, 19).replace('T', ' ')+"')";

        conn.query(query1 , (err, result) => {
            if (err) {
                console.log(err);
                res.json({'status': 'False' , 'number': '104', 'Message': 'Try Again' });
            }
            else {
                console.log("--",result.insertId)
                
                var query2 = "select * from `csci5193`.`blog` where id = '"+result.insertId+"'";

                conn.query(query2 , (err, result1) => {
                    if (err) {
                        console.log(err);
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
        console.log("Fetch Blog Method");
       
         var id = req.body.id;
        
        var query1 = "select * from `csci5193`.`blog` where userId = '"+id+"'";

        conn.query(query1 , (err, result) => {
            if (err) {
                console.log(err);
                res.json({'status': 'False' , 'number': '104', 'Message': 'Try Again' });
            }
            else {
                
                res.json({'status': 'True' , 'number': '104', 'Message': 'Try Again', 'data' :  result});
                
            }
        })        
    },
    updateBlog: (req, res) => {
        console.log(" in  update blog method");

        var id = req.body.id;
        var title = req.body.title;
        var shortDescription = req.body.shortDescription;
        var description = req.body.description;

        var query1 = "update  `csci5193`.`blog` set blogTitle = '"+title+"', blogShortDescription = '"+shortDescription+"', blogDescription = '"+description+"' where id = '"+id+"'";
        console.log("--",query1);
        conn.query(query1 , (err, result) => {
            if (err) {
                console.log(err);
                res.json({'status': 'False' , 'number': '104', 'Message': 'Try Again' });
            }
            else {     
                console.log("true");
                var query2 = "select * from  `csci5193`.`blog` where id = '"+id+"'";

                conn.query(query2 , (err, result1) => {
                    if (err) {
                        console.log(err);
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
        console.log(" in delete blog method");

        var id = req.body.id;
        var query1 = "delete  from `csci5193`.`blog` where id = '"+id+"'";

        conn.query(query1 , (err, result) => {
            if (err) {
                console.log(err);
                res.json({'status': 'False' , 'number': '104', 'Message': 'Try Again' });
            }
            else {
                
                res.json({'status': 'True' , 'number': '104', 'Message': 'Try Again'});
                
            }
        })  
    }
    
}