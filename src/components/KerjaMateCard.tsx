import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { KerjaMate } from '@/data/kerjaMates';
import { StarIcon, CheckBadgeIcon, MapPinIcon } from '@heroicons/react/24/solid';
import Button from './Button';
import Card from './Card';

interface KerjaMateCardProps {
  kerjaMate: KerjaMate;
  showHireButton?: boolean;
  className?: string;
}

const KerjaMateCard: FC<KerjaMateCardProps> = ({
  kerjaMate,
  showHireButton = true,
  className = '',
}) => {
  return (
    <Card hoverable className={`${className}`}>
      <div className="p-5">
        <div className="flex items-start">
          <div className="relative h-20 w-20 mr-4 rounded-2xl overflow-hidden shadow-md">
            <Image
              src={kerjaMate.avatar}
              alt={kerjaMate.name}
              width={80}
              height={80}
              className="object-cover"
              unoptimized
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center">
              <h3 className="text-lg font-bold font-montserrat">{kerjaMate.name}</h3>
              {kerjaMate.verified && (
                <CheckBadgeIcon className="h-5 w-5 text-primary ml-1" aria-label="Verified" />
              )}
            </div>
            
            <div className="flex items-center mt-1">
              <div className="bg-yellow-100 px-2 py-0.5 rounded-full flex items-center">
                <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-sm font-medium text-gray-700">{kerjaMate.rating}</span>
              </div>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-sm text-gray-500">{kerjaMate.completedJobs} jobs completed</span>
            </div>
            
            <div className="flex items-center mt-1">
              <MapPinIcon className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-sm text-gray-500">{kerjaMate.location.address} ({kerjaMate.distance} km)</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {kerjaMate.skills.slice(0, 3).map((skill, index) => (
              <span 
                key={index} 
                className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700 font-medium"
              >
                {skill}
              </span>
            ))}
            {kerjaMate.skills.length > 3 && (
              <span className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium">
                +{kerjaMate.skills.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-5 flex justify-between items-center">
          <div className="text-sm">
            <span className="font-bold text-primary text-lg">Rp {kerjaMate.hourlyRate.toLocaleString()}</span>
            <span className="text-gray-500">/hour</span>
          </div>
          
          {showHireButton && (
            <div className="flex space-x-2">
              <Link href={`/kerjamate/${kerjaMate.id}`}>
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              </Link>
              <Link href={`/hire/${kerjaMate.id}`}>
                <Button size="sm">
                  Hire
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default KerjaMateCard; 