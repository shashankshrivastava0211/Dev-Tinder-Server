const express = require("express");
const { UserMiddleware } = require("../middlewares/middlewares");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();

userRouter.get("/getRequest", UserMiddleware, async (req, res) => {
  //get all the connection request for loggedin user
  //1st check middleware
  //2nd search fro request who has reciever as loggedin user, status:interested

  try {
    const loggedInUser = req.user;

    const connectionRequestForUser = await connectionRequest
      .find({
        receiver: loggedInUser._id,
        status: "interested",
      })
      .populate("receiver", ["firstName", "lastName"]);
    res.status(200).json({ success: true, data: connectionRequestForUser });
  } catch (err) {
    res.status(500).json("Internal server error" + err.message);
  }
});

userRouter.get("/getConnection", UserMiddleware, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connection = await connectionRequest
      .find({
        $or: [
          {
            sender: loggedInUser._id,
            status: "accepted",
          },
          {
            receiver: loggedInUser._id,
            status: "accepted",
          },
        ],
      })
      .populate("sender")
      .populate("receiver");

    const data = connection.map((item) => {
      if (item.sender._id.toString() === loggedInUser._id.toString()) {
        return item.receiver;
      } else {
        return item.sender;
      }
    });
  } catch (err) {
    res.status(500).json("Internal server error" + err.message);
  }
});

userRouter.get("/feedApi", UserMiddleware, async (req, res) => {
  // Shashank should:
  // 1. Not see himself
  // 2. Not see his connections
  // 3. Not see users he has ignored

  try {
    const loggedInUser = req.user;
    const loggedUserString = loggedInUser._id.toString();

    // A set to track users to exclude
    const excludedUsers = new Set([loggedUserString]);

    // Fetch connections (both sent and received) for the logged-in user
    const connectionRequests = await connectionRequest
      .find({
        $or: [{ sender: loggedInUser._id }, { receiver: loggedInUser._id }],
      })
      .select("sender receiver")
      .populate("receiver", ["firstName"])
      .populate("sender", ["firstName"]);

    // Exclude users connected to the logged-in user
    connectionRequests.forEach((connection) => {
      excludedUsers.add(connection.receiver._id.toString());
      excludedUsers.add(connection.sender._id.toString());
    });

    // // Fetch ignored users (if there's an `ignoredUsers` field or similar logic)
    // if (loggedInUser.ignoredUsers && Array.isArray(loggedInUser.ignoredUsers)) {
    //   loggedInUser.ignoredUsers.forEach((ignoredUserId) => {
    //     excludedUsers.add(ignoredUserId.toString());
    //   });
    // }

    // Query for all users excluding the logged-in user, their connections, and ignored users
    const users = await User.find({ _id: { $nin: [...excludedUsers] } }).select(
      "firstName lastName emailID about skills photoURL"
    );

    res.status(200).json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error: " + err.message,
    });
  }
});

module.exports = {
  userRouter,
};
