const express = require("express");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const { userAuth } = require("../middlewares/auth");

//Get all the pending connection requests for the logged in user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate(
      "fromUserId",
      "firstName lastName gender photoUrl about skills about age"
    );
    //   .select("firstName lastName gender photoUrl about skills");

    res.json({
      message: "Requests fetched successfully",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error: ",
      error: err.message,
    });
  }
});

// Get all connections
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connections = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      status: "accepted",
    }).populate("fromUserId" , "firstName lastName about gender photoUrl about skills age")
      .populate("toUserId" , "firstName lastName about gender photoUrl about skills age");

    const data = connections.map((row) => {
      return row.fromUserId._id.toString() !== loggedInUser._id.toString()
        ? row.fromUserId
        : row.toUserId;
    });

    res.json({
      message: "Connections fetched successfully",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error",
      error: err.message,
    });
  }
});

// Feed API gets all users available in the platform

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10
    const skip = (page-1)*limit
 
    limit = limit>50? 50 : limit
   
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or : [
        {fromUserId : loggedInUser._id},
        {toUserId : loggedInUser._id},
      ]
    }).select("fromUserId toUserId")


    const hiddenUsersFromFeed = new Set();
    connectionRequests.forEach((req)=>{
      hiddenUsersFromFeed.add(req.fromUserId.toString()),
      hiddenUsersFromFeed.add(req.toUserId.toString())
    })

    const users = await User.find({
      $and : [
        {_id : {$nin : Array.from(hiddenUsersFromFeed)}},
        {_id : {$ne : loggedInUser._id}}
      ]
      
    }).select("firstName lastName about skills photoUrl age gender").skip(skip).limit(limit)
    

    res.json({
      message: "All Users fetched successfully",
      data:users
    })

    
  } catch (err) {
    res.status(500).json({
      message: "Error",
      error: err.message,
    });
  }
});
module.exports = userRouter;
