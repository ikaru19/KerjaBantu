export interface ChatMessage {
  id: string;
  sender: 'user' | 'mentor';
  text: string;
  timestamp: Date;
}

export interface ChatResponse {
  message: string;
  followUp?: string[];
}

export type ChatTopic = 'general' | 'career' | 'skills' | 'pricing' | 'safety';

export const chatResponses: Record<ChatTopic, Record<string, ChatResponse>> = {
  general: {
    'how does kerjabantu work': {
      message: "KerjaBantu connects you with reliable KerjaMates for your daily help needs. Simply post a job, get matched with qualified KerjaMates, and hire the one you like. All payments are handled securely through our platform!",
      followUp: ['What kinds of jobs can I post?', 'How much does it cost?', 'How do I become a KerjaMate?']
    },
    'who are kerjabantus kerjaMates': {
      message: "KerjaMates are our trusted community of skilled helpers. Each KerjaMate undergoes a verification process and builds their reputation through reviews and completed jobs. Many are professionals looking for flexible work or people with specific skills wanting to earn extra income.",
      followUp: ['How do you verify KerjaMates?', 'What if I have a bad experience?', 'How do I become a KerjaMate?']
    },
    'how do i get started': {
      message: "Getting started is easy! Create an account, browse available KerjaMates or post a specific job. You can search by skill, check ratings and reviews, and hire the perfect match for your needs. If you're looking to become a KerjaMate, you can apply through the 'Become a KerjaMate' section on our website.",
      followUp: ['How do I post a job?', 'How quickly can I find help?', 'Is there a mobile app?']
    }
  },
  career: {
    'how do i become a kerjamate': {
      message: "To become a KerjaMate, click the 'KerjaMate Dashboard' button and complete your profile with your skills, experience, and availability. You'll need to verify your identity and pass a background check. Once approved, you can start accepting jobs that match your skills!",
      followUp: ['How much can I earn?', 'What skills are in demand?', 'Do I need special qualifications?']
    },
    'how much can i earn as a kerjamate': {
      message: "Earnings vary based on your skills, experience, and how many hours you work. Most KerjaMates earn between Rp 40,000 to Rp 60,000 per hour. Top-rated KerjaMates with specialized skills can earn more. You set your own rates and keep 85% of what you earn - KerjaBantu takes a 15% service fee.",
      followUp: ['Which skills earn the most?', 'How often will I get work?', 'When do I get paid?']
    },
    'what skills are most in demand': {
      message: "Currently, the most in-demand skills are cleaning, handyman services, delivery, childcare, and cooking. Technical skills like electrical repairs and plumbing are also highly sought after and often command higher rates. Consider your existing skills and what you enjoy doing!",
      followUp: ['Should I learn new skills?', 'How do I showcase my skills?', 'Do I need certifications?']
    }
  },
  skills: {
    'how can i improve my skills': {
      message: "We offer free training modules for KerjaMates in the Dashboard. You can learn customer service, time management, and skill-specific techniques. We also recommend online courses from platforms like Skill Academy or Prakerja for specialized skills that can help you earn more.",
      followUp: ['Which skills should I learn first?', 'Are there certifications I should get?', 'How do I show my skills to clients?']
    },
    'what training do you offer': {
      message: "Our KerjaMate training program includes modules on professional conduct, customer service excellence, safety procedures, and time management. We also offer skill-specific modules for popular categories like cleaning, childcare, and basic home repairs. All training is free and available in your Dashboard.",
      followUp: ['How long does training take?', 'Will training help me earn more?', 'Are there advanced courses?']
    },
    'how do i get better reviews': {
      message: "Great reviews come from exceeding expectations! Communicate clearly, arrive on time, be professional, and do thorough work. Ask clients what success looks like before you start. Also, make sure your profile accurately reflects your skills so you're matched with jobs you can excel at.",
      followUp: ['What if I get a bad review?', 'How many reviews do I need?', 'Should I ask for reviews?']
    }
  },
  pricing: {
    'how should i price my services': {
      message: "Start by researching what others with similar skills charge in your area. Consider your experience level and any specialized skills you have. For beginners, starting slightly below market rate helps build reviews, then you can gradually increase. Remember to account for travel time and any materials you provide.",
      followUp: ["What's the average rate for my skill?", "Should I offer packages?", "Can I negotiate rates?"]
    },
    'should i charge hourly or fixed price': {
      message: "For most services, hourly rates work best as they protect you if jobs take longer than expected. Fixed prices work well for standardized tasks where you know exactly how long they'll take. For complex jobs, consider a base rate plus hourly to protect yourself from scope creep.",
      followUp: ["How do I track my hours?", "What if a job takes longer than expected?", "How do I handle client objections to my rates?"]
    },
    'how do fees work': {
      message: "KerjaBantu takes a 15% service fee from each job. This covers our platform costs, payment processing, customer support, and marketing to bring you more clients. The fee is automatically deducted, so the amount you see in job offers is what you'll receive after our fee is applied.",
      followUp: ["Are there any other costs?", "Do fees decrease over time?", "What do I get for the service fee?"]
    }
  },
  safety: {
    'how do you ensure safety': {
      message: "Safety is our priority! All KerjaMates undergo identity verification and background checks. Users can see verified badges, reviews, and ratings. Our platform includes an SOS button in case of emergencies, and all communications and payments happen through our platform for transparency and security.",
      followUp: ['What should I do in an emergency?', 'How are background checks done?', 'Can I block problematic clients?']
    },
    'what should i do if i feel unsafe': {
      message: "Your safety comes first. If you ever feel unsafe, leave the situation immediately and find a safe location. Use the SOS button in the app to alert our safety team. You can also call emergency services at 112. After you're safe, report the incident to us, and we'll investigate and take appropriate action.",
      followUp: ['Will I still get paid if I leave?', 'How do I report a client?', 'What happens after I report someone?']
    },
    'what insurance or protection do you provide': {
      message: "KerjaMates are covered by our Protection Guarantee, which includes liability coverage up to Rp 10,000,000 for accidental damage during service provision. We also offer incident support if something goes wrong. Remember to follow safety guidelines and only perform tasks within your expertise.",
      followUp: ["What doesn't the protection cover?", "Do I need my own insurance?", "How do I file a claim?"]
    }
  }
}; 