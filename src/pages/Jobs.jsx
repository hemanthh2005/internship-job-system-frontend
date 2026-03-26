import { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiBriefcase } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import JobCard from '../components/JobCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Jobs = () => {
  const { jobs, applyToJob } = useApp();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterSkill, setFilterSkill] = useState('all');
  const [filteredJobs, setFilteredJobs] = useState([]);

  // Extract unique job types and skills
  const jobTypes = ['all', ...new Set(jobs.map(job => job.type))];
  const allSkills = ['all', ...new Set(jobs.flatMap(job => job.skills))];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    let result = jobs;

    // Search filter
    if (searchTerm) {
      result = result.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (filterType !== 'all') {
      result = result.filter(job => job.type === filterType);
    }

    // Skill filter
    if (filterSkill !== 'all') {
      result = result.filter(job =>
        job.skills.some(skill => skill.toLowerCase() === filterSkill.toLowerCase())
      );
    }

    setFilteredJobs(result);
  }, [searchTerm, filterType, filterSkill, jobs]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <FiBriefcase className="w-8 h-8" />
          <h1 className="text-3xl md:text-4xl font-bold">Browse All Jobs</h1>
        </div>
        <p className="text-blue-100 text-lg">
          Explore {jobs.length} exciting opportunities across various companies
        </p>
      </div>

      {/* Filters Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Jobs
            </label>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Job title, company, location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Job Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Job Type
            </label>
            <div className="relative">
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white appearance-none"
              >
                {jobTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Skill Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filter by Skill
            </label>
            <div className="relative">
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterSkill}
                onChange={(e) => setFilterSkill(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white appearance-none"
              >
                {allSkills.slice(0, 20).map(skill => (
                  <option key={skill} value={skill}>
                    {skill === 'all' ? 'All Skills' : skill}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters Info */}
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium">Showing {filteredJobs.length} jobs</span>
          {(searchTerm || filterType !== 'all' || filterSkill !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterType('all');
                setFilterSkill('all');
              }}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              showMatch={true}
              onApply={applyToJob}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <FiBriefcase className="w-20 h-20 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No jobs found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Try adjusting your filters or search terms
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterType('all');
              setFilterSkill('all');
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Jobs;
