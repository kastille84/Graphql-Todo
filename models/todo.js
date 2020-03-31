const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  text: {
    type: String,
    require: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Todo", todoSchema);