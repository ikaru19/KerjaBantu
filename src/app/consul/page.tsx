"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ChatBubbleLeftRightIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  VideoCameraIcon,
  CheckCircleIcon,
  PaperAirplaneIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";
import Button from "@/components/Button";
import Card from "@/components/Card";
import ProfileAvatar from "@/components/ProfileAvatar";

// Sample consultants data
const CONSULTANTS = [
  {
    id: "con-001",
    name: "Sarah Johnson",
    role: "Customer Support Specialist",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    expertise: ["Account Issues", "Payment Problems", "General Support"],
    rating: 4.9,
    status: "online",
    responseTime: "< 5 mins"
  },
  {
    id: "con-002",
    name: "David Chen",
    role: "KerjaMate Liaison",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    expertise: ["KerjaMate Onboarding", "Profile Optimization", "Skill Verification"],
    rating: 4.8,
    status: "online",
    responseTime: "< 10 mins"
  },
  {
    id: "con-003",
    name: "Rina Wijaya",
    role: "Payments Specialist",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    expertise: ["Wallet Issues", "Payment Processing", "Refunds"],
    rating: 4.7,
    status: "away",
    responseTime: "< 30 mins"
  }
];

// Sample FAQs
const FAQS = [
  {
    question: "How do I book a KerjaMate?",
    answer: "You can book a KerjaMate by browsing our directory, selecting a provider that matches your needs, and clicking the 'Hire' button on their profile. You'll then be able to specify your requirements and schedule a time."
  },
  {
    question: "What if I'm not satisfied with the service?",
    answer: "We have a satisfaction guarantee. If you're not happy with the service provided, please contact our support team within 24 hours of service completion, and we'll work to resolve the issue or provide a refund as appropriate."
  },
  {
    question: "How are KerjaMates verified?",
    answer: "All KerjaMates undergo a thorough verification process that includes ID verification, background checks, skills assessment, and training. We also continuously monitor ratings and feedback to ensure quality service."
  },
  {
    question: "How do payments work?",
    answer: "Payments are handled securely through the KerjaBantu wallet. You can top up your wallet using various payment methods, and the funds will be released to the KerjaMate only after you confirm the job has been completed satisfactorily."
  },
  {
    question: "Can I become a KerjaMate?",
    answer: "Yes! If you have skills to offer and want to earn money on your own schedule, you can apply to become a KerjaMate. Visit the 'Become a KerjaMate' section on our website to start the application process."
  }
];

