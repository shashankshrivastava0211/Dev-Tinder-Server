const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const connectionRequestSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", //reference to the User collection
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "pending"],
        message: `{value} is incorrect type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestSchema.index({ sender: 1, receiver: 1 });
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  if (connectionRequest.sender.equals(connectionRequest.receiver)) {
    return next(new Error("You cannot send a request to yourself"));
  }
  next();
});

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
