const mongoose = require ('mongoose');

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        maxLength:20
    },
    lastName:{
        
        type:String,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
        
    }
        ,
    password:{
        type:String,
        required:true,
        minLength:6
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
        type:[String]
    },
    about:{
        type:String,
        default:'Hello, I am using DevTinder!'
    },
    photoUrl:{
        type:String,
        default:'https://www.w3schools.com/howto/img_avatar.png'
    }
},  { timestamps: true });

const User = mongoose.model('User',userSchema);

module.exports = User;