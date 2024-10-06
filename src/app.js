const express = require("express");
require("./config/database");
const app = express();
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const { validateSignUp } = require("./utils/validations");

app.use(express.json()); //to read json data
app.use(cookieParser()); //to read cookies

//registering new user
app.post("/signup", async (req, res) => {
  try {
    validateSignUp(req);

    const { firstName, lastName, emailID, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    const user = new User({
      firstName,
      lastName,
      emailID,
      password: passwordHash,
    });
    await user.save();
    res.send("saved");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
//Login API
app.post("/login", async (req, res) => {
  try {
    const { emailID, password } = req.body;

    const user = await User.findOne({ emailID: emailID });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (comparePassword) {
      // Create a token with the user's email or id
      const token = jwt.sign({ emailID: user.emailID }, "bllps5830F@", {
        expiresIn: "1h",
      }); //create jwt token

      console.log(token, "token send");

      // Send the token as a cookie (with a name)
      res.cookie("token", token, { httpOnly: true }); // Secure cookie, accessible only to the server
      res.status(200).send("Login successful");
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("token not found");
    }
    console.log(token, "token");
    const decodedMessage = await jwt.verify(token, "bllps5830F@");
    const { emailID } = decodedMessage;
    const user = await User.findOne({ emailID: emailID });
    if (!user) {
      throw new Error("user not found");
    }
    res.send(user);
  } catch (err) {
    res.status(500).send("something went wrong" + " " + err.message);
  }
});
app.get("/feed", async (req, res) => {
  const users = await User.find({});
  res.status(200).send(users);
});

app.get("/user", async (req, res) => {
  const user = await User.findOne({ firstName: req.body.firstName });
  res.status(200).send(user);
});

app.delete("/delete", async (req, res) => {
  const user = await User.findByIdAndDelete(req.query.id);
  //as this will automatically make it as findByIdAndDelete({_id:id});
  res.status(200).send(user);
});

app.patch("/user/:userId", async (req, res) => {
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoURL", "age", "about", "gender"];

    const isAllowed = Object.keys(data).every((k) => {
      ALLOWED_UPDATES.includes(k);
    });

    if (!isAllowed) {
      throw new Error(400).send("Invalid updates");
    }
    const updatedUser = await User.findByIdAndUpdate(req.query.id, data, {
      returnDocument: "after",
      runValidators: true,
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
