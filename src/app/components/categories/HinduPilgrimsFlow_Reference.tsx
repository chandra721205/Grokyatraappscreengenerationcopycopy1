import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ChevronDown,
  X,
  Accessibility,
  Stethoscope,
  Globe,
  Medal,
  Sliders,
  Eye,
  MapPin,
  Activity,
  CircleDot,
  Map,
  Play,
  Heart,
  ChevronRight,
  Sparkles,
  Bookmark,
  Save,
  Info,
  Flame,
  BookOpen,
  Waves,
  Mountain,
  Flower2,
  Sun,
} from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Switch } from '@/app/components/ui/switch';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';

// ========================================
// HINDU PILGRIMS – FIGMA REFERENCE DESIGN
// "Choose Your Faith Journey" Layout
// ========================================
//
// ✅ PRESERVES: All other categories unchanged
// ✅ ENHANCES: Only Hindu Pilgrims section
// ✅ FEATURES:
//   - Beautiful header with subtitle
//   - Smart Filter Bar (State, Difficulty, Hidden Gems)
//   - 6 Sacred Circuits in attractive grid
//   - Browse & Interest Module
//   - Visual Badges
//   - Grok AI Insights Panel
//   - Admin-editable zones with dashed borders
//
// ========================================

interface HinduPilgrimsFlowProps {
  onBack: () => void;
}

const sacredCircuits = [
  {
    id: 'jyotirlinga',
    emoji: '🕉️',
    icon: Flame,
    name: '12 Jyotirlingas',
    deity: 'Lord Shiva',
    subtitle: 'Sacred Shiva Shrines',
    description: 'Description will be added by admin',
    state: '[Admin: Multiple States]',
    difficulty: 'Moderate',
    gradient: 'from-orange-500 via-red-500 to-pink-600',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    tag: 'MOST SACRED',
    tagBg: 'bg-orange-100',
    tagText: 'text-orange-700',
    isFeatured: true,
    totalSites: 12,
  },
  {
    id: 'divya-desam',
    emoji: '🏛️',
    icon: BookOpen,
    name: '108 Divya Desams',
    deity: 'Lord Vishnu',
    subtitle: 'Vishnu Temples',
    description: 'Description will be added by admin',
    state: '[Admin: Tamil Nadu, Kerala]',
    difficulty: 'Easy to Moderate',
    gradient: 'from-blue-500 via-indigo-500 to-purple-600',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    tag: '108 TEMPLES',
    tagBg: 'bg-blue-100',
    tagText: 'text-blue-700',
    isFeatured: false,
    totalSites: 108,
  },
  {
    id: 'pancha-bhoota',
    emoji: '🔥',
    icon: Waves,
    name: 'Pancha Bhoota Sthalams',
    deity: 'Shiva – 5 Elements',
    subtitle: '5 Elements Circuit',
    description: 'Description will be added by admin',
    state: '[Admin: Tamil Nadu]',
    difficulty: 'Easy',
    gradient: 'from-purple-500 via-pink-500 to-rose-600',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    tag: '5 ELEMENTS',
    tagBg: 'bg-purple-100',
    tagText: 'text-purple-700',
    isFeatured: false,
    totalSites: 5,
  },
  {
    id: 'char-dham',
    emoji: '⛰️',
    icon: Mountain,
    name: 'Char Dham Yatra',
    deity: 'Vishnu & Shiva',
    subtitle: 'Four Divine Abodes',
    description: 'Description will be added by admin',
    state: '[Admin: Uttarakhand]',
    difficulty: 'Challenging',
    gradient: 'from-green-500 via-emerald-500 to-teal-600',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    tag: '4 DHAMS',
    tagBg: 'bg-green-100',
    tagText: 'text-green-700',
    isFeatured: true,
    totalSites: 4,
  },
  {
    id: 'shakti-peetha',
    emoji: '🌺',
    icon: Flower2,
    name: '51 Shakti Peethas',
    deity: 'Goddess Shakti',
    subtitle: 'Divine Feminine Shrines',
    description: 'Description will be added by admin',
    state: '[Admin: Pan-India]',
    difficulty: 'Moderate',
    gradient: 'from-pink-500 via-rose-500 to-red-600',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    tag: '51 SACRED SITES',
    tagBg: 'bg-pink-100',
    tagText: 'text-pink-700',
    isFeatured: false,
    totalSites: 51,
  },
  {
    id: 'navagraha',
    emoji: '🪐',
    icon: Sun,
    name: 'Navagraha Temples',
    deity: 'Nine Planets',
    subtitle: 'Planetary Circuit',
    description: 'Description will be added by admin',
    state: '[Admin: Tamil Nadu]',
    difficulty: 'Easy',
    gradient: 'from-yellow-500 via-orange-500 to-amber-600',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    tag: '9 PLANETS',
    tagBg: 'bg-yellow-100',
    tagText: 'text-yellow-700',
    isFeatured: false,
    totalSites: 9,
  },
];

