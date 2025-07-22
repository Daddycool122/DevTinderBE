const mongoose = require ('mongoose');
const validator = require('validator');
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

const User = mongoose.model('User',userSchema);

module.exports = User;