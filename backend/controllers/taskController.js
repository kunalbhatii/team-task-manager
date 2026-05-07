const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description,
      user: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error creating task",
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    });

    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching tasks",
    });
  }
};

module.exports = {
  createTask,
  getTasks,
};