const express = require("express");
require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    console.log("api here");
    const user = new User(req.body);
    await user.save();
    res.send("saved");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/feed", async (req, res) => {
  const users = await User.find({});
  res.status(200).send(users);
});

app.get("/user", async (req, res) => {
  const user = await User.findOne({ firstName: req.body.firstName });
  res.status(200).send(user);
});

app.delete("/delete", async (req, res) => {
  const user = await User.findByIdAndDelete(req.query.id);
  //as this will automatically make it as findByIdAndDelete({_id:id});
  res.status(200).send(user);
});

app.patch("/user", async (req, res) => {
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoURL", "age", "about", "gender"];

    const isAllowed = Object.keys(data).every((k) => {
      ALLOWED_UPDATES.includes(k);
    });

    if (!isAllowed) {
      throw new Error(400).send("Invalid updates");
    }
    const updatedUser = await User.findByIdAndUpdate(req.query.id, data, {
      returnDocument: "after",
      runValidators: true,
    });

    res.status(201).send(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});
app.listen(7777, () => {
  console.log("PORT is running on 7777");
});
