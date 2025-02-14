const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailID: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid"); //adding a validator for email through validator library
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      // required: true,
      validate(value) {
        if (value !== "male" && value !== "female") {
          throw new Error("Gender must be male or female");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword) {
          throw new Error("Password must be strong");
        }
      },
    },

    about: {
      type: String,
      default: "Hi, I'm new here.",
    },
    skills: {
      type: [String],
      validate(value) {
        if (value.length > 15) {
          throw new Error("Cannot have more than 15 skills");
        }
      },
    },
    photoURL: {
      type: String,
      default:
        "https://www.google.com/imgres?q=dummy%20profile%20full%20image%20user&imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F045%2F711%2F185%2Fnon_2x%2Fmale-profile-picture-placeholder-for-social-media-forum-dating-site-chat-operator-design-social-profile-template-default-avatar-icon-flat-style-free-vector.jpg&imgrefurl=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-profile-picture&docid=--oA6_9U9ufzsM&tbnid=dW6_bRjJzqAdaM&vet=12ahUKEwj3mKuVt_WIAxVkumMGHS83LrcQM3oECCwQAA..i&w=980&h=980&hcb=2&ved=2ahUKEwj3mKuVt_WIAxVkumMGHS83LrcQM3oECCwQAA",

      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
