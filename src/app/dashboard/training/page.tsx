"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  AcademicCapIcon, 
  ChevronRightIcon, 
  PlayCircleIcon,
  CheckCircleIcon,
  LockClosedIcon,
  StarIcon,
  ClockIcon
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import Card from "@/components/Card";
import Button from "@/components/Button";

// Mock data for training modules
const TRAINING_MODULES = [
  {
    id: "tm1",
    title: "KerjaMate Onboarding",
    description: "Learn the basics of being a KerjaMate and how to use the platform",
    lessons: 5,
    duration: "45 min",
    completed: true,
    image: "/images/onboarding.jpg",
    level: "Beginner",
    category: "Essential"
  },
  {
    id: "tm2",
    title: "Customer Service Excellence",
    description: "Provide top-notch service and handle difficult situations",
    lessons: 8,
    duration: "1.5 hours",
    completed: true,
    image: "/images/customer-service.jpg",
    level: "Intermediate",
    category: "Essential"
  },
  {
    id: "tm3",
    title: "Home Cleaning Professional",
    description: "Master professional cleaning techniques and best practices",
    lessons: 10,
    duration: "2 hours",
    completed: false,
    progress: 60,
    image: "/images/cleaning.jpg",
    level: "Intermediate",
    category: "Skills"
  },
  {
    id: "tm4",
    title: "Handyman Basics",
    description: "Learn essential repair and maintenance skills",
    lessons: 12,
    duration: "3 hours",
    completed: false,
    progress: 25,
    image: "/images/handyman.jpg",
    level: "Intermediate",
    category: "Skills"
  },
  {
    id: "tm5",
    title: "Digital Marketing for KerjaMates",
    description: "Promote your services and build your personal brand",
    lessons: 6,
    duration: "1.5 hours",
    completed: false,
    locked: true,
    image: "/images/marketing.jpg",
    level: "Advanced",
    category: "Growth"
  },
  {
    id: "tm6",
    title: "Financial Management",
    description: "Track your earnings, manage taxes, and plan for growth",
    lessons: 8,
    duration: "2 hours",
    completed: false,
    locked: true,
    image: "/images/finance.jpg",
    level: "Advanced",
    category: "Growth"
  }
];

// Mock certification data
const CERTIFICATIONS = [
  {
    id: "cert1",
    name: "Certified KerjaMate",
    issueDate: "May 15, 2023",
    expiry: "May 15, 2024",
    status: "active"
  },
  {
    id: "cert2",
    name: "Professional Cleaning Specialist",
    issueDate: "June 20, 2023",
    expiry: "June 20, 2024",
    status: "active"
  }
];

