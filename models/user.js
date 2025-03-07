const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  name: String,
  email: { required: true, unique: true, type: String },
  age: Number,
  role: {
    type: String,
    enum: ["admin", "professional", "client"],
    default: "client",
  },
});

module.exports = mongoose.model('user', userSchema)