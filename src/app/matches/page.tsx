"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import KerjaMateCard from "@/components/KerjaMateCard";
import Button from "@/components/Button";
import { useStore } from "@/store/useStore";

export default function Matches() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const { kerjaMates, filteredKerjaMates, filterKerjaMatesBySkill, resetKerjaMatesFilter } = useStore();
  
  const [skills, setSkills] = useState<string[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [showAvailable, setShowAvailable] = useState<boolean>(true);
  
  // Extract all unique skills from KerjaMates
  useEffect(() => {
    const allSkills = kerjaMates.flatMap(km => km.skills);
    const uniqueSkills = [...new Set(allSkills)].sort();
    setSkills(uniqueSkills);
  }, [kerjaMates]);
  
  // Apply search query filter if present
  useEffect(() => {
    if (query) {
      filterKerjaMatesBySkill(query);
    } else {
      resetKerjaMatesFilter();
    }
  }, [query, filterKerjaMatesBySkill, resetKerjaMatesFilter]);
  
  // Handle skill filter change
  const handleSkillChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const skill = e.target.value;
    setSelectedSkill(skill);
    
    if (skill) {
      filterKerjaMatesBySkill(skill);
    } else {
      resetKerjaMatesFilter();
    }
  };
  
  // Handle availability filter
  const handleAvailabilityChange = () => {
    setShowAvailable(!showAvailable);
  };
  
  // Filter KerjaMates by availability
  const filteredByAvailability = showAvailable 
    ? filteredKerjaMates.filter(km => km.availability) 
    : filteredKerjaMates;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Find a KerjaMate
        </h1>
        <p className="text-lg text-gray-600">
          Browse our trusted community of KerjaMates to find the perfect match for your job
        </p>
      </div>
      
      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <label htmlFor="skill-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Skill
            </label>
            <select
              id="skill-filter"
              value={selectedSkill}
              onChange={handleSkillChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Skills</option>
              {skills.map((skill, index) => (
                <option key={index} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0">
            <input
              id="available-filter"
              type="checkbox"
              checked={showAvailable}
              onChange={handleAvailabilityChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="available-filter" className="ml-2 text-sm font-medium text-gray-700">
              Available KerjaMates only
            </label>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Button 
              variant="outline" 
              onClick={resetKerjaMatesFilter}
              className="w-full md:w-auto"
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </div>
      
      {/* Results */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredByAvailability.length > 0 ? (
          filteredByAvailability.map(kerjaMate => (
            <KerjaMateCard 
              key={kerjaMate.id} 
              kerjaMate={kerjaMate} 
            />
          ))
        ) : (
          <div className="col-span-full py-16 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No KerjaMates Found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search criteria to find available KerjaMates.
            </p>
            <Button 
              variant="outline" 
              onClick={resetKerjaMatesFilter}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 