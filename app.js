//jshint esversion:6
const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const app=express();
const https=require("https");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res) {
  res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res) {
  const firstname=req.body.fname;
  const lastname=req.body.lname;
  const email=req.body.email;
  const password=req.body.password;
  const data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstname,
          LNAME:lastname
        }
      }
    ]
  };
  const jsondata=JSON.stringify(data);
  const url="https://us7.api.mailchimp.com/3.0/lists/25c53ee4ba";
  const option={
    method:"POST",
    auth:"kamalesh:ff9fd2a8e31ffc15f102d2dec26c04b9-us7"
  }
  const request=https.request(url,option,function(response){
    if (response.statuscode==200) {
      res.send("suss");
    } else {

      res.send("success");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  });
  request.write(jsondata);
  request.end();

});
app.listen(3000,function() {
  console.log("Server is running");
});






//25c53ee4ba
//ff9fd2a8e31ffc15f102d2dec26c04b9-us7
