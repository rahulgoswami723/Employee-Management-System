import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import { X, User, Mail, ShieldCheck, Check } from 'lucide-react';

const ProfileModal = ({ isOpen, onClose, user, admin, onProfileUpdated }) => {
  const currentUser = user || admin;
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
    }
    setError('');
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide a valid display name.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      const res = await axiosClient.put('/auth/profile', { name: name.trim() });
      if (res.data?.success) {
        const updatedUser = res.data.user || res.data.admin;
        if (onProfileUpdated) {
          onProfileUpdated(updatedUser);
        }
        onClose();
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update profile settings.';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl max-w-md w-full overflow-hidden transition-all">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-lg">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Admin Profile Settings
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Update your administrative display name
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 dark:bg-rose-950/40 dark:border-rose-900 text-xs font-medium text-rose-700 dark:text-rose-400">
              {error}
            </div>
          )}

          {/* Read-Only Email Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                value={currentUser?.email || ''}
                readOnly
                tabIndex={-1}
                aria-readonly="true"
                className="w-full pl-9 pr-3 py-2 text-sm bg-gray-100 text-gray-500 border border-slate-200 rounded-lg cursor-not-allowed dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 select-none focus:outline-none"
              />
            </div>
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
              Email address cannot be changed directly.
            </p>
          </div>

          {/* Editable Display Name Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Admin Display Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="e.g. Administrator"
                className={`w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-slate-800 border rounded-lg focus:outline-none focus:ring-1 ${
                  error
                    ? 'border-rose-400 focus:ring-rose-500 dark:border-rose-600'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500'
                } dark:text-slate-100`}
                autoFocus
              />
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              This name is shown in the top navigation bar.
            </p>
          </div>

          {/* Role Badge Indicator */}
          <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-850 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Access Level:</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              <ShieldCheck className="w-3 h-3 mr-1" />
              System Administrator
            </span>
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end space-x-3">
            <button
              onClick={onClose}
              type="button"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center space-x-1.5"
            >
              {isSubmitting ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <Check className="w-4 h-4" />
              )}
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
