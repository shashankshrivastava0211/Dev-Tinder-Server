const express = require("express");
const { UserMiddleware } = require("../middlewares/middlewares");
const connectionRequest = require("../models/connectionRequest");
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
        status: status,
      });

      if (connectionRequestAlreadyExists) {
        return res
          .status(400)
          .json({ message: "Connection request already exists" });
      }

      // Create a new connection request
      const newConnectionRequest = new connectionRequest({
        sender: loggedInUser,
        receiver: toUserId,
        status: status,
      });

      const data = await newConnectionRequest.save();

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

module.exports = connectionRouter;