export default function ConsultationPage() {
  const [activeConsultant, setActiveConsultant] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
  
  const toggleFaq = (index: number) => {
    if (selectedFaq === index) {
      setSelectedFaq(null);
    } else {
      setSelectedFaq(index);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get <span className="text-primary">Support</span> & Consultation
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our team of experts is here to help you with any questions or issues you may have
          </p>
        </div>
        
        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="p-8 text-center hover:shadow-lg transition-all duration-300">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <ChatBubbleLeftRightIcon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Live Chat</h3>
            <p className="text-gray-600 mb-6">
              Chat with our support team in real-time for immediate assistance
            </p>
            <Button onClick={() => setActiveConsultant(CONSULTANTS[0].id)}>
              Start Chat
            </Button>
          </Card>
          
          <Card className="p-8 text-center hover:shadow-lg transition-all duration-300">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <PhoneIcon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Phone Support</h3>
            <p className="text-gray-600 mb-6">
              Call our dedicated support line for personalized assistance
            </p>
            <Button variant="outline">
              +62 21 5678 9000
            </Button>
          </Card>
          
          <Card className="p-8 text-center hover:shadow-lg transition-all duration-300">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <EnvelopeIcon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Email Support</h3>
            <p className="text-gray-600 mb-6">
              Send us an email and we'll get back to you within 24 hours
            </p>
            <Button variant="outline">
              support@kerjabantu.com
            </Button>
          </Card>
        </div>
        
        {/* Consultants Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Our Consultation Experts
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CONSULTANTS.map((consultant) => (
              <Card key={consultant.id} className="overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="relative mr-4">
                      <div className="h-16 w-16 relative">
                        <ProfileAvatar
                          src={consultant.avatar}
                          alt={consultant.name}
                          size={64}
                        />
                      </div>
                      <div className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white ${
                        consultant.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{consultant.name}</h3>
                      <p className="text-gray-600 text-sm">{consultant.role}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <div className="w-24">Status:</div>
                      <span className={`capitalize ${
                        consultant.status === 'online' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {consultant.status}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <div className="w-24">Response Time:</div>
                      <span>{consultant.responseTime}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-24">Rating:</div>
                      <span className="flex items-center">
                        {consultant.rating}
                        <svg
                          className="h-4 w-4 text-yellow-500 ml-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 15.585l-7.07 3.707 1.352-7.857L.36 7.04l7.896-1.148L10 0l3.744 5.892L21.64 7.04l-5.922 5.395 1.352 7.857z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Expertise:</p>
                    <div className="flex flex-wrap gap-2">
                      {consultant.expertise.map((skill, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <VideoCameraIcon className="h-4 w-4 mr-1" />
                      Video
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => setActiveConsultant(consultant.id)}
                    >
                      <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1" />
                      Chat
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Chat Interface */}
        {activeConsultant && (
          <div className="fixed bottom-8 right-8 w-80 md:w-96 bg-white rounded-xl shadow-xl overflow-hidden z-50 border border-gray-200">
            <div className="bg-white p-4 text-gray-800 flex items-center justify-between border-b border-gray-200">
              <div className="flex items-center">
                <div className="relative mr-3">
                  <ProfileAvatar
                    src={CONSULTANTS.find(c => c.id === activeConsultant)?.avatar || ""}
                    alt="Consultant"
                    size={40}
                  />
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{CONSULTANTS.find(c => c.id === activeConsultant)?.name}</p>
                  <p className="text-xs text-gray-600">Online | Typically replies in minutes</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveConsultant(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="h-80 overflow-y-auto p-4 bg-white">
              <div className="flex flex-col space-y-3">
                <div className="bg-gray-100 rounded-lg p-3 shadow-sm max-w-[80%] self-start">
                  <p className="text-sm text-gray-800">
                    Hi there! I'm {CONSULTANTS.find(c => c.id === activeConsultant)?.name}. How can I help you today?
                  </p>
                  <p className="text-xs text-gray-500 mt-1">10:05 AM</p>
                </div>
                
                <div className="bg-primary/20 rounded-lg p-3 shadow-sm max-w-[80%] self-end">
                  <p className="text-sm text-gray-800">
                    I have a question about booking a KerjaMate.
                  </p>
                  <p className="text-xs text-gray-500 mt-1">10:06 AM</p>
                </div>
                
                <div className="bg-gray-100 rounded-lg p-3 shadow-sm max-w-[80%] self-start">
                  <p className="text-sm text-gray-800">
                    I'd be happy to help with that! What specific information are you looking for regarding booking a KerjaMate?
                  </p>
                  <p className="text-xs text-gray-500 mt-1">10:07 AM</p>
                </div>
              </div>
            </div>
            
            <div className="p-3 border-t border-gray-200 bg-white">
              <div className="flex items-center">
                <input
                  type="text"
                  className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button 
                  className="ml-2 h-9 w-9 flex items-center justify-center bg-primary rounded-full text-white"
                  disabled={!message.trim()}
                >
                  <PaperAirplaneIcon className="h-5 w-5 transform rotate-90" />
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          
          <Card className="p-0 divide-y divide-gray-100">
            {FAQS.map((faq, index) => (
              <div key={index} className="p-6">
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                  <ChevronRightIcon className={`h-5 w-5 text-gray-400 transition-transform ${
                    selectedFaq === index ? 'transform rotate-90' : ''
                  }`} />
                </button>
                
                {selectedFaq === index && (
                  <div className="mt-3 text-gray-600">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </Card>
          
          {/* Contact Form */}
          <div className="mt-16 bg-white rounded-2xl shadow-md p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Still Have Questions?
            </h2>
            <p className="text-gray-600 mb-8">
              Fill out the form below and our team will get back to you as soon as possible
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                placeholder="What is your question about?"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                placeholder="Please provide details about your inquiry"
              ></textarea>
            </div>
            
            <Button className="w-full sm:w-auto">
              Submit Inquiry
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 