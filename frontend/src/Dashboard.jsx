import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    try {
      await axios.post("http://localhost:5000/api/tasks", {
        title,
        description,
      });

      setTitle("");
      setDescription("");

      fetchTasks();
    } catch (err) {
      alert("Error creating task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10">
      <h1 className="text-5xl font-bold mb-8">
        Welcome to Dashboard 🚀
      </h1>

      <div className="bg-slate-800 p-6 rounded-2xl mb-10">
        <h2 className="text-3xl font-bold mb-4">
          Create Task
        </h2>

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-xl bg-slate-700 mb-4 outline-none"
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 rounded-xl bg-slate-700 mb-4 outline-none"
        />

        <button
          onClick={createTask}
          className="bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          Create Task
        </button>
      </div>

      <div className="bg-slate-800 p-6 rounded-2xl">
        <h2 className="text-3xl font-bold mb-6">
          Team Tasks
        </h2>

        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-slate-700 p-5 rounded-xl"
            >
              <h3 className="text-2xl font-bold">
                {task.title}
              </h3>

              <p className="text-gray-300 mt-2">
                {task.description}
              </p>

              <p className="mt-2 text-yellow-400">
                Status: {task.status}
              </p>

              <button
                onClick={() => deleteTask(task._id)}
                className="mt-4 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;