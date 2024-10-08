const express = require("express");
const authRouter = require("express").Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validateSignUp } = require("../utils/validations");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
  try {
    // validateSignUp(req);

    const { firstName, lastName, emailID, password } = req.body;
    // console.log(req.body);

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailID,
      password: passwordHash,
    });
    await user.save();
    res.send("saved");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailID, password } = req.body;

    const user = await User.findOne({ emailID: emailID });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (comparePassword) {
      // Create a token with the user's email or id
      const token = jwt.sign({ emailID: user.emailID }, "bllps5830F@", {
        expiresIn: "1d",
      }); //create jwt token

      console.log(token, "token send");

      // Send the token as a cookie (with a name)
      res.cookie("token", token, { httpOnly: true }); // Secure cookie, accessible only to the server token naam se token bhja hainpm
      res.status(200).send("Login successful");
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).send("Logout successful");
});

module.exports = authRouter;
