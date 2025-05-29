"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  AcademicCapIcon, 
  VideoCameraIcon, 
  BookOpenIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ChevronRightIcon,
  StarIcon,
  ClockIcon
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { useStore } from "@/store/useStore";

// Sample training courses data
const TRAINING_COURSES = [
  {
    id: "course-001",
    title: "Customer Service Excellence",
    instructor: "Sarah Johnson",
    duration: "4 hours",
    level: "Beginner",
    category: "Soft Skills",
    rating: 4.8,
    reviewCount: 124,
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    description: "Learn the fundamentals of exceptional customer service and how to handle difficult situations with professionalism."
  },
  {
    id: "course-002",
    title: "Basic Office Software Skills",
    instructor: "David Chen",
    duration: "6 hours",
    level: "Beginner",
    category: "Technical Skills",
    rating: 4.6,
    reviewCount: 98,
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    description: "Master the essential office software tools including Word, Excel, and PowerPoint to boost your productivity."
  },
  {
    id: "course-003",
    title: "Professional Communication",
    instructor: "Maya Putri",
    duration: "3 hours",
    level: "Beginner",
    category: "Soft Skills",
    rating: 4.9,
    reviewCount: 156,
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    description: "Improve your verbal and written communication skills for the workplace with practical exercises and feedback."
  },
  {
    id: "course-004",
    title: "Time Management Mastery",
    instructor: "Budi Santoso",
    duration: "2 hours",
    level: "Intermediate",
    category: "Productivity",
    rating: 4.7,
    reviewCount: 87,
    image: "https://randomuser.me/api/portraits/men/36.jpg",
    description: "Learn proven techniques to manage your time effectively, set priorities, and increase your productivity."
  },
  {
    id: "course-005",
    title: "Basic Accounting Principles",
    instructor: "Lisa Wang",
    duration: "5 hours",
    level: "Beginner",
    category: "Finance",
    rating: 4.5,
    reviewCount: 62,
    image: "https://randomuser.me/api/portraits/women/15.jpg",
    description: "Understand the fundamentals of accounting, financial statements, and basic bookkeeping for non-accountants."
  },
  {
    id: "course-006",
    title: "Sales Techniques for Beginners",
    instructor: "Rahmat Hidayat",
    duration: "4 hours",
    level: "Beginner",
    category: "Sales",
    rating: 4.7,
    reviewCount: 108,
    image: "https://randomuser.me/api/portraits/men/25.jpg",
    description: "Learn effective sales techniques, objection handling, and closing strategies to boost your confidence and results."
  }
];

// Sample mentors data
const MENTORS = [
  {
    id: "mentor-001",
    name: "Dr. Siti Nuraini",
    specialty: "Career Development",
    experience: "15+ years",
    availability: "Mon, Wed, Fri",
    rating: 4.9,
    reviewCount: 78,
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Career counselor specializing in helping individuals identify and achieve their professional goals."
  },
  {
    id: "mentor-002",
    name: "Ahmad Rizal, MBA",
    specialty: "Business Management",
    experience: "12+ years",
    availability: "Tue, Thu",
    rating: 4.8,
    reviewCount: 65,
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    bio: "Business consultant with experience in helping small businesses grow and optimize operations."
  },
  {
    id: "mentor-003",
    name: "Indah Wijaya",
    specialty: "Digital Marketing",
    experience: "8+ years",
    availability: "Mon-Fri",
    rating: 4.7,
    reviewCount: 93,
    avatar: "https://randomuser.me/api/portraits/women/42.jpg",
    bio: "Digital marketing expert who helps individuals build their online presence and personal brand."
  }
];

// Sample badges/certifications
const BADGES = [
  {
    id: "badge-001",
    title: "Communication Proficient",
    icon: "/icons/communication.png",
    description: "Awarded for excellence in professional communication skills",
    earned: true,
    progress: 100
  },
  {
    id: "badge-002",
    title: "Technical Fundamentals",
    icon: "/icons/technical.png",
    description: "Recognizes mastery of basic technical and computer skills",
    earned: true,
    progress: 100
  },
  {
    id: "badge-003",
    title: "Customer Service Expert",
    icon: "/icons/customer-service.png",
    description: "Demonstrates exceptional customer service abilities",
    earned: false,
    progress: 75
  },
  {
    id: "badge-004",
    title: "Financial Literacy",
    icon: "/icons/finance.png",
    description: "Shows understanding of basic financial and accounting concepts",
    earned: false,
    progress: 40
  }
];

