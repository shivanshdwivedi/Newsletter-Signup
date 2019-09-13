const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

 app.use(bodyParser.urlencoded({extended:true}));

 app.use(express.static("public"));

 app.get("/",function(req,res){

    res.sendFile(__dirname + "/signup.html");

 });

 app.post("/",function(req, res){

 var firstName= req.body.fname;
 var secondName = req.body.lname;
 var email = req.body.email;   
 var data = {
    members:
    [
       {
          email_address: email,
          status: "subscribed",
          "merge_fields": {
            "FNAME": firstName,
            "LNAME": secondName,
          }
      }
    ] 
   }
 


 var jsonData = JSON.stringify(data);

 var options = {
 
  url: "https://us4.api.mailchimp.com/3.0/lists/525ebe16ab",
  method : "POST",
  headers:{
     "Authorization":"Shivansh1 3d147592c1f2f0392058e902e10c5e84-us4"
  },
  body: jsonData
  
 };



 request(options,function(error, response , body){

   if(error){
      res.sendFile(__dirname + "/failure.html");
   }
   else{
      if(response.statusCode===200){
         res.sendFile(__dirname + "/success.html");
      }
      else{
         res.sendFile(__dirname + "/failure.html");
      }
   }

 });

 
 });



app.post("/failure", function(req, res){
   res.redirect("/");
});
  

 app.listen(process.env.PORT || 3000 ,function(){

    console.log("Your server is runing on port 3000");
 });
 
 