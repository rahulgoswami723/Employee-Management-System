# Employee Management System

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

> A MERN stack application for managing employee records, tracking departmental metrics, and handling administrative tasks.

---

## 📖 About The Project

This project was developed as **Task-02** for the **Prodigy InfoTech Full-Stack Web Development Internship**. 

The goal was to build a functional internal workforce tool that connects a React frontend with a secured Node.js/Express backend. It demonstrates core full-stack concepts including RESTful API design, database state management, and protected routing.

---

## ✨ Features

- 🔐 **Authentication:** JWT-based login for administrators with bcrypt password hashing.
- 👥 **CRUD Operations:** Create, Read, Update, and Delete employee records with real-time UI updates.
- 🔍 **Search & Filter:** Find employees by name/email, or filter by department and status (*Active*, *On Leave*, *Inactive*).
- 📊 **Dashboard Analytics:** High-level metrics tracking total headcount, active staff, and departmental distribution.
- 🌓 **Theme Toggle:** Built-in Dark/Light mode persistence.
- ⚙️ **Account Settings:** Administrators can review account details and update their display name.
- ⚡ **Demo Access:** One-click credential autofill on the login page for quick testing.

---

## 📋 Prerequisites

To run this project locally, you will need:
- **Node.js** (v16 or higher)
- **MongoDB Community Server** (running on default port `27017`)
- *(Optional)* **MongoDB Compass** for viewing database collections graphically.

---

## 🚀 Local Setup Guide

### 1. Backend Setup

Open a terminal and navigate to the backend directory:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/employee_management
JWT_SECRET=your_jwt_secret_key_here
```

Seed the database with the default admin account and sample data:
```bash
npm run seed
```

Start the backend server:
```bash
npm run dev
```

---

### 2. Frontend Setup

Open a new terminal window and navigate to the frontend directory:
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the React application:
```bash
npm run dev
```

---

## 🔑 Demo Credentials

Once the application is running at `http://localhost:5173`, use the **Autofill Demo Credentials** button on the login page, or log in manually with the seeded account:

- **Email:** `admin09@email.com`
- **Password:** `ProdigyTask2Secure!`

---

## 📁 Project Structure

```text
task2/
├── backend/                       # Server-side REST API (Node.js & Express)
│   ├── config/db.js               # Database connection
│   ├── controllers/               # Route logic (auth, employees)
│   ├── middleware/                # JWT verification 
│   ├── models/                    # Mongoose schemas (Admin, Employee)
│   ├── routes/                    # API endpoints
│   ├── seed.js                    # Database seeder script
│   └── server.js                  # Express entry point
│
├── frontend/                      # Client-side SPA (React & Vite)
│   ├── src/
│   │   ├── api/axiosClient.js     # Axios instance with JWT interceptor
│   │   ├── components/            # Modals, Navbar, Tables, StatsCards
│   │   ├── pages/                 # Dashboard, Employees, Login
│   │   └── App.jsx                # Routes & protected guards
│
└── README.md                      # Project documentation
```

---

## 🛠️ API Reference

| Method | Endpoint | Description | Protected |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/login` | Authenticate admin & return JWT | No |
| `GET` | `/api/auth/me` | Fetch authenticated admin details | Yes |
| `PUT` | `/api/auth/profile` | Update admin display name | Yes |
| `GET` | `/api/employees/stats` | Retrieve workforce metrics | Yes |
| `GET` | `/api/employees` | Get employees with search/filter | Yes |
| `POST` | `/api/employees` | Create new employee record | Yes |
| `PUT` | `/api/employees/:id` | Update existing employee | Yes |
| `DELETE` | `/api/employees/:id` | Delete employee record | Yes |

---

## 📄 License

## 📄 License
Developed as part of Prodigy InfoTech Task 02. Released under the MIT License.
