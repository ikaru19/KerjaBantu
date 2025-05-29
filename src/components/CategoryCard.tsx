import { FC } from 'react';
import Link from 'next/link';
import { JobCategory } from '@/data/jobCategories';
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
import Card from './Card';

interface CategoryCardProps {
  category: JobCategory;
  className?: string;
}

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

const CategoryCard: FC<CategoryCardProps> = ({ category, className = '' }) => {
  // Get the icon component based on the category's icon name
  const IconComponent = iconComponents[category.icon as keyof typeof iconComponents];
  
  return (
    <Link href={`/category/${category.id}`}>
      <Card hoverable className={`p-6 ${className}`}>
        <div className="flex items-center">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-[#FF3B30]/10 to-[#FF5E54]/10 flex items-center justify-center mr-4 shadow-sm">
            {IconComponent && <IconComponent className="h-7 w-7 text-primary" />}
          </div>
          
          <div>
            <h3 className="font-semibold text-lg font-montserrat">{category.name}</h3>
            <p className="text-sm text-gray-500">{category.description}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700">Popular tasks:</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {category.popularTasks.slice(0, 2).map((task, index) => (
              <span 
                key={index} 
                className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700 font-medium"
              >
                {task}
              </span>
            ))}
            {category.popularTasks.length > 2 && (
              <span className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium">
                +{category.popularTasks.length - 2} more
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-4 text-sm">
          <span className="font-bold text-primary">Rp {category.averageHourlyRate.toLocaleString()}</span>
          <span className="text-gray-500">/hour</span>
        </div>
      </Card>
    </Link>
  );
};

export default CategoryCard; 