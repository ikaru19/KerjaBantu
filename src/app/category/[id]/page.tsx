"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  ChevronRightIcon, 
  ChevronLeftIcon,
  StarIcon,
  MapPinIcon,
  CheckBadgeIcon
} from "@heroicons/react/24/solid";
import Button from "@/components/Button";
import Card from "@/components/Card";
import KerjaMateCard from "@/components/KerjaMateCard";
import { jobCategories } from "@/data/jobCategories";
import { kerjaMates } from "@/data/kerjaMates";
import { 
  FaBroom,
  FaTruck,
  FaWrench,
  FaUtensils,
  FaLeaf,
  FaChild,
  FaShoppingCart,
  FaPaintRoller
} from 'react-icons/fa';

const iconComponents = {
  broom: FaBroom,
  truck: FaTruck,
  wrench: FaWrench,
  utensils: FaUtensils,
  leaf: FaLeaf,
  child: FaChild,
  'shopping-cart': FaShoppingCart,
  'paint-roller': FaPaintRoller
};

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const [category, setCategory] = useState<typeof jobCategories[0] | null>(null);
  const [filteredKerjaMates, setFilteredKerjaMates] = useState<typeof kerjaMates>([]);
  const [sortBy, setSortBy] = useState<'rating' | 'price'>('rating');
  
  // Get the icon component based on the category's icon name
  const IconComponent = category ? iconComponents[category.icon as keyof typeof iconComponents] : null;
  
  useEffect(() => {
    if (params.id) {
      const foundCategory = jobCategories.find(cat => cat.id === params.id);
      
      if (foundCategory) {
        setCategory(foundCategory);
        
        // Filter KerjaMates that can perform this category's tasks
        const relevantKerjaMates = kerjaMates.filter(kerja => 
          kerja.skills.some(skill => 
            foundCategory.popularTasks.includes(skill)
          )
        );
        
        // Sort by rating (default) or price
        const sortedKerjaMates = sortBy === 'rating' 
          ? [...relevantKerjaMates].sort((a, b) => b.rating - a.rating)
          : [...relevantKerjaMates].sort((a, b) => a.hourlyRate - b.hourlyRate);
        
        setFilteredKerjaMates(sortedKerjaMates);
      } else {
        // Category not found, redirect to categories page
        router.push('/categories');
      }
    }
  }, [params.id, router, sortBy]);
  
  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading category...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center text-sm font-medium">
            <Link href="/" className="text-gray-500 hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-400" />
            <Link href="/categories" className="text-gray-500 hover:text-primary transition-colors">
              Categories
            </Link>
            <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-400" />
            <span className="text-primary">{category.name}</span>
          </nav>
        </div>
        
        {/* Category Header */}
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl overflow-hidden mb-10 text-white shadow-lg">
          <div className="p-8 md:p-12">
            <div className="flex items-center mb-4">
              {IconComponent && (
                <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center mr-4">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
              )}
              <h1 className="text-3xl md:text-4xl font-bold">{category.name} Services</h1>
            </div>
            
            <p className="text-lg md:text-xl text-white/90 mb-6 max-w-3xl">
              {category.description}
            </p>
            
            <div className="flex flex-wrap gap-3 mb-6">
              {category.popularTasks.map((task, index) => (
                <span 
                  key={index} 
                  className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium"
                >
                  {task}
                </span>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 inline-flex">
                <span className="text-white/80 mr-2">Average Rate:</span>
                <span className="font-bold text-white">Rp {category.averageHourlyRate.toLocaleString()}/hour</span>
              </div>
              
              <Button 
                variant="light" 
                size="lg" 
                className="sm:ml-auto"
                onClick={() => router.push(`/post-job?category=${encodeURIComponent(category.name)}`)}
              >
                Post a Job in this Category
              </Button>
            </div>
          </div>
        </div>
        
        {/* Filtering and Sorting */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
            Available KerjaMates ({filteredKerjaMates.length})
          </h2>
          
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'rating' | 'price')}
              className="border border-gray-200 rounded-full px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="rating">Top Rated</option>
              <option value="price">Price: Low to High</option>
            </select>
          </div>
        </div>
        
        {/* KerjaMates Grid */}
        {filteredKerjaMates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredKerjaMates.map((kerja) => (
              <KerjaMateCard key={kerja.id} kerjaMate={kerja} />
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center mb-12">
            <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CheckBadgeIcon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No KerjaMates Found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any KerjaMates for this category at the moment.
            </p>
            <Button
              onClick={() => router.push('/post-job')}
            >
              Post a Job to Find KerjaMates
            </Button>
          </Card>
        )}
        
        {/* Related Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Categories</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {jobCategories
              .filter(cat => cat.id !== category.id)
              .slice(0, 4)
              .map(cat => {
                const CategoryIcon = iconComponents[cat.icon as keyof typeof iconComponents];
                return (
                  <Link 
                    key={cat.id} 
                    href={`/category/${cat.id}`}
                    className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:translate-y-[-2px] flex items-center"
                  >
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      {CategoryIcon && <CategoryIcon className="h-5 w-5 text-primary" />}
                    </div>
                    <span className="font-medium text-gray-900">{cat.name}</span>
                  </Link>
                );
              })
            }
          </div>
        </div>
        
        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-12">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Post a Job</h3>
                <p className="text-gray-600">Describe what you need help with, when you need it, and your budget.</p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose a KerjaMate</h3>
                <p className="text-gray-600">Review profiles, ratings, and choose the best match for your job.</p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Your Job Done</h3>
                <p className="text-gray-600">Your KerjaMate will complete the task to your satisfaction.</p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Button 
                size="lg" 
                className="px-8"
                onClick={() => router.push(`/post-job?category=${encodeURIComponent(category.name)}`)}
              >
                Post a Job Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 