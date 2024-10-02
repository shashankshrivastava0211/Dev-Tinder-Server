const express = require("express");
const { AdminMiddleWare } = require("./middlewares/middlewares");
const app = express();

app.use("/admin", AdminMiddleWare, (req, res) => {
  console.log("admin varifgication");
  res.send("hello admin");
});

app.get("/user", (req, res) => {
  res.send({ firstName: "shashank", lastName: "Shrivastava" });
  console.log(req.query);
});

app.get("/ab?c", (req, res) => {
  res.send("a?bc");
});

app;

app.listen(7777, () => {
  console.log("PORT is running on 7777");
});
