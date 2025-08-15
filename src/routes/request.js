const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const user = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

// Send conection request api
requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.userId;
      const status = req.params.status;
      
      // Validate the status
      const validStatuses = ["interested", "ignored"];
      if (!validStatuses.includes(status)) {
        return res.status(404).json({
          message: "Invalid status type",
        });
      }
      
      // Check if the user exists
      const toUser = await user.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({
          message: "User not found",
        });
      }


      // Check if a connection request already exists
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res.status(400).send({
          message: "Connection request already exists",
        });
      }


      // Create a new connection request
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      await connectionRequest.save();
      const message = status === "interested"
        ? "You are interested in " + toUser.firstName
        : "You ignored " + toUser.firstName;
      res.json({
        message: message,
        
      });
    } catch (err) {
      res.status(500).send("Error sending connection request: " + err.message);
    }
  }
);

// Respond to a connection request
requestRouter.post("/request/review/:status/:requestId", 
  userAuth,
  async (req,res)=>{
    try{
      const loggedInUser = req.user;
      const allowedStatus = ["accepted", "rejected"];
      const {requestId, status} = req.params;

      if(!allowedStatus.includes(status)){
        return res.status(400).send("Invalid status type");
      }


      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      })

      if(!connectionRequest){
        return res.status(400).send("Connection request not found ");
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();
      return res.status(200).json({message: `Connection request ${status} successfully` , data});
    }
    catch(err){
      res.status(500).send("Error reviewing connection request: " + err.message);
    }
  }
)

module.exports = requestRouter;
