const express = require('express');
const {connectDb}=require('./config/database')
const app = express();
const User = require('./models/user')
const { validateSignupData } = require('./utils/validation');
const bcrypt = require('bcrypt');

app.use(express.json());

// Create/Sign up a User
app.post('/user',async(req,res)=>{
    try{
        // Validate the data
        validateSignupData (req);

        // Encrypt the password
        const {firstName, lastName, email, password} = req.body;

        const hashedPassword = await bcrypt.hash(password,10);
        const user = new User({
            firstName,
            lastName,
            email,
            password:hashedPassword,
        })

        // Save the user to the database
        await user.save();
        res.send('User created successfully');

        
    }
    catch(err){
        res.status(500).send('Error creating user: ' + err.message);
    }
    
});

// Sign in api

app.post('/signIn',async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email: email});

        if(!user){
            throw new Error('invalid credentials');
        }

        const hashedPassword = user.password;
        const isValidPassword = await bcrypt.compare(password,hashedPassword);

        if(!isValidPassword){       
            throw new Error('invalid credentials');
        }
        else{
            res.send('Login Successful');
        }

        
    }
    catch(err){
        res.status(500).send('Error signing in: ' + err.message);
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
// app.get('/user',async(req,res)=>{
//     const userId= req.body.userId;

//     try{
//         const user = await User.findById(userId);
//         if(!user){
//             return res.status(404).send('User not found');
//         }
//         else{
//             res.send(user);
//         }
//     }
//     catch(err){
//         res.status(500).send('Error fetching user: ' + err.message);
//     }
    
    
    
// })


// get all users
// app.get('/feed', async (req,res)=>{
//     const user = await User.find({});
//     res.send(user);
// })


// delete user api

// app.delete('/user',async (req,res)=>{
//     try{
//         const userId = req.body.userId;
//         const user = await User.findByIdAndDelete(userId);
//         if(!user){
//             res.send('User not found or already deleted');
//         }
//         else{
//             res.send("User deleted successfully")
//         }

//     }
//     catch(err){
//         res.status(500).send('Error deleting user: ' + err.message);
//     }
// })


// update api (by userId)

app.patch('/user/:userId',async (req,res)=>{
    try{

        const userId = req.params.userId;
        const user = await User.findByIdAndUpdate(userId,req.body,{returnDocument: 'after', runValidators:true});
        const ALLOWED_UPDATES = ['firstName', 'lastName','gender','photoUrl'];
        const data = req.body;

        const isValidUpdate = Object.keys(data).every((key)=>ALLOWED_UPDATES.includes(key));
        
        if(!isValidUpdate){
            throw new Error('Invalid update fields');
        }
        if(!user){
            res.status(400).send('No user fond to update')
        }
        else{
             res.send("User updated Successfully")
        }
        
        
    }
    catch(err){
        res.status(500).send('Error updating user: ' + err.message);
    }
})

// update api (by email)
// app.patch('/user',async(req,res)=>{
//     try{
//         const userEmail =  req.body.email;
        
//         const data = req.body;
        
//         const user = await User.findOneAndUpdate({email: userEmail},data);
//         console.log(user);
        
//         if(!user){
//            return res.status(404).send('No user found with this email');
//         }
//         else{
//            return res.send("User updated successfully by email");
//         }
        
        
        
//     }
//     catch(err){
//         res.status(500).send('Error updating user: ' + err.message);
//     }
// })

connectDb().then(()=>{
    console.log('Database connected successfully');
    app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})
})
.catch(error=>{
    console.error('Database connection failed:', error);
})

