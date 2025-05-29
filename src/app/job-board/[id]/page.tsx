"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeftIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  CheckCircleIcon
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
    description: "We are looking for an Administrative Assistant to join our dynamic team. The ideal candidate will have excellent organizational skills and attention to detail.",
    requirements: [
      "Bachelor's degree in any field",
      "Minimum 1 year experience in administrative role",
      "Proficient in MS Office suite",
      "Excellent organizational and time management skills",
      "Strong written and verbal communication skills in English and Bahasa Indonesia"
    ],
    responsibilities: [
      "Provide administrative support to various departments",
      "Manage calendars, schedule meetings, and organize travel arrangements",
      "Prepare correspondence, reports, and presentations",
      "Handle sensitive information with confidentiality",
      "Maintain filing systems and databases"
    ],
    benefits: [
      "Competitive salary package",
      "Health insurance",
      "Annual leave",
      "Transportation allowance",
      "Professional development opportunities"
    ],
    applicationDeadline: "2023-06-30"
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
    description: "Indotech Systems is seeking a Marketing Specialist to help develop and implement marketing strategies for our products and services.",
    requirements: [
      "Bachelor's degree in Marketing, Communications, or related field",
      "Minimum 2 years experience in digital marketing",
      "Experience with social media marketing and content creation",
      "Strong analytical skills and familiarity with marketing metrics",
      "Excellent project management abilities"
    ],
    responsibilities: [
      "Develop and execute marketing campaigns across various channels",
      "Create compelling content for digital platforms",
      "Analyze marketing metrics and prepare performance reports",
      "Collaborate with design team on marketing materials",
      "Stay updated on market trends and competitor activities"
    ],
    benefits: [
      "Competitive salary package",
      "Health and dental insurance",
      "Performance bonuses",
      "Flexible working hours",
      "Modern office environment"
    ],
    applicationDeadline: "2023-07-15"
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
    description: "MegaMart is looking for Customer Service Representatives to provide exceptional service to our customers via phone, email, and chat.",
    requirements: [
      "High school diploma or equivalent",
      "Previous customer service experience preferred",
      "Excellent communication and interpersonal skills",
      "Basic computer skills",
      "Ability to work in shifts including weekends"
    ],
    responsibilities: [
      "Respond to customer inquiries and resolve issues promptly",
      "Process orders, refunds, and exchanges",
      "Maintain customer records and document interactions",
      "Escalate complex issues to appropriate departments",
      "Provide product information to customers"
    ],
    benefits: [
      "Competitive base salary plus incentives",
      "Health insurance",
      "Meal allowance",
      "Employee discounts",
      "Career advancement opportunities"
    ],
    applicationDeadline: "2023-06-25"
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
    description: "Financial Partners is hiring an Accounting Staff to join our team. Responsibilities include maintaining financial records and preparing reports.",
    requirements: [
      "Bachelor's degree in Accounting or Finance",
      "Minimum 2 years experience in accounting role",
      "Proficient in accounting software",
      "Strong analytical and problem-solving skills",
      "Attention to detail and accuracy"
    ],
    responsibilities: [
      "Maintain general ledger and financial records",
      "Prepare monthly financial statements",
      "Process accounts payable and receivable",
      "Assist with budget preparation and monitoring",
      "Support auditing processes"
    ],
    benefits: [
      "Competitive salary package",
      "Health and life insurance",
      "Annual bonus",
      "Professional certification support",
      "Retirement plan"
    ],
    applicationDeadline: "2023-07-10"
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
    description: "PT Metro Group is looking for an HR Assistant to support our Human Resources department with administrative tasks and recruitment activities.",
    requirements: [
      "Bachelor's degree in Human Resources or related field",
      "Minimum 1 year experience in HR role",
      "Knowledge of HR practices and labor laws",
      "Excellent organizational and communication skills",
      "Proficiency in HRIS systems"
    ],
    responsibilities: [
      "Assist with recruitment and onboarding processes",
      "Maintain employee records and update HR databases",
      "Support payroll processing and benefits administration",
      "Help organize company events and training programs",
      "Respond to employee inquiries and requests"
    ],
    benefits: [
      "Competitive salary package",
      "Health insurance coverage",
      "Professional development opportunities",
      "Transportation allowance",
      "Work-life balance initiatives"
    ],
    applicationDeadline: "2023-07-05"
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
    description: "Indotrade is seeking motivated Sales Representatives to promote and sell our products to businesses and individuals in the Jakarta area.",
    requirements: [
      "High school diploma (Bachelor's degree preferred)",
      "Previous sales experience is a plus",
      "Excellent communication and negotiation skills",
      "Self-motivated with a strong work ethic",
      "Valid driver's license and own transportation"
    ],
    responsibilities: [
      "Identify and approach potential clients",
      "Present and demonstrate products to customers",
      "Negotiate terms and close sales",
      "Maintain relationships with existing clients",
      "Meet or exceed monthly sales targets"
    ],
    benefits: [
      "Base salary plus attractive commission structure",
      "Health insurance",
      "Sales training and development",
      "Mobile phone allowance",
      "Performance incentives and bonuses"
    ],
    applicationDeadline: "2023-06-28"
  }
];

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { currentUser } = useStore();
  
  const [job, setJob] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null);
  
  useEffect(() => {
    if (params.id) {
      // Find the job with the matching ID
      const foundJob = FORMAL_JOBS.find(j => j.id === params.id);
      
      if (foundJob) {
        setJob(foundJob);
      }
      
      setLoading(false);
    }
  }, [params.id]);
  
  const handleApply = () => {
    // Simulate application submission
    setApplicationStatus("pending");
    
    // After a delay, change to success
    setTimeout(() => {
      setApplicationStatus("success");
    }, 1500);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }
  
  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BriefcaseIcon className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Job Not Found</h2>
          <p className="text-gray-600 mb-6">
            The job you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/job-board">
            <Button className="mx-auto">
              Back to Job Board
            </Button>
          </Link>
        </Card>
      </div>
    );
  }
  
  if (applicationStatus === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Card className="p-8 text-center">
            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mx-auto mb-6">
              <CheckCircleIcon className="h-12 w-12 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Application Submitted!</h1>
            <p className="text-gray-600 mb-8">
              Your application for {job.title} at {job.company} has been successfully submitted. 
              The employer will review your application and contact you if you are selected for an interview.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/job-board">
                <Button variant="outline">Browse More Jobs</Button>
              </Link>
              <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button */}
        <div className="mb-6">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Job Board
          </button>
        </div>
        
        {/* Job header */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
              <Image 
                src={job.logo} 
                alt={job.company} 
                width={80} 
                height={80}
                className="object-cover h-full w-full"
              />
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{job.title}</h1>
              <div className="flex items-center text-gray-700 mb-2">
                <BuildingOfficeIcon className="h-5 w-5 mr-2 text-gray-500" />
                <span className="font-medium">{job.company}</span>
              </div>
              <div className="flex flex-wrap gap-3 mt-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  <BriefcaseIcon className="h-4 w-4 mr-1" />
                  {job.type}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  {job.location}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                  <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                  {job.salary}
                </span>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button 
                onClick={handleApply}
                disabled={applicationStatus === "pending"}
                className="w-full md:w-auto"
              >
                {applicationStatus === "pending" ? "Submitting..." : "Apply Now"}
              </Button>
            </div>
          </div>
        </Card>
        
        {/* Job details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Job description */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Job Description</h2>
              <p className="text-gray-700 mb-6">{job.description}</p>
              
              <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>
              <ul className="list-disc pl-5 mb-6 space-y-2">
                {job.responsibilities.map((responsibility: string, index: number) => (
                  <li key={index} className="text-gray-700">{responsibility}</li>
                ))}
              </ul>
              
              <h3 className="text-lg font-semibold mb-3">Requirements</h3>
              <ul className="list-disc pl-5 space-y-2">
                {job.requirements.map((requirement: string, index: number) => (
                  <li key={index} className="text-gray-700">{requirement}</li>
                ))}
              </ul>
            </Card>
            
            {/* Benefits */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Benefits</h2>
              <ul className="space-y-3">
                {job.benefits.map((benefit: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                      <CheckCircleIcon className="h-3 w-3 text-primary" />
                    </div>
                    <span className="ml-3 text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job summary */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Job Summary</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Posted</h3>
                  <p className="text-gray-700">{job.posted}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Job Type</h3>
                  <p className="text-gray-700">{job.type}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Location</h3>
                  <p className="text-gray-700">{job.location}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Salary</h3>
                  <p className="text-gray-700">{job.salary}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Application Deadline</h3>
                  <p className="text-gray-700">{job.applicationDeadline}</p>
                </div>
              </div>
            </Card>
            
            {/* Company info */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">About the Company</h2>
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100 mr-3">
                  <Image 
                    src={job.logo} 
                    alt={job.company} 
                    width={48} 
                    height={48}
                    className="object-cover h-full w-full"
                  />
                </div>
                <h3 className="font-semibold">{job.company}</h3>
              </div>
              <p className="text-gray-700 mb-4">
                {job.company} is a leading company in its industry, committed to innovation and excellence.
              </p>
              <Link href={`/companies/${job.company.toLowerCase().replace(/\s+/g, '-')}`}>
                <Button variant="outline" size="sm" className="w-full">
                  View Company Profile
                </Button>
              </Link>
            </Card>
            
            {/* Similar jobs */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Similar Jobs</h2>
              <div className="space-y-4">
                {FORMAL_JOBS.filter(j => j.id !== job.id)
                  .slice(0, 3)
                  .map(similarJob => (
                    <Link key={similarJob.id} href={`/job-board/${similarJob.id}`}>
                      <div className="group flex items-start hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 mr-3 flex-shrink-0">
                          <Image 
                            src={similarJob.logo} 
                            alt={similarJob.company} 
                            width={40} 
                            height={40}
                            className="object-cover h-full w-full"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                            {similarJob.title}
                          </h3>
                          <p className="text-xs text-gray-500">{similarJob.company}</p>
                          <p className="text-xs text-gray-500 mt-1">{similarJob.location}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link href="/job-board">
                  <Button variant="outline" size="sm" className="w-full">
                    View All Jobs
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 