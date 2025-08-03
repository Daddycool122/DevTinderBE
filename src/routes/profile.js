const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require('../middlewares/auth');
const { validateEditProfileData } = require('../utils/validation');
const bcrypt = require('bcrypt');


// view profile api
profileRouter.get('/profile/view',userAuth,async(req,res)=>{
    try{
        const user = req.user
        res.send(user)
    }
    catch(err){
        res.status(500).send('Error signing in: ' + err.message);
    }
})

// edit profile api
profileRouter.patch('/profile/edit',userAuth,async(req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error('Invalid fields being edited');
        }
        const loggedInUser = req.user;
        
        Object.keys(req.body).forEach(key=>loggedInUser[key]=req.body[key]);

        await loggedInUser.save();
        
        res.json({
            message: `${loggedInUser.firstName} , your profile has been updated successfully`,
            data: loggedInUser
        });
    }
    catch(err){
        res.status(500).send('Error updating the profile: ' + err.message);
    }
})

    // change password api
    profileRouter.patch('/profile/changePassword',userAuth,async(req,res)=>{
        try{

            const validFields = ['currentPassword', 'newPassword', 'confirmNewPassword'];
            
            const isValid = Object.keys(req.body).every(field => validFields.includes(field));
            if(!isValid){
                throw new Error('Invalid fields for password change');
            }

            const {currentPassword, newPassword , confirmNewPassword} = req.body;
            
            const user = req.user;

            const isValidPassword = await user.validatePassword(currentPassword);

            if(!isValidPassword){
                throw new Error('Current password is incorrect');
            }
            if(newPassword !== confirmNewPassword){
                throw new Error('New password and confirm password do not match');
            }

            const newPasswordHash = await bcrypt.hash(newPassword,10);
            user.password = newPasswordHash;
            await user.save();

            res.send('Password changed successfully');
        }
        catch(err){
            res.status(500).send('Error changing password: ' + err.message);
        }
    })




module.exports = profileRouter;