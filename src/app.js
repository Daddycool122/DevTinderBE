const express = require('express');
const {connectDb}=require('./config/database')
const app = express();
const User = require('./models/user')


app.post('/user',async(req,res)=>{
    const dummyUserData = {
        firstName:'Neeraj',
        lastName:'Pal',
        email:'Pal@gmail.com',
        password:'Neeraj@123',
        age:27
    }

    const user = new User(dummyUserData);

    try{
        await user.save();
    res.send('User created successfully');
    }
    catch(err){
        res.status(500).send('Error creating user: ' + err.message);
    }
    
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

