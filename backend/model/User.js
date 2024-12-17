const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const schema = mongoose.Schema;

const UserSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    uniqued: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.statics.register = async function (name, email, password) {
  let UserExist = await this.findOne({ email });
  if (UserExist) {
    throw new error("User already exist");
  }

  let salt = await bcrypt.genSalt();
  let hashValue = await bcrypt.hash(password, salt);

  let user = await this.create({
    name,
    email,
    password: hashValue,
    timeStamp: Date.now(),
  });
  return user;
};
UserSchema.statics.login = async function (email, password) {
  let UserExist = await this.findOne({ email });
  if (!UserExist) {
    throw new error("User does not exist");
  }
  // compare User
  let isCorrect = await bcrypt.compare(password, UserExist.password);
  if (isCorrect) {
    return UserExist;
  } else {
    throw new error("Incorrect password");
  }
};

module.exports = mongoose.model("User", UserSchema);
