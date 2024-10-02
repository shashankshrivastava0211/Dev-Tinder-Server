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

app.delete("/delete", async (req, res) => {
  const user = await User.findByIdAndDelete(req.query.id);
  //as this will automatically make it as findByIdAndDelete({_id:id});
  res.status(200).send(user);
});

app.patch("/update", async (req, res) => {
  const data = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(req.query.id, data, {
      returnDocument: "after",
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
