const mongoose = require ('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        maxLength:20
    },
    lastName:{
        
        type:String,
        maxLength:20
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate:(value)=>{
            if(!validator.isEmail(value)){
                throw new Error('Invalid email format' + ' - ' + value);
            }
        }
        
    }
        ,
    password:{
        type:String,
        required:true,
        validate:(value)=>{
            if(!validator.isStrongPassword(value)){
                throw new Error('Password must be strong');
            }
        }
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type: String,
        validate:(value)=>{
            if(!["male","female","others"].includes(value)){
                throw new Error("Invalid gender")
            }
        }
    },
    skills:{
        type:[String],
        required: true
        
    },
    about:{
        type:String,
        default:'Hello, I am using DevTinder!',
        maxLength:200
    },
    photoUrl:{
        type:String,
        default:'https://www.w3schools.com/howto/img_avatar.png',
        validate:(value)=>{
            if(!validator.isURL(value)){
                throw new Error('Invalid URL format' + ' - ' + value);
            }
            
        }
        
    }
},  { timestamps: true });


        userSchema.methods.getJWT = async function(){
            const user = this;
            const token = await jwt.sign(
                {
                    userId: user._id
                },
                'Akhil@123',
                {
                    expiresIn: '1h'
                }
        );

            return token;
        }

        userSchema.methods.validatePassword = async function(passwordInputByUser){
            const user = this;
            const hashedPassword = user.password;
            const isValidPassword = await bcrypt.compare(
              passwordInputByUser,
              hashedPassword
            );

            return isValidPassword;
        }


       

const User = mongoose.model('User',userSchema);

module.exports = User;