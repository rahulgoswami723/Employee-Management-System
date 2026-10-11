import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Users,
  LayoutDashboard,
  Sun,
  Moon,
  LogOut,
  ShieldCheck,
  Settings,
  ChevronDown
} from 'lucide-react';
import ProfileModal from './ProfileModal';

const Navbar = ({ admin, onLogout, isDark, onToggleTheme, onUpdateAdmin, showToast }) => {
  // Dropdown & Modal state variables
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on clicks outside the admin profile area
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleProfileUpdated = (updatedAdmin) => {
    if (onUpdateAdmin) {
      onUpdateAdmin(updatedAdmin);
    }
    localStorage.setItem('admin', JSON.stringify(updatedAdmin));
    if (showToast) {
      showToast(`Display name updated to "${updatedAdmin.name}"`, 'success');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 dark:bg-slate-900 dark:border-slate-800 transition-colors shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Brand Logo & Navigation Links */}
            <div className="flex items-center space-x-6">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm group-hover:bg-blue-700 transition">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                      StaffPulse
                    </span>
                    <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded font-semibold bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
                      EMS
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                    Employee Management System
                  </p>
                </div>
              </Link>

              {/* Navigation Menu */}
              <nav className="flex items-center space-x-1 pl-2">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 font-semibold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  <LayoutDashboard className="w-4 h-4 mr-1.5" />
                  <span>Dashboard</span>
                </NavLink>

                <NavLink
                  to="/employees"
                  className={({ isActive }) =>
                    `inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 font-semibold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  <Users className="w-4 h-4 mr-1.5" />
                  <span>Employees</span>
                </NavLink>
              </nav>
            </div>

            {/* Right: Theme Toggle & Admin Profile Dropdown */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Dark / Light Mode Toggle */}
              <button
                onClick={onToggleTheme}
                type="button"
                className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition"
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Admin Profile Section */}
              <div className="relative pl-2 border-l border-slate-200 dark:border-slate-800" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDropdownOpen((prev) => !prev);
                  }}
                  className="flex items-center space-x-2.5 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/80 transition text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                >
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                      {admin?.name || 'Administrator'}
                    </p>
                    <div className="flex items-center justify-end space-x-1 mt-0.5">
                      <ShieldCheck className="w-3 h-3 text-blue-600 dark:text-blue-400 pointer-events-none" />
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        Admin
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu (conditionally rendered only when isDropdownOpen is true) */}
                {isDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-1 z-50 animate-fade-in">
                    {/* User Info Header */}
                    <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800 text-xs">
                      <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {admin?.name || 'Administrator'}
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 truncate text-[11px]">
                        {admin?.email || 'admin@company.com'}
                      </p>
                    </div>

                    {/* Profile Settings Option */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setIsProfileModalOpen(true);
                      }}
                      className="w-full flex items-center px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition text-left cursor-pointer"
                    >
                      <Settings className="w-4 h-4 mr-2.5 text-slate-500 dark:text-slate-400" />
                      <span>Profile Settings</span>
                    </button>

                    {/* Sign Out Option */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full flex items-center px-4 py-2.5 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition border-t border-slate-100 dark:border-slate-800 text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 mr-2.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Settings Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={admin}
        admin={admin}
        onProfileUpdated={handleProfileUpdated}
      />
    </>
  );
};

export default Navbar;
