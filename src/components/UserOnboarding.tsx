import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  BriefcaseIcon, 
  CalendarDaysIcon, 
  AcademicCapIcon, 
  UserGroupIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { useStore } from "@/store/useStore";
import type { UserPersona } from "@/store/useStore";

const UserOnboarding = () => {
  const router = useRouter();
  const { userPersona, setUserPersona, setHasCompletedOnboarding } = useStore();
  
  const [selections, setSelections] = useState<UserPersona>({
    kerjaHarian: false,
    kerjaFormal: false,
    training: false,
    needHelp: false,
  });
  
  const toggleSelection = (key: keyof UserPersona) => {
    setSelections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  
  const handleSubmit = () => {
    // Check if at least one option is selected
    const hasSelection = Object.values(selections).some(value => value);
    
    if (!hasSelection) {
      // Show an error or notification that at least one option must be selected
      return;
    }
    
    // Save selections to store
    setUserPersona(selections);
    setHasCompletedOnboarding(true);
    
    // Redirect based on selection
    if (selections.kerjaHarian) {
      router.push('/dashboard');
    } else if (selections.kerjaFormal) {
      router.push('/job-board');
    } else if (selections.training) {
      router.push('/training-center');
    } else if (selections.needHelp) {
      router.push('/post-job');
    } else {
      router.push('/');
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 p-4">
      <Card className="max-w-2xl w-full p-8 md:p-10">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center">
              <Image 
                src="/logo.png" 
                alt="KerjaBantu Logo" 
                width={50} 
                height={50}
                onError={(e) => {
                  // Fallback if logo doesn't exist
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">
            What are you looking for in <span className="text-primary">KerjaBantu</span>?
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Select one or more options to help us personalize your experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <button 
            onClick={() => toggleSelection('kerjaHarian')}
            className={`flex flex-col items-center p-6 rounded-2xl border-2 transition-all ${
              selections.kerjaHarian 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-200 hover:border-primary/50'
            }`}
          >
            <div className={`h-14 w-14 rounded-full flex items-center justify-center mb-4 ${
              selections.kerjaHarian ? 'bg-primary/20' : 'bg-gray-100'
            }`}>
              <CalendarDaysIcon className={`h-7 w-7 ${selections.kerjaHarian ? 'text-primary' : 'text-gray-500'}`} />
              {selections.kerjaHarian && (
                <div className="absolute -top-1 -right-1">
                  <CheckCircleIcon className="h-5 w-5 text-primary bg-white rounded-full" />
                </div>
              )}
            </div>
            <h3 className="font-semibold text-lg mb-2">Daily Work</h3>
            <p className="text-gray-600 text-center text-sm">
              I'm looking for daily work opportunities (Kerja Harian)
            </p>
          </button>
          
          <button 
            onClick={() => toggleSelection('kerjaFormal')}
            className={`flex flex-col items-center p-6 rounded-2xl border-2 transition-all ${
              selections.kerjaFormal 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-200 hover:border-primary/50'
            }`}
          >
            <div className={`h-14 w-14 rounded-full flex items-center justify-center mb-4 ${
              selections.kerjaFormal ? 'bg-primary/20' : 'bg-gray-100'
            }`}>
              <BriefcaseIcon className={`h-7 w-7 ${selections.kerjaFormal ? 'text-primary' : 'text-gray-500'}`} />
              {selections.kerjaFormal && (
                <div className="absolute -top-1 -right-1">
                  <CheckCircleIcon className="h-5 w-5 text-primary bg-white rounded-full" />
                </div>
              )}
            </div>
            <h3 className="font-semibold text-lg mb-2">Formal Jobs</h3>
            <p className="text-gray-600 text-center text-sm">
              I want formal job opportunities (Kerja Formal)
            </p>
          </button>
          
          <button 
            onClick={() => toggleSelection('training')}
            className={`flex flex-col items-center p-6 rounded-2xl border-2 transition-all ${
              selections.training 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-200 hover:border-primary/50'
            }`}
          >
            <div className={`h-14 w-14 rounded-full flex items-center justify-center mb-4 ${
              selections.training ? 'bg-primary/20' : 'bg-gray-100'
            }`}>
              <AcademicCapIcon className={`h-7 w-7 ${selections.training ? 'text-primary' : 'text-gray-500'}`} />
              {selections.training && (
                <div className="absolute -top-1 -right-1">
                  <CheckCircleIcon className="h-5 w-5 text-primary bg-white rounded-full" />
                </div>
              )}
            </div>
            <h3 className="font-semibold text-lg mb-2">Training</h3>
            <p className="text-gray-600 text-center text-sm">
              I want to join training and consultations
            </p>
          </button>
          
          <button 
            onClick={() => toggleSelection('needHelp')}
            className={`flex flex-col items-center p-6 rounded-2xl border-2 transition-all ${
              selections.needHelp 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-200 hover:border-primary/50'
            }`}
          >
            <div className={`h-14 w-14 rounded-full flex items-center justify-center mb-4 ${
              selections.needHelp ? 'bg-primary/20' : 'bg-gray-100'
            }`}>
              <UserGroupIcon className={`h-7 w-7 ${selections.needHelp ? 'text-primary' : 'text-gray-500'}`} />
              {selections.needHelp && (
                <div className="absolute -top-1 -right-1">
                  <CheckCircleIcon className="h-5 w-5 text-primary bg-white rounded-full" />
                </div>
              )}
            </div>
            <h3 className="font-semibold text-lg mb-2">Need Help</h3>
            <p className="text-gray-600 text-center text-sm">
              I need help (I'm looking to hire a KerjaMate)
            </p>
          </button>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={handleSubmit}
            size="lg"
            className="px-10"
            disabled={!Object.values(selections).some(Boolean)}
          >
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UserOnboarding; 