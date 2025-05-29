import { UserPersona } from "@/store/useStore";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  walletBalance: number;
  subscription: "free" | "basic" | "pro" | null;
  jobsPosted: string[]; // job IDs
  favoriteKerjaMates: string[]; // KerjaMate IDs
  userPersona?: UserPersona;
}

export const users: User[] = [
  {
    id: "user-001",
    name: "Siti Nuraini",
    email: "siti.nuraini@example.com",
    phone: "+62812345678",
    avatar: "https://randomuser.me/api/portraits/women/11.jpg",
    address: "Menteng, Jakarta Pusat",
    walletBalance: 500000,
    subscription: "basic",
    jobsPosted: ["job-001"],
    favoriteKerjaMates: ["km-001", "km-003"]
  },
  {
    id: "user-002",
    name: "Budi Santoso",
    email: "budi.santoso@example.com",
    phone: "+62823456789",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    address: "Kuningan, Jakarta Selatan",
    walletBalance: 250000,
    subscription: "free",
    jobsPosted: ["job-002"],
    favoriteKerjaMates: ["km-004"]
  },
  {
    id: "user-003",
    name: "Hendra Gunawan",
    email: "hendra.gunawan@example.com",
    phone: "+62834567890",
    avatar: "https://randomuser.me/api/portraits/men/13.jpg",
    address: "Pluit, Jakarta Utara",
    walletBalance: 750000,
    subscription: "pro",
    jobsPosted: ["job-003"],
    favoriteKerjaMates: ["km-003", "km-005"]
  },
  {
    id: "user-004",
    name: "Rina Marlina",
    email: "rina.marlina@example.com",
    phone: "+62845678901",
    avatar: "https://randomuser.me/api/portraits/women/14.jpg",
    address: "Jatinegara, Jakarta Timur",
    walletBalance: 350000,
    subscription: "basic",
    jobsPosted: ["job-004"],
    favoriteKerjaMates: ["km-002"]
  },
  {
    id: "user-005",
    name: "Joko Widodo",
    email: "joko.widodo@example.com",
    phone: "+62856789012",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    address: "Kebon Jeruk, Jakarta Barat",
    walletBalance: 600000,
    subscription: "basic",
    jobsPosted: ["job-005"],
    favoriteKerjaMates: ["km-001", "km-005"]
  },
  {
    id: "user-006",
    name: "Dian Sastro",
    email: "dian.sastro@example.com",
    phone: "+62867890123",
    avatar: "https://randomuser.me/api/portraits/women/16.jpg",
    address: "Kemang, Jakarta Selatan",
    walletBalance: 300000,
    subscription: "free",
    jobsPosted: ["job-006"],
    favoriteKerjaMates: ["km-002", "km-004"]
  },
  {
    id: "user-007",
    name: "Tono Sucipto",
    email: "tono.sucipto@example.com",
    phone: "+62878901234",
    avatar: "https://randomuser.me/api/portraits/men/17.jpg",
    address: "Tebet, Jakarta Selatan",
    walletBalance: 150000,
    subscription: null,
    jobsPosted: ["job-007"],
    favoriteKerjaMates: ["km-004"]
  },
  {
    id: "user-008",
    name: "Lina Kusuma",
    email: "lina.kusuma@example.com",
    phone: "+62889012345",
    avatar: "https://randomuser.me/api/portraits/women/18.jpg",
    address: "Cakung, Jakarta Timur",
    walletBalance: 450000,
    subscription: "pro",
    jobsPosted: ["job-008"],
    favoriteKerjaMates: ["km-003", "km-005"]
  }
]; 