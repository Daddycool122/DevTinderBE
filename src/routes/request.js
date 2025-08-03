const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require('../middlewares/auth');


// Send conection request api
requestRouter.post('/sendConnectionRequest', userAuth,async(req,res)=>{
    try{
        const user = req.user
        console.log("Sending connection request...");
        res.send(user.firstName + ' ' + user.lastName + ' has sent a connection request.');
    }
    catch(err){
        res.status(500).send('Error signing in: ' + err.message);
    }
})

module.exports = requestRouter;