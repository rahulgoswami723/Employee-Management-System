import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import Navbar from '../components/Navbar';
import StatsCard from '../components/StatsCard';
import {
  Users,
  UserCheck,
  Clock,
  Building2,
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

const Dashboard = ({ isDark, onToggleTheme, onLogout, admin, onUpdateAdmin }) => {
  const [stats, setStats] = useState(null);
  const [recentEmployees, setRecentEmployees] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingRecent, setLoadingRecent] = useState(true);

  // Fetch summary analytics
  const fetchStats = async () => {
    try {
      setLoadingStats(true);
      const res = await axiosClient.get('/employees/stats');
      if (res.data?.stats) {
        setStats(res.data.stats);
      }
    } catch (err) {
      console.error('[Dashboard] Error fetching stats:', err);
    } finally {
      setLoadingStats(false);
    }
  };

  // Fetch 5 newest employees for the activity widget
  const fetchRecentEmployees = async () => {
    try {
      setLoadingRecent(true);
      const res = await axiosClient.get('/employees?limit=5');
      if (res.data?.success) {
        setRecentEmployees(res.data.data || []);
      }
    } catch (err) {
      console.error('[Dashboard] Error fetching recent employees:', err);
    } finally {
      setLoadingRecent(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchRecentEmployees();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
            Active
          </span>
        );
      case 'On Leave':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
            On Leave
          </span>
        );
      case 'Terminated':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/50 dark:text-rose-400 dark:border-rose-800">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5"></span>
            Terminated
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors">
      {/* Top Navbar */}
      <Navbar
        admin={admin}
        onLogout={onLogout}
        isDark={isDark}
        onToggleTheme={onToggleTheme}
        onUpdateAdmin={onUpdateAdmin}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Analytics Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Dashboard Overview
              </h1>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Workforce distribution, active headcount, and recent organizational additions.
            </p>
          </div>

          <Link
            to="/employees"
            className="inline-flex items-center space-x-1.5 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition self-start sm:self-auto"
          >
            <span>Manage Employees</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Top Analytics Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Employees"
            value={stats?.totalEmployees ?? 0}
            icon={<Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
            subtext="All company divisions"
            loading={loadingStats}
          />
          <StatsCard
            title="Active Workforce"
            value={stats?.activeEmployees ?? 0}
            icon={<UserCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
            subtext={`${stats?.totalEmployees ? Math.round(((stats.activeEmployees || 0) / stats.totalEmployees) * 100) : 0}% active roster`}
            loading={loadingStats}
          />
          <StatsCard
            title="On Leave"
            value={stats?.onLeaveEmployees ?? 0}
            icon={<Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
            subtext={`${stats?.terminatedEmployees ?? 0} terminated records`}
            loading={loadingStats}
          />
          <StatsCard
            title="Departments"
            value={stats?.departmentCount ?? 0}
            icon={<Building2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
            subtext="Active divisions"
            loading={loadingStats}
          />
        </div>

        {/* Simplified "Recently Added Employees" Activity Widget */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs overflow-hidden">
          {/* Widget Header */}
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                Recently Added Employees
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Latest 5 personnel additions to the company roster
              </p>
            </div>
            <Link
              to="/employees"
              className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          {/* Table / List */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
              <thead className="text-xs uppercase bg-slate-50 text-slate-500 border-b border-slate-200 dark:bg-slate-800/60 dark:text-slate-400 dark:border-slate-800">
                <tr>
                  <th scope="col" className="px-6 py-3 font-semibold">Employee</th>
                  <th scope="col" className="px-6 py-3 font-semibold">Role</th>
                  <th scope="col" className="px-6 py-3 font-semibold">Department</th>
                  <th scope="col" className="px-6 py-3 font-semibold">Salary</th>
                  <th scope="col" className="px-6 py-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {loadingRecent ? (
                  Array.from({ length: 5 }).map((_, idx) => (
                    <tr key={idx} className="animate-pulse">
                      <td className="px-6 py-3.5">
                        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-28 mb-1"></div>
                        <div className="h-3 bg-slate-100 dark:bg-slate-850 rounded w-36"></div>
                      </td>
                      <td className="px-6 py-3.5">
                        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-24"></div>
                      </td>
                      <td className="px-6 py-3.5">
                        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-20"></div>
                      </td>
                      <td className="px-6 py-3.5">
                        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-16"></div>
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        <div className="inline-block h-5 bg-slate-200 dark:bg-slate-800 rounded-full w-16"></div>
                      </td>
                    </tr>
                  ))
                ) : recentEmployees.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-10 text-center">
                      <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                        <AlertCircle className="w-8 h-8 text-slate-400 mb-2" />
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                          No employee records found
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-3">
                          Head over to the Employees section to add your first team member.
                        </p>
                        <Link
                          to="/employees"
                          className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                        >
                          Add Employee
                        </Link>
                      </div>
                    </td>
                  </tr>
                ) : (
                  recentEmployees.map((emp) => (
                    <tr
                      key={emp._id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="px-6 py-3.5">
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {emp.name}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {emp.email}
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-slate-700 dark:text-slate-300">
                        {emp.role}
                      </td>
                      <td className="px-6 py-3.5 text-slate-700 dark:text-slate-300">
                        {emp.department}
                      </td>
                      <td className="px-6 py-3.5 font-medium text-slate-900 dark:text-slate-200">
                        {new Intl.NumberFormat('en-IN', {
                          style: 'currency',
                          currency: 'INR',
                          maximumFractionDigits: 0
                        }).format(emp.salary)}
                      </td>
                      <td className="px-6 py-3.5 text-right whitespace-nowrap">
                        {getStatusBadge(emp.status)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
