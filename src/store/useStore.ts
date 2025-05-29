import { create } from 'zustand';
import { kerjaMates, KerjaMate } from '@/data/kerjaMates';
import { jobs, Job } from '@/data/jobs';
import { users, User } from '@/data/users';
import { jobCategories, JobCategory } from '@/data/jobCategories';
import { persist } from 'zustand/middleware';

export type UserPersona = {
  kerjaHarian: boolean;
  kerjaFormal: boolean;
  training: boolean;
  needHelp: boolean;
};

interface JobFormData {
  title: string;
  description: string;
  category: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  dateNeeded: string;
  timeNeeded: string;
  duration: number;
  budget: number;
  skills: string[];
}

interface AppState {
  // Current user and authentication
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  
  // User Persona
  userPersona: UserPersona;
  setUserPersona: (persona: UserPersona) => void;
  updateUserPersona: (key: keyof UserPersona, value: boolean) => void;
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (completed: boolean) => void;
  
  // KerjaMates
  kerjaMates: KerjaMate[];
  filteredKerjaMates: KerjaMate[];
  filterKerjaMatesBySkill: (skill: string) => void;
  filterKerjaMatesByAvailability: (available: boolean) => void;
  resetKerjaMatesFilter: () => void;
  getKerjaMateById: (id: string) => KerjaMate | undefined;
  
  // Jobs
  jobs: Job[];
  filteredJobs: Job[];
  filterJobsByCategory: (category: string) => void;
  filterJobsByStatus: (status: string) => void;
  resetJobsFilter: () => void;
  getJobById: (id: string) => Job | undefined;
  
  // Job form
  jobFormData: JobFormData;
  updateJobFormData: (data: Partial<JobFormData>) => void;
  resetJobFormData: () => void;
  submitJob: () => string; // Returns the new job ID
  
  // Categories
  jobCategories: JobCategory[];
  getJobCategoryById: (id: string) => JobCategory | undefined;
  
  // Wallet
  topUpWallet: (amount: number) => void;
  deductFromWallet: (amount: number) => boolean; // Returns success status
  
  // Matching
  findMatchingKerjaMates: (jobId: string) => KerjaMate[];
  hireKerjaMate: (jobId: string, kerjaMateId: string) => boolean;
}

const defaultJobFormData: JobFormData = {
  title: '',
  description: '',
  category: '',
  location: {
    address: '',
    lat: 0,
    lng: 0,
  },
  dateNeeded: '',
  timeNeeded: '',
  duration: 1,
  budget: 0,
  skills: [],
};

