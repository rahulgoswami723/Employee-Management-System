import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [admin, setAdmin] = useState(() => {
    try {
      const saved = localStorage.getItem('admin');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Dark / Light Mode Toggle
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    setToken(null);
    setAdmin(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Login Route */}
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/" replace />
            ) : (
              <Login
                isDark={isDark}
                onToggleTheme={toggleTheme}
                onLoginSuccess={(receivedToken, receivedAdmin) => {
                  setToken(receivedToken);
                  setAdmin(receivedAdmin);
                }}
              />
            )
          }
        />

        {/* Protected Dashboard Route */}
        <Route
          path="/"
          element={
            token ? (
              <Dashboard
                isDark={isDark}
                onToggleTheme={toggleTheme}
                onLogout={handleLogout}
                admin={admin}
                onUpdateAdmin={setAdmin}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Protected Employees Management Route */}
        <Route
          path="/employees"
          element={
            token ? (
              <Employees
                isDark={isDark}
                onToggleTheme={toggleTheme}
                onLogout={handleLogout}
                admin={admin}
                onUpdateAdmin={setAdmin}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* /dashboard Alias Route */}
        <Route path="/dashboard" element={<Navigate to="/" replace />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
