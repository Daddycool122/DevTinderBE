const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require('../middlewares/auth');

// profile api
profileRouter.get('/profile',userAuth,async(req,res)=>{
    try{
        const user = req.user
        res.send(user)
    }
    catch(err){
        res.status(500).send('Error signing in: ' + err.message);
    }
})

module.exports = profileRouter;