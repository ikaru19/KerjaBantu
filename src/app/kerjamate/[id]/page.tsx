"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  MapPinIcon, 
  ClockIcon, 
  CalendarIcon,
  ChevronLeftIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";
import { StarIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { useStore } from "@/store/useStore";

export default function KerjaMateProfile() {
  const params = useParams();
  const router = useRouter();
  const { getKerjaMateById } = useStore();
  
  const [kerjaMate, setKerjaMate] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
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
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-6">
          <button 
            onClick={() => router.back()}
            className="inline-flex items-center text-gray-600 hover:text-primary transition-colors"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-1" />
            <span>Back</span>
          </button>
        </div>
        
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8 border border-gray-100">
          <div className="bg-gradient-to-r from-primary/20 to-primary/5 p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="relative h-32 w-32 rounded-2xl overflow-hidden shadow-md mb-4 md:mb-0 md:mr-6">
                <Image
                  src={kerjaMate.avatar}
                  alt={kerjaMate.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold font-montserrat mb-1">{kerjaMate.name}</h1>
                    <div className="flex items-center justify-center md:justify-start mb-2">
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
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    <div className="text-primary font-bold text-xl">
                      Rp {kerjaMate.hourlyRate.toLocaleString()}<span className="text-gray-500 text-sm font-normal">/hour</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center text-sm text-gray-600 mb-4 mt-2">
                  <div className="flex items-center justify-center md:justify-start mb-2 md:mb-0 md:mr-4">
                    <MapPinIcon className="h-4 w-4 mr-1 text-gray-400" />
                    <span>{kerjaMate.location.address} ({kerjaMate.distance} km)</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <ClockIcon className="h-4 w-4 mr-1 text-gray-400" />
                    <span>{kerjaMate.completedJobs} jobs completed</span>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-6 flex justify-center md:justify-start space-x-4">
                  <Link href={`/hire/${kerjaMate.id}`}>
                    <Button size="lg">
                      Hire Now
                    </Button>
                  </Link>
                  <Link href={`/post-job?kerjaMateId=${kerjaMate.id}`}>
                    <Button variant="outline" size="lg">
                      Post a Job
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Skills & Badges */}
          <div className="md:col-span-1">
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {kerjaMate.skills.map((skill: string, index: number) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
            
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Badges</h2>
              <div className="space-y-3">
                {kerjaMate.badges.map((badge: string, index: number) => (
                  <div key={index} className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <CheckCircleIcon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">{badge}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          
          {/* Right Column - About & Reviews */}
          <div className="md:col-span-2">
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">About</h2>
              <p className="text-gray-600">{kerjaMate.about}</p>
              
              <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h3 className="font-semibold mb-2">Availability</h3>
                <p className="text-gray-600">
                  {kerjaMate.availability 
                    ? "Currently available for new jobs" 
                    : "Currently unavailable for new jobs"}
                </p>
              </div>
            </Card>
            
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
              
              <div className="space-y-6">
                {kerjaMate.reviews.map((review: any, index: number) => (
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
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Link href={`/hire/${kerjaMate.id}`}>
                  <Button>
                    Hire {kerjaMate.name}
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