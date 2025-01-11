const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("./config/database");
const app = express();

const { UserMiddleware } = require("./middlewares/middlewares");

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json()); //to read json data
app.use(cookieParser()); //to read cookies

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profileRoutes");
const connectionRouter = require("./routes/connectionRequest");
const { userRouter } = require("./routes/user");

app.use("/", authRouter);

app.use("/", profileRouter);
app.use("/", connectionRouter);
app.use("/", userRouter);

app.listen(7777, () => {
  console.log("PORT is running on 7777");
});
