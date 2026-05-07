import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  ToastContainer,
  toast,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [search, setSearch] = useState("");

  const [filterPriority,
    setFilterPriority] =
    useState("All");

  const API =
    "http://localhost:5000/api/tasks";

  // TOKEN
  const token =
    localStorage.getItem("token");

  // HEADERS
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // FETCH TASKS
  const fetchTasks = async () => {

    try {

      const res = await axios.get(
        API,
        { headers }
      );

      setTasks(res.data);

    } catch (error) {

      console.log(error);

      toast.error("Login First ❌");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // CREATE / UPDATE
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editingId) {

        await axios.put(
          `${API}/${editingId}`,
          {
            title,
            description,
            priority,
            dueDate,
          },
          { headers }
        );

        toast.success(
          "Task Updated ✅"
        );

        setEditingId(null);

      } else {

        await axios.post(
          API,
          {
            title,
            description,
            priority,
            dueDate,
            completed: false,
          },
          { headers }
        );

        toast.success(
          "Task Created 🚀"
        );
      }

      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDueDate("");

      fetchTasks();

    } catch (error) {

      toast.error(
        "Something went wrong ❌"
      );
    }
  };

  // DELETE
  const deleteTask = async (id) => {

    try {

      await axios.delete(
        `${API}/${id}`,
        { headers }
      );

      toast.success(
        "Task Deleted 🗑️"
      );

      fetchTasks();

    } catch (error) {

      toast.error(
        "Delete Failed ❌"
      );
    }
  };

  // COMPLETE
  const completeTask = async (task) => {

    try {

      await axios.put(
        `${API}/${task._id}`,
        {
          ...task,
          completed:
            !task.completed,
        },
        { headers }
      );

      toast.success(
        "Task Completed ✅"
      );

      fetchTasks();

    } catch (error) {

      toast.error(
        "Update Failed ❌"
      );
    }
  };

  // EDIT
  const editTask = (task) => {

    setTitle(task.title);

    setDescription(
      task.description
    );

    setPriority(task.priority);

    setDueDate(
      task.dueDate?.substring(0, 10)
    );

    setEditingId(task._id);

    toast.info("Editing Task ✏️");
  };

  // FILTER
  const filteredTasks =
    tasks.filter((task) => {

      const matchesSearch =
        task.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        task.description
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesPriority =
        filterPriority === "All" ||
        task.priority ===
          filterPriority;

      return (
        matchesSearch &&
        matchesPriority
      );
    });

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-10">

      <ToastContainer />

      <h1 className="text-3xl md:text-5xl font-bold mb-8">
        Welcome to Dashboard 🚀
      </h1>

      {/* FORM */}
      <div className="bg-slate-800 p-5 rounded-2xl mb-8">

        <h2 className="text-2xl font-bold mb-4">

          {editingId
            ? "Edit Task"
            : "Create Task"}

        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            required
            className="w-full p-4 rounded-xl bg-slate-900 outline-none"
          />

          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            required
            className="w-full p-4 rounded-xl bg-slate-900 outline-none"
          />

          <select
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value
              )
            }
            className="w-full p-4 rounded-xl bg-slate-900 outline-none"
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(
                e.target.value
              )
            }
            className="w-full p-4 rounded-xl bg-slate-900 outline-none"
          />

          <button
            type="submit"
            className="w-full md:w-auto bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-bold"
          >
            {editingId
              ? "Update Task"
              : "Create Task"}
          </button>

        </form>
      </div>

      {/* SEARCH */}
      <div className="bg-slate-800 p-5 rounded-2xl mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Search & Filter
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full p-4 rounded-xl bg-slate-900 outline-none"
          />

          <select
            value={filterPriority}
            onChange={(e) =>
              setFilterPriority(
                e.target.value
              )
            }
            className="w-full p-4 rounded-xl bg-slate-900 outline-none"
          >
            <option>All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

        </div>
      </div>

      {/* TASKS */}
      <div className="bg-slate-800 p-5 rounded-2xl">

        <h2 className="text-2xl font-bold mb-6">
          Team Tasks
        </h2>

        <div className="space-y-5">

          {filteredTasks.map((task) => (

            <div
              key={task._id}
              className="bg-slate-700 p-5 rounded-2xl"
            >

              <h2 className="text-2xl font-bold">
                {task.title}
              </h2>

              <p className="mt-2">
                {task.description}
              </p>

              <p className="mt-2 text-yellow-400 font-bold">
                Priority:
                {" "}
                {task.priority}
              </p>

              <p className="mt-2 text-pink-400">
                Due Date:
                {" "}
                {task.dueDate
                  ? new Date(
                      task.dueDate
                    ).toLocaleDateString()
                  : "No Date"}
              </p>

              <p className="mt-2 text-cyan-400">
                Status:
                {" "}
                {task.completed
                  ? "Completed"
                  : "Pending"}
              </p>

              <div className="flex flex-wrap gap-3 mt-5">

                <button
                  onClick={() =>
                    completeTask(task)
                  }
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl font-bold"
                >
                  Complete
                </button>

                <button
                  onClick={() =>
                    editTask(task)
                  }
                  className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-xl font-bold"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteTask(task._id)
                  }
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-bold"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Dashboard;