var conn = require('../utils/connection');

module.exports = {

    //fetch query to answer
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

    // insert blog for user
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

    //fetch blog 
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

    // update blog 
    updateBlog: (req, res) => {
        console.log(" in  update blog method");

        var id = req.params.id;
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

    // delete blog 
    deleteBlog: (req,res) => {
        console.log(" in delete blog method");

        var id = req.params.id;
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
    },


     // insert user
     insertUser :(req, res) => {
        console.log("Insert User Method");
       
        var instructorId = req.body.id;
        var fullName = req.body.fullName;
        var emailAddress = req.body.emailAddress;
        var problem = req.body.problem;
        var height = req.body.height;
        var weight = req.body.weight;
        var birthdate = req.body.birthdate;
        

        var query1 = "Select * from `csci5193`.`user` where email = '"+emailAddress+"'";

        conn.query(query1 , (err, result) => {
            if (err) {
                console.log(err);
                res.json({'status': 'False' , 'number': '104', 'Message': 'Try Again' });
            }
            else {
               
                
                if(result.length > 0){
                    var userId = result[0].id;
                    console.log("id"+userId);

                    
                    var query2 = "insert into `csci5193`.`instructorsUser` (instructorId, userId, fullName, emailAddress, problem, height, weight, birthDate) Values ('"+instructorId+"','"+userId+"','"+fullName+"','"+emailAddress+"','"+problem+"','"+height+"','"+weight+"', '"+birthdate+"')";

                    conn.query(query2 , (err, result1) => {
                        if (err) {
                            console.log(err);
                            res.json({'status': 'False' , 'number': '104', 'Message': 'Try Again' });
                        }
                        else {
                            
                            var query3 = "select * from `csci5193`.`instructorsUser` where id = '"+result1.insertId+"'";

                            conn.query(query3 , (err, result2) => {
                                if (err) {
                                    console.log(err);
                                    res.json({'status': 'False' , 'number': '104', 'Message': 'Try Again' });
                                }
                                else {
                                    
                                    res.json({'status': 'True' , 'number': '104', 'Message': 'Try Again', 'data' :  result2});
                                    
                                }
                            }) 
                            
                        }
                    }) 



                }
                else {
                    console.log("---");
                    res.json({'status': 'False' , 'number': '211', 'Message': 'Try Again' });
                }

                
            }
        })
          
    },

    //get list of user added by instructor
    fetchUser:(req, res) => {
        console.log("in fetch User method");

        var id = req.body.id;
        
        var query1 = "select * from `csci5193`.`instructorsUser` where instructorId = '"+id+"'";

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

    updateUser: (req, res) => {
        console.log(" in  update user method");


        var instructorUserId = req.body.id;
        var fullName = req.body.fullName;
        var emailAddress = req.body.emailAddress;
        var problem = req.body.problem;
        var height = req.body.height;
        var weight = req.body.weight;
        var birthdate = req.body.birthdate;

        console.log("----"+instructorUserId);

        var query1 = "update  `csci5193`.`instructorsUser` set fullName = '"+fullName+"', emailAddress = '"+emailAddress+"', problem = '"+problem+"' , height = '"+height+"', weight = '"+weight+"', birthdate = '"+birthdate+"' where id = '"+instructorUserId+"'";
        
        conn.query(query1 , (err, result) => {
            if (err) {
                console.log(err);
                res.json({'status': 'False' , 'number': '104', 'Message': 'Try Again' });
            }
            else {     
                console.log("true");
                var query2 = "select * from  `csci5193`.`instructorsUser` where id = '"+instructorUserId+"'";

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

     // delete blog 
     deleteUser: (req,res) => {
        console.log(" in delete user method");

        var id = req.params.id;
        var query1 = "delete  from `csci5193`.`instructorsUser` where id = '"+id+"'";

        conn.query(query1 , (err, result) => {
            if (err) {
                console.log(err);
                res.json({'status': 'False' , 'number': '104', 'Message': 'Try Again' });
            }
            else {
                
                res.json({'status': 'True' , 'number': '104', 'Message': 'Try Again'});
                
            }
        })  
    },

}