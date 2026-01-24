import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Search, 
  MapPin,
  Calendar,
  Users,
  Clock,
  Star,
  TrendingUp,
  DollarSign,
  ChevronRight,
  Heart,
  Share2,
} from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import { TripType } from './SportsTripTypesSelector';

interface SportsPackageListingProps {
  tripType: TripType;
  sportCategory: {
    id: string;
    name: string;
    emoji: string;
  };
  onBack: () => void;
  onSelectPackage: (pkg: SportsPackage) => void;
}

export interface SportsPackage {
  id: string;
  name: string;
  location: string;
  duration: string;
  groupSize: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  highlights: string[];
  inclusions: string[];
  image: string;
  badge?: string;
  popular?: boolean;
}

export function SportsPackageListing({ 
  tripType, 
  sportCategory, 
  onBack, 
  onSelectPackage 
}: SportsPackageListingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'rating'>('popular');

  // Sample packages - in real app, these come from admin
  const packages: SportsPackage[] = [
    {
      id: 'pkg-1',
      name: '[Admin: Package Name 1]',
      location: '[Admin: Location X]',
      duration: '3 Days / 2 Nights',
      groupSize: '8-12 people',
      price: 12500,
      originalPrice: 15000,
      rating: 4.8,
      reviewCount: 124,
      difficulty: 'Moderate',
      highlights: ['Expert Coaching', 'Equipment Included', 'Safety Certified'],
      inclusions: ['Accommodation', 'Meals', 'Training Sessions', 'Transport'],
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
      badge: 'Best Seller',
      popular: true,
    },
    {
      id: 'pkg-2',
      name: '[Admin: Package Name 2]',
      location: '[Admin: Location Y]',
      duration: '5 Days / 4 Nights',
      groupSize: '6-10 people',
      price: 24500,
      originalPrice: 28000,
      rating: 4.9,
      reviewCount: 89,
      difficulty: 'Hard',
      highlights: ['Pro Coaches', 'Premium Gear', 'Video Analysis'],
      inclusions: ['Luxury Stay', 'All Meals', 'Advanced Training', 'Airport Transfer'],
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800',
      badge: 'Premium',
      popular: true,
    },
    {
      id: 'pkg-3',
      name: '[Admin: Package Name 3]',
      location: '[Admin: Location Z]',
      duration: '2 Days / 1 Night',
      groupSize: '10-15 people',
      price: 8500,
      rating: 4.6,
      reviewCount: 156,
      difficulty: 'Easy',
      highlights: ['Beginner Friendly', 'Group Activities', 'Safety First'],
      inclusions: ['Basic Accommodation', 'Breakfast', 'Introduction Sessions'],
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
      badge: 'Great for Beginners',
    },
  ];

  const filteredPackages = packages
    .filter(pkg => 
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
        default:
          return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 pt-12 pb-6 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="flex items-center gap-2 text-white">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back</span>
          </button>
          <button className="text-white">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-white/80 text-sm mb-4">
          <span>Sports Tourism</span>
          <ChevronRight className="w-4 h-4" />
          <span>{sportCategory.name}</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white font-semibold">{tripType.name}</span>
        </div>

        <h1 className="text-white text-3xl font-bold mb-2">{tripType.name}</h1>
        <p className="text-white/90 text-sm mb-4">{tripType.description}</p>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search packages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-full bg-white border-0 shadow-lg text-base"
          />
        </div>
      </div>

      <div className="px-6 -mt-2 pb-8">
        {/* Sort & Filter Bar */}
        <Card className="bg-white rounded-3xl p-4 shadow-xl mb-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-700">
              {filteredPackages.length} Packages Available
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 rounded-full bg-gray-100 text-sm font-medium text-gray-700 border-0 cursor-pointer"
              >
                <option value="popular">Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Package Cards */}
        <div className="space-y-5">
          {filteredPackages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card
                onClick={() => onSelectPackage(pkg)}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer active:scale-[0.98]"
              >
                {/* Package Image */}
                <div className="relative h-48 bg-gray-200">
                  <img 
                    src={pkg.image} 
                    alt={pkg.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Badge */}
                  {pkg.badge && (
                    <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      {pkg.badge}
                    </div>
                  )}

                  {/* Favorite Button */}
                  <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all">
                    <Heart className="w-5 h-5 text-gray-700" />
                  </button>

                  {/* Difficulty Badge */}
                  <div className={`absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
                    pkg.difficulty === 'Easy' ? 'bg-green-500 text-white' :
                    pkg.difficulty === 'Moderate' ? 'bg-yellow-500 text-white' :
                    'bg-red-500 text-white'
                  }`}>
                    {pkg.difficulty}
                  </div>
                </div>

                {/* Package Details */}
                <div className="p-5">
                  {/* Title & Rating */}
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-xl text-gray-900 flex-1 pr-2">{pkg.name}</h3>
                    <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg flex-shrink-0">
                      <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                      <span className="font-bold text-sm text-gray-900">{pkg.rating}</span>
                      <span className="text-xs text-gray-500">({pkg.reviewCount})</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{pkg.location}</span>
                  </div>

                  {/* Quick Info */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      <span>{pkg.groupSize}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {pkg.highlights.map((highlight, hIdx) => (
                      <span
                        key={hIdx}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      {pkg.originalPrice && (
                        <span className="text-sm text-gray-400 line-through mr-2">
                          ₹{pkg.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-orange-600">
                          ₹{pkg.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500">per person</span>
                      </div>
                    </div>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all">
                      View Details
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredPackages.length === 0 && (
          <Card className="bg-white rounded-3xl p-12 text-center">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">No Packages Found</h3>
            <p className="text-gray-500">Try adjusting your search</p>
          </Card>
        )}
      </div>
    </div>
  );
}
