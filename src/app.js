const express = require('express');
const {connectDb}=require('./config/database')
const app = express();
const cookieParser = require('cookie-parser')
app.use(express.json());
app.use(cookieParser());
const {userAuth} = require('./middlewares/auth');

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
 
app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);



connectDb().then(()=>{
    console.log('Database connected successfully');
    app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})
})
.catch(error=>{
    console.error('Database connection failed:', error);
})

