const express = require("express");
const bodyParser= require("body-parser");
const request = require("request");

const https = require("https");



const app = express();
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/signup.html")
})

app.post("/",function(req,res){

    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;


    console.log(fname,lname,email);

    const data = {
        members:[
            {
        email_address : email,
        status: "subscribed",
        merge_fields:{
            FNAME: fname,
            LNAME:lname
     } }]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/19c0be389d";

    const options = {
        method:"post",
        headers:{
            Authorization : "auth bbf43c4a55506efe8fb15b98fd573041-us21"
        }
    }

    const request = https.request(url,options,function(response){
        if (response.statusCode===200) {
            res.sendFile(__dirname + "/success.html");
            
        }
        else{
            res.sendFile(__dirname + "./failure.html")
        }
    
    response.on("data",function(data){
        console.log(JSON.parse(data));
    })
    
})

request.write(jsonData);
request.end();


});

app.post("/failure",function (req,res) {
    res.redirect("/");
    
});

app.listen(9999,function(){
    console.log("server is running on port 9999");
})
