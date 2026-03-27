import { createContext, useContext, useState, useEffect } from 'react';
import { jobsData } from '../data/jobs';
import { studentProfile } from '../data/student';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // User role (student or admin). Stored in localStorage for persistence.
  const [userRoleState, setUserRoleState] = useState(() => {
    const savedRole = localStorage.getItem('jobconnect_role');
    return savedRole ? savedRole : null;
  });

  const setUserRole = (role) => {
    setUserRoleState(role);
    if (role) localStorage.setItem('jobconnect_role', role);
    else localStorage.removeItem('jobconnect_role');
  };

  // Student data
  const [student, setStudent] = useState(studentProfile);

  // Jobs data
  const [jobs, setJobs] = useState(jobsData);

  // Applications data
  const [applications, setApplications] = useState([]);

  // Notifications
  const [notifications, setNotifications] = useState([]);

  // Update dark mode in localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Update student skills
  const updateStudentSkills = (newSkills) => {
    setStudent(prev => ({
      ...prev,
      skills: newSkills,
      resumeUploaded: true
    }));
  };

  // Apply to a job
  const applyToJob = (jobId) => {
    const job = jobs.find(j => j.id === jobId);
    const alreadyApplied = applications.some(app => app.jobId === jobId);

    if (alreadyApplied) {
      addNotification('You have already applied to this job!', 'warning');
      return false;
    }

    const newApplication = {
      id: Date.now(),
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Applied'
    };

    setApplications(prev => [...prev, newApplication]);
    addNotification(`Successfully applied to ${job.title}!`, 'success');
    return true;
  };

  // Update application status (admin)
  const updateApplicationStatus = (appId, newStatus) => {
    if (userRoleState !== 'admin') {
      addNotification('Only admin can update application status.', 'warning');
      return false;
    }

    setApplications(prev =>
      prev.map(app =>
        app.id === appId ? { ...app, status: newStatus } : app
      )
    );
    addNotification(`Application status updated to ${newStatus}`, 'success');
    return true;
  };

  // Add a new job (admin)
  const addJob = (jobData) => {
    const newJob = {
      ...jobData,
      id: Date.now(),
      postedDate: new Date().toISOString().split('T')[0]
    };
    setJobs(prev => [newJob, ...prev]);
    addNotification('Job posted successfully!', 'success');
    return newJob;
  };

  // Delete a job (admin)
  const deleteJob = (jobId) => {
    setJobs(prev => prev.filter(job => job.id !== jobId));
    addNotification('Job deleted successfully!', 'success');
  };

  // Update a job (admin)
  const updateJob = (jobId, updatedData) => {
    setJobs(prev =>
      prev.map(job =>
        job.id === jobId ? { ...job, ...updatedData } : job
      )
    );
    addNotification('Job updated successfully!', 'success');
  };

  // Calculate match percentage
  const calculateMatchPercentage = (jobSkills) => {
    if (!jobSkills || jobSkills.length === 0) return 0;
    const matchingSkills = jobSkills.filter(skill =>
      student.skills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
    );
    return Math.round((matchingSkills.length / jobSkills.length) * 100);
  };

  // Get recommended jobs
  const getRecommendedJobs = () => {
    return jobs
      .map(job => ({
        ...job,
        matchPercentage: calculateMatchPercentage(job.skills)
      }))
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
      .slice(0, 6);
  };

  // Get skill gap for a job
  const getSkillGap = (jobSkills) => {
    return jobSkills.filter(
      skill => !student.skills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
    );
  };

  // Add notification
  const addNotification = (message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    setNotifications(prev => [...prev, notification]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(notification.id);
    }, 5000);
  };

  // Remove notification
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const value = {
    darkMode,
    toggleDarkMode,
    userRole: userRoleState,
    setUserRole,
    student,
    setStudent,
    updateStudentSkills,
    jobs,
    addJob,
    deleteJob,
    updateJob,
    applications,
    applyToJob,
    updateApplicationStatus,
    calculateMatchPercentage,
    getRecommendedJobs,
    getSkillGap,
    notifications,
    addNotification,
    removeNotification
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
