"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import { useStore } from "@/store/useStore";
import { jobCategories } from "@/data/jobCategories";
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';

export default function PostJob() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const kerjaMateId = searchParams.get("kerjaMateId");
  
  const { jobFormData, updateJobFormData, resetJobFormData, submitJob, getKerjaMateById } = useStore();
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [allSkills, setAllSkills] = useState<string[]>([]);
  
  // Reset form on page load
  useEffect(() => {
    resetJobFormData();
    
    // Extract all unique skills from job categories
    const skillsSet = new Set<string>();
    jobCategories.forEach(category => {
      category.popularTasks.forEach(task => skillsSet.add(task));
    });
    setAllSkills(Array.from(skillsSet).sort());
    
    // If kerjaMateId is provided, populate form with KerjaMate's skills
    if (kerjaMateId) {
      const kerjaMate = getKerjaMateById(kerjaMateId);
      if (kerjaMate) {
        setSelectedSkills(kerjaMate.skills);
        updateJobFormData({ skills: kerjaMate.skills });
      }
    }
    
    // Log form data for debugging
    console.log("Initial job form data:", jobFormData);
  }, [resetJobFormData, kerjaMateId, getKerjaMateById, updateJobFormData]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle nested objects (like location.address)
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      updateJobFormData({ 
        [parent]: { 
          ...jobFormData[parent as keyof typeof jobFormData] as any, 
          [child]: value 
        } 
      });
      
      // Clear error for the nested property
      if (formErrors[name]) {
        setFormErrors(prev => {
          const updated = { ...prev };
          delete updated[name];
          return updated;
        });
      }
    } else {
      updateJobFormData({ [name]: value });
      
      // Clear error for this field
      if (formErrors[name]) {
        setFormErrors(prev => {
          const updated = { ...prev };
          delete updated[name];
          return updated;
        });
      }
    }
  };
  
  const handleSkillToggle = (skill: string) => {
    let updatedSkills: string[];
    
    if (selectedSkills.includes(skill)) {
      updatedSkills = selectedSkills.filter(s => s !== skill);
    } else {
      updatedSkills = [...selectedSkills, skill];
    }
    
    setSelectedSkills(updatedSkills);
    updateJobFormData({ skills: updatedSkills });
    
    // Clear skills error if present
    if (formErrors.skills) {
      setFormErrors(prev => {
        const updated = { ...prev };
        delete updated.skills;
        return updated;
      });
    }
  };
  
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!jobFormData.title.trim()) {
      errors.title = "Job title is required";
    }
    
    if (!jobFormData.description.trim()) {
      errors.description = "Job description is required";
    }
    
    if (!jobFormData.category) {
      errors.category = "Please select a category";
    }
    
    if (!jobFormData.location.address.trim()) {
      errors["location.address"] = "Location is required";
    }
    
    if (!jobFormData.dateNeeded) {
      errors.dateNeeded = "Date is required";
    }
    
    if (!jobFormData.timeNeeded) {
      errors.timeNeeded = "Time is required";
    }
    
    if (jobFormData.duration <= 0) {
      errors.duration = "Duration must be greater than 0";
    }
    
    if (jobFormData.budget <= 0) {
      errors.budget = "Budget must be greater than 0";
    }
    
    if (jobFormData.skills.length === 0) {
      errors.skills = "Please select at least one skill";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const jobId = submitJob();
      router.push(`/matches?jobId=${jobId}`);
    } else {
      // Scroll to the first error
      const firstErrorField = document.querySelector('[data-error]');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-primary/10 rounded-2xl mb-4">
            <ClipboardDocumentCheckIcon className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Post a <span className="highlight-text">Job</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Fill out the form below to post a job and find the perfect KerjaMate for your needs
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-md overflow-hidden p-8 border border-gray-100">
          <form onSubmit={handleSubmit}>
            {/* Job Title */}
            <div className="mb-6" data-error={formErrors.title ? true : undefined}>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Job Title<span className="text-primary">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={jobFormData.title}
                onChange={handleInputChange}
                className={`w-full p-3 border ${formErrors.title ? 'border-red-500' : 'border-gray-300'} rounded-full focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900`}
                placeholder="e.g. House Cleaning for 3-Bedroom Apartment"
              />
              {formErrors.title && (
                <p className="mt-1 text-sm text-red-500">{formErrors.title}</p>
              )}
            </div>
            
            {/* Job Description */}
            <div className="mb-6" data-error={formErrors.description ? true : undefined}>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Job Description<span className="text-primary">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={jobFormData.description}
                onChange={handleInputChange}
                rows={4}
                className={`w-full p-3 border ${formErrors.description ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900`}
                placeholder="Describe what you need help with in detail..."
              />
              {formErrors.description && (
                <p className="mt-1 text-sm text-red-500">{formErrors.description}</p>
              )}
            </div>
            
            {/* Category */}
            <div className="mb-6" data-error={formErrors.category ? true : undefined}>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category<span className="text-primary">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={jobFormData.category}
                onChange={handleInputChange}
                className={`w-full p-3 border ${formErrors.category ? 'border-red-500' : 'border-gray-300'} rounded-full focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900`}
              >
                <option value="">Select a category</option>
                {jobCategories.map(category => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              {formErrors.category && (
                <p className="mt-1 text-sm text-red-500">{formErrors.category}</p>
              )}
            </div>
            
            {/* Location */}
            <div className="mb-6" data-error={formErrors["location.address"] ? true : undefined}>
              <label htmlFor="location-address" className="block text-sm font-medium text-gray-700 mb-1">
                Location<span className="text-primary">*</span>
              </label>
              <input
                type="text"
                id="location-address"
                name="location.address"
                value={jobFormData.location.address}
                onChange={handleInputChange}
                className={`w-full p-3 border ${formErrors["location.address"] ? 'border-red-500' : 'border-gray-300'} rounded-full focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900`}
                placeholder="Enter your address or location"
              />
              {formErrors["location.address"] && (
                <p className="mt-1 text-sm text-red-500">{formErrors["location.address"]}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">Current value: "{jobFormData.location.address}"</p>
            </div>
            
            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div data-error={formErrors.dateNeeded ? true : undefined}>
                <label htmlFor="dateNeeded" className="block text-sm font-medium text-gray-700 mb-1">
                  Date Needed<span className="text-primary">*</span>
                </label>
                <input
                  type="date"
                  id="dateNeeded"
                  name="dateNeeded"
                  value={jobFormData.dateNeeded}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full p-3 border ${formErrors.dateNeeded ? 'border-red-500' : 'border-gray-300'} rounded-full focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900`}
                />
                {formErrors.dateNeeded && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.dateNeeded}</p>
                )}
              </div>
              
              <div data-error={formErrors.timeNeeded ? true : undefined}>
                <label htmlFor="timeNeeded" className="block text-sm font-medium text-gray-700 mb-1">
                  Time Needed<span className="text-primary">*</span>
                </label>
                <input
                  type="time"
                  id="timeNeeded"
                  name="timeNeeded"
                  value={jobFormData.timeNeeded}
                  onChange={handleInputChange}
                  className={`w-full p-3 border ${formErrors.timeNeeded ? 'border-red-500' : 'border-gray-300'} rounded-full focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900`}
                />
                {formErrors.timeNeeded && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.timeNeeded}</p>
                )}
              </div>
            </div>
            
            {/* Duration & Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div data-error={formErrors.duration ? true : undefined}>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (hours)<span className="text-primary">*</span>
                </label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={jobFormData.duration}
                  onChange={handleInputChange}
                  min="1"
                  step="0.5"
                  className={`w-full p-3 border ${formErrors.duration ? 'border-red-500' : 'border-gray-300'} rounded-full focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900`}
                />
                {formErrors.duration && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.duration}</p>
                )}
              </div>
              
              <div data-error={formErrors.budget ? true : undefined}>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                  Budget (Rp)<span className="text-primary">*</span>
                </label>
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  value={jobFormData.budget}
                  onChange={handleInputChange}
                  min="10000"
                  step="10000"
                  className={`w-full p-3 border ${formErrors.budget ? 'border-red-500' : 'border-gray-300'} rounded-full focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900`}
                />
                {formErrors.budget && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.budget}</p>
                )}
              </div>
            </div>
            
            {/* Skills */}
            <div className="mb-8" data-error={formErrors.skills ? true : undefined}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Required Skills<span className="text-primary">*</span>
              </label>
              <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-xl border border-gray-200">
                {allSkills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleSkillToggle(skill)}
                    className={`px-3 py-2 text-sm rounded-full transition-all duration-200 ${
                      selectedSkills.includes(skill)
                        ? 'bg-gradient-to-r from-[#FF3B30] to-[#FF5E54] text-white shadow-sm'
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
              {formErrors.skills && (
                <p className="mt-2 text-sm text-red-500">{formErrors.skills}</p>
              )}
            </div>
            
            <div className="flex justify-center mt-10">
              <Button
                type="submit"
                size="lg"
                className="px-10 py-3 text-lg shadow-md"
              >
                Post Job
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 