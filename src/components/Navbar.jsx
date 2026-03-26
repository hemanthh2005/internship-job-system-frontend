import { Link, useNavigate } from 'react-router-dom';
import { FiSun, FiMoon, FiBriefcase, FiLogOut, FiUser } from 'react-icons/fi';
import { useApp } from '../context/AppContext';

const Navbar = () => {
  const { darkMode, toggleDarkMode, userRole, setUserRole, student } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserRole(null);
    navigate('/');
  };

  const switchRole = () => {
    const newRole = userRole === 'student' ? 'admin' : 'student';
    setUserRole(newRole);
    navigate(newRole === 'student' ? '/dashboard' : '/admin');
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={userRole === 'admin' ? '/admin' : '/dashboard'} className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
              <FiBriefcase className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                JobConnect
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {userRole === 'admin' ? 'Admin Portal' : 'Student Portal'}
              </p>
            </div>
          </Link>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* User info */}
            {userRole === 'student' && (
              <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                <FiUser className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {student.name}
                </span>
              </div>
            )}

            {/* Role switcher (for demo purposes) */}
            <button
              onClick={switchRole}
              className="px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            >
              Switch to {userRole === 'student' ? 'Admin' : 'Student'}
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <FiSun className="w-5 h-5 text-yellow-500" />
              ) : (
                <FiMoon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <FiLogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