export default function TrainingPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter modules based on active tab and search query
  const filteredModules = TRAINING_MODULES.filter(module => {
    const matchesTab = activeTab === "all" || module.category.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });
  
  // Calculate completion stats
  const completedModules = TRAINING_MODULES.filter(module => module.completed).length;
  const inProgressModules = TRAINING_MODULES.filter(module => !module.completed && !module.locked).length;
  const completionPercentage = Math.round((completedModules / TRAINING_MODULES.length) * 100);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center text-sm font-medium">
            <Link href="/dashboard" className="text-gray-500 hover:text-primary transition-colors">
              Dashboard
            </Link>
            <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-400" />
            <span className="text-primary">Training Modules</span>
          </nav>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Training <span className="highlight-text">Modules</span>
          </h1>
          <p className="text-lg text-gray-600">
            Enhance your skills and earn certifications to boost your profile
          </p>
        </div>
        
        {/* Overview Card */}
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl overflow-hidden mb-10 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="p-8 md:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-4">Your Learning Journey</h2>
              <div className="flex items-center mb-6">
                <div className="h-3 flex-grow bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full" 
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
                <p className="ml-3 text-white font-medium">{completionPercentage}%</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-sm text-white/80">Completed</p>
                  <p className="text-2xl font-bold text-white">{completedModules}</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-sm text-white/80">In Progress</p>
                  <p className="text-2xl font-bold text-white">{inProgressModules}</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <Button 
                  variant="light" 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 transition-colors"
                >
                  Continue Learning
                </Button>
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="text-white border border-white/30 hover:bg-white/10 transition-colors"
                >
                  View Certificates
                </Button>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="p-8 text-center">
                  <AcademicCapIcon className="h-16 w-16 mx-auto text-white mb-4" />
                  <p className="text-xl font-bold text-white">Become a Pro KerjaMate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Search and Tabs */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          
          <div className="flex bg-white rounded-full shadow-sm p-1 border border-gray-100">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 text-sm rounded-full ${
                activeTab === "all" 
                  ? "bg-gradient-to-r from-[#FF3B30] to-[#FF5E54] text-white" 
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("essential")}
              className={`px-4 py-2 text-sm rounded-full ${
                activeTab === "essential" 
                  ? "bg-gradient-to-r from-[#FF3B30] to-[#FF5E54] text-white" 
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              Essential
            </button>
            <button
              onClick={() => setActiveTab("skills")}
              className={`px-4 py-2 text-sm rounded-full ${
                activeTab === "skills" 
                  ? "bg-gradient-to-r from-[#FF3B30] to-[#FF5E54] text-white" 
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              Skills
            </button>
            <button
              onClick={() => setActiveTab("growth")}
              className={`px-4 py-2 text-sm rounded-full ${
                activeTab === "growth" 
                  ? "bg-gradient-to-r from-[#FF3B30] to-[#FF5E54] text-white" 
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              Growth
            </button>
          </div>
        </div>
        
        {/* Training Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredModules.map((module) => (
            <Card key={module.id} className="overflow-hidden h-full flex flex-col">
              <div className="h-48 relative">
                {/* Placeholder for module image - in production would use next/image with actual images */}
                <div 
                  className={`w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 ${
                    module.locked ? 'opacity-50' : ''
                  }`}
                >
                  {module.category === "Essential" && (
                    <AcademicCapIcon className="h-12 w-12" />
                  )}
                  {module.category === "Skills" && (
                    <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                  {module.category === "Growth" && (
                    <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  )}
                </div>
                
                {/* Level Badge */}
                <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-800">
                  {module.level}
                </div>
                
                {/* Status indicator */}
                {module.completed && (
                  <div className="absolute top-4 right-4 h-8 w-8 bg-success rounded-full flex items-center justify-center">
                    <CheckCircleIcon className="h-6 w-6 text-white" />
                  </div>
                )}
                
                {module.locked && (
                  <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm flex flex-col items-center justify-center">
                    <LockClosedIcon className="h-12 w-12 text-white mb-2" />
                    <p className="text-white font-medium">Premium Content</p>
                  </div>
                )}
                
                {!module.completed && !module.locked && (
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-200">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${module.progress || 0}%` }}
                    ></div>
                  </div>
                )}
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                  {!module.locked && (
                    <div className="flex ml-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        module.completed ? 
                          <StarIconSolid key={star} className="h-4 w-4 text-yellow-400" /> :
                          <StarIcon key={star} className="h-4 w-4 text-gray-300" />
                      ))}
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-4 flex-grow">{module.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    {module.lessons} lessons
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {module.duration}
                  </div>
                </div>
                
                <Button 
                  variant={module.locked ? "ghost" : module.completed ? "outline" : "primary"} 
                  className={`w-full justify-center ${module.locked ? "border border-gray-200 text-gray-400" : ""}`}
                  disabled={module.locked}
                >
                  {module.locked ? "Unlock" : module.completed ? "Review" : module.progress ? "Continue" : "Start Learning"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Certifications Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Certifications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert) => (
              <Card key={cert.id} className="p-6 border border-gray-100">
                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{cert.name}</h3>
                    <p className="text-sm text-gray-500">Issued: {cert.issueDate}</p>
                    <p className="text-sm text-gray-500">Expires: {cert.expiry}</p>
                    <span className={`mt-2 inline-block px-3 py-1 text-xs font-medium rounded-full ${
                      cert.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {cert.status === "active" ? "Active" : "Expired"}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
            
            {/* Add more certifications card */}
            <Card className="p-6 border border-dashed border-gray-200 bg-white/50 flex items-center justify-center">
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Get more certifications</h3>
                <p className="text-sm text-gray-500 mb-4">Complete training modules to earn certifications</p>
                <Button variant="outline" size="sm">
                  Explore Modules
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 