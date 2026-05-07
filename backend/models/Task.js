const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,

  description: String,

  status: {
    type: String,
    default: "Pending",
  },

  priority: {
    type: String,
    default: "Medium",
  },

  dueDate: String,
});

module.exports = mongoose.model("Task", taskSchema);