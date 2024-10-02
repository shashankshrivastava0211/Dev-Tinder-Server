const express = require("express");
require("./config/database");
const User = require("./models/user");
const app = express();

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Shashank",
    lastName: "Shrivastava",
    password: "Shashank123",
    age: 23,
  };

  const user = await new User(userObj);
  await user.save();
  res.status(200).send(user);
});

app.listen(7777, () => {
  console.log("PORT is running on 7777");
});
