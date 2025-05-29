"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { jobCategories } from "@/data/jobCategories";
import Card from "@/components/Card";
import CategoryCard from "@/components/CategoryCard";

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter categories based on search query
  const filteredCategories = jobCategories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Browse <span className="text-primary">Services</span> Categories
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of service categories and find the perfect KerjaMate for your needs
          </p>
        </div>
        
        {/* Search */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="Search for a service category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <Link key={category.id} href={`/category/${category.id}`}>
                <CategoryCard category={category} />
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-5xl mb-4">😕</div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No categories found</h3>
              <p className="text-gray-500">
                Try adjusting your search or browse all categories
              </p>
              <button 
                onClick={() => setSearchQuery("")}
                className="mt-4 text-primary hover:text-primary-dark transition-colors"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
        
        {/* Featured Services */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Popular Service Requests
          </h2>
          
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100">
                <h3 className="font-semibold text-lg mb-3">Home Cleaning</h3>
                <p className="text-gray-600 mb-4">
                  Professional home cleaning services for apartments, houses, and more.
                </p>
                <ul className="space-y-2">
                  <li className="text-sm text-gray-600">• Deep cleaning</li>
                  <li className="text-sm text-gray-600">• Regular maintenance</li>
                  <li className="text-sm text-gray-600">• Move-in/move-out cleaning</li>
                </ul>
              </div>
              
              <div className="p-6 border-b md:border-b-0 lg:border-r border-gray-100">
                <h3 className="font-semibold text-lg mb-3">Furniture Assembly</h3>
                <p className="text-gray-600 mb-4">
                  Expert assembly of all types of furniture for your home or office.
                </p>
                <ul className="space-y-2">
                  <li className="text-sm text-gray-600">• IKEA furniture assembly</li>
                  <li className="text-sm text-gray-600">• Desk and chair assembly</li>
                  <li className="text-sm text-gray-600">• Shelving and cabinet installation</li>
                </ul>
              </div>
              
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-3">Handyman Services</h3>
                <p className="text-gray-600 mb-4">
                  Versatile handyman services for all your home repair and maintenance needs.
                </p>
                <ul className="space-y-2">
                  <li className="text-sm text-gray-600">• Minor electrical repairs</li>
                  <li className="text-sm text-gray-600">• Plumbing fixes</li>
                  <li className="text-sm text-gray-600">• General home repairs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* How It Works */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How KerjaBantu Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Finding and hiring help has never been easier. Complete your tasks with just a few simple steps.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Choose a Category</h3>
              <p className="text-gray-600">
                Browse through our service categories and select the one that matches your needs.
              </p>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Find a KerjaMate</h3>
              <p className="text-gray-600">
                Search through profiles, compare ratings, and find the perfect KerjaMate for your job.
              </p>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Book & Get It Done</h3>
              <p className="text-gray-600">
                Book your KerjaMate, confirm details, and enjoy hassle-free service completion.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 