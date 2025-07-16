const express = require('express');

const app = express();
const {adminAuth,userAuth} = require('./middlewares/auth')
// app.get( /ab+d/,(req,res)=>{
    
//     res.send("Regular expression matched successfully");
// });


// app.get("/user/:userId/:name/:password",(req,res)=>{
//     console.log(req.params)
//     res.send({"firstName":"John","lastName":"Doe"});
// })




// app.post("/user",(req,res)=>{
//     console.log("Received POST request to /user");
    
//     res.send('Data saved successfully to db');
// })

// app.delete("/user",(req,res)=>{
   
    
//     res.send('Data deleted successfully from the db');
// })




// app.use("/user",
//     [(req,res,next)=>{
//     console.log("User log");
//     next();
//     // res.send("Response 1 from user")
    
//                },
//     (req,res,next)=>{
//     console.log("User log 2");
//     next();

//     // res.send("Response 2 from user")
//                },
//     (req,res)=>{
//     console.log("User log 3");
//     res.send("Response 3 from user")
//                },]
//         )


// app.use('/admin',adminAuth)


// app.get('/admin/getAdminData',(req,res)=>{
//     res.send("Admin data retrieved successfully");
// });


// app.get('/user/getUserData',userAuth,(req,res)=>{
//     res.send("User Data fetched successfully")
// })



//Error Handling



app.get('/getUserData',(req,res)=>{
    // try{
         throw new Error("KBCDBVKJRKVRKBKJ");
    // }
    // catch(err){
        res.status(500).send("a error occured , please cotact the support team")
    // }
    
})

app.use('/',(err,req,res,next)=>{
    if(err){
        res.status(500).send("An error occurred in the application, please try again later");
    }
    
})



app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})