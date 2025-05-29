import React from 'react';
import Link from 'next/link';
import Button from '@/components/Button';

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">
            How <span className="highlight-text">KerjaBantu</span> Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get help in just three simple steps
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card p-8 text-center hover:translate-y-[-5px] transition-all duration-300">
            <div className="h-16 w-16 bg-gradient-to-r from-[#FF3B30] to-[#FF5E54] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Post Your Job</h3>
            <p className="text-gray-600">
              Describe what you need help with, set your budget, and choose when you need it done.
            </p>
          </div>
          
          <div className="card p-8 text-center hover:translate-y-[-5px] transition-all duration-300">
            <div className="h-16 w-16 bg-gradient-to-r from-[#FF3B30] to-[#FF5E54] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Match with a KerjaMate</h3>
            <p className="text-gray-600">
              We'll find the best KerjaMates for your job based on skills, availability, and location.
            </p>
          </div>
          
          <div className="card p-8 text-center hover:translate-y-[-5px] transition-all duration-300">
            <div className="h-16 w-16 bg-gradient-to-r from-[#FF3B30] to-[#FF5E54] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Get Your Job Done</h3>
            <p className="text-gray-600">
              Your KerjaMate will arrive at the scheduled time to complete your job efficiently.
            </p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/post-job">
            <Button size="lg" className="px-10 py-3 text-lg">
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 