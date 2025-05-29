"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import CategoryCard from "@/components/CategoryCard";
import KerjaMateCard from "@/components/KerjaMateCard";
import HowItWorks from "@/components/HowItWorks";
import { jobCategories } from "@/data/jobCategories";
import { kerjaMates } from "@/data/kerjaMates";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Get top categories (first 4)
  const topCategories = jobCategories.slice(0, 4);
  
  // Get top-rated KerjaMates (first 3)
  const topKerjaMates = [...kerjaMates]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/matches?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Find your trusted <span className="highlight-text">KerjaMate</span> — 
                <br />Fast, Easy, Reliable.
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Connect with skilled local helpers for all your daily tasks, repairs, and errands. 
                <span className="font-semibold text-primary"> Get help when you need it.</span>
              </p>
              
              <form onSubmit={handleSearch} className="flex mb-8">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What do you need help with?"
                  className="w-full px-4 py-3 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button 
                  type="submit" 
                  className="rounded-l-none px-6"
                >
                  Search
                </Button>
              </form>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/post-job">
                  <Button size="lg" className="w-full sm:w-auto">
                    Post a Job
                  </Button>
                </Link>
                <Link href="/matches">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Find KerjaMates
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
              <Image 
                src="https://images.unsplash.com/photo-1521791055366-0d553872125f?q=80&w=1000" 
                alt="Person helping with household task"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">
              Services by <span className="highlight-text">Category</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse through our wide range of services to find the help you need
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topCategories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link href="/categories">
              <Button variant="outline" className="px-8">
                View All Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Top KerjaMates Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">
              Meet Our Top <span className="highlight-text">KerjaMates</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Skilled, reliable, and trusted by our community
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topKerjaMates.map(kerjaMate => (
              <KerjaMateCard key={kerjaMate.id} kerjaMate={kerjaMate} />
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link href="/matches">
              <Button variant="outline" className="px-8">
                Find More KerjaMates
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <HowItWorks />
    </>
  );
}
