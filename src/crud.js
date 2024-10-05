const express = require("express");
const User = require("./models/user");
const app = express();
require("./config/database");

app.use(express.json());

app.post("/create", async (req, res) => {
  console.log(req.body);
  const user = await new User(req.body);
  await user.save();
  res.send("user saved successfully");
});
app.get("/", async (req, res) => {
  const user = await User.findOne({ firstName: "shashank" });
  res.send(user);
});
app.patch("/", async (req, res) => {
  const { id } = req.query;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
    });
    res.send(user);
  } catch (err) {
    console.log(err);
  }
});
app.delete("/", async (req, res) => {
  const { id } = req.body;
  const user = await User.findByIdAndDelete(id);
  res.send(user);
});

app.listen(8000, () => {
  console.log("server is running");
});
