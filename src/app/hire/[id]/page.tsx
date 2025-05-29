"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  CheckCircleIcon, 
  CalendarIcon, 
  ClockIcon, 
  MapPinIcon,
  CurrencyDollarIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/outline";
import { StarIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { useStore } from "@/store/useStore";

export default function HirePage() {
  const params = useParams();
  const router = useRouter();
  const { getKerjaMateById, currentUser, jobFormData, updateJobFormData, resetJobFormData, submitJob, hireKerjaMate } = useStore();
  
  const [kerjaMate, setKerjaMate] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [hiringSuccess, setHiringSuccess] = useState(false);
  
  useEffect(() => {
    if (params.id) {
      const mate = getKerjaMateById(params.id as string);
      if (mate) {
        setKerjaMate(mate);
        setLoading(false);
      } else {
        setError("KerjaMate not found");
        setLoading(false);
      }
    }
  }, [params.id, getKerjaMateById]);
  
  const handleHire = async () => {
    // Create a job first
    if (!currentUser) {
      router.push('/login');
      return;
    }
    
    // Submit the job and get the job ID
    const jobId = submitJob();
    
    // Hire the KerjaMate for this job
    const success = hireKerjaMate(jobId, kerjaMate.id);
    
    if (success) {
      setHiringSuccess(true);
    } else {
      setError("Failed to hire. Please check your wallet balance.");
    }
  };
  
  const handlePostJob = () => {
    // Pre-fill job form with this KerjaMate's skills
    updateJobFormData({ skills: kerjaMate.skills });
    router.push(`/post-job?kerjaMateId=${kerjaMate.id}`);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading KerjaMate profile...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <div className="text-red-500 text-5xl mb-4">404</div>
          <h1 className="text-2xl font-bold mb-4">KerjaMate Not Found</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link href="/matches">
            <Button>Find Other KerjaMates</Button>
          </Link>
        </Card>
      </div>
    );
  }
  
  if (hiringSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Card className="p-8 text-center">
            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mx-auto mb-6">
              <CheckCircleIcon className="h-12 w-12 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Hiring Successful!</h1>
            <p className="text-gray-600 mb-8">
              You have successfully hired {kerjaMate.name}. They will contact you shortly to discuss the job details.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-6">
          <button 
            onClick={() => router.back()}
            className="inline-flex items-center text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            <span>Back</span>
          </button>
        </div>
        
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8 border border-gray-100">
          <div className="md:flex">
            {/* KerjaMate Profile Section */}
            <div className="md:w-1/3 p-6 bg-gradient-to-b from-primary-light/30 to-white">
              <div className="text-center">
                <div className="relative h-32 w-32 mx-auto mb-4 rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src={kerjaMate.avatar}
                    alt={kerjaMate.name}
                    width={128}
                    height={128}
                    className="object-cover"
                    unoptimized
                  />
                </div>
                
                <h1 className="text-2xl font-bold font-montserrat mb-1">{kerjaMate.name}</h1>
                
                <div className="flex items-center justify-center mb-2">
                  <div className="bg-yellow-100 px-2 py-0.5 rounded-full flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium text-gray-700">{kerjaMate.rating}</span>
                  </div>
                  {kerjaMate.verified && (
                    <span className="flex items-center ml-2 text-primary text-sm">
                      <CheckBadgeIcon className="h-4 w-4 mr-1" />
                      Verified
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 text-sm mb-4">
                  {kerjaMate.completedJobs} jobs completed
                </p>
                
                <div className="flex items-center justify-center text-sm text-gray-600 mb-4">
                  <MapPinIcon className="h-4 w-4 mr-1 text-gray-400" />
                  <span>{kerjaMate.location.address}</span>
                </div>
                
                <div className="text-primary font-bold text-xl mb-4">
                  Rp {kerjaMate.hourlyRate.toLocaleString()}<span className="text-gray-500 text-sm font-normal">/hour</span>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-2">Skills</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {kerjaMate.skills.map((skill: string, index: number) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Hiring Section */}
            <div className="md:w-2/3 p-6">
              <h2 className="text-xl font-bold mb-6">Hire {kerjaMate.name}</h2>
              
              {!showConfirmation ? (
                <>
                  <div className="space-y-6 mb-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Service Overview</h3>
                      <p className="text-gray-600">
                        {kerjaMate.name} offers professional services in {kerjaMate.skills.slice(0, 3).join(", ")}{kerjaMate.skills.length > 3 ? ` and ${kerjaMate.skills.length - 3} more skills` : ''}.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Why Choose {kerjaMate.name}?</h3>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span>{kerjaMate.completedJobs}+ completed jobs with {kerjaMate.rating} average rating</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span>Quick response time and professional service</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span>Located {kerjaMate.distance} km from your location</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Hiring Options</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-gray-200 rounded-xl p-4 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                          <h4 className="font-medium mb-2">Quick Hire</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            Hire directly for a simple task without detailed job posting.
                          </p>
                          <Button 
                            onClick={() => setShowConfirmation(true)}
                            className="w-full"
                          >
                            Hire Now
                          </Button>
                        </div>
                        
                        <div className="border border-gray-200 rounded-xl p-4 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                          <h4 className="font-medium mb-2">Post a Job</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            Create a detailed job posting for complex tasks.
                          </p>
                          <Button 
                            variant="outline" 
                            onClick={handlePostJob}
                            className="w-full"
                          >
                            Post a Job
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Confirm Hiring</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between pb-2 border-b border-gray-200">
                      <span className="text-gray-600">Service provider</span>
                      <span className="font-medium">{kerjaMate.name}</span>
                    </div>
                    
                    <div className="flex justify-between pb-2 border-b border-gray-200">
                      <span className="text-gray-600">Hourly rate</span>
                      <span className="font-medium">Rp {kerjaMate.hourlyRate.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between pb-2 border-b border-gray-200">
                      <span className="text-gray-600">Your wallet balance</span>
                      <span className="font-medium">Rp {currentUser?.walletBalance.toLocaleString() || 0}</span>
                    </div>
                    
                    <div className="flex justify-between pb-2 border-b border-gray-200">
                      <span className="text-gray-600">Payment method</span>
                      <span className="font-medium">KerjaBantu Wallet</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-6">
                    By hiring, you agree to the KerjaBantu Terms of Service and confirm that this KerjaMate will be booked for your task.
                  </p>
                  
                  <div className="flex gap-4">
                    <Button
                      onClick={handleHire}
                      className="w-full"
                    >
                      Confirm Hire
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => setShowConfirmation(false)}
                      className="w-full"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Reviews Section */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
          
          <div className="space-y-6">
            {kerjaMate.reviews && kerjaMate.reviews.length > 0 ? (
              kerjaMate.reviews.map((review: any, index: number) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <div className="font-medium">{review.userName}</div>
                      <div className="text-sm text-gray-500 ml-2">{review.date}</div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? 'text-yellow-500' : 'text-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No reviews yet.</p>
            )}
          </div>
        </Card>
        
        {/* Similar KerjaMates */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Similar KerjaMates</h2>
          
          <p className="text-gray-600 text-center py-8">
            This feature is coming soon. Check back later for similar KerjaMates recommendations.
          </p>
        </Card>
      </div>
    </div>
  );
} 