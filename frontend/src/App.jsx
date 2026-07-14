import { useEffect, useState } from "react";
import axios from "axios";

// ✅ PRODUCTION + LOCAL SAFE API URL
const API = `${import.meta.env.VITE_API_URL}/api/tasks`;

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      setTasks(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!title.trim()) return;
    try {
      await axios.post(API, { title });
      setTitle("");
      fetchTasks();
    } catch (err) {
      setError("Failed to add task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchTasks();
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Task Manager</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
        disabled={loading}
      />

      <button onClick={addTask} disabled={loading || !title.trim()}>
        Add
      </button>

      {loading && <p>Loading...</p>}

      <ul>
        {tasks.map((t) => (
          <li key={t._id}>
            {t.title}
            <button onClick={() => deleteTask(t._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
