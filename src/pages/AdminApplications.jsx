import { useState } from 'react';
import { FiUsers, FiFilter } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/StatusBadge';

const AdminApplications = () => {
  const { applications, updateApplicationStatus } = useApp();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredApplications = applications.filter(app => {
    const matchesFilter = filter === 'all' || app.status === filter;
    const matchesSearch =
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const statusOptions = ['Applied', 'Under Review', 'Interview', 'Selected', 'Rejected'];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <FiUsers className="w-8 h-8" />
          <h1 className="text-3xl md:text-4xl font-bold">Manage Applications</h1>
        </div>
        <p className="text-indigo-100 text-lg">
          Review and update application statuses
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

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Applications
            </label>
            <input
              type="text"
              placeholder="Job title or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filter by Status
            </label>
            <div className="relative">
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white appearance-none"
              >
                <option value="all">All Applications ({applications.length})</option>
                {statusOptions.map(status => (
                  <option key={status} value={status}>
                    {status} ({applications.filter(a => a.status === status).length})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      {filteredApplications.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Job Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Applied Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Current Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Update Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredApplications.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {app.jobTitle}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {app.company}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {new Date(app.appliedDate).toLocaleDateString()}
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {Math.floor((new Date() - new Date(app.appliedDate)) / (1000 * 60 * 60 * 24))} days ago
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={app.status}
                        onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                      >
                        {statusOptions.map(status => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <FiUsers className="w-20 h-20 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No applications found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchTerm || filter !== 'all'
              ? 'Try adjusting your filters'
              : 'No applications have been submitted yet'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminApplications;
