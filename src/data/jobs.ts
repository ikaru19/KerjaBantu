export interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  datePosted: string;
  dateNeeded: string;
  timeNeeded: string;
  duration: number; // in hours
  budget: number;
  status: "open" | "assigned" | "completed" | "cancelled";
  userId: string;
  kerjaMateId?: string;
  skills: string[];
}

export const jobs: Job[] = [
  {
    id: "job-001",
    title: "House Cleaning for 3-Bedroom Apartment",
    description: "Need thorough cleaning of my 3-bedroom apartment including kitchen, bathrooms, living room, and bedrooms. Please bring your own cleaning supplies.",
    category: "Cleaning",
    location: {
      lat: -6.175971,
      lng: 106.827038,
      address: "Menteng, Jakarta Pusat"
    },
    datePosted: "2023-12-01",
    dateNeeded: "2023-12-10",
    timeNeeded: "09:00",
    duration: 4,
    budget: 200000,
    status: "open",
    userId: "user-001",
    skills: ["Cleaning", "House Maintenance"]
  },
  {
    id: "job-002",
    title: "Deliver Important Documents",
    description: "Need someone to deliver important documents from my office to a client. The documents are ready to be picked up.",
    category: "Delivery",
    location: {
      lat: -6.185971,
      lng: 106.837038,
      address: "Kuningan, Jakarta Selatan"
    },
    datePosted: "2023-12-02",
    dateNeeded: "2023-12-05",
    timeNeeded: "13:00",
    duration: 2,
    budget: 100000,
    status: "assigned",
    userId: "user-002",
    kerjaMateId: "km-004",
    skills: ["Delivery", "Errands"]
  },
  {
    id: "job-003",
    title: "Fix Kitchen Sink Leak",
    description: "The kitchen sink has a leak underneath. Need someone with plumbing experience to fix it. Materials will be provided.",
    category: "Repair",
    location: {
      lat: -6.165971,
      lng: 106.817038,
      address: "Pluit, Jakarta Utara"
    },
    datePosted: "2023-12-01",
    dateNeeded: "2023-12-03",
    timeNeeded: "10:00",
    duration: 2,
    budget: 150000,
    status: "completed",
    userId: "user-003",
    kerjaMateId: "km-003",
    skills: ["Plumbing", "Repair"]
  },
  {
    id: "job-004",
    title: "Cook Dinner for Family Gathering",
    description: "Need someone to prepare dinner for a family gathering of 10 people. The menu can be discussed, but should include appetizers, main course, and dessert.",
    category: "Cooking",
    location: {
      lat: -6.195971,
      lng: 106.847038,
      address: "Jatinegara, Jakarta Timur"
    },
    datePosted: "2023-12-03",
    dateNeeded: "2023-12-15",
    timeNeeded: "16:00",
    duration: 5,
    budget: 350000,
    status: "assigned",
    userId: "user-004",
    kerjaMateId: "km-002",
    skills: ["Cooking", "Meal Preparation"]
  },
  {
    id: "job-005",
    title: "Lawn Mowing and Garden Maintenance",
    description: "Need help with lawn mowing and general garden maintenance for a medium-sized garden. Tools will be provided.",
    category: "Gardening",
    location: {
      lat: -6.205971,
      lng: 106.857038,
      address: "Kebon Jeruk, Jakarta Barat"
    },
    datePosted: "2023-12-02",
    dateNeeded: "2023-12-08",
    timeNeeded: "08:00",
    duration: 3,
    budget: 150000,
    status: "open",
    userId: "user-005",
    skills: ["Gardening", "Lawn Mowing"]
  },
  {
    id: "job-006",
    title: "Babysitting for 2 Children",
    description: "Need a reliable babysitter for 2 children (ages 4 and 6) while parents attend an event. Experience with children required.",
    category: "Childcare",
    location: {
      lat: -6.175971,
      lng: 106.837038,
      address: "Kemang, Jakarta Selatan"
    },
    datePosted: "2023-12-03",
    dateNeeded: "2023-12-09",
    timeNeeded: "18:00",
    duration: 4,
    budget: 200000,
    status: "open",
    userId: "user-006",
    skills: ["Childcare", "Babysitting"]
  },
  {
    id: "job-007",
    title: "Weekly Grocery Shopping",
    description: "Need someone to do weekly grocery shopping for a family of four. Will provide a list and budget.",
    category: "Errands",
    location: {
      lat: -6.185971,
      lng: 106.827038,
      address: "Tebet, Jakarta Selatan"
    },
    datePosted: "2023-12-04",
    dateNeeded: "2023-12-07",
    timeNeeded: "10:00",
    duration: 2,
    budget: 100000,
    status: "open",
    userId: "user-007",
    skills: ["Errands", "Shopping"]
  },
  {
    id: "job-008",
    title: "Paint Living Room Walls",
    description: "Need someone to paint the living room walls (approx. 40 sqm). Paint and supplies will be provided.",
    category: "Home Renovation",
    location: {
      lat: -6.195971,
      lng: 106.857038,
      address: "Cakung, Jakarta Timur"
    },
    datePosted: "2023-12-01",
    dateNeeded: "2023-12-12",
    timeNeeded: "09:00",
    duration: 6,
    budget: 400000,
    status: "assigned",
    userId: "user-008",
    kerjaMateId: "km-005",
    skills: ["House Painting", "Home Renovation"]
  }
]; 