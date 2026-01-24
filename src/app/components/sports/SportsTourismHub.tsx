import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Search, 
  Trophy,
  MapPin,
  Calendar,
  ChevronRight,
  Check,
  Sparkles,
} from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';

interface SportsTourismHubProps {
  onBack: () => void;
}

type FilterType = 'all' | 'play' | 'watch' | 'train' | 'fans';

export function SportsTourismHub({ onBack }: SportsTourismHubProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 10 Sports Categories matching reference images
  const sportsCategories = [
    {
      id: 'team-sports',
      name: 'Team Sports',
      badgeColor: 'bg-blue-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      sports: [
        { emoji: '🏀', name: 'Basketball', tagline: 'Fast-paced teamwork', icon: '🏀' },
        { emoji: '⚽', name: 'Soccer', tagline: 'Global favorite', icon: '⚽' },
        { emoji: '🏐', name: 'Volleyball', tagline: 'Indoor & beach', icon: '🏐' },
        { emoji: '🏏', name: 'Cricket', tagline: 'Team spirit', icon: '🏏' },
      ],
    },
    {
      id: 'water-sports',
      name: 'Water Sports',
      badgeColor: 'bg-cyan-600',
      textColor: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      sports: [
        { emoji: '🏊', name: 'Swimming', tagline: 'Endurance & strength', icon: '🏊' },
        { emoji: '🛶', name: 'Kayaking', tagline: 'Scenic waterways', icon: '🛶' },
        { emoji: '🏄', name: 'Surfing', tagline: 'Ocean thrill', icon: '🏄' },
      ],
    },
    {
      id: 'adventure-sports',
      name: 'Adventure Sports',
      badgeColor: 'bg-orange-600',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      sports: [
        { emoji: '🧗', name: 'Rock Climbing', tagline: 'Strength & solving', icon: '🧗' },
        { emoji: '🚵', name: 'Mtn Biking', tagline: 'Diverse terrains', icon: '🚵' },
        { emoji: '🎢', name: 'Ziplining', tagline: 'Aerial views', icon: '🎢' },
      ],
    },
    {
      id: 'racquet-sports',
      name: 'Racquet Sports',
      badgeColor: 'bg-green-600',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      sports: [
        { emoji: '🎾', name: 'Tennis', tagline: 'Cardio & coordination', icon: '🎾' },
        { emoji: '🏓', name: 'Pickleball', tagline: 'Social & accessible', icon: '🏓' },
        { emoji: '🏸', name: 'Badminton', tagline: 'Reflexes & agility', icon: '🏸' },
      ],
    },
    {
      id: 'winter-sports',
      name: 'Winter Sports',
      badgeColor: 'bg-sky-600',
      textColor: 'text-sky-600',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-200',
      sports: [
        { emoji: '⛷️', name: 'Skiing', tagline: 'Balance & strength', icon: '⛷️' },
        { emoji: '🏂', name: 'Snowboarding', tagline: 'Coordination', icon: '🏂' },
        { emoji: '⛸️', name: 'Ice Skating', tagline: 'Grace & strength', icon: '⛸️' },
      ],
    },
    {
      id: 'combat-sports',
      name: 'Combat Sports',
      badgeColor: 'bg-red-600',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      sports: [
        { emoji: '🥊', name: 'Boxing', tagline: 'Endurance', icon: '🥊' },
        { emoji: '🥋', name: 'Martial Arts', tagline: 'Discipline', icon: '🥋' },
        { emoji: '🤺', name: 'Fencing', tagline: 'Strategy', icon: '🤺' },
      ],
    },
    {
      id: 'precision-sports',
      name: 'Precision Sports',
      badgeColor: 'bg-purple-600',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      sports: [
        { emoji: '🏹', name: 'Archery', tagline: 'Focus', icon: '🏹' },
        { emoji: '⛳', name: 'Golf', tagline: 'Skill & strategy', icon: '⛳' },
        { emoji: '🎯', name: 'Darts', tagline: 'Hand-eye coord', icon: '🎯' },
      ],
    },
    {
      id: 'endurance-sports',
      name: 'Endurance Sports',
      badgeColor: 'bg-amber-600',
      textColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      sports: [
        { emoji: '🏃', name: 'Running', tagline: 'Cardio health', icon: '🏃' },
        { emoji: '🚴', name: 'Cycling', tagline: 'Leg strength', icon: '🚴' },
        { emoji: '🏊🚴', name: 'Triathlon', tagline: 'Ultimate fitness', icon: '🏊' },
      ],
    },
    {
      id: 'mind-sports',
      name: 'Mind Sports',
      badgeColor: 'bg-slate-700',
      textColor: 'text-slate-700',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200',
      sports: [
        { emoji: '♟️', name: 'Chess', tagline: 'Strategic thinking', icon: '♟️' },
        { emoji: '🎮', name: 'Esports', tagline: 'Teamwork', icon: '🎮' },
        { emoji: '🃏', name: 'Bridge', tagline: 'Memory', icon: '🃏' },
      ],
    },
    {
      id: 'emerging-sports',
      name: 'Emerging Sports',
      badgeColor: 'bg-pink-600',
      textColor: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      sports: [
        { emoji: '⚽⛳', name: 'FootGolf', tagline: 'Soccer meets golf', icon: '⚽' },
        { emoji: '🟡', name: 'Spikeball', tagline: 'Team coordination', icon: '🟡' },
      ],
    },
  ];

  const filters = [
    { id: 'all' as FilterType, label: 'All', emoji: '🏆' },
    { id: 'play' as FilterType, label: 'Play', emoji: '⚽' },
    { id: 'watch' as FilterType, label: 'Watch', emoji: '👁️' },
    { id: 'train' as FilterType, label: 'Train', emoji: '🔥' },
    { id: 'fans' as FilterType, label: 'Fans', emoji: '🎭' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-blue-50">
      {/* Header - Matching reference image orange gradient */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 pt-12 pb-6 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="flex items-center gap-2 text-white">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back</span>
          </button>
          <button className="px-4 py-2 bg-orange-400 hover:bg-orange-300 rounded-full text-white text-sm font-semibold flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Journey Map
          </button>
        </div>

        <h1 className="text-white text-4xl font-bold mb-2">Sports Tourism</h1>
        <p className="text-white/90 text-base mb-4">Tournaments & Active Trips</p>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search sports, events, destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-full bg-white border-0 shadow-lg text-base"
          />
        </div>
      </div>

      <div className="px-6 -mt-4 pb-8">
        {/* Find Your Game Section */}
        <Card className="bg-white rounded-3xl p-6 shadow-xl mb-6">
          <h2 className="text-3xl font-bold mb-2 text-center">Find Your Game</h2>
          <p className="text-gray-600 text-base mb-6 text-center">
            Discover tournaments, training camps, and adventure sports destinations.
          </p>

          {/* Filters - Matching reference image style */}
          <div className="flex gap-3 justify-center mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeFilter === filter.id
                    ? 'bg-blue-900 text-white shadow-lg'
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300'
                }`}
              >
                <span>{filter.emoji}</span>
                <span>{filter.label}</span>
              </button>
            ))}
          </div>

          {/* Sports Categories - Matching reference images exactly */}
          {sportsCategories.map((category, idx) => (
            <div key={category.id} className="mb-8 last:mb-0">
              {/* Category Header */}
              <div className="flex items-center justify-between mb-4">
                <span className={`${category.badgeColor} text-white text-sm font-bold px-4 py-1 rounded-full`}>
                  {category.name}
                </span>
                <button className="text-blue-600 text-sm font-semibold flex items-center gap-1 hover:text-blue-700">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Sport Cards Grid - 3 columns matching reference */}
              <div className="grid grid-cols-3 gap-4">
                {category.sports.map((sport, sportIdx) => (
                  <motion.button
                    key={sportIdx}
                    whileTap={{ scale: 0.97 }}
                    className={`${category.bgColor} rounded-2xl p-4 text-left hover:shadow-md transition-all border ${category.borderColor}`}
                  >
                    {/* Icon */}
                    <div className="text-3xl mb-3">{sport.icon}</div>
                    
                    {/* Sport Name */}
                    <h3 className="font-bold text-base mb-1 text-gray-900">{sport.name}</h3>
                    
                    {/* Tagline */}
                    <p className="text-sm text-gray-600">{sport.tagline}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </Card>

        {/* AI Intelligence Section - Matching reference image bottom */}
        <Card className="bg-gradient-to-r from-blue-900 to-indigo-800 rounded-3xl p-6 shadow-xl text-white">
          <div className="flex items-start gap-3 mb-4">
            <Sparkles className="w-6 h-6 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold mb-2">Grok Sports Intelligence</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Ask Grok about event dates, ticket options, best seasons, or where to join your sport as a player.
              </p>
            </div>
          </div>

          {/* AI Action Buttons - Matching reference */}
          <div className="flex gap-3">
            <button className="flex-1 bg-white text-blue-900 rounded-full py-3 px-4 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-all">
              <Calendar className="w-4 h-4" />
              Ask for Events & Dates
            </button>
            <button className="flex-1 bg-orange-500 text-white rounded-full py-3 px-4 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-orange-600 transition-all">
              <Trophy className="w-4 h-4" />
              Ask Training & Camps
            </button>
          </div>
        </Card>

        {/* Scroll for More Indicator */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-xs uppercase tracking-wide mb-2">Scroll for More</p>
          <div className="flex justify-center">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center"
            >
              <ChevronRight className="w-4 h-4 text-white rotate-90" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
