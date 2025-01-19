const express = require("express");
const { UserMiddleware } = require("../middlewares/middlewares");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const connectionRouter = require("express").Router();

connectionRouter.post(
  "/request/send/:status/:touserID",
  UserMiddleware,
  async (req, res) => {
    try {
      const loggedInUser = req.user._id;
      const toUserId = req.params.touserID;

      const status = req.params.status;
      const allowedStatus = ["ignored", "interested"];
      const isValidtoUserId = await User.exists({ _id: toUserId });

      if (!isValidtoUserId) {
        throw new Error("you are sending request to an invalid user");
      }

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      const connectionRequestAlreadyExists = await connectionRequest.findOne({
        $or: [
          {
            sender: loggedInUser,
            receiver: toUserId,
          },
          {
            sender: toUserId,
            receiver: loggedInUser,
          },
        ],
        status: status, //this is how we specify the status of the request and also this is a way of putting or and finding $or make use of it
      });

      if (connectionRequestAlreadyExists) {
        return res
          .status(400)
          .json({ message: "Connection request already exists" }); //this is a way of putting or and finding $or make use of it
      }

      // Create a new connection request
      const newConnectionRequest = new connectionRequest({
        sender: loggedInUser,
        receiver: toUserId,
        status: status,
      });

      const data = await newConnectionRequest.save();
      console.log(data);

      return res.status(200).json({
        message: "Connection request sent",
        data: data,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "An error occurred", error: err.message });
    }
  }
);
connectionRouter.post(
  "/request/review/:status/:requestedId",
  UserMiddleware,
  async (req, res) => {
    // Step 1: user sends a connection request to the receiver and the request is in 'interested' state
    // Step 2: user is logged in, checked by middleware
    // Step 3: logged-in user should only be able to accept/reject this connection request
    // Step 4: This can only happen if the connection request's status is 'interested'

    try {
      const loggedInUser = req.user; // Get logged-in user from middleware
      const { requestedId, status } = req.params; // Destructure params

      const allowedStatus = ["ignored", "accepted"]; // Set valid statuses

      // Step 4: Ensure status is valid
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ error: "Status you are trying to send is not valid" });
      }

      // Step 3: Find connection request by ID and ensure it's in 'interested' status
      const connectionRequestVariable = await connectionRequest.findOne({
        _id: requestedId,
        status: "interested", // Ensure it's in 'interested' state
        receiver: loggedInUser._id, // Ensure the logged-in user is the receiver
      });

      if (!connectionRequestVariable) {
        return res.status(404).json({
          error: "Connection request not found or not valid for this action",
        });
      }

      // Step 5: Update the status of the connection request
      connectionRequestVariable.status = status;
      const updatedRequest = await connectionRequestVariable.save();

      res
        .status(200)
        .json({ message: "Connection request updated", data: updatedRequest });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

connectionRouter.get(
  "/getUserConnectionRequest",
  UserMiddleware,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const connectionRequestUser = await connectionRequest
        .find({
          receiver: loggedInUser._id,
          status: "interested",
        })
        .populate("sender", ["firstName", "lastName"]);

      res.status(200).json({ success: true, data: connectionRequestUser });
    } catch (err) {
      res.status(500).json({
        message: "internal server error",
        error: err.message,
      });
    }
  }
);
connectionRouter.get("/getUserConnection", UserMiddleware, async (req, res) => {
  try {
    //check kro user id
    //fr search kro ye userId connection scehma mei kaha hai as accepted sender bhi ho skti hai or reciever bhi
    const loggedInUser = req.user;

    console.log(loggedInUser);
    const connections = await connectionRequest
      .find({
        $or: [
          {
            sender: loggedInUser._id,
          },
          {
            receiver: loggedInUser._id,
          },
        ],
        status: "accepted",
      })
      .populate("sender")
      .populate("receiver");

    const data = connections.map((item) => {
      if (item.sender._id.toString() === loggedInUser._id.toString()) {
        return item.receiver;
      } else {
        return item.sender;
      }
    });

    res.status(200).json({
      message: "success",
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: "internal server error",
      error: err.message,
    });
    console.log(err.message);
  }
});

module.exports = connectionRouter;
