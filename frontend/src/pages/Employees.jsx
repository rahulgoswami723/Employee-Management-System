import React, { useState, useEffect, useCallback } from 'react';
import axiosClient from '../api/axiosClient';
import Navbar from '../components/Navbar';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeModal from '../components/EmployeeModal';
import DeleteModal from '../components/DeleteModal';
import { CheckCircle2, AlertCircle, X, Users } from 'lucide-react';

const Employees = ({ isDark, onToggleTheme, onLogout, admin, onUpdateAdmin }) => {
  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);

  // Filters & pagination
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [status, setStatus] = useState('All');
  const [page, setPage] = useState(1);
  const limit = 10;
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1
  });

  // Modal controls
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast alert
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Fetch employee records with search, filters & pagination
  const fetchEmployees = useCallback(async () => {
    try {
      setLoadingEmployees(true);
      const params = {
        page,
        limit,
        search: search.trim(),
        department,
        status
      };
      const res = await axiosClient.get('/employees', { params });
      if (res.data?.success) {
        setEmployees(res.data.data || []);
        if (res.data.pagination) {
          setPagination(res.data.pagination);
        }
      }
    } catch (err) {
      console.error('[Employees] Error fetching employees:', err);
      showToast(err.response?.data?.message || 'Failed to load employee list.', 'error');
    } finally {
      setLoadingEmployees(false);
    }
  }, [page, limit, search, department, status]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEmployees();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchEmployees]);

  const handleResetFilters = () => {
    setSearch('');
    setDepartment('All');
    setStatus('All');
    setPage(1);
  };

  // Modal triggers
  const handleOpenAdd = () => {
    setCurrentEmployee(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (emp) => {
    setCurrentEmployee(emp);
    setIsModalOpen(true);
  };

  const handleOpenDelete = (emp) => {
    setEmployeeToDelete(emp);
    setIsDeleteModalOpen(true);
  };

  // Form submit (Add or Edit)
  const handleFormSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      if (currentEmployee) {
        const res = await axiosClient.put(`/employees/${currentEmployee._id}`, formData);
        showToast(res.data?.message || 'Employee updated successfully.', 'success');
      } else {
        const res = await axiosClient.post('/employees', formData);
        showToast(res.data?.message || 'Employee created successfully.', 'success');
      }

      setIsModalOpen(false);
      setCurrentEmployee(null);
      fetchEmployees();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to save employee record.';
      showToast(msg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Confirm Delete
  const handleDeleteConfirm = async () => {
    if (!employeeToDelete) return;
    try {
      setIsDeleting(true);
      const res = await axiosClient.delete(`/employees/${employeeToDelete._id}`);
      showToast(res.data?.message || 'Employee record deleted.', 'success');
      setIsDeleteModalOpen(false);
      setEmployeeToDelete(null);

      if (employees.length === 1 && page > 1) {
        setPage((p) => p - 1);
      } else {
        fetchEmployees();
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to delete employee.';
      showToast(msg, 'error');
    } finally {
      setIsDeleting(false);
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
        showToast={showToast}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title & Context Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-lg">
                <Users className="w-5 h-5" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Employee Management
              </h1>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Search, filter, update records, and manage employee employment statuses.
            </p>
          </div>
        </div>

        {/* Complete Employee Table Component */}
        <EmployeeTable
          employees={employees}
          loading={loadingEmployees}
          pagination={pagination}
          search={search}
          setSearch={setSearch}
          department={department}
          setDepartment={setDepartment}
          status={status}
          setStatus={setStatus}
          page={page}
          setPage={setPage}
          onResetFilters={handleResetFilters}
          onOpenAddModal={handleOpenAdd}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />
      </main>

      {/* Add / Edit Form Modal */}
      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentEmployee(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={currentEmployee}
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setEmployeeToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        employee={employeeToDelete}
        isDeleting={isDeleting}
      />

      {/* Dismissible API Toast Feedback */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full animate-fade-in">
          <div
            className={`flex items-start p-4 rounded-lg border shadow-md bg-white dark:bg-slate-900 ${
              toast.type === 'error'
                ? 'border-rose-300 dark:border-rose-800'
                : 'border-emerald-300 dark:border-emerald-800'
            }`}
          >
            <div className="mr-3">
              {toast.type === 'error' ? (
                <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              )}
            </div>
            <div className="flex-1 text-sm font-medium pr-2 text-slate-800 dark:text-slate-100">
              {toast.message}
            </div>
            <button
              onClick={() => setToast(null)}
              type="button"
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
