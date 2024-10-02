const express = require("express");
const {
  UserMiddleware,
  AdminMiddleware,
} = require("./middlewares/middlewares");
const app = express();

app.use("/admin", AdminMiddleware, (req, res) => {
  console.log("admin varification");
  res.send("hello admin");
});

app.use("/user", UserMiddleware, (req, res) => {
  res.send({ firstName: "shashank", lastName: "Shrivastava" });
});

app.get("/ab?c", (req, res) => {
  res.send("a?bc");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});
app;

app.listen(7777, () => {
  console.log("PORT is running on 7777");
});
