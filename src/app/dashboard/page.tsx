"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import Card from "@/components/Card";
import Button from "@/components/Button";
import JobCard from "@/components/JobCard";
import ProfileAvatar from "@/components/ProfileAvatar";
import { 
  ClockIcon, 
  MapPinIcon, 
  CurrencyDollarIcon,
  BriefcaseIcon,
  StarIcon,
  CheckBadgeIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const router = useRouter();
  const { 
    currentUser,
    kerjaMates, 
    jobs,
    filterJobsByStatus,
    resetJobsFilter,
    filteredJobs,
    getKerjaMateById
  } = useStore();
  
  // If no user is logged in, redirect to login
  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser, router]);
  
  // Find the KerjaMate profile that matches the current user
  // For this demo app, we'll check if the current user name matches a KerjaMate name
  // In a real app, you would have a direct relationship between users and KerjaMate profiles
  const userKerjaMate = currentUser 
    ? kerjaMates.find(km => km.name === currentUser.name) || kerjaMates[0]
    : kerjaMates[0];
  
  const [activeTab, setActiveTab] = useState<'jobs' | 'earnings' | 'training'>('jobs');
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'assigned' | 'completed'>('all');
  
  // Handle status filter change
  const handleStatusFilterChange = (status: 'all' | 'open' | 'assigned' | 'completed') => {
    setStatusFilter(status);
    
    if (status === 'all') {
      resetJobsFilter();
    } else {
      filterJobsByStatus(status);
    }
  };
  
  // Calculate earnings
  const completedJobs = jobs.filter(job => job.status === 'completed' && job.kerjaMateId === userKerjaMate.id);
  const totalEarnings = completedJobs.reduce((total, job) => total + job.budget, 0);
  const todayEarnings = completedJobs
    .filter(job => new Date(job.dateNeeded).toDateString() === new Date().toDateString())
    .reduce((total, job) => total + job.budget, 0);
  
  // Dummy training modules
  const trainingModules = [
    {
      id: "train-001",
      title: "Customer Service Excellence",
      description: "Learn how to provide exceptional service and handle client interactions professionally.",
      progress: 100,
      completed: true,
      duration: "2 hours"
    },
    {
      id: "train-002",
      title: "Safety Procedures",
      description: "Essential safety protocols for different types of jobs and situations.",
      progress: 75,
      completed: false,
      duration: "1.5 hours"
    },
    {
      id: "train-003",
      title: "Time Management",
      description: "Strategies to optimize your schedule and complete jobs efficiently.",
      progress: 50,
      completed: false,
      duration: "1 hour"
    },
    {
      id: "train-004",
      title: "Cleaning Fundamentals",
      description: "Professional techniques for residential and commercial cleaning.",
      progress: 25,
      completed: false,
      duration: "3 hours"
    }
  ];
  
  if (!currentUser) {
    return null;
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* User Profile Summary */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden">
              <ProfileAvatar
                src={currentUser.avatar}
                alt={currentUser.name}
                size={128}
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{currentUser.name}</h1>
                {userKerjaMate.verified && (
                  <CheckBadgeIcon className="h-6 w-6 text-blue-500 ml-2" aria-label="Verified" />
                )}
              </div>
              
              <div className="flex items-center mt-2">
                <StarIcon className="h-5 w-5 text-yellow-500 mr-1" />
                <span className="font-medium text-gray-800">{userKerjaMate.rating}</span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-gray-600">{userKerjaMate.completedJobs} jobs completed</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {userKerjaMate.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium inline-flex items-center">
                <span className={`h-2 w-2 rounded-full mr-2 ${userKerjaMate.availability ? 'bg-green-500' : 'bg-red-500'}`}></span>
                {userKerjaMate.availability ? 'Available' : 'Unavailable'}
              </div>
              
              <div className="mt-4">
                <Button
                  variant={userKerjaMate.availability ? "outline" : "primary"}
                  onClick={() => {
                    // This would toggle availability in a real application
                    alert(`Status would change to: ${userKerjaMate.availability ? 'Unavailable' : 'Available'}`);
                  }}
                >
                  Set as {userKerjaMate.availability ? 'Unavailable' : 'Available'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-start">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <BriefcaseIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Available Jobs</p>
              <p className="text-2xl font-bold">{jobs.filter(job => job.status === 'open').length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-start">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
              <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Today's Earnings</p>
              <p className="text-2xl font-bold">Rp {todayEarnings.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-start">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
              <StarIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Rating</p>
              <p className="text-2xl font-bold">{userKerjaMate.rating}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-start">
            <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
              <AcademicCapIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Training Completion</p>
              <p className="text-2xl font-bold">
                {Math.round(
                  (trainingModules.filter(module => module.completed).length / trainingModules.length) * 100
                )}%
              </p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'jobs' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('jobs')}
            >
              Jobs
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'earnings' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('earnings')}
            >
              Earnings
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'training' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('training')}
            >
              Training
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {/* Jobs Tab */}
          {activeTab === 'jobs' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Available Jobs</h2>
                
                <div className="flex space-x-2">
                  <Button 
                    variant={statusFilter === 'all' ? 'primary' : 'outline'} 
                    size="sm"
                    onClick={() => handleStatusFilterChange('all')}
                  >
                    All
                  </Button>
                  <Button 
                    variant={statusFilter === 'open' ? 'primary' : 'outline'} 
                    size="sm"
                    onClick={() => handleStatusFilterChange('open')}
                  >
                    Open
                  </Button>
                  <Button 
                    variant={statusFilter === 'assigned' ? 'primary' : 'outline'} 
                    size="sm"
                    onClick={() => handleStatusFilterChange('assigned')}
                  >
                    Assigned
                  </Button>
                  <Button 
                    variant={statusFilter === 'completed' ? 'primary' : 'outline'} 
                    size="sm"
                    onClick={() => handleStatusFilterChange('completed')}
                  >
                    Completed
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map(job => (
                    <JobCard 
                      key={job.id} 
                      job={job} 
                      showApplyButton={job.status === 'open'} 
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No jobs found matching your criteria.</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Earnings Tab */}
          {activeTab === 'earnings' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Earnings Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="p-4 bg-green-50">
                  <p className="text-sm text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">Rp {totalEarnings.toLocaleString()}</p>
                </Card>
                
                <Card className="p-4 bg-blue-50">
                  <p className="text-sm text-gray-600">Jobs Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{completedJobs.length}</p>
                </Card>
                
                <Card className="p-4 bg-purple-50">
                  <p className="text-sm text-gray-600">Average Per Job</p>
                  <p className="text-2xl font-bold text-gray-900">
                    Rp {completedJobs.length > 0 
                      ? Math.round(totalEarnings / completedJobs.length).toLocaleString() 
                      : 0}
                  </p>
                </Card>
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Payments</h3>
              
              {completedJobs.length > 0 ? (
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Job
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {completedJobs.map(job => (
                        <tr key={job.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{job.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{job.dateNeeded}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">Rp {job.budget.toLocaleString()}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No completed jobs yet.</p>
                </div>
              )}
            </div>
          )}
          
          {/* Training Tab */}
          {activeTab === 'training' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Training Modules</h2>
                
                <Link href="/consul">
                  <Button 
                    variant="outline" 
                    className="flex items-center"
                  >
                    <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                    Ask a Mentor
                  </Button>
                </Link>
              </div>
              
              <div className="space-y-4">
                {trainingModules.map(module => (
                  <Card key={module.id} className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">{module.title}</h3>
                        <p className="text-gray-600 mb-4">{module.description}</p>
                        
                        <div className="flex items-center text-sm text-gray-500">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          <span>{module.duration}</span>
                        </div>
                      </div>
                      
                      {module.completed ? (
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          Completed
                        </div>
                      ) : (
                        <Button size="sm">Continue</Button>
                      )}
                    </div>
                    
                    <div className="mt-4">
                      <div className="bg-gray-200 h-2 rounded-full">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${module.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-right text-xs text-gray-500 mt-1">{module.progress}% complete</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 