const express = require("express");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
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
      "firstName lastName gender photoUrl about skills"
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
    }).populate("fromUserId" , "firstName lastName gender photoUrl about skills")
      .populate("toUserId" , "firstName lastName gender photoUrl about skills");

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

module.exports = userRouter;
