const express = require('express');

const app = express();

app.get("/",(req,res)=>{
    res.send('Hello World');
})


app.get("/user",(req,res)=>{
    res.send({"firstName":"John","lastName":"Doe"});
})

app.post("/user",(req,res)=>{
    console.log("Received POST request to /user");
    
    res.send('Data saved successfully to db');
})

app.delete("/user",(req,res)=>{
   
    
    res.send('Data deleted successfully from the db');
})






app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})