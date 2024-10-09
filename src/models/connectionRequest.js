const mongoose = require("mongoose");
const { Schema } = mongoose;

const connectionRequestSchema = new Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    required: "true",
    ref: "User",
  },
  status: {
    type: String,
    enum: {
      values: ["ignore", "intrested", "accepted", "pending"],
      message: `{value} is incorrect type`,
    },
  },
});

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
