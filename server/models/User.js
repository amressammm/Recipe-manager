const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const secret = require("../config/keys").secretOrKey;
const validator = require("validator");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Email is invalid");
    },
  },
  password: {
    type: String,
    require: true,
  },
  


  token: 
    {
      token: {
        type: String,
            
      },
    },
  
});

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, secret);

  user.token = {token}
  await user.save();

  return token;
};
UserSchema.methods.toJSON = function () {
  const user = this;
  const publicuser = user.toObject();

  delete publicuser.password;
  return publicuser;
};

module.exports = User = mongoose.model("User", UserSchema);
