"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import UserOnboarding from "@/components/UserOnboarding";
import { useStore } from "@/store/useStore";

export default function OnboardingPage() {
  const router = useRouter();
  const { currentUser, hasCompletedOnboarding } = useStore();
  
  useEffect(() => {
    // If no user is logged in, redirect to login
    if (!currentUser) {
      router.push('/login');
      return;
    }
    
    // If user has already completed onboarding, redirect to dashboard
    if (hasCompletedOnboarding) {
      router.push('/dashboard');
    }
  }, [currentUser, hasCompletedOnboarding, router]);
  
  // If no user is logged in, show loading or nothing
  if (!currentUser) {
    return null;
  }
  
  return <UserOnboarding />;
} 