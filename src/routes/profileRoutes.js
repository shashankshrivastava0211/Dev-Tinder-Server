const express = require("express");
const { UserMiddleware } = require("../middlewares/middlewares");
const { validate } = require("../models/user");
const { validateProfileForEdit } = require("../utils/validations");
const bcrypt = require("bcryptjs/dist/bcrypt");
const profileRouter = express.Router();

profileRouter.get("/profile", UserMiddleware, async (req, res) => {
  const user = req.user;
  console.log(user);
  res.status(200).send(user);
});

profileRouter.patch("/profile/edit", UserMiddleware, async (req, res) => {
  console.log(req.body);
  try {
    if (!validateProfileForEdit(req)) {
      throw new Error("Invalid data");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    }); //updating profile
    await loggedInUser.save();
    res.status(200).json({
      message: "Profile updated successfully",
      user: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch(
  "/profile/password/edit",
  UserMiddleware,
  async (req, res) => {
    try {
      const { password: currentPassword } = req.user;
      const { password: newPassword } = req.body;

      const isOldPasswordCorrect = await bcrypt.compare(
        newPassword,
        currentPassword
      );
      if (!isOldPasswordCorrect) {
        return res
          .status(400)
          .send("Please enter the correct current password");
      }

      if (newPassword === currentPassword) {
        return res
          .status(400)
          .send("New password must be different from the current password");
      }

      // Hash the new password
      const passwordHash = await bcrypt.hash(newPassword, 10);

      // Here, update the user's password in the database or model
      req.user.password = passwordHash;
      await req.user.save(); // Assuming there's a save method on the user model

      res.status(200).send("Password updated successfully");
    } catch (err) {
      res.status(500).send("Error: " + err.message);
    }
  }
);

module.exports = profileRouter;
