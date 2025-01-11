const mongoose = require("mongoose");
const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://shashankbackend807:khushi@dev-tinder.pgpac.mongodb.net/newDatabase?retryWrites=true&w=majority&appName=PayMate"
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
