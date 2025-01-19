const mongoose = require("mongoose");
const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://shashankshrivastava1102:qGQVAFkalSqOBYMz@cluster0.vljzd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
};

connectDb()
  .then(() => {
    console.log("successfully connected to Database");
  })
  .catch((err) => {
    console.log("failed to connect to Databse");
    console.log(err);
  });
