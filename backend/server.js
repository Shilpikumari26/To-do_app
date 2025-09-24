const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// DB file will be created in backend/ directory
const dbPath = path.join(__dirname, 'db.sqlite');
const db = new Database(dbPath);

// Initialize table if missing
db.prepare(`CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`).run();

// Helper queries
const insertTask = db.prepare('INSERT INTO tasks (text) VALUES (?)');
const selectAll = db.prepare('SELECT id, text, created_at FROM tasks ORDER BY id DESC');
const deleteById = db.prepare('DELETE FROM tasks WHERE id = ?');

// Insert sample tasks if empty
const count = db.prepare('SELECT COUNT(*) AS c FROM tasks').get().c;
if (count === 0) {
  insertTask.run("Learn React");
  insertTask.run("Build To-do App");
  insertTask.run("Connect frontend with backend");
}

app.get('/', (req, res) => res.json({ status: 'ok' }));

// GET all tasks
app.get('/tasks', (req, res) => {
  try {
    const rows = selectAll.all();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'DB error'});
  }
});

// POST new task
app.post('/tasks', (req, res) => {
  const { text } = req.body;
  if(!text || typeof text !== 'string' || !text.trim()){
    return res.status(400).json({ error: 'Invalid task text' });
  }
  try {
    const info = insertTask.run(text.trim());
    res.status(201).json({ id: info.lastInsertRowid, text: text.trim() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not add task' });
  }
});

// DELETE task by id
app.delete('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  if(!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
  try {
    const info = deleteById.run(id);
    if(info.changes === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ deleted: id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Delete failed' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

