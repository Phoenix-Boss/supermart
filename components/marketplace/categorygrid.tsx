'use client';

interface CategoryCardProps {
  icon: string;
  name: string;
  color: string;
  items: number;
}

export default function CategoryCard({ icon, name, color, items }: CategoryCardProps) {
  return (
    <div 
      className="group relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 aspect-square cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-lg dark:hover:shadow-gray-800/30"
    >
      {/* Background with icon overlay - matches product card layout */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
        {/* Large centered icon */}
        <div className={`text-5xl ${color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}>
          {icon}
        </div>
      </div>

      {/* Bottom overlay info - matches product card styling */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent z-10">
        <h3 className="text-sm font-medium text-white line-clamp-2 mb-1 drop-shadow-md">
          {name}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-300 drop-shadow-md">
              {items.toLocaleString()} items
            </span>
          </div>
          {/* Category indicator - matches the plus icon position */}
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm">
            <span className={`text-sm font-bold ${color}`}>
              {icon}
            </span>
          </div>
        </div>
      </div>

      {/* Hover overlay - matches product card */}
      <div className="absolute inset-0 bg-black/10 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition" />
    </div>
  );
}