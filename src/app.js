const express = require("express");
const app = express();

app.get("/user", (req, res) => {
  res.send({ firstName: "shashank", lastName: "Shrivastava" });
});

app.listen(7777, () => {
  console.log("PORT is running on 7777");
});