export default function TrainingCenterPage() {
  const router = useRouter();
  const { currentUser } = useStore();
  
  const [category, setCategory] = useState("all");
  
  // Filter courses based on category
  const filteredCourses = category === "all" 
    ? TRAINING_COURSES 
    : TRAINING_COURSES.filter(course => course.category.toLowerCase() === category.toLowerCase());
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Training <span className="text-primary">Center</span>
          </h1>
          <p className="text-lg text-gray-600">
            Develop new skills and earn certifications to advance your career
          </p>
        </div>
        
        {/* Your Badges Section */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 mb-10">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="lg:w-2/3">
              <h2 className="text-2xl font-bold mb-4">Your Progress Badges</h2>
              <p className="text-gray-700 mb-6">
                Complete courses and earn badges to showcase your skills to potential employers
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {BADGES.map(badge => (
                  <div 
                    key={badge.id} 
                    className={`bg-white rounded-xl p-4 text-center shadow-sm border ${
                      badge.earned ? 'border-green-300' : 'border-gray-200'
                    }`}
                  >
                    <div className="relative mx-auto mb-3">
                      <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                        {/* Use a fallback icon if image doesn't exist */}
                        <AcademicCapIcon className="h-8 w-8 text-gray-400" />
                      </div>
                      {badge.earned && (
                        <div className="absolute -right-1 -bottom-1 bg-green-500 text-white p-1 rounded-full">
                          <StarSolidIcon className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{badge.title}</h3>
                    
                    {!badge.earned && (
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${badge.progress}%` }}
                        ></div>
                      </div>
                    )}
                    
                    <p className="text-xs text-gray-500 mt-1">
                      {badge.earned ? 'Earned' : `${badge.progress}% Complete`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/3 bg-white p-5 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-semibold text-lg mb-3">Your Next Steps</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                    <span className="text-xs font-medium text-primary">1</span>
                  </div>
                  <p className="ml-3 text-sm text-gray-600">
                    Complete "Customer Service Excellence" course to earn your next badge
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                    <span className="text-xs font-medium text-primary">2</span>
                  </div>
                  <p className="ml-3 text-sm text-gray-600">
                    Schedule a session with a mentor to discuss your career goals
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                    <span className="text-xs font-medium text-primary">3</span>
                  </div>
                  <p className="ml-3 text-sm text-gray-600">
                    Update your profile with your new skills and certifications
                  </p>
                </li>
              </ul>
              <Button className="w-full mt-4">
                View Detailed Progress
              </Button>
            </div>
          </div>
        </div>
        
        {/* Training Courses Section */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-2xl font-bold mb-2 sm:mb-0">Available Courses</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setCategory("all")}
                className={`px-3 py-1 rounded-full text-sm ${
                  category === "all" 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setCategory("soft skills")}
                className={`px-3 py-1 rounded-full text-sm ${
                  category === "soft skills" 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Soft Skills
              </button>
              <button
                onClick={() => setCategory("technical skills")}
                className={`px-3 py-1 rounded-full text-sm ${
                  category === "technical skills" 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Technical
              </button>
              <button
                onClick={() => setCategory("productivity")}
                className={`px-3 py-1 rounded-full text-sm ${
                  category === "productivity" 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Productivity
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-all">
                <div className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image 
                        src={course.image} 
                        alt={course.instructor} 
                        width={48} 
                        height={48}
                        className="object-cover h-full w-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{course.instructor}</h3>
                      <p className="text-sm text-gray-500">{course.category}</p>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <ClockIcon className="h-3 w-3 mr-1" />
                      {course.duration}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {course.level}
                    </span>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarSolidIcon 
                          key={i} 
                          className={`h-4 w-4 ${
                            i < Math.floor(course.rating) 
                              ? 'text-yellow-400' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <p className="ml-2 text-sm text-gray-600">
                      {course.rating} ({course.reviewCount} reviews)
                    </p>
                  </div>
                  
                  <Link href={`/training-center/course/${course.id}`}>
                    <Button className="w-full flex items-center justify-center">
                      Start Learning
                      <ChevronRightIcon className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Mentors Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Connect with Mentors</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MENTORS.map(mentor => (
              <Card key={mentor.id} className="overflow-hidden hover:shadow-lg transition-all">
                <div className="p-6">
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-100 mb-3">
                      <Image 
                        src={mentor.avatar} 
                        alt={mentor.name} 
                        width={80} 
                        height={80}
                        className="object-cover h-full w-full"
                      />
                    </div>
                    <h3 className="font-semibold text-lg">{mentor.name}</h3>
                    <p className="text-primary font-medium">{mentor.specialty}</p>
                    
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <StarSolidIcon 
                          key={i} 
                          className={`h-4 w-4 ${
                            i < Math.floor(mentor.rating) 
                              ? 'text-yellow-400' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                      <p className="ml-2 text-xs text-gray-600">
                        ({mentor.reviewCount})
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Experience:</span>
                      <span className="font-medium">{mentor.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Availability:</span>
                      <span className="font-medium">{mentor.availability}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{mentor.bio}</p>
                  
                  <Link href={`/training-center/mentor/${mentor.id}`}>
                    <Button variant="outline" className="w-full">
                      Schedule Session
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 