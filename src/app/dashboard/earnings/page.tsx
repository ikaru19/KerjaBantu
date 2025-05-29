"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ChevronRightIcon, 
  CalendarIcon, 
  ClockIcon, 
  BanknotesIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";
import { useStore } from "@/store/useStore";
import Card from "@/components/Card";
import Button from "@/components/Button";

// Sample earnings data
const EARNINGS_DATA = [
  {
    id: "earn-001",
    jobTitle: "House Cleaning",
    clientName: "John Smith",
    date: "2023-05-15",
    amount: 120000,
    hours: 4,
    status: "completed",
    paymentMethod: "KerjaBantu Wallet"
  },
  {
    id: "earn-002",
    jobTitle: "Furniture Assembly",
    clientName: "Alice Johnson",
    date: "2023-05-18",
    amount: 250000,
    hours: 2.5,
    status: "completed",
    paymentMethod: "KerjaBantu Wallet"
  },
  {
    id: "earn-003",
    jobTitle: "Garden Maintenance",
    clientName: "Robert Brown",
    date: "2023-05-20",
    amount: 180000,
    hours: 3,
    status: "pending",
    paymentMethod: "KerjaBantu Wallet"
  },
  {
    id: "earn-004",
    jobTitle: "Electrical Repair",
    clientName: "Sarah Williams",
    date: "2023-05-22",
    amount: 300000,
    hours: 2,
    status: "pending",
    paymentMethod: "KerjaBantu Wallet"
  },
  {
    id: "earn-005",
    jobTitle: "Moving Assistance",
    clientName: "David Miller",
    date: "2023-05-25",
    amount: 350000,
    hours: 5,
    status: "scheduled",
    paymentMethod: "KerjaBantu Wallet"
  }
];

export default function EarningsPage() {
  const { currentUser } = useStore();
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  
  // Calculate total earnings
  const totalEarnings = EARNINGS_DATA.reduce((sum, earning) => sum + earning.amount, 0);
  const completedEarnings = EARNINGS_DATA.filter(e => e.status === "completed").reduce((sum, earning) => sum + earning.amount, 0);
  const pendingEarnings = EARNINGS_DATA.filter(e => e.status === "pending").reduce((sum, earning) => sum + earning.amount, 0);
  
  // Calculate total hours
  const totalHours = EARNINGS_DATA.reduce((sum, earning) => sum + earning.hours, 0);
  
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
            <span className="text-primary">Earnings & Jobs</span>
          </nav>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your <span className="text-primary">Earnings</span> & Jobs
          </h1>
          <p className="text-lg text-gray-600">
            Track your earnings, job history, and upcoming jobs
          </p>
        </div>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-start">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <BanknotesIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Earnings</p>
                <p className="text-2xl font-bold">Rp {totalEarnings.toLocaleString()}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-start">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <ClockIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Hours Worked</p>
                <p className="text-2xl font-bold">{totalHours}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-start">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <BanknotesIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed Payments</p>
                <p className="text-2xl font-bold">Rp {completedEarnings.toLocaleString()}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-start">
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
                <BanknotesIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Payments</p>
                <p className="text-2xl font-bold">Rp {pendingEarnings.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Period Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Earnings History</h2>
            
            <div className="flex space-x-2">
              <Button 
                variant={selectedPeriod === "week" ? "primary" : "outline"} 
                size="sm"
                onClick={() => setSelectedPeriod("week")}
              >
                Week
              </Button>
              <Button 
                variant={selectedPeriod === "month" ? "primary" : "outline"} 
                size="sm"
                onClick={() => setSelectedPeriod("month")}
              >
                Month
              </Button>
              <Button 
                variant={selectedPeriod === "year" ? "primary" : "outline"} 
                size="sm"
                onClick={() => setSelectedPeriod("year")}
              >
                Year
              </Button>
            </div>
          </div>
        </div>
        
        {/* Earnings Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
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
                    Hours
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {EARNINGS_DATA.map((earning) => (
                  <tr key={earning.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{earning.jobTitle}</div>
                          <div className="text-sm text-gray-500">{earning.clientName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{new Date(earning.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{earning.hours} hours</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Rp {earning.amount.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${earning.status === 'completed' ? 'bg-green-100 text-green-800' : 
                          earning.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-blue-100 text-blue-800'}`}>
                        {earning.status.charAt(0).toUpperCase() + earning.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        
        {/* Upcoming Jobs */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-6">Upcoming Jobs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EARNINGS_DATA
              .filter(job => job.status === "scheduled")
              .map(job => (
                <Card key={job.id} className="p-6">
                  <div className="flex justify-between mb-4">
                    <h3 className="font-semibold text-lg">{job.jobTitle}</h3>
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      Scheduled
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <CalendarIcon className="h-5 w-5 mr-2 text-gray-400" />
                      <span>{new Date(job.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <ClockIcon className="h-5 w-5 mr-2 text-gray-400" />
                      <span>{job.hours} hours</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <BanknotesIcon className="h-5 w-5 mr-2 text-gray-400" />
                      <span>Rp {job.amount.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <div className="text-sm">
                      <span className="text-gray-500">Client:</span>
                      <span className="ml-1 font-medium">{job.clientName}</span>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
} 