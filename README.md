# Employee Management System

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

> A modern, full-stack internal workforce dashboard designed to streamline employee record management, track departmental metrics, and maintain organizational records securely.

---

## 📖 About The Project

The **Employee Management System** is a secure internal web application built to help administrators and HR teams efficiently manage employee records, organize departmental structures, and monitor essential workforce metrics in real time.

This project was developed as **Task-02** for the **Prodigy InfoTech Full-Stack Web Development Internship**. It emphasizes clean full-stack architecture, secure token-based authentication, responsive UI design, and modular RESTful API endpoints.

---

## ✨ Features

- 🔐 **JWT Authentication & Security:** Secure token-based authentication with bcrypt password hashing and protected API routes.
- 👥 **Full CRUD Operations:** Create, Read, Update, and Delete employee records with instant client-side data updates.
- 🔍 **Live Search & Filter:** Instant search by employee name or email, combined with multi-criteria filters by department and employment status (*Active*, *On Leave*, *Inactive*).
- 📊 **Workforce Analytics:** Interactive summary cards that display total employee count, active staff, personnel on leave, and departmental distribution.
- 🌓 **Dark Mode / Light Mode:** Built-in theme switcher with smooth color transitions and persistent theme state.
- ⚙️ **Admin Profile Settings:** Modal interface allowing administrators to review their account details and update their display name.
- ⚡ **Auto-Fill Demo Credentials:** Convenient one-click credential autofill on the login page for rapid testing and evaluation.

---

## 📋 Prerequisites (Beginner-Friendly)

Before running the project, make sure you have the following software installed on your machine:

