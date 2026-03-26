import { FiBriefcase, FiUsers, FiTrendingUp, FiClock } from 'react-icons/fi';
import { useApp } from '../context/AppContext';

const AdminDashboard = () => {
  const { jobs, applications } = useApp();

  const stats = [
    {
      icon: FiBriefcase,
      label: 'Total Jobs Posted',
      value: jobs.length,
      color: 'bg-blue-500',
      trend: '+12%'
    },
    {
      icon: FiUsers,
      label: 'Total Applications',
      value: applications.length,
      color: 'bg-green-500',
      trend: '+23%'
    },
    {
      icon: FiTrendingUp,
      label: 'Active Listings',
      value: jobs.filter(j => new Date(j.deadline) > new Date()).length,
      color: 'bg-purple-500',
      trend: '+8%'
    },
    {
      icon: FiClock,
      label: 'Pending Review',
      value: applications.filter(a => a.status === 'Applied').length,
      color: 'bg-yellow-500',
      trend: '-5%'
    }
  ];

  const recentApplications = applications.slice(0, 5);

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Admin Dashboard 👨‍💼
        </h1>
        <p className="text-indigo-100 text-lg">
          Manage jobs, applications, and recruitment workflow
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all transform hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className={`text-sm font-semibold ${
                stat.trend.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {stat.value}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Jobs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Recent Job Postings
            </h2>
            <button
              onClick={() => window.location.href = '/admin/jobs'}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {jobs.slice(0, 5).map((job) => (
              <div
                key={job.id}
                className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {job.company} • {job.type}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {new Date(job.postedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Recent Applications
            </h2>
            <button
              onClick={() => window.location.href = '/admin/applications'}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              View All
            </button>
          </div>
          {recentApplications.length > 0 ? (
            <div className="space-y-3">
              {recentApplications.map((app) => (
                <div
                  key={app.id}
                  className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {app.jobTitle}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {app.company}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      app.status === 'Applied' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                      app.status === 'Selected' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                      'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <FiUsers className="w-16 h-16 mx-auto mb-3 opacity-50" />
              <p>No applications yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={() => window.location.href = '/admin/add-job'}
            className="p-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all transform hover:scale-105 text-left"
          >
            <FiBriefcase className="w-6 h-6 mb-2" />
            <p className="font-semibold">Post New Job</p>
            <p className="text-sm text-blue-100">Create a new job listing</p>
          </button>
          <button
            onClick={() => window.location.href = '/admin/jobs'}
            className="p-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all transform hover:scale-105 text-left"
          >
            <FiTrendingUp className="w-6 h-6 mb-2" />
            <p className="font-semibold">Manage Jobs</p>
            <p className="text-sm text-purple-100">Edit or remove jobs</p>
          </button>
          <button
            onClick={() => window.location.href = '/admin/applications'}
            className="p-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 transition-all transform hover:scale-105 text-left"
          >
            <FiUsers className="w-6 h-6 mb-2" />
            <p className="font-semibold">View Applications</p>
            <p className="text-sm text-green-100">Review candidates</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
