export interface JobCategory {
  id: string;
  name: string;
  icon: string; // Icon name from a library
  description: string;
  popularTasks: string[];
  averageHourlyRate: number;
}

export const jobCategories: JobCategory[] = [
  {
    id: "cat-001",
    name: "Cleaning",
    icon: "broom",
    description: "Professional cleaning services for homes and offices",
    popularTasks: [
      "Home deep cleaning",
      "Office cleaning",
      "Window cleaning",
      "Post-construction cleaning"
    ],
    averageHourlyRate: 45000
  },
  {
    id: "cat-002",
    name: "Delivery",
    icon: "truck",
    description: "Fast and reliable delivery services",
    popularTasks: [
      "Package delivery",
      "Grocery delivery",
      "Food delivery",
      "Document delivery"
    ],
    averageHourlyRate: 40000
  },
  {
    id: "cat-003",
    name: "Repair",
    icon: "wrench",
    description: "Home repairs and maintenance services",
    popularTasks: [
      "Electrical repairs",
      "Plumbing fixes",
      "Furniture assembly",
      "Appliance repair"
    ],
    averageHourlyRate: 60000
  },
  {
    id: "cat-004",
    name: "Cooking",
    icon: "utensils",
    description: "Homemade meals and catering services",
    popularTasks: [
      "Meal preparation",
      "Small event catering",
      "Cooking lessons",
      "Special diet cooking"
    ],
    averageHourlyRate: 50000
  },
  {
    id: "cat-005",
    name: "Gardening",
    icon: "leaf",
    description: "Garden maintenance and landscaping",
    popularTasks: [
      "Lawn mowing",
      "Plant care",
      "Garden design",
      "Weed removal"
    ],
    averageHourlyRate: 45000
  },
  {
    id: "cat-006",
    name: "Childcare",
    icon: "child",
    description: "Reliable childcare and babysitting services",
    popularTasks: [
      "Babysitting",
      "After-school care",
      "Child activities",
      "Homework help"
    ],
    averageHourlyRate: 55000
  },
  {
    id: "cat-007",
    name: "Errands",
    icon: "shopping-cart",
    description: "Help with daily errands and shopping",
    popularTasks: [
      "Grocery shopping",
      "Prescription pickup",
      "Bill payments",
      "Queue services"
    ],
    averageHourlyRate: 40000
  },
  {
    id: "cat-008",
    name: "Home Renovation",
    icon: "paint-roller",
    description: "Home renovation and improvement services",
    popularTasks: [
      "Painting",
      "Tiling",
      "Carpentry",
      "Small renovations"
    ],
    averageHourlyRate: 55000
  }
]; 