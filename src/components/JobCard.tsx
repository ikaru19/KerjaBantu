import { FC } from 'react';
import Link from 'next/link';
import { Job } from '@/data/jobs';
import { CalendarIcon, ClockIcon, MapPinIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import Card from './Card';
import Button from './Button';

interface JobCardProps {
  job: Job;
  className?: string;
  showApplyButton?: boolean;
}

const JobCard: FC<JobCardProps> = ({ 
  job, 
  className = '',
  showApplyButton = true 
}) => {
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Status badge styles
  const statusStyles = {
    open: 'bg-green-100 text-green-800',
    assigned: 'bg-blue-100 text-blue-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800'
  };
  
  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex justify-between">
        <h3 className="font-semibold text-lg">{job.title}</h3>
        <span className={`px-2 py-1 text-xs rounded-full ${statusStyles[job.status]}`}>
          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{job.description}</p>
      
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="flex items-center">
          <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-sm text-gray-600">{formatDate(job.dateNeeded)}</span>
        </div>
        
        <div className="flex items-center">
          <ClockIcon className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-sm text-gray-600">{job.timeNeeded}, {job.duration} hr</span>
        </div>
        
        <div className="flex items-center">
          <MapPinIcon className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-sm text-gray-600">{job.location.address}</span>
        </div>
        
        <div className="flex items-center">
          <CurrencyDollarIcon className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-sm text-gray-600">Rp {job.budget.toLocaleString()}</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-4">
        {job.skills.map((skill, index) => (
          <span 
            key={index} 
            className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
          >
            {skill}
          </span>
        ))}
      </div>
      
      {job.status === 'open' && showApplyButton && (
        <div className="mt-4 flex justify-end">
          <Link href={`/job/${job.id}`}>
            <Button size="sm">View Details</Button>
          </Link>
        </div>
      )}
    </Card>
  );
};

export default JobCard; 