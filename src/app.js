const express = require('express');

const app = express();



app.use("/hello",(req,res)=>{
    res.send('Hello!');
})

app.use("/bye",(req,res)=>{
    res.send('bbye!');
})


app.use("/",(req,res)=>{
    res.send('Hello Dashboard!');
})




app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})