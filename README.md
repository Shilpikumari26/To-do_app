# Shilpi_24BCE10535 - Interactive To-Do List

# 📝 To-Do App

A simple and interactive To-Do List application built with **React** (frontend) and **Node.js + Express + SQLite** (backend). This app allows you to add, delete, and manage tasks with live updates.

- **Live Demo:** [Frontend on Vercel](https://to-do-app-gamma-eosin.vercel.app/)
- **Backend API:** [Render](https://to-do-app-q91h.onrender.com/tasks)

---

## Features

- ➕ Add new tasks
- ✅ Mark tasks as completed
- 🗑️ Delete individual tasks
- 🚮 Clear all tasks at once
- 🔢 Task counter showing completed tasks
- 📱 Responsive design with modern styling

---

## Tech Stack

- **Frontend:** React, CSS
- **Backend:** Node.js, Express, better-sqlite3 (SQLite database)
- **Deployment:** Frontend on Vercel, Backend on Render

---

## Screenshots

<!-- Add screenshots here, e.g.:
![Home Screen](screenshots/home.png)
![Completed Tasks](screenshots/completed.png)
-->

---

## Installation (Local Setup)

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Shilpikumari26/To-do_app.git
    cd To-do_app
    ```

2. **Setup backend:**
    ```bash
    cd backend
    npm install
    node server.js
    ```
    - Backend will run on [http://localhost:4000](http://localhost:4000)

3. **Setup frontend:**
    ```bash
    cd frontend
    npm install
    npm start
    ```
    - Frontend will run on [http://localhost:3000](http://localhost:3000)

---

## API Endpoints (Backend)

- `GET /tasks` &mdash; Fetch all tasks
- `POST /tasks` &mdash; Add a new task  
  **Body:**  
  ```json
  { "text": "Your task" }
  ```
- `DELETE /tasks/:id` &mdash; Delete task by ID
- `DELETE /tasks` &mdash; Clear all tasks

---

## Usage

1. Open the frontend in your browser (Vercel link or [localhost:3000](http://localhost:3000))
2. Add tasks in the input box and press Enter or click **Add**
3. Check/uncheck tasks to mark them as completed
4. Delete individual tasks using the **Delete** button
5. Clear all tasks using the **Clear All Tasks** button

---

