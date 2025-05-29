export interface KerjaMate {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
  rating: number;
  skills: string[];
  completedJobs: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  distance: number; // in km
  hourlyRate: number;
  about: string;
  availability: boolean;
  reviews: Review[];
  badges: string[];
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export const kerjaMates: KerjaMate[] = [
  {
    id: "km-001",
    name: "Ahmad Rizal",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    verified: true,
    rating: 4.8,
    skills: ["Cleaning", "Gardening", "House Maintenance"],
    completedJobs: 47,
    location: {
      lat: -6.175971,
      lng: 106.827038,
      address: "Jakarta Pusat"
    },
    distance: 2.3,
    hourlyRate: 45000,
    about: "I have 5 years of experience in residential cleaning and gardening. I'm detail-oriented and always make sure to leave my clients satisfied.",
    availability: true,
    reviews: [
      {
        id: "rev-001",
        userName: "Siti Nuraini",
        rating: 5,
        comment: "Ahmad did an amazing job cleaning my apartment. Very thorough and professional.",
        date: "2023-11-15"
      },
      {
        id: "rev-002",
        userName: "Budi Santoso",
        rating: 4.5,
        comment: "Great work on my garden. Would hire again.",
        date: "2023-10-22"
      }
    ],
    badges: ["Top Cleaner", "Punctual", "Reliable"]
  },
  {
    id: "km-002",
    name: "Dewi Sartika",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    verified: true,
    rating: 4.9,
    skills: ["Cooking", "Childcare", "Errands"],
    completedJobs: 63,
    location: {
      lat: -6.185971,
      lng: 106.837038,
      address: "Jakarta Selatan"
    },
    distance: 3.5,
    hourlyRate: 50000,
    about: "Experienced nanny and cook with over 7 years of experience. I love working with children and preparing healthy, delicious meals.",
    availability: true,
    reviews: [
      {
        id: "rev-003",
        userName: "Rina Marlina",
        rating: 5,
        comment: "Dewi is amazing with my kids! They love her cooking and always ask when she's coming back.",
        date: "2023-12-01"
      },
      {
        id: "rev-004",
        userName: "Joko Widodo",
        rating: 4.8,
        comment: "Dewi prepared a wonderful dinner for our family gathering. Very impressed!",
        date: "2023-11-10"
      }
    ],
    badges: ["Cooking Expert", "Child-Friendly", "Fast Worker"]
  },
  {
    id: "km-003",
    name: "Rudi Hartono",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    verified: true,
    rating: 4.7,
    skills: ["Electrical Repair", "Plumbing", "Furniture Assembly"],
    completedJobs: 35,
    location: {
      lat: -6.165971,
      lng: 106.817038,
      address: "Jakarta Utara"
    },
    distance: 5.1,
    hourlyRate: 60000,
    about: "Certified electrician and handyman. I can fix almost anything in your home, from electrical issues to plumbing problems.",
    availability: false,
    reviews: [
      {
        id: "rev-005",
        userName: "Hendra Gunawan",
        rating: 4.5,
        comment: "Rudi fixed our electrical issues quickly. Very knowledgeable.",
        date: "2023-10-05"
      },
      {
        id: "rev-006",
        userName: "Lina Kusuma",
        rating: 5,
        comment: "Assembled our new furniture perfectly. Would definitely recommend!",
        date: "2023-09-28"
      }
    ],
    badges: ["Certified Electrician", "Problem Solver", "Technical Expert"]
  },
  {
    id: "km-004",
    name: "Maya Wijaya",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    verified: true,
    rating: 4.6,
    skills: ["Delivery", "Shopping", "Errands"],
    completedJobs: 52,
    location: {
      lat: -6.195971,
      lng: 106.847038,
      address: "Jakarta Timur"
    },
    distance: 4.2,
    hourlyRate: 40000,
    about: "Fast and reliable delivery person. I can help with your shopping needs, deliveries, and various errands around the city.",
    availability: true,
    reviews: [
      {
        id: "rev-007",
        userName: "Dian Sastro",
        rating: 4.5,
        comment: "Maya delivered my package on time and was very communicative throughout.",
        date: "2023-11-20"
      },
      {
        id: "rev-008",
        userName: "Tono Sucipto",
        rating: 4.7,
        comment: "Helped me with grocery shopping while I was sick. Very helpful!",
        date: "2023-10-15"
      }
    ],
    badges: ["Fast Delivery", "Reliable", "Good Communication"]
  },
  {
    id: "km-005",
    name: "Budi Prasetyo",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    verified: true,
    rating: 4.5,
    skills: ["House Painting", "Carpentry", "Tiling"],
    completedJobs: 28,
    location: {
      lat: -6.205971,
      lng: 106.857038,
      address: "Jakarta Barat"
    },
    distance: 6.8,
    hourlyRate: 55000,
    about: "Experienced in home renovation projects. My specialty is painting, carpentry, and tiling work. I take pride in transforming spaces.",
    availability: true,
    reviews: [
      {
        id: "rev-009",
        userName: "Agus Dermawan",
        rating: 4.3,
        comment: "Budi painted our living room and did a great job. The finish looks professional.",
        date: "2023-09-10"
      },
      {
        id: "rev-010",
        userName: "Nina Haryanti",
        rating: 4.7,
        comment: "Excellent tiling work in our bathroom. Very neat and clean.",
        date: "2023-08-22"
      }
    ],
    badges: ["Renovation Expert", "Detail-Oriented", "Clean Worker"]
  }
]; 