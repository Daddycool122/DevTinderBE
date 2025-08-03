const express = require('express');
const authRouter = express.Router();
const { validateSignupData,validateLoginData } = require('../utils/validation');
const User = require('../models/user')
const bcrypt = require('bcrypt');


// Signup api
authRouter.post('/user',async(req,res)=>{
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

// Login  api
authRouter.post('/signIn',async(req,res)=>{
    try{

        validateLoginData(req)
        const {email,password} = req.body;
        const user = await User.findOne({email: email});

        if(!user){
            throw new Error('invalid credentials');
        }

        const isValidPassword = await user.validatePassword(password);

        if(!isValidPassword){       
            throw new Error('Invalid credentials');
        }
        else{

            // create jwt token 
            const token = await user.getJWT();
 
            res.cookie('token', token , {
            expires: new Date(Date.now() + 1 * 3600000) // cookie will be removed after 1 hour
            });
            res.send('Logged in as : ' +user.firstName + ' ' + user.lastName);
        }

        
    }
    catch(err){
        res.status(500).send('Error signing in: ' + err.message);
    }
})

// Logout api
authRouter.post('/logout', async(req,res)=>{
    try{
        res.cookie('token',null,
            {
                expires: new Date(Date.now()),
            }
        )
        res.send('Logged out successfully');
    }
    catch(err){
        res.status(500).send('Error logging out: ' + err.message);
    }
})

module.exports = authRouter;