1. **Node.js (v16 or higher)**:
   - Includes `npm` (Node Package Manager).
   - [Download Node.js](https://nodejs.org/) (Choose the Recommended/LTS version).
   - Verify installation in your terminal:
     ```bash
     node -v
     npm -v
     ```

2. **MongoDB Community Server**:
   - The database engine that stores your application's data locally.
   - [Download MongoDB Community Server](https://www.mongodb.com/try/download/community).
   - Make sure MongoDB service is running (default port: `27017`).

3. **MongoDB Compass (Recommended GUI)**:
   - A visual desktop tool to explore, view, and inspect your MongoDB collections and documents without running command-line queries.
   - [Download MongoDB Compass](https://www.mongodb.com/try/download/compass).

---

## 🚀 Step-by-Step Setup Guide

Follow these exact steps in your terminal to set up and run the application locally.

### Step 1: Set Up and Run the Backend

1. **Open your terminal** and navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```

3. **Create the environment file:**
   Create a new file named `.env` inside the `backend` folder and paste the following configuration:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/employee_management
   JWT_SECRET=your_secret_key
   ```
   > 💡 *Note: You can replace `your_secret_key` with any secure string of your choice.*

4. **Seed the database (Crucial Step):**
   Run the seed command to populate MongoDB with a default administrator account and sample employee records:
   ```bash
   npm run seed
   ```
   > ℹ️ *Why run this? The seed command inserts a ready-to-use admin account and realistic dummy employee records across multiple departments so you don't start with an empty application.*

5. **Start the backend development server:**
   ```bash
   npm run dev
   ```
   - Your backend API is now running at **`http://localhost:5000`**.

---

### Step 2: Set Up and Run the Frontend

1. **Open a new terminal window** (keep the backend terminal running) and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Create the frontend environment file:**
   Create a new file named `.env` inside the `frontend` folder and add the following line:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Start the Vite development server:**
   ```bash
   npm run dev
   ```
   - Open your browser and navigate to the local URL displayed in the terminal (typically **`http://localhost:5173`**).

---

## 🔑 How to Use & Default Credentials

Once both the backend and frontend servers are running:

1. Open your browser at **`http://localhost:5173`**.
2. You will be greeted with the Admin Login screen.
3. Use the default seeded admin credentials below, or simply click the **"Autofill Demo Credentials"** button:

| Credential Field | Value |
| :--- | :--- |
| **Email Address** | `admin09@email.com` |
| **Password** | `ProdigyTask2Secure!` |

4. After signing in:
   - **Dashboard Overview:** Review workforce statistics, active counts, and recent changes.
   - **Employee Directory:** Click **Employees** in the top navigation bar to search, filter by department or status, add new team members, edit details, or remove records.
   - **Theme Toggle:** Click the Sun/Moon icon in the navigation bar to toggle between Dark Mode and Light Mode.
   - **Profile Settings:** Click your avatar or the profile icon in the top right to view your admin details and update your display name.

---

## 📁 Folder Structure

Here is a simplified overview of how the frontend and backend are structured:

```text
task2/
├── backend/                       # Server-side REST API (Node.js & Express)
│   ├── config/
│   │   └── db.js                  # MongoDB Mongoose database connection
│   ├── controllers/
│   │   ├── authController.js      # Admin authentication & profile logic
│   │   └── employeeController.js  # CRUD operations & workforce statistics logic
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT verification middleware for protected routes
│   ├── models/
│   │   ├── Admin.js               # Admin Mongoose schema & password hashing
│   │   └── Employee.js            # Employee Mongoose schema (name, role, dept, salary)
│   ├── routes/
│   │   ├── authRoutes.js          # Authentication API route endpoints (/api/auth)
│   │   └── employeeRoutes.js      # Employee API route endpoints (/api/employees)
│   ├── .env                       # Backend environment configuration
│   ├── package.json               # Backend dependencies & npm scripts
│   ├── seed.js                    # Database seeder script for demo data
│   └── server.js                  # Express application entry point & CORS setup
│
├── frontend/                      # Client-side Single Page Application (React & Vite)
│   ├── public/                    # Static assets & favicon
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosClient.js     # Axios client instance with JWT token interceptor
│   │   ├── components/
│   │   │   ├── DeleteModal.jsx    # Delete confirmation modal dialog
│   │   │   ├── EmployeeModal.jsx  # Add and Edit employee form modal
│   │   │   ├── EmployeeTable.jsx  # Interactive employee records data table
│   │   │   ├── Navbar.jsx         # Navigation bar with theme toggle & user menu
│   │   │   ├── ProfileModal.jsx   # Admin profile view & edit modal
│   │   │   └── StatsCard.jsx      # Reusable dashboard analytics metrics card
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx      # Metrics overview and recent activity page
│   │   │   ├── Employees.jsx      # Employee directory with search, filter & CRUD
│   │   │   └── Login.jsx          # Admin authentication page with autofill button
│   │   ├── App.jsx                # Route definitions & protected route guards
│   │   ├── index.css              # Tailwind CSS styles and custom styling
│   │   └── main.jsx               # React entry point
│   ├── .env                       # Frontend environment variables
│   ├── package.json               # Frontend dependencies & npm scripts
│   ├── tailwind.config.js         # Tailwind CSS theme configuration
│   └── vite.config.js             # Vite development server configuration
│
└── README.md                      # Project documentation and setup guide
```

---

## 🛠️ API Reference Summary

| Method | Endpoint | Description | Protected |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/login` | Authenticate admin & return JWT token | No |
| `GET` | `/api/auth/me` | Fetch authenticated admin details | Yes |
| `PUT` | `/api/auth/profile` | Update admin display name | Yes |
| `GET` | `/api/employees/stats` | Retrieve workforce summary metrics | Yes |
| `GET` | `/api/employees` | Get employees with search, department & status filter | Yes |
| `POST` | `/api/employees` | Create a new employee record | Yes |
| `PUT` | `/api/employees/:id` | Update an existing employee record | Yes |
| `DELETE` | `/api/employees/:id` | Delete an employee record | Yes |

---

## 📄 License

This project is open-source and created for educational purposes under the **Prodigy InfoTech Internship Program**.
