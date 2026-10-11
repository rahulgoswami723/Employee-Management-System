import React from 'react';
import { Edit2, Trash2, Search, RotateCcw, Plus, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const DEPARTMENTS = [
  'All',
  'Engineering',
  'Human Resources',
  'Marketing',
  'Sales',
  'Finance',
  'Design',
  'Operations'
];

const STATUSES = ['All', 'Active', 'On Leave', 'Terminated'];

const EmployeeTable = ({
  employees,
  loading,
  pagination,
  search,
  setSearch,
  department,
  setDepartment,
  status,
  setStatus,
  page,
  setPage,
  onResetFilters,
  onOpenAddModal,
  onEdit,
  onDelete
}) => {
  const getStatusBadge = (empStatus) => {
    switch (empStatus) {
      case 'Active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
            Active
          </span>
        );
      case 'On Leave':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
            On Leave
          </span>
        );
      case 'Terminated':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/50 dark:text-rose-400 dark:border-rose-800">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5"></span>
            Terminated
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
            {empStatus}
          </span>
        );
    }
  };

  const isFiltered = search !== '' || department !== 'All' || status !== 'All';

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs overflow-hidden">
      {/* Search & Filter Toolbar */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Live Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name, email, or role..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 placeholder-slate-400"
            />
          </div>

          {/* Department & Status Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Department */}
            <div className="flex items-center space-x-1.5">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Dept:</span>
              <select
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  setPage(1);
                }}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="flex items-center space-x-1.5">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Status:</span>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPage(1);
                }}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
              >
                {STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Filters */}
            {isFiltered && (
              <button
                onClick={onResetFilters}
                type="button"
                className="inline-flex items-center px-2.5 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition"
                title="Reset filters"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                Reset
              </button>
            )}

            {/* Add Employee CTA */}
            <button
              onClick={onOpenAddModal}
              type="button"
              className="inline-flex items-center px-3.5 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition ml-auto md:ml-0"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Employee
            </button>
          </div>
        </div>
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
          <thead className="text-xs uppercase bg-slate-50 text-slate-500 border-b border-slate-200 dark:bg-slate-800/60 dark:text-slate-400 dark:border-slate-800">
            <tr>
              <th scope="col" className="px-5 py-3.5 font-semibold">Employee</th>
              <th scope="col" className="px-5 py-3.5 font-semibold">Role / Position</th>
              <th scope="col" className="px-5 py-3.5 font-semibold">Department</th>
              <th scope="col" className="px-5 py-3.5 font-semibold">Salary</th>
              <th scope="col" className="px-5 py-3.5 font-semibold">Status</th>
              <th scope="col" className="px-5 py-3.5 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {loading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  <td className="px-5 py-4">
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-32 mb-1.5"></div>
                    <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded w-44"></div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-28"></div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-24"></div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-16"></div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-full w-20"></div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="inline-block h-6 bg-slate-200 dark:bg-slate-800 rounded w-14"></div>
                  </td>
                </tr>
              ))
            ) : employees.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-5 py-12 text-center">
                  <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-3">
                      <AlertCircle className="w-6 h-6 text-slate-400" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                      No employees found
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4 text-center">
                      {isFiltered
                        ? 'No records match your search or filter criteria.'
                        : 'No employee records exist yet. Click below to add the first employee.'}
                    </p>
                    {isFiltered ? (
                      <button
                        onClick={onResetFilters}
                        type="button"
                        className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 dark:text-slate-200 dark:bg-slate-800 rounded-lg transition"
                      >
                        Clear Filters
                      </button>
                    ) : (
                      <button
                        onClick={onOpenAddModal}
                        type="button"
                        className="px-3.5 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition"
                      >
                        Add Employee
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr
                  key={emp._id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-slate-900 dark:text-white">
                      {emp.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {emp.email}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-slate-700 dark:text-slate-300">
                    {emp.role}
                  </td>
                  <td className="px-5 py-3.5 text-slate-700 dark:text-slate-300">
                    {emp.department}
                  </td>
                  <td className="px-5 py-3.5 font-medium text-slate-900 dark:text-slate-200">
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(emp.salary)}
                  </td>
                  <td className="px-5 py-3.5">{getStatusBadge(emp.status)}</td>
                  <td className="px-5 py-3.5 text-right whitespace-nowrap">
                    <div className="inline-flex items-center space-x-1">
                      <button
                        onClick={() => onEdit(emp)}
                        type="button"
                        className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-400 dark:hover:text-blue-400 dark:hover:bg-blue-950/40 rounded transition"
                        title="Edit employee"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(emp)}
                        type="button"
                        className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 dark:text-slate-400 dark:hover:text-rose-400 dark:hover:bg-rose-950/40 rounded transition"
                        title="Delete employee"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
        <div>
          Showing{' '}
          <strong className="text-slate-900 dark:text-white">
            {pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1}
          </strong>{' '}
          to{' '}
          <strong className="text-slate-900 dark:text-white">
            {Math.min(pagination.page * pagination.limit, pagination.total)}
          </strong>{' '}
          of{' '}
          <strong className="text-slate-900 dark:text-white">
            {pagination.total}
          </strong>{' '}
          employees
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={pagination.page <= 1 || loading}
            type="button"
            className="p-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-medium">
            Page {pagination.page} of {pagination.totalPages || 1}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, pagination.totalPages))}
            disabled={pagination.page >= pagination.totalPages || loading}
            type="button"
            className="p-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;
