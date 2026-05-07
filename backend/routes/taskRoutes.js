// backend/routes/taskRoutes.js

const express = require("express");

const router = express.Router();

const Task = require("../models/Task");

const protect = require("../middleware/authMiddleware");


// GET TASKS
router.get("/", protect, async (req, res) => {

  try {

    const tasks = await Task.find().sort({
      createdAt: -1,
    });

    res.json(tasks);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
  }
});


// CREATE TASK
router.post("/", protect, async (req, res) => {

  try {

    const newTask = new Task(req.body);

    await newTask.save();

    res.status(201).json(newTask);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
  }
});


// UPDATE TASK
router.put("/:id", protect, async (req, res) => {

  try {

    const updatedTask =
      await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedTask);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
  }
});


// DELETE TASK
router.delete("/:id", protect, async (req, res) => {

  try {

    await Task.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Task deleted",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;

