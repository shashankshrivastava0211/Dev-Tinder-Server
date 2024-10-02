const express = require("express");
require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send("saved");
});

app.get("/get", async (req, res) => {
  const users = await User.find({});
  res.status(200).send;
});
app.get("/getOne", async (req, res) => {
  const user = await User.findOne({ firstName: req.body.firstName });
  res.status(200).send(user);
});
app.listen(7777, () => {
  console.log("PORT is running on 7777");
});
