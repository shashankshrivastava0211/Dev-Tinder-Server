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

// //registering new user
// app.post("/signup", async (req, res) => {
//   try {
//     validateSignUp(req);

//     const { firstName, lastName, emailID, password } = req.body;

//     const passwordHash = await bcrypt.hash(password, 10);

//     const user = new User({
//       firstName,
//       lastName,
//       emailID,
//       password: passwordHash,
//     });
//     await user.save();
//     res.send("saved");
//   } catch (err) {
//     res.status(400).send("ERROR : " + err.message);
//   }
// });
// //Login API
// app.post("/login", async (req, res) => {
//   try {
//     const { emailID, password } = req.body;

//     const user = await User.findOne({ emailID: emailID });

//     if (!user) {
//       throw new Error("Invalid credentials");
//     }

//     const comparePassword = await bcrypt.compare(password, user.password);

//     if (comparePassword) {
//       // Create a token with the user's email or id
//       const token = jwt.sign({ emailID: user.emailID }, "bllps5830F@", {
//         expiresIn: "1d",
//       }); //create jwt token

//       console.log(token, "token send");

//       // Send the token as a cookie (with a name)
//       res.cookie("token", token, { httpOnly: true }); // Secure cookie, accessible only to the server
//       res.status(200).send("Login successful");
//     } else {
//       res.status(401).send("Invalid credentials");
//     }
//   } catch (err) {
//     res.status(400).send("ERROR: " + err.message);
//   }
// });

// app.get("/profile", UserMiddleware, async (req, res) => {
//   const user = req.user;
//   console.log(user);
//   res.status(200).send(user);
// });

// app.post("/sendConnectionRequest", UserMiddleware, async (req, res) => {
//   console.log("sending");
//   res.send(user.firstName + " " + "sent");
// });

app.listen(7777, () => {
  console.log("PORT is running on 7777");
});
