'use client';

interface CategoryCardProps {
  icon: string;
  name: string;
  color: string;
  items: number;
}

export default function CategoryCard({ icon, name, color, items }: CategoryCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex flex-col items-center text-center">
        {/* Icon Container */}
        <div className={`mb-4 w-16 h-16 rounded-full flex items-center justify-center text-3xl ${color} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        
        {/* Category Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
          {name}
        </h3>
        
        {/* Item Count */}
        <p className="text-sm text-gray-500">
          {items.toLocaleString()} items
        </p>
        
        {/* Shop Now Link */}
        <div className="mt-4 inline-flex items-center text-sm font-medium text-orange-600 group-hover:text-orange-700 transition-colors">
          Shop Now
          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
      
      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
    </div>
  );
}