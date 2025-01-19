const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
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
const initializeSocket = require("./utils/socket");

app.use("/", authRouter);

app.use("/", profileRouter);
app.use("/", connectionRouter);
app.use("/", userRouter);
const server = http.createServer(app);
// this app is my express application which we are importing in line 3

initializeSocket(server);

server.listen(7777, () => {
  console.log("server is running on 7777");
});
