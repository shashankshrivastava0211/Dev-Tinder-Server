const express = require("express");
const { UserMiddleware } = require("../middlewares/middlewares");
const connectionRouter = require("express").Router();

connectionRouter.post(
  "/sendConnectionRequest",
  UserMiddleware,
  async (req, res) => {
    console.log("sending");
    res.send(user.firstName + " " + "sent");
  }
);

module.exports = connectionRouter;
