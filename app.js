const express = require("express");

const app = express();
const https = require("https");
const bodyParser = require("body-parser");
const { options } = require("nodemon/lib/config");


app.use(express.urlencoded({extended:true}))

app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})
app.post("/",(req,res)=>{
        const fname = req.body.fname
        const lname = req.body.lname
        const email = req.body.user_email

       const data ={
        members :[{
            email_address: email,
            status:"subscribed",
            merge_fields:{
                FNAME: fname,
                LNAME:lname


            }
 
        }]
       }
       const jsonData = JSON.stringify(data)

        const url = "https://us14.api.mailchimp.com/3.0/lists/82a0e6cf94";
        const options ={
             method: "POST",
             auth: "pritam1:80521ffd7930993c6c554c9781c8b015-us14"
        }

        const request = https.request(url,options,function(response){

           

            if(response.statusCode === 200){
               res.sendFile(__dirname+"/sucess.html")
            }else{
                res.sendFile(__dirname+"/failure.html")
            }

             response.on("data", (data)=>{
                   console.log(JSON.parse(data))
             })
        })
 
         request.write(jsonData);
       
         request.end();
           
})



app.post("/failure", (req,res)=>{
    res.redirect("/")
})







app.listen(process.env.PORT||3000,function(){
   console.log("the server runing at http://localhost:3000")
})


// 80521ffd7930993c6c554c9781c8b015-us14

// list Id
// 82a0e6cf94