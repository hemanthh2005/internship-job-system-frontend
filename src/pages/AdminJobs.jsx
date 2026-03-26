import { useState } from 'react';
import { FiBriefcase, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import SkillTag from '../components/SkillTag';

const AdminJobs = () => {
  const { jobs, deleteJob } = useApp();
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const handleDelete = (jobId) => {
    deleteJob(jobId);
    setShowDeleteConfirm(null);
    setSelectedJob(null);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <FiBriefcase className="w-8 h-8" />
          <h1 className="text-3xl md:text-4xl font-bold">Manage Jobs</h1>
        </div>
        <p className="text-purple-100 text-lg">
          View, edit, and manage all job postings
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {jobs.length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Jobs</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {jobs.filter(j => j.type === 'Internship').length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Internships</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {jobs.filter(j => j.type === 'Full-time').length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Full-time Jobs</p>
        </div>
      </div>

      {/* Jobs List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Job Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Skills Required
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Posted Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {jobs.map((job) => (
                <tr
                  key={job.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {job.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {job.company}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      job.type === 'Internship'
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                    }`}>
                      {job.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {job.skills.slice(0, 3).map((skill, idx) => (
                        <SkillTag key={idx} skill={skill} variant="gray" />
                      ))}
                      {job.skills.length > 3 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                          +{job.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {new Date(job.postedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedJob(job)}
                        className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <FiEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(job.id)}
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Delete Job"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Job Details
              </h2>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedJob.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{selectedJob.company}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Location:</span>
                  <p className="text-gray-600 dark:text-gray-400">{selectedJob.location}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Type:</span>
                  <p className="text-gray-600 dark:text-gray-400">{selectedJob.type}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Duration:</span>
                  <p className="text-gray-600 dark:text-gray-400">{selectedJob.duration}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Stipend:</span>
                  <p className="text-gray-600 dark:text-gray-400">{selectedJob.stipend}</p>
                </div>
              </div>
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300 block mb-2">Skills:</span>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map((skill, idx) => (
                    <SkillTag key={idx} skill={skill} variant="default" />
                  ))}
                </div>
              </div>
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300 block mb-2">Description:</span>
                <p className="text-gray-600 dark:text-gray-400">{selectedJob.description}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300 block mb-2">Requirements:</span>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  {selectedJob.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this job? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminJobs;
