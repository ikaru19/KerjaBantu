"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  Cog6ToothIcon, 
  UserCircleIcon, 
  BellIcon, 
  ShieldCheckIcon,
  KeyIcon,
  CreditCardIcon,
  ArrowPathIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { useStore } from "@/store/useStore";
import type { UserPersona } from "@/store/useStore";

export default function SettingsPage() {
  const router = useRouter();
  const { currentUser, userPersona, setUserPersona } = useStore();
  
  const [personaForm, setPersonaForm] = useState<UserPersona>({
    kerjaHarian: false,
    kerjaFormal: false,
    training: false,
    needHelp: false,
  });
  
  // Initialize the form with current user persona
  useEffect(() => {
    if (userPersona) {
      setPersonaForm(userPersona);
    }
  }, [userPersona]);
  
  // If no user is logged in, redirect to login
  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser, router]);
  
  const togglePersona = (key: keyof UserPersona) => {
    setPersonaForm(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  
  const savePersona = () => {
    // Ensure at least one option is selected
    if (!Object.values(personaForm).some(Boolean)) {
      return;
    }
    
    setUserPersona(personaForm);
  };
  
  if (!currentUser) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            <span className="text-primary">Settings</span>
          </h1>
          <p className="text-lg text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div>
            <Card className="sticky top-24 p-4">
              <div className="flex flex-col space-y-1">
                <button className="flex items-center space-x-2 p-3 rounded-lg text-primary bg-primary/5 font-medium">
                  <UserCircleIcon className="h-5 w-5" />
                  <span>Profile</span>
                </button>
                <button className="flex items-center space-x-2 p-3 rounded-lg text-gray-700 hover:bg-gray-50">
                  <BellIcon className="h-5 w-5" />
                  <span>Notifications</span>
                </button>
                <button className="flex items-center space-x-2 p-3 rounded-lg text-gray-700 hover:bg-gray-50">
                  <ShieldCheckIcon className="h-5 w-5" />
                  <span>Privacy & Security</span>
                </button>
                <button className="flex items-center space-x-2 p-3 rounded-lg text-gray-700 hover:bg-gray-50">
                  <KeyIcon className="h-5 w-5" />
                  <span>Password</span>
                </button>
                <button className="flex items-center space-x-2 p-3 rounded-lg text-gray-700 hover:bg-gray-50">
                  <CreditCardIcon className="h-5 w-5" />
                  <span>Payment Methods</span>
                </button>
              </div>
            </Card>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Section */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100">
                    {currentUser.avatar ? (
                      <Image 
                        src={currentUser.avatar} 
                        alt={currentUser.name} 
                        width={96} 
                        height={96}
                        className="object-cover h-full w-full"
                        unoptimized
                      />
                    ) : (
                      <UserCircleIcon className="h-full w-full text-gray-400" />
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full">
                    <ArrowPathIcon className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{currentUser.name}</h3>
                  <p className="text-gray-500">{currentUser.email}</p>
                  <p className="text-gray-500">{currentUser.phone}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    defaultValue={currentUser.name}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    defaultValue={currentUser.email}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    defaultValue={currentUser.phone}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    defaultValue={currentUser.address}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>Save Profile</Button>
              </div>
            </Card>
            
            {/* Change My Purpose Section */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Change My Purpose</h2>
              <p className="text-gray-600 mb-6">
                What are you currently looking for in KerjaBantu? Select one or more options below.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <button 
                  onClick={() => togglePersona('kerjaHarian')}
                  className={`flex items-center p-4 rounded-xl border-2 transition-all ${
                    personaForm.kerjaHarian 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                >
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold">Daily Work</h3>
                    <p className="text-sm text-gray-600">
                      I'm looking for daily work opportunities
                    </p>
                  </div>
                  {personaForm.kerjaHarian && (
                    <CheckCircleIcon className="h-6 w-6 text-primary" />
                  )}
                </button>
                
                <button 
                  onClick={() => togglePersona('kerjaFormal')}
                  className={`flex items-center p-4 rounded-xl border-2 transition-all ${
                    personaForm.kerjaFormal 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                >
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold">Formal Jobs</h3>
                    <p className="text-sm text-gray-600">
                      I want formal job opportunities
                    </p>
                  </div>
                  {personaForm.kerjaFormal && (
                    <CheckCircleIcon className="h-6 w-6 text-primary" />
                  )}
                </button>
                
                <button 
                  onClick={() => togglePersona('training')}
                  className={`flex items-center p-4 rounded-xl border-2 transition-all ${
                    personaForm.training 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                >
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold">Training</h3>
                    <p className="text-sm text-gray-600">
                      I want to join training and consultations
                    </p>
                  </div>
                  {personaForm.training && (
                    <CheckCircleIcon className="h-6 w-6 text-primary" />
                  )}
                </button>
                
                <button 
                  onClick={() => togglePersona('needHelp')}
                  className={`flex items-center p-4 rounded-xl border-2 transition-all ${
                    personaForm.needHelp 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                >
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold">Need Help</h3>
                    <p className="text-sm text-gray-600">
                      I need help (I'm looking to hire a KerjaMate)
                    </p>
                  </div>
                  {personaForm.needHelp && (
                    <CheckCircleIcon className="h-6 w-6 text-primary" />
                  )}
                </button>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={savePersona}
                  disabled={!Object.values(personaForm).some(Boolean)}
                >
                  Save Purpose
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 