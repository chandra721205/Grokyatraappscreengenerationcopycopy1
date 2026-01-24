import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Search, 
  Filter,
  MapPin,
  Calendar,
  Users,
  Trophy,
  Ticket,
  GraduationCap,
  Landmark,
  Medal,
  Mountain,
  Bike,
  Waves,
  Flag,
  ChevronRight,
  DollarSign,
} from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';

interface SportsTripTypesSelectorProps {
  sportCategory: {
    id: string;
    name: string;
    emoji: string;
    sports: string[];
  };
  onBack: () => void;
  onSelectTripType: (tripType: TripType) => void;
}

export interface TripType {
  id: string;
  name: string;
  description: string;
  icon: any;
  tags: string[];
  priceRange: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  season: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export function SportsTripTypesSelector({ 
  sportCategory, 
  onBack, 
  onSelectTripType 
}: SportsTripTypesSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [seasonFilter, setSeasonFilter] = useState<string>('all');

  // 9 SPORTS TRIP TYPES - Bookable Travel Packages
  const tripTypes: TripType[] = [
    {
      id: 'stadium-tours',
      name: 'Stadium Tours',
      description: 'Visit famous stadiums, locker rooms & museums. Behind-the-scenes access.',
      icon: Trophy,
      tags: ['Fans', 'Families', 'Photo Ops'],
      priceRange: '₹2,500 - ₹8,000',
      difficulty: 'Easy',
      season: 'Year-round',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      id: 'live-matches',
      name: 'Live Matches & Tickets',
      description: 'Match ticket + Travel + Stay packages. Watch Cricket World Cup, ISL & more.',
      icon: Ticket,
      tags: ['Watch', 'Fans', 'Events'],
      priceRange: '₹5,000 - ₹50,000',
      difficulty: 'Easy',
      season: 'Oct-Mar',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
    },
    {
      id: 'training-camps',
      name: 'Training Camps & Academies',
      description: 'Beginner to Pro coaching camps. Includes facility access, equipment & expert coaches.',
      icon: GraduationCap,
      tags: ['Play', 'Train', 'Skill Building'],
      priceRange: '₹8,000 - ₹30,000',
      difficulty: 'Moderate',
      season: 'Year-round',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      id: 'sports-museums',
      name: 'Sports Museums & Heritage',
      description: 'Halls of fame & historic tours. Discover legendary sports moments & artifacts.',
      icon: Landmark,
      tags: ['Fans', 'Culture', 'Learning'],
      priceRange: '₹1,500 - ₹5,000',
      difficulty: 'Easy',
      season: 'Year-round',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
    {
      id: 'adventure-races',
      name: 'Adventure Races & Events',
      description: 'Marathon, Triathlon, Trail Race packages. Includes registration + route support + safety.',
      icon: Medal,
      tags: ['Play', 'Challenge', 'Fitness'],
      priceRange: '₹3,000 - ₹15,000',
      difficulty: 'Hard',
      season: 'Oct-Mar',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
    },
    {
      id: 'trekking-routes',
      name: 'Trekking Routes / Trails',
      description: 'Sports-style active travel. Guided treks with pace monitoring, safety gear & support.',
      icon: Mountain,
      tags: ['Play', 'Adventure', 'Nature'],
      priceRange: '₹4,000 - ₹20,000',
      difficulty: 'Moderate',
      season: 'Oct-Mar',
      color: 'text-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
    },
    {
      id: 'cycling-tours',
      name: 'Cycling Tours / Wheels',
      description: 'Endurance rides & curated trails. Bike rentals, route support & hydration stations.',
      icon: Bike,
      tags: ['Play', 'Endurance', 'Scenic'],
      priceRange: '₹3,500 - ₹18,000',
      difficulty: 'Moderate',
      season: 'Oct-Apr',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
    },
    {
      id: 'water-sports',
      name: 'Water Sports Packages',
      description: 'Surf camps, Kayak trips, Swim retreats. Professional instructors & gear included.',
      icon: Waves,
      tags: ['Play', 'Train', 'Water'],
      priceRange: '₹5,000 - ₹25,000',
      difficulty: 'Moderate',
      season: 'Oct-May',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
    },
    {
      id: 'golf-tours',
      name: 'Golf Tours (Premium)',
      description: 'Premium resort stays + course bookings + caddy options. Exclusive access to top courses.',
      icon: Flag,
      tags: ['Play', 'Premium', 'Luxury'],
      priceRange: '₹15,000 - ₹80,000',
      difficulty: 'Easy',
      season: 'Year-round',
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
    },
  ];

  const difficulties = ['all', 'Easy', 'Moderate', 'Hard'];
  const seasons = ['all', 'Year-round', 'Oct-Mar', 'Oct-Apr', 'Oct-May'];

  const filteredTripTypes = tripTypes.filter(trip => {
    const matchesSearch = trip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trip.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || trip.difficulty === difficultyFilter;
    const matchesSeason = seasonFilter === 'all' || trip.season === seasonFilter;
    
    return matchesSearch && matchesDifficulty && matchesSeason;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 pt-12 pb-6 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="flex items-center gap-2 text-white">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back to Sports</span>
          </button>
          <div className="flex items-center gap-2 text-white text-sm">
            <span>Sports Tourism</span>
            <ChevronRight className="w-4 h-4" />
            <span className="font-semibold">{sportCategory.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">{sportCategory.emoji}</span>
          <div>
            <h1 className="text-white text-3xl font-bold mb-1">{sportCategory.name}</h1>
            <p className="text-white/90 text-sm">
              {sportCategory.sports.join(' • ')}
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search trip types..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-full bg-white border-0 shadow-lg text-base"
          />
        </div>
      </div>

      <div className="px-6 -mt-2 pb-8">
        {/* Filters Section */}
        <Card className="bg-white rounded-3xl p-5 shadow-xl mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="font-bold text-lg">Filter Your Adventure</h3>
          </div>

          {/* Difficulty Filter */}
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Difficulty Level</p>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficultyFilter(level)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    difficultyFilter === level
                      ? 'bg-blue-900 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {level === 'all' ? 'All Levels' : level}
                </button>
              ))}
            </div>
          </div>

          {/* Season Filter */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Best Season</p>
            <div className="flex flex-wrap gap-2">
              {seasons.map((season) => (
                <button
                  key={season}
                  onClick={() => setSeasonFilter(season)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    seasonFilter === season
                      ? 'bg-blue-900 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {season === 'all' ? 'All Seasons' : season}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Trip Types Section */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">How Do You Want to Experience Sports?</h2>
          <p className="text-gray-600 text-sm mb-4">
            Choose your perfect adventure style • {filteredTripTypes.length} options available
          </p>
        </div>

        {/* Trip Type Cards */}
        <div className="space-y-4">
          {filteredTripTypes.map((tripType, idx) => {
            const IconComponent = tripType.icon;
            return (
              <motion.div
                key={tripType.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card
                  onClick={() => onSelectTripType(tripType)}
                  className={`${tripType.bgColor} border-2 ${tripType.borderColor} rounded-3xl p-5 cursor-pointer hover:shadow-xl transition-all active:scale-[0.98]`}
                >
                  {/* Header Row */}
                  <div className="flex items-start gap-4 mb-3">
                    <div className={`${tripType.bgColor} border-2 ${tripType.borderColor} rounded-2xl p-3 bg-white`}>
                      <IconComponent className={`w-7 h-7 ${tripType.color}`} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1 text-gray-900">{tripType.name}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-2">
                        {tripType.description}
                      </p>
                    </div>

                    <ChevronRight className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
                  </div>

                  {/* Tags Row */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tripType.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border border-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Info Row */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-700">{tripType.priceRange}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Trophy className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{tripType.difficulty}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{tripType.season}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredTripTypes.length === 0 && (
          <Card className="bg-white rounded-3xl p-12 text-center">
            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">No Trip Types Found</h3>
            <p className="text-gray-500">Try adjusting your filters</p>
          </Card>
        )}
      </div>
    </div>
  );
}
