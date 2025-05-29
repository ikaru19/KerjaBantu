"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  MagnifyingGlassIcon, 
  BriefcaseIcon, 
  BuildingOfficeIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  ClockIcon,
  ChevronRightIcon,
  ArrowPathIcon,
  AdjustmentsHorizontalIcon
} from "@heroicons/react/24/outline";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { useStore } from "@/store/useStore";

// Sample formal jobs data
const FORMAL_JOBS = [
  {
    id: "formal-001",
    title: "Administrative Assistant",
    company: "PT Global Solutions",
    location: "Jakarta Selatan",
    salary: "Rp 5.000.000 - 7.000.000 / month",
    type: "Full-time",
    posted: "2 days ago",
    logo: "https://randomuser.me/api/portraits/men/1.jpg",
    description: "We are looking for an Administrative Assistant to join our dynamic team. The ideal candidate will have excellent organizational skills and attention to detail."
  },
  {
    id: "formal-002",
    title: "Marketing Specialist",
    company: "Indotech Systems",
    location: "Jakarta Pusat",
    salary: "Rp 8.000.000 - 12.000.000 / month",
    type: "Full-time",
    posted: "1 week ago",
    logo: "https://randomuser.me/api/portraits/women/2.jpg",
    description: "Indotech Systems is seeking a Marketing Specialist to help develop and implement marketing strategies for our products and services."
  },
  {
    id: "formal-003",
    title: "Customer Service Representative",
    company: "MegaMart Indonesia",
    location: "Jakarta Barat",
    salary: "Rp 4.500.000 - 6.000.000 / month",
    type: "Full-time",
    posted: "3 days ago",
    logo: "https://randomuser.me/api/portraits/men/3.jpg",
    description: "MegaMart is looking for Customer Service Representatives to provide exceptional service to our customers via phone, email, and chat."
  },
  {
    id: "formal-004",
    title: "Accounting Staff",
    company: "Financial Partners",
    location: "Jakarta Selatan",
    salary: "Rp 6.000.000 - 8.500.000 / month",
    type: "Full-time",
    posted: "1 day ago",
    logo: "https://randomuser.me/api/portraits/women/4.jpg",
    description: "Financial Partners is hiring an Accounting Staff to join our team. Responsibilities include maintaining financial records and preparing reports."
  },
  {
    id: "formal-005",
    title: "HR Assistant",
    company: "PT Metro Group",
    location: "Jakarta Utara",
    salary: "Rp 5.500.000 - 7.500.000 / month",
    type: "Full-time",
    posted: "5 days ago",
    logo: "https://randomuser.me/api/portraits/men/5.jpg",
    description: "PT Metro Group is looking for an HR Assistant to support our Human Resources department with administrative tasks and recruitment activities."
  },
  {
    id: "formal-006",
    title: "Sales Representative",
    company: "Indotrade",
    location: "Jakarta Timur",
    salary: "Rp 4.000.000 + Commission",
    type: "Full-time",
    posted: "2 weeks ago",
    logo: "https://randomuser.me/api/portraits/women/6.jpg",
    description: "Indotrade is seeking motivated Sales Representatives to promote and sell our products to businesses and individuals in the Jakarta area."
  }
];

export default function JobBoardPage() {
  const router = useRouter();
  const { currentUser } = useStore();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [jobType, setJobType] = useState("all");
  const [location, setLocation] = useState("all");
  
  // Filter jobs based on search and filters
  const filteredJobs = FORMAL_JOBS.filter(job => {
    // Search query filter
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Job type filter
    const matchesType = jobType === "all" || job.type.toLowerCase().includes(jobType.toLowerCase());
    
    // Location filter
    const matchesLocation = location === "all" || job.location.toLowerCase().includes(location.toLowerCase());
    
    return matchesSearch && matchesType && matchesLocation;
  });
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Formal <span className="text-primary">Job Openings</span>
          </h1>
          <p className="text-lg text-gray-600">
            Find permanent employment opportunities with our partner companies
          </p>
        </div>
        
        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8 p-6 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  placeholder="Search job title, company, or keywords"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="md:w-1/4">
              <select
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
              >
                <option value="all">All Job Types</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            
            <div className="md:w-1/4">
              <select
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="all">All Locations</option>
                <option value="jakarta selatan">Jakarta Selatan</option>
                <option value="jakarta pusat">Jakarta Pusat</option>
                <option value="jakarta barat">Jakarta Barat</option>
                <option value="jakarta utara">Jakarta Utara</option>
                <option value="jakarta timur">Jakarta Timur</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Job Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <Card key={job.id} className="p-0 overflow-hidden hover:shadow-lg transition-all">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image 
                        src={job.logo} 
                        alt={job.company} 
                        width={56} 
                        height={56}
                        className="object-cover h-full w-full"
                        unoptimized
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">
                        {job.title}
                      </h3>
                      <p className="text-gray-700 font-medium mb-1">{job.company}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {job.type}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {job.posted}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <CurrencyDollarIcon className="h-4 w-4 mr-2 text-gray-400" />
                      {job.salary}
                    </div>
                  </div>
                  
                  <p className="mt-4 text-gray-600 line-clamp-2">{job.description}</p>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                  <Link href={`/job-board/${job.id}`}>
                    <Button 
                      size="sm"
                      variant="outline"
                      className="flex items-center"
                    >
                      View Details
                      <ChevronRightIcon className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))
          ) : (
            <div className="md:col-span-2 py-16 text-center">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <BriefcaseIcon className="h-8 w-8 text-gray-400" />
                </div>
              </div>
              <h3 className="text-xl font-medium mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filters to find what you're looking for
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery("");
                  setJobType("all");
                  setLocation("all");
                }}
                variant="outline"
                className="flex items-center mx-auto"
              >
                <ArrowPathIcon className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>
            </div>
          )}
        </div>
        
        {/* Resume Tips Section */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 mb-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4">Boost Your Job Applications</h2>
              <p className="text-gray-700 mb-6">
                Our career experts have prepared tips and templates to help you create a winning resume and ace your job interviews.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button>Resume Templates</Button>
                <Button variant="outline">Interview Tips</Button>
              </div>
            </div>
            <div className="md:w-1/3 hidden md:block">
              <div className="h-48 w-48 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto">
                <BriefcaseIcon className="h-24 w-24 text-primary/30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 