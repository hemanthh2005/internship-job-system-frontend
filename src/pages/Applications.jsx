import { useState } from 'react';
import { FiFileText, FiCalendar, FiHome, FiClock } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/StatusBadge';

const Applications = () => {
  const { applications, updateApplicationStatus, userRole } = useApp();
  const [filter, setFilter] = useState('all');

  const filteredApplications = filter === 'all'
    ? applications
    : applications.filter(app => app.status === filter);

  const statusOptions = ['Applied', 'Under Review', 'Interview', 'Selected', 'Rejected'];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <FiFileText className="w-8 h-8" />
          <h1 className="text-3xl md:text-4xl font-bold">My Applications</h1>
        </div>
        <p className="text-purple-100 text-lg">
          Track all your job applications in one place
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Total', value: applications.length, color: 'bg-blue-500' },
          { label: 'Applied', value: applications.filter(a => a.status === 'Applied').length, color: 'bg-blue-500' },
          { label: 'Under Review', value: applications.filter(a => a.status === 'Under Review').length, color: 'bg-yellow-500' },
          { label: 'Interview', value: applications.filter(a => a.status === 'Interview').length, color: 'bg-purple-500' },
          { label: 'Selected', value: applications.filter(a => a.status === 'Selected').length, color: 'bg-green-500' }
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
          >
            <div className={`${stat.color} w-2 h-2 rounded-full mb-2`}></div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stat.value}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Filter by status:
          </span>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            All ({applications.length})
          </button>
          {statusOptions.map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {status} ({applications.filter(a => a.status === status).length})
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      {filteredApplications.length > 0 ? (
        <div className="space-y-4">
          {filteredApplications.map((application) => (
            <div
              key={application.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Job Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {application.jobTitle}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <FiHome className="w-4 h-4" />
                          {application.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiCalendar className="w-4 h-4" />
                          Applied: {new Date(application.appliedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="mb-4">
                    <StatusBadge status={application.status} />
                  </div>

                  {/* Only admin can update application status */}
                  {userRole === 'admin' && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Simulate status update:
                      </span>
                      {statusOptions.map(status => (
                        <button
                          key={status}
                          onClick={() => updateApplicationStatus(application.id, status)}
                          disabled={application.status === status}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            application.status === status
                              ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
                              : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Timeline indicator */}
                <div className="flex md:flex-col items-center md:items-end gap-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FiClock className="w-4 h-4" />
                    <span>
                      {Math.floor((new Date() - new Date(application.appliedDate)) / (1000 * 60 * 60 * 24))} days ago
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <FiFileText className="w-20 h-20 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {filter === 'all' ? 'No applications yet' : `No ${filter} applications`}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {filter === 'all'
              ? 'Start applying to jobs to see them here'
              : 'Try selecting a different status filter'
            }
          </p>
          {filter === 'all' && (
            <button
              onClick={() => window.location.href = '/jobs'}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Jobs
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Applications;