export function HinduPilgrimsFlow({ onBack }: HinduPilgrimsFlowProps) {
  const [notedInterests, setNotedInterests] = useState<string[]>([]);
  const [interestNotes, setInterestNotes] = useState('');
  
  // Smart Filter States
  const [selectedState, setSelectedState] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [showHiddenGems, setShowHiddenGems] = useState(false);

  const handleGoogleBrowse = (query: string) => {
    window.open(`https://www.google.com/maps/search/${encodeURIComponent(query + ' temple pilgrimage india')}`, '_blank');
    handleNoteInterest(query);
  };

  const handleYouTubeBrowse = (query: string) => {
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' temple darshan')}`, '_blank');
    handleNoteInterest(query);
  };

  const handleNoteInterest = (interest: string) => {
    if (!notedInterests.includes(interest)) {
      setNotedInterests([...notedInterests, interest]);
      toast.success('Interest noted! We\'ll notify you about budget deals', {
        description: 'Special offers will be sent when available',
        icon: '🔔',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-orange-50/30 to-white pb-20">
      {/* GROUP: Hindu – Header */}
      <div className="bg-white border-b border-gray-200 px-6 pt-6 pb-8">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 text-sm font-semibold hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Journey
          </button>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-wider">
              <span>SCROLL</span>
              <ChevronDown className="w-3 h-3" />
            </div>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Header with Icon */}
        <div className="flex items-center gap-4 mb-2">
          <div className="w-9 h-9 bg-orange-100 rounded-2xl flex items-center justify-center">
            <span className="text-xl">🕉️</span>
          </div>
          <h1 className="text-slate-900 text-[32px] font-bold tracking-tight leading-tight">
            Hindu Pilgrims
          </h1>
        </div>
        
        <p className="text-gray-600 text-base pl-[52px]">
          Spiritual Journeys – 5000+ Years of Tradition
        </p>
      </div>

      {/* GROUP: Hindu – Visual Badges */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 text-xs font-semibold">
            <Accessibility className="w-3.5 h-3.5 mr-1.5" />
            Accessible Darshan
          </Badge>
          <Badge className="bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 text-xs font-semibold">
            <Stethoscope className="w-3.5 h-3.5 mr-1.5" />
            Medical Support
          </Badge>
          <Badge className="bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1.5 text-xs font-semibold">
            <Globe className="w-3.5 h-3.5 mr-1.5" />
            Global Faiths
          </Badge>
          <Badge className="bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1.5 text-xs font-semibold">
            <Medal className="w-3.5 h-3.5 mr-1.5" />
            Ancient Heritage
          </Badge>
        </div>
      </div>

      <div className="px-6">
        {/* GROUP: Hindu – Smart Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Sliders className="w-5 h-5 text-gray-700" />
            <h3 className="text-sm font-bold text-gray-900">Smart Filters</h3>
          </div>

          <div className="space-y-4">
            {/* State/Region Dropdown */}
            <div>
              <label className="block text-xs font-semibold mb-2 text-gray-700">
                State / Region
              </label>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="w-full h-10 bg-gray-50 border-gray-300 rounded-xl">
                  <SelectValue placeholder="All States" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  <SelectItem value="north">North India</SelectItem>
                  <SelectItem value="south">South India</SelectItem>
                  <SelectItem value="east">East India</SelectItem>
                  <SelectItem value="west">West India</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-xs font-semibold mb-2 text-gray-700">
                Difficulty Level
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDifficultyFilter('all')}
                  className={`h-10 rounded-xl text-sm font-semibold transition-all ${
                    difficultyFilter === 'all'
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Levels
                </button>
                <button
                  onClick={() => setDifficultyFilter('senior')}
                  className={`h-10 rounded-xl text-sm font-semibold transition-all ${
                    difficultyFilter === 'senior'
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Senior-Friendly Only
                </button>
              </div>
            </div>

            {/* Hidden Gems Toggle */}
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-orange-200">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-orange-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Hidden Gems</p>
                  <p className="text-xs text-gray-600">Lesser-known sacred sites</p>
                </div>
              </div>
              <Switch
                checked={showHiddenGems}
                onCheckedChange={setShowHiddenGems}
              />
            </div>
          </div>
        </div>

        {/* GROUP: Hindu – Circuit Cards */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Sacred Circuits</h2>
          <p className="text-sm text-gray-600 mb-5">Choose your spiritual journey path</p>

          <div className="grid grid-cols-1 gap-5">
            {sacredCircuits.map((circuit, index) => (
              <motion.div
                key={circuit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="group"
              >
                <div
                  className={`
                    rounded-3xl p-6 transition-all duration-300 cursor-pointer
                    hover:shadow-2xl hover:scale-[1.01]
                    ${circuit.isFeatured
                      ? `bg-gradient-to-br ${circuit.gradient} shadow-xl`
                      : 'bg-white border-2 border-gray-200 shadow-lg'
                    }
                  `}
                >
                  <div className="flex items-start justify-between mb-4">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
                      circuit.isFeatured ? 'bg-white/20 border-2 border-white/30' : circuit.iconBg
                    }`}>
                      <circuit.icon className={`w-7 h-7 ${
                        circuit.isFeatured ? 'text-white' : circuit.iconColor
                      }`} />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGoogleBrowse(circuit.name);
                        }}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-md ${
                          circuit.isFeatured ? 'bg-white/20 hover:bg-white/30' : 'bg-blue-50 hover:bg-blue-100'
                        }`}
                        title="Explore on Map"
                      >
                        <Map className={`w-4 h-4 ${circuit.isFeatured ? 'text-white' : 'text-blue-600'}`} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleYouTubeBrowse(circuit.name);
                        }}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-md ${
                          circuit.isFeatured ? 'bg-white/20 hover:bg-white/30' : 'bg-red-50 hover:bg-red-100'
                        }`}
                        title="Watch Videos"
                      >
                        <Play className={`w-4 h-4 ${circuit.isFeatured ? 'text-white' : 'text-red-600'}`} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNoteInterest(circuit.name);
                        }}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-md ${
                          notedInterests.includes(circuit.name)
                            ? 'bg-pink-100'
                            : circuit.isFeatured ? 'bg-white/20 hover:bg-white/30' : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                        title="Save Interest"
                      >
                        <Heart className={`w-4 h-4 ${
                          notedInterests.includes(circuit.name)
                            ? 'text-pink-600 fill-pink-600'
                            : circuit.isFeatured ? 'text-white' : 'text-gray-600'
                        }`} />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className={`text-2xl font-bold mb-2 ${
                    circuit.isFeatured ? 'text-white' : 'text-gray-900'
                  }`}>
                    {circuit.name}
                  </h3>
                  
                  <p className={`text-sm mb-1 font-semibold ${
                    circuit.isFeatured ? 'text-white/95' : 'text-orange-600'
                  }`}>
                    {circuit.subtitle}
                  </p>

                  {/* Admin-Editable Description */}
                  <div className={`text-sm mb-4 leading-relaxed p-3 rounded-xl border-2 border-dashed ${
                    circuit.isFeatured 
                      ? 'bg-white/10 border-white/30 text-white/80' 
                      : 'bg-gray-50 border-gray-300 text-gray-600'
                  }`}>
                    {circuit.description}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className={`${
                      circuit.isFeatured ? 'bg-white/20' : circuit.tagBg
                    } px-3 py-1.5 rounded-lg`}>
                      <span className={`text-xs font-bold uppercase tracking-wider ${
                        circuit.isFeatured ? 'text-white' : circuit.tagText
                      }`}>
                        {circuit.tag}
                      </span>
                    </div>
                    <div className={`${
                      circuit.isFeatured ? 'bg-white/15' : 'bg-blue-50'
                    } px-3 py-1.5 rounded-lg`}>
                      <span className={`text-xs font-semibold ${
                        circuit.isFeatured ? 'text-white/90' : 'text-blue-700'
                      }`}>
                        Dedicated to: {circuit.deity}
                      </span>
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className={`${
                      circuit.isFeatured ? 'bg-white/10' : 'bg-gray-50'
                    } rounded-xl p-3 border-2 border-dashed ${
                      circuit.isFeatured ? 'border-white/20' : 'border-gray-300'
                    }`}>
                      <MapPin className={`w-4 h-4 mb-1 ${circuit.isFeatured ? 'text-white/80' : 'text-gray-500'}`} />
                      <p className={`text-xs font-semibold ${circuit.isFeatured ? 'text-white/70' : 'text-gray-600'}`}>
                        State
                      </p>
                      <p className={`text-xs font-bold ${circuit.isFeatured ? 'text-white' : 'text-gray-900'}`}>
                        {circuit.state}
                      </p>
                    </div>
                    <div className={`${
                      circuit.isFeatured ? 'bg-white/10' : 'bg-gray-50'
                    } rounded-xl p-3 border-2 border-dashed ${
                      circuit.isFeatured ? 'border-white/20' : 'border-gray-300'
                    }`}>
                      <Activity className={`w-4 h-4 mb-1 ${circuit.isFeatured ? 'text-white/80' : 'text-gray-500'}`} />
                      <p className={`text-xs font-semibold ${circuit.isFeatured ? 'text-white/70' : 'text-gray-600'}`}>
                        Difficulty
                      </p>
                      <p className={`text-xs font-bold ${circuit.isFeatured ? 'text-white' : 'text-gray-900'}`}>
                        {circuit.difficulty}
                      </p>
                    </div>
                    <div className={`${
                      circuit.isFeatured ? 'bg-white/10' : 'bg-gray-50'
                    } rounded-xl p-3 border-2 border-dashed ${
                      circuit.isFeatured ? 'border-white/20' : 'border-gray-300'
                    }`}>
                      <CircleDot className={`w-4 h-4 mb-1 ${circuit.isFeatured ? 'text-white/80' : 'text-gray-500'}`} />
                      <p className={`text-xs font-semibold ${circuit.isFeatured ? 'text-white/70' : 'text-gray-600'}`}>
                        Sites
                      </p>
                      <p className={`text-xs font-bold ${circuit.isFeatured ? 'text-white' : 'text-gray-900'}`}>
                        {circuit.totalSites}
                      </p>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Button
                    className={`w-full rounded-xl h-12 font-bold text-sm shadow-lg transition-all ${
                      circuit.isFeatured
                        ? 'bg-white text-orange-600 hover:bg-gray-100'
                        : 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700'
                    }`}
                  >
                    View Details
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* GROUP: Hindu – Browse & Interest Module */}
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-6 mb-6 border-2 border-purple-200 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Explore More</h3>
          </div>

          <p className="text-sm text-gray-700 mb-5 leading-relaxed">
            Discover temple locations and watch spiritual journey videos to plan your pilgrimage.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <Button
              onClick={() => handleYouTubeBrowse('hindu pilgrimage temples')}
              className="bg-red-600 hover:bg-red-700 text-white rounded-xl h-12 font-bold shadow-lg"
            >
              <Play className="w-4 h-4 mr-2" />
              Watch Videos
            </Button>
            <Button
              onClick={() => handleGoogleBrowse('hindu sacred temples')}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 font-bold shadow-lg"
            >
              <Map className="w-4 h-4 mr-2" />
              Explore on Map
            </Button>
          </div>

          {/* Save Interests */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-purple-200">
            <div className="flex items-center gap-3 mb-3">
              <Bookmark className="w-5 h-5 text-purple-600" />
              <p className="text-sm font-bold text-gray-900">Save Your Interests</p>
            </div>
            <Input
              type="text"
              placeholder="Note places you'd like to visit..."
              value={interestNotes}
              onChange={(e) => setInterestNotes(e.target.value)}
              className="h-10 text-sm bg-white border-purple-200 rounded-xl"
            />
          </div>
        </div>

        {/* GROUP: Hindu – Grok AI Insights */}
        <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 rounded-3xl p-6 shadow-2xl relative overflow-hidden mb-6">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
          </div>

          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                <Sparkles className="w-6 h-6 text-yellow-300" />
              </div>
              <h3 className="text-white font-bold text-lg">Grok AI Insights</h3>
            </div>
            
            <p className="text-white/80 text-xs mb-3 uppercase tracking-wider font-semibold">
              LIVE DATA • CEREMONY TIMING & SACRED CIRCUITS
            </p>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-4 border border-white/20">
              <p className="text-purple-100 text-sm leading-relaxed border-l-4 border-yellow-300 pl-3 italic">
                "[Admin: AI-generated insights about pilgrimage trends, best timing, and sacred circuit recommendations will appear here]"
              </p>
            </div>

            <div className="flex gap-3">
              <button className="px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white text-xs font-bold rounded-full transition-all backdrop-blur-sm border border-white/30">
                LIKE THIS
              </button>
              <button className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white text-xs font-bold rounded-full transition-all shadow-lg flex items-center gap-2">
                <Save className="w-3.5 h-3.5" />
                Save Grok Insight
              </button>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-orange-900 leading-relaxed font-medium">
                <strong className="block mb-1">Explore & Discover</strong>
                Use Google Maps and YouTube to explore temples. Save your interests, and we'll notify you when 
                admin-published packages match your preferences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
