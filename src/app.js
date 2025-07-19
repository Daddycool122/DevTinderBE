const express = require('express');
const {connectDb}=require('./config/database')
const app = express();
const User = require('./models/user')



app.use(express.json());


app.post('/user',async(req,res)=>{
    
    const user = new User(req.body)

    try{
        await user.save();
    res.send('User created successfully');
    }
    catch(err){
        res.status(500).send('Error creating user: ' + err.message);
    }
    
})


// get user by email (find)

// app.get('/user',async (req,res)=>{
//     const userEmail = req.body.email;
//     try{
//         const user = await User.find({email: userEmail});
//         if(user.length===0){
//              res.status(404).send('User not found');
//         }
//         else{
//             res.send(user);
//         }
//     }
//     catch(err){
//         res.status(500).send('Error fetching user: ' + err.message);
//     }
    
    
// })


// get  user by email (findOne)
// app.get('/user',async (req,res)=>{
//     const userEmail = req.body.email;
//     try{
//         const user = await User.findOne({email: userEmail});
//         if(!user){
//              res.status(404).send('User not found');
//         }
//         else{
//             res.send(user);
//         }
//     }
//     catch(err){
//         res.status(500).send('Error fetching user: ' + err.message);
//     }  
// })


// get user by id (findById)
app.get('/user/:userId',async(req,res)=>{
    const user = await User.findById(req.params.userId);
    console.log(req.params);
    
    res.send(user);
})


// get all users
app.get('/feed', async (req,res)=>{
    const user = await User.find({});
    res.send(user);
})


connectDb().then(()=>{
    console.log('Database connected successfully');
    app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})
})
.catch(error=>{
    console.error('Database connection failed:', error);
})

