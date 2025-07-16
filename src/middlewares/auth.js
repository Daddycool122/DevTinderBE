const adminAuth = (req,res,next)=>{
    const token = "abc";
    const isAdminVerified = token==="abc";
    if(!isAdminVerified){
        res.status(401).send("Unauthorized user")
    }
    else{
        next();
    }
}

const userAuth = (req,res,next)=>{
    const token = "abc";
    const isAdminVerified = token==="abnc";
    if(!isAdminVerified){
        res.status(401).send("Unauthorized user")
    }
    else{
        next();
    }
}

module.exports = {adminAuth,userAuth}