const defaultUserPersona: UserPersona = {
  kerjaHarian: false,
  kerjaFormal: false,
  training: false,
  needHelp: false,
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initialize with data
      currentUser: users[0], // Default to first user for demo
      kerjaMates: kerjaMates,
      filteredKerjaMates: kerjaMates,
      jobs: jobs,
      filteredJobs: jobs,
      jobCategories: jobCategories,
      jobFormData: defaultJobFormData,
      userPersona: defaultUserPersona,
      hasCompletedOnboarding: false,
      
      // User functions
      setCurrentUser: (user) => set({ currentUser: user }),
      
      // User Persona functions
      setUserPersona: (persona) => set({ userPersona: persona }),
      updateUserPersona: (key, value) => {
        const currentPersona = get().userPersona;
        set({ 
          userPersona: { 
            ...currentPersona, 
            [key]: value 
          } 
        });
      },
      setHasCompletedOnboarding: (completed) => set({ hasCompletedOnboarding: completed }),
      
      // KerjaMate functions
      filterKerjaMatesBySkill: (skill) => {
        const filtered = get().kerjaMates.filter(km => 
          km.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
        );
        set({ filteredKerjaMates: filtered });
      },
      
      filterKerjaMatesByAvailability: (available) => {
        const filtered = get().kerjaMates.filter(km => km.availability === available);
        set({ filteredKerjaMates: filtered });
      },
      
      resetKerjaMatesFilter: () => {
        set({ filteredKerjaMates: get().kerjaMates });
      },
      
      getKerjaMateById: (id) => {
        return get().kerjaMates.find(km => km.id === id);
      },
      
      // Job functions
      filterJobsByCategory: (category) => {
        const filtered = get().jobs.filter(job => 
          job.category.toLowerCase() === category.toLowerCase()
        );
        set({ filteredJobs: filtered });
      },
      
      filterJobsByStatus: (status) => {
        const filtered = get().jobs.filter(job => job.status === status);
        set({ filteredJobs: filtered });
      },
      
      resetJobsFilter: () => {
        set({ filteredJobs: get().jobs });
      },
      
      getJobById: (id) => {
        return get().jobs.find(job => job.id === id);
      },
      
      // Job form functions
      updateJobFormData: (data) => {
        set({ jobFormData: { ...get().jobFormData, ...data } });
      },
      
      resetJobFormData: () => {
        set({ jobFormData: defaultJobFormData });
      },
      
      submitJob: () => {
        const { jobFormData, currentUser, jobs } = get();
        const newJobId = `job-${String(jobs.length + 1).padStart(3, '0')}`;
        
        const newJob: Job = {
          id: newJobId,
          title: jobFormData.title,
          description: jobFormData.description,
          category: jobFormData.category,
          location: {
            lat: jobFormData.location.lat,
            lng: jobFormData.location.lng,
            address: jobFormData.location.address,
          },
          datePosted: new Date().toISOString().split('T')[0],
          dateNeeded: jobFormData.dateNeeded,
          timeNeeded: jobFormData.timeNeeded,
          duration: jobFormData.duration,
          budget: jobFormData.budget,
          status: 'open',
          userId: currentUser?.id || 'unknown',
          skills: jobFormData.skills,
        };
        
        set({ jobs: [...get().jobs, newJob], filteredJobs: [...get().jobs, newJob] });
        
        // If there's a current user, add this job to their posted jobs
        if (currentUser) {
          const updatedUser = {
            ...currentUser,
            jobsPosted: [...currentUser.jobsPosted, newJobId],
          };
          set({ currentUser: updatedUser });
        }
        
        return newJobId;
      },
      
      // Category functions
      getJobCategoryById: (id) => {
        return get().jobCategories.find(cat => cat.id === id);
      },
      
      // Wallet functions
      topUpWallet: (amount) => {
        const { currentUser } = get();
        if (currentUser) {
          const updatedUser = {
            ...currentUser,
            walletBalance: currentUser.walletBalance + amount,
          };
          set({ currentUser: updatedUser });
        }
      },
      
      deductFromWallet: (amount) => {
        const { currentUser } = get();
        if (currentUser && currentUser.walletBalance >= amount) {
          const updatedUser = {
            ...currentUser,
            walletBalance: currentUser.walletBalance - amount,
          };
          set({ currentUser: updatedUser });
          return true;
        }
        return false;
      },
      
      // Matching functions  
      findMatchingKerjaMates: (jobId) => {
        const { jobs, kerjaMates } = get();
        const job = jobs.find(j => j.id === jobId);
        
        if (!job) return [];
        
        // Simple matching logic based on skills
        return kerjaMates.filter(km => 
          km.skills.some(skill => job.skills.includes(skill))
        );
      },
      
      hireKerjaMate: (jobId, kerjaMateId) => {
        const { currentUser, jobs, kerjaMates } = get();
        const job = jobs.find(j => j.id === jobId);
        const kerjaMate = kerjaMates.find(km => km.id === kerjaMateId);
        
        if (!job || !kerjaMate || !currentUser) return false;
        
        // Check if user has enough balance
        if (currentUser.walletBalance < job.budget) {
          return false;
        }
        
        // Deduct the amount from the wallet
        const deductSuccess = get().deductFromWallet(job.budget);
        if (!deductSuccess) return false;
        
        // Update job status
        const updatedJobs = jobs.map(j => 
          j.id === jobId ? { 
            ...j, 
            status: 'assigned' as 'open' | 'assigned' | 'completed' | 'cancelled', 
            assignedTo: kerjaMateId 
          } : j
        );
        
        set({ jobs: updatedJobs, filteredJobs: updatedJobs });
        
        return true;
      },
    }),
    {
      name: 'kerjabantu-storage',
      partialize: (state) => ({
        currentUser: state.currentUser,
        userPersona: state.userPersona,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
      }),
    }
  )
); 