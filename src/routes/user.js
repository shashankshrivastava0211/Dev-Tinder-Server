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
  //step 1 shashank should see everyone excpet for him
  //step 2 sshashank should not see his connections again if they are connected
  //step 3 sshashank should not see people if they are ignore by shashank
  try {
    const loggedInUser = req.user;
    const excludedUsers = new Set([loggedInUser._id.toString()]);

    const connectionRequestForUser = await connectionRequest
      .find({
        $or: [
          {
            sender: loggedInUser._id,
          },
          {
            receiver: loggedInUser._id,
          },
        ],
      })
      .select("sender receiver")
      .populate("receiver", ["firstName"])
      .populate("sender", ["firstName"]);

    connectionRequestForUser.forEach((userID) => {
      excludedUsers.add(userID.receiver._id.toString());
      excludedUsers.add(userID.sender._id.toString());
    });

    console.log(excludedUsers);
    const users = await User.find({ _id: { $nin: [...excludedUsers] } }); //here spread operator is used to convert set into an array
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    res.status(500).json("Internal server error" + err.message);
  }
});

module.exports = {
  userRouter,
};
