import { useState, useEffect } from 'react';
import { FiTrendingUp, FiBriefcase, FiCheckCircle, FiClock } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import JobCard from '../components/JobCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const { student, getRecommendedJobs, applyToJob, applications } = useApp();
  const [loading, setLoading] = useState(true);
  const [recommendedJobs, setRecommendedJobs] = useState([]);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setRecommendedJobs(getRecommendedJobs());
      setLoading(false);
    }, 1000);
  }, []);

  const stats = [
    {
      icon: FiBriefcase,
      label: 'Jobs Applied',
      value: applications.length,
      color: 'bg-blue-500'
    },
    {
      icon: FiCheckCircle,
      label: 'Profile Complete',
      value: `${student.profileComplete}%`,
      color: 'bg-green-500'
    },
    {
      icon: FiTrendingUp,
      label: 'Skills Added',
      value: student.skills.length,
      color: 'bg-purple-500'
    },
    {
      icon: FiClock,
      label: 'Pending Actions',
      value: student.resumeUploaded ? 0 : 1,
      color: 'bg-yellow-500'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Welcome back, {student.name}! 👋
        </h1>
        <p className="text-blue-100 text-lg">
          {student.college} • {student.degree}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
            CGPA: {student.cgpa}
          </span>
          <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
            Graduating {student.graduationYear}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all transform hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Resume Upload Alert */}
      {!student.resumeUploaded && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-lg animate-slide-up">
          <div className="flex items-start gap-3">
            <FiClock className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">
                Action Required: Upload Your Resume
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-400 mb-2">
                Upload your resume to get better job recommendations and improve your match score.
              </p>
              <button
                onClick={() => window.location.href = '/upload-resume'}
                className="text-sm font-medium text-yellow-800 dark:text-yellow-300 hover:underline"
              >
                Upload Resume →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recommended Jobs */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FiTrendingUp className="text-blue-600 dark:text-blue-400" />
              Top Recommended Jobs
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Based on your skills and profile
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              showMatch={true}
              onApply={applyToJob}
            />
          ))}
        </div>

        {recommendedJobs.length === 0 && (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <FiBriefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              No recommendations yet. Upload your resume to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
