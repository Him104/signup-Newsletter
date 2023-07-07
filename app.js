const express = require("express");
const bodyParser= require("body-parser");
const request = require("request");



const app = express();
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/signup.html")
})

app.post("/",function(req,res){

    console.log("data received on server");

})

app.listen(9999,function(){
    console.log("server is running on port 9999");
})