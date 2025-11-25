import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState("");

  const fetchTasks = async () => {
    try {
      console.log("Fetching tasks from API");
      const res = await axiosInstance.get("/tasks");
      console.log("API response:", res.data);
      // 🔥 Normalize response
      const list = res.data?.tasks || [];
      setTasks(list);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  const handleAddTask = async () => {
    if (!newTask.trim()) return;

    try {
      const res = await axiosInstance.post("/tasks", { title: newTask });

      // 🔥 Normalize response for consistency
      const createdTask = res.data.newTask || res.data || null;

      if (!createdTask || !createdTask._id) {
        console.error("Invalid API response for created task:", res.data);
        return;
      }

      setTasks((prev) => [...prev, createdTask]);
      setNewTask("");
    } catch (err) {
      console.error("Failed to add task", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axiosInstance.delete(`/tasks/${taskId}`);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  const handleLogOut = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <button onClick={handleLogOut}>Logout</button>

      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New Task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        {loading ? (
          <p>Loading...</p>
        ) : tasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          <ul>
            {tasks.map((task) => {
              // Extra safety check
              if (!task || !task._id) return null;

              return (
                <li key={task._id}>
                  {task.title}
                  <button onClick={() => handleDeleteTask(task._id)}>
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
