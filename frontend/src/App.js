import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const fetchTasks = () => {
    fetch("http://localhost:4000/tasks")
      .then(res => res.json())
      .then(data => setTasks(data.map(task => ({ ...task, completed: false }))))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = () => {
    if (!newTask.trim()) return;
    fetch("http://localhost:4000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTask }),
    })
      .then(res => res.json())
      .then(data => {
        setTasks([...tasks, { ...data, completed: false }]);
        setNewTask("");
      });
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:4000/tasks/${id}`, { method: "DELETE" })
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
      .catch(err => console.error(err));
  };

  const clearAllTasks = () => {
    fetch("http://localhost:4000/tasks", { method: "DELETE" })
      .then(() => setTasks([]))
      .catch(err => console.error(err));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addTask();
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Count completed tasks
  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      minHeight: "100vh",
      background: "linear-gradient(to right, #74ebd5, #ACB6E5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      paddingTop: "50px"
    }}>
      <div style={{
        width: "90%",
        maxWidth: "500px",
        backgroundColor: "#fefefe",
        borderRadius: "20px",
        padding: "30px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
      }}>
        <h1 style={{ color: "#333", textAlign: "center", marginBottom: "10px" }}>📝 My To-Do List</h1>

        {/* Task counter */}
        <p style={{ textAlign: "center", color: "#666", marginBottom: "25px", fontSize: "16px" }}>
          Completed {completedCount} of {tasks.length} tasks
        </p>

        {/* Input and Add button */}
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <input
            type="text"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Add a new task"
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "25px",
              border: "1px solid #ccc",
              boxShadow: "inset 0 2px 5px rgba(0,0,0,0.1)",
              marginRight: "10px"
            }}
          />
          <button
            onClick={addTask}
            style={{
              padding: "12px 20px",
              borderRadius: "25px",
              border: "none",
              backgroundColor: "#4CAF50",
              color: "#fff",
              cursor: "pointer",
              transition: "0.3s",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = "#45a049"}
            onMouseOut={e => e.currentTarget.style.backgroundColor = "#4CAF50"}
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map(task => (
            <li
              key={task.id}
              style={{
                padding: "15px 20px",
                marginBottom: "12px",
                backgroundColor: "#fff",
                borderRadius: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                transition: "0.2s"
              }}
              onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              <label style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                flex: 1,
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "#999" : "#555",
                fontSize: "16px"
              }}>
                <input
                  type="checkbox"
                  checked={task.completed || false}
                  onChange={() => toggleComplete(task.id)}
                  style={{ width: "18px", height: "18px", cursor: "pointer" }}
                />
                {task.text}
              </label>
              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  backgroundColor: "#f44336",
                  border: "none",
                  color: "#fff",
                  padding: "6px 12px",
                  borderRadius: "25px",
                  cursor: "pointer",
                  transition: "0.3s",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = "#e53935"}
                onMouseOut={e => e.currentTarget.style.backgroundColor = "#f44336"}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {/* Clear All */}
        {tasks.length > 0 && (
          <button
            onClick={clearAllTasks}
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "12px",
              borderRadius: "25px",
              border: "none",
              backgroundColor: "#ff9800",
              color: "#fff",
              cursor: "pointer",
              transition: "0.3s",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = "#fb8c00"}
            onMouseOut={e => e.currentTarget.style.backgroundColor = "#ff9800"}
          >
            Clear All Tasks
          </button>
        )}
      </div>
    </div>
  );
}

export default App;







