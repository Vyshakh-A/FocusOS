import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import TaskItem from "../components/TaskItem";
import NotesPanel from "../components/NotesPanel";
import ReflectionPromptModal from "../components/ReflectionPromptModal";
import ReflectionToast from "../components/ReflectionToast";
import useReflectionSystem from "../hooks/useReflectionSystem";

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const {
    showModal,
    showToast,
    yesterdayMode,
    openYesterdayModal,
    closeModal,
  } = useReflectionSystem();

  // --- Task state ---
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("misc");

  // --- Editing state (shared with TaskItem through props) ---
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [updating, setUpdating] = useState(false);

  // --- Fetch tasks ---
  const fetchTasks = async () => {
    setLoadingTasks(true);
    try {
      const res = await axiosInstance.get("/tasks");
      const list = res.data?.tasks || [];
      setTasks(list);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    } finally {
      setLoadingTasks(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // --- Add task ---
  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    try {
      const res = await axiosInstance.post("/tasks", {
        title: newTask,
        category,
      });

      // normalize created task
      const created = res.data.newTask || res.data.task || res.data;
      if (created && created._id) {
        setTasks((prev) => [...prev, created]);
        setNewTask("");
      } else {
        // fallback: refetch
        await fetchTasks();
      }
    } catch (err) {
      console.error("Failed to add task", err);
    }
  };

  // --- Delete ---
  const handleDeleteTask = async (taskId) => {
    try {
      await axiosInstance.delete(`/tasks/${taskId}`);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  // --- Update (title & category handled by task editor) ---
  const handleUpdateTask = async (taskId) => {
    if (!editingText.trim()) return;
    setUpdating(true);
    const previous = [...tasks];
    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? { ...t, title: editingText } : t))
    );
    try {
      const res = await axiosInstance.patch(`/tasks/${taskId}`, {
        title: editingText,
      });
      const updated = res.data.task || res.data;
      if (updated && updated._id) {
        setTasks((prev) => prev.map((t) => (t._id === taskId ? updated : t)));
        setEditingTaskId(null);
        setEditingText("");
      } else {
        setTasks(previous);
        await fetchTasks();
      }
    } catch (err) {
      console.error("Failed to update task", err);
      setTasks(previous);
    } finally {
      setUpdating(false);
    }
  };

  // --- Toggle complete ---
  const handleToggleComplete = async (taskId) => {
    const previous = [...tasks];
    setTasks((prev) =>
      prev.map((t) =>
        t._id === taskId ? { ...t, completed: !t.completed } : t
      )
    );
    try {
      const res = await axiosInstance.patch(`/tasks/${taskId}/toggle`);
      const updated = res.data.task || res.data;
      if (updated && updated._id) {
        setTasks((prev) => prev.map((t) => (t._id === taskId ? updated : t)));
      } else {
        await fetchTasks();
      }
    } catch (err) {
      console.error("Toggle failed", err);
      setTasks(previous);
    }
  };

  const handleLogOut = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* header */}
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">FocusOS — Dashboard</h1>
          <div className="flex items-center gap-3">
            <button
              className="text-sm px-3 py-1 rounded bg-red-50 text-red-600 border border-red-100"
              onClick={handleLogOut}
            >
              Logout
            </button>
          </div>
        </header>

        {/* layout: 70% tasks | 30% notes */}
        <div className="grid grid-cols-12 gap-6">
          {/* Tasks (70% = col-span 8.4 ~ use 8/12) */}
          <main className="col-span-12 lg:col-span-8 space-y-4">
            {/* Add task */}
            <div className="flex gap-3 items-center bg-white p-4 rounded shadow-sm border border-slate-100">
              <input
                className="flex-1 px-3 py-2 rounded border border-slate-200 focus:outline-none"
                placeholder="What will you do next?"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
              />
              <select
                className="px-3 py-2 border border-slate-200 rounded bg-white"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="misc">Misc</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="deepwork">Deep Work</option>
                <option value="urgent">Urgent</option>
              </select>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handleAddTask}
              >
                Add
              </button>
            </div>

            {/* Task list */}
            <section className="space-y-3">
              {loadingTasks ? (
                <div className="p-6 bg-white rounded shadow-sm border border-slate-100">
                  Loading tasks...
                </div>
              ) : tasks.length === 0 ? (
                <div className="p-6 bg-white rounded shadow-sm border border-slate-100">
                  No tasks for today.
                </div>
              ) : (
                <div className="space-y-2">
                  {tasks.map((task) => (
                    <TaskItem
                      key={task._id}
                      task={task}
                      editingTaskId={editingTaskId}
                      editingText={editingText}
                      setEditingText={setEditingText}
                      setEditingTaskId={setEditingTaskId}
                      updating={updating}
                      handleUpdateTask={handleUpdateTask}
                      handleToggleComplete={handleToggleComplete}
                      handleDeleteTask={handleDeleteTask}
                    />
                  ))}
                </div>
              )}
            </section>
          </main>

          {/* Notes panel (30% = 4/12) */}
          <aside className="col-span-12 lg:col-span-4">
            <NotesPanel />
          </aside>
        </div>
      </div>
      <ReflectionPromptModal
        open={showModal}
        onClose={closeModal}
        isForYesterday={yesterdayMode}
      />

      <ReflectionToast show={showToast} onWrite={openYesterdayModal} />
    </div>
  );
}
