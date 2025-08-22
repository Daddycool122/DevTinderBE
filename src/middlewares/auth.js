const jwt = require('jsonwebtoken');
const User = require('../models/user');
const userAuth = async(req,res,next)=>{
        try{
            const {token} = req.cookies;
            if(!token){
                res.status(401).send('You are not logged in , please login...');
            } 
            
            const decodedMessage = jwt.verify(token, 'Akhil@123');
            const {userId} = decodedMessage;


            const user =await User.findById(userId);
            if(!user){
                throw new Error('User not found');
            }       
            req.user = user;
            next();
        }
        catch(err){
            res.status(401).send('Unauthorized: ' + err.message);
            return;
        }
}

module.exports = {userAuth}