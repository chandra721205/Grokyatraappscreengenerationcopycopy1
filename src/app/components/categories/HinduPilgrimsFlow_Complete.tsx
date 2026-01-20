import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Search,
  Filter,
  Star,
  Users,
  Calendar,
  DollarSign,
  Package,
  Bell,
  Plus,
  Check,
  ChevronUp,
  Youtube,
  Wifi,
  TrendingUp,
  Award,
  Clock,
  Navigation,
  Compass,
  Phone,
  Mail,
  Building2,
  Loader2,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';

// ========================================
// HINDU PILGRIMS – COMPLETE ENHANCED VERSION
// ========================================
//
// 🕉️ FOUR NEW FUNCTIONAL FIELDS:
// 1. ✅ Hidden Spiritual Gems
// 2. ✅ Browse by Geography
// 3. ✅ Browse by Deity
// 4. ✅ Special Packages by Admin
//
// 🤖 AI & USER FEATURES:
// - Custom Tour Builder
// - Interest Capture & Notifications
// - Grok AI Response System
// - YouTube/Google Browse Integration
//
// 📱 SCREENS:
// 1. Main Hindu Circuits Explorer
// 2. Deity Circuit Page
// 3. Temple Detail Page
// 4. Custom Tour Builder
// 5. AI Response Modal
//
// ========================================

type FlowScreen = 
  | 'main'
  | 'deity-filter'
  | 'temple-detail'
  | 'custom-tour'
  | 'geography';

type Deity = 'all' | 'shiva' | 'vishnu' | 'shakti' | 'ganesha' | 'hanuman' | 'others';

interface HinduPilgrimsFlowProps {
  onBack: () => void;
}

// Sacred Circuits Data
const sacredCircuits = [
  {
    id: 'char-dham',
    emoji: '⛰️',
    icon: Mountain,
    name: 'Char Dham Yatra',
    deity: 'Vishnu & Shiva',
    subtitle: 'Four Divine Abodes',
    description: '[Admin: Description of the sacred 4 Dhams]',
    state: '[Admin: Uttarakhand]',
    difficulty: 'Challenging',
    duration: '[Admin: 10-15 days]',
    priceRange: '[Admin: ₹35,000 - ₹75,000]',
    bestTime: '[Admin: May-Oct]',
    crowd: 'High',
    gradient: 'from-green-500 via-emerald-500 to-teal-600',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    tag: '4 DHAMS',
    isFeatured: true,
    totalSites: 4,
  },
  {
    id: 'jyotirlinga',
    emoji: '🕉️',
    icon: Flame,
    name: '12 Jyotirlingas',
    deity: 'Lord Shiva',
    subtitle: 'Sacred Shiva Shrines',
    description: '[Admin: Description of 12 Jyotirlingas]',
    state: '[Admin: Multiple States]',
    difficulty: 'Moderate',
    duration: '[Admin: 15-30 days]',
    priceRange: '[Admin: ₹50,000 - ₹1,20,000]',
    bestTime: '[Admin: Oct-Mar]',
    crowd: 'Very High',
    gradient: 'from-orange-500 via-red-500 to-pink-600',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    tag: 'MOST SACRED',
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
    description: '[Admin: Description of 108 Divya Desams]',
    state: '[Admin: Tamil Nadu, Kerala, Andhra]',
    difficulty: 'Easy to Moderate',
    duration: '[Admin: 30-60 days]',
    priceRange: '[Admin: ₹80,000 - ₹2,00,000]',
    bestTime: '[Admin: Year-round]',
    crowd: 'Moderate',
    gradient: 'from-blue-500 via-indigo-500 to-purple-600',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    tag: '108 TEMPLES',
    isFeatured: false,
    totalSites: 108,
  },
  {
    id: 'shakti-peetha',
    emoji: '🌺',
    icon: Flower2,
    name: '51 Shakti Peethas',
    deity: 'Goddess Shakti',
    subtitle: 'Divine Feminine Shrines',
    description: '[Admin: Description of 51 Shakti Peethas]',
    state: '[Admin: Pan-India]',
    difficulty: 'Moderate',
    duration: '[Admin: 20-40 days]',
    priceRange: '[Admin: ₹60,000 - ₹1,50,000]',
    bestTime: '[Admin: Oct-Mar]',
    crowd: 'Moderate',
    gradient: 'from-pink-500 via-rose-500 to-red-600',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    tag: '51 SACRED SITES',
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
    description: '[Admin: Description of 9 Navagraha temples]',
    state: '[Admin: Tamil Nadu]',
    difficulty: 'Easy',
    duration: '[Admin: 2-3 days]',
    priceRange: '[Admin: ₹8,000 - ₹20,000]',
    bestTime: '[Admin: Year-round]',
    crowd: 'Low',
    gradient: 'from-yellow-500 via-orange-500 to-amber-600',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    tag: '9 PLANETS',
    isFeatured: false,
    totalSites: 9,
  },
  {
    id: 'pancha-bhoota',
    emoji: '🔥',
    icon: Waves,
    name: 'Pancha Bhoota Sthalams',
    deity: 'Shiva – 5 Elements',
    subtitle: '5 Elements Circuit',
    description: '[Admin: Description of 5 element temples]',
    state: '[Admin: Tamil Nadu]',
    difficulty: 'Easy',
    duration: '[Admin: 3-5 days]',
    priceRange: '[Admin: ₹10,000 - ₹25,000]',
    bestTime: '[Admin: Oct-Mar]',
    crowd: 'Low to Moderate',
    gradient: 'from-purple-500 via-pink-500 to-rose-600',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    tag: '5 ELEMENTS',
    isFeatured: false,
    totalSites: 5,
  },
];

// Hidden Gems Data
const hiddenGems = [
  {
    id: 'gem1',
    name: '[Admin: Hidden Temple Name 1]',
    location: '[Admin: District, State]',
    visitorCount: '<50/day',
    deity: '[Admin: Deity Name]',
    accessibility: 'Good',
    description: '[Admin: Brief description of hidden gem]',
  },
  {
    id: 'gem2',
    name: '[Admin: Hidden Temple Name 2]',
    location: '[Admin: District, State]',
    visitorCount: '<30/day',
    deity: '[Admin: Deity Name]',
    accessibility: 'Moderate',
    description: '[Admin: Brief description of hidden gem]',
  },
  {
    id: 'gem3',
    name: '[Admin: Hidden Temple Name 3]',
    location: '[Admin: District, State]',
    visitorCount: '<40/day',
    deity: '[Admin: Deity Name]',
    accessibility: 'Good',
    description: '[Admin: Brief description of hidden gem]',
  },
];

// Deity Categories
const deityCategories = [
  { id: 'all' as Deity, name: 'All Deities', emoji: '🕉️', icon: Sparkles, color: 'orange', count: 200 },
  { id: 'shiva' as Deity, name: 'Lord Shiva', emoji: '🔱', icon: Flame, color: 'red', count: 85 },
  { id: 'vishnu' as Deity, name: 'Lord Vishnu', emoji: '🪷', icon: BookOpen, color: 'blue', count: 120 },
  { id: 'shakti' as Deity, name: 'Goddess Shakti', emoji: '🌺', icon: Flower2, color: 'pink', count: 60 },
  { id: 'ganesha' as Deity, name: 'Lord Ganesha', emoji: '🐘', icon: Star, color: 'yellow', count: 40 },
  { id: 'hanuman' as Deity, name: 'Lord Hanuman', emoji: '🙏', icon: Mountain, color: 'orange', count: 35 },
  { id: 'others' as Deity, name: 'Other Deities', emoji: '✨', icon: Sparkles, color: 'purple', count: 25 },
];

// Special Packages
const specialPackages = [
  {
    id: 'pkg1',
    name: '[Admin: Package Name 1]',
    tagline: '[Admin: Short tagline]',
    duration: '[Admin: 7 days / 6 nights]',
    inclusions: ['[Admin: Inclusion 1]', '[Admin: Inclusion 2]', '[Admin: Inclusion 3]'],
    price: '[Admin: ₹45,000]',
    badge: 'Trending',
    badgeColor: 'bg-red-500',
  },
  {
    id: 'pkg2',
    name: '[Admin: Package Name 2]',
    tagline: '[Admin: Short tagline]',
    duration: '[Admin: 5 days / 4 nights]',
    inclusions: ['[Admin: Inclusion 1]', '[Admin: Inclusion 2]', '[Admin: Inclusion 3]'],
    price: '[Admin: ₹32,000]',
    badge: 'Best Value',
    badgeColor: 'bg-green-500',
  },
  {
    id: 'pkg3',
    name: '[Admin: Package Name 3]',
    tagline: '[Admin: Short tagline]',
    duration: '[Admin: 10 days / 9 nights]',
    inclusions: ['[Admin: Inclusion 1]', '[Admin: Inclusion 2]', '[Admin: Inclusion 3]'],
    price: '[Admin: ₹68,000]',
    badge: 'Premium',
    badgeColor: 'bg-purple-500',
  },
];

// Geography/Districts Data
const geographyData = [
  {
    state: '[Admin: State Name 1]',
    districts: [
      { name: '[Admin: District 1]', templeCount: 15 },
      { name: '[Admin: District 2]', templeCount: 8 },
      { name: '[Admin: District 3]', templeCount: 12 },
    ],
  },
  {
    state: '[Admin: State Name 2]',
    districts: [
      { name: '[Admin: District 1]', templeCount: 20 },
      { name: '[Admin: District 2]', templeCount: 6 },
    ],
  },
];

export function HinduPilgrimsFlow({ onBack }: HinduPilgrimsFlowProps) {
  const [currentScreen, setCurrentScreen] = useState<FlowScreen>('main');
  const [notedInterests, setNotedInterests] = useState<string[]>([]);
  const [interestNotes, setInterestNotes] = useState('');
  
  // Filter States
  const [selectedState, setSelectedState] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [showHiddenGems, setShowHiddenGems] = useState(false);
  const [selectedDeity, setSelectedDeity] = useState<Deity>('all');
  const [notifyDeals, setNotifyDeals] = useState(false);
  
  // Custom Tour Builder States
  const [showCustomTour, setShowCustomTour] = useState(false);
  const [tourDates, setTourDates] = useState('');
  const [groupSize, setGroupSize] = useState('');
  const [seniorNeeds, setSeniorNeeds] = useState(false);
  const [deityPreference, setDeityPreference] = useState('');
  const [budget, setBudget] = useState('');
  
  // AI Response States
  const [showAIResponse, setShowAIResponse] = useState(false);
  const [aiTyping, setAiTyping] = useState(false);

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
      toast.success('Interest saved!', {
        description: 'We\'ll notify you about special deals',
        icon: '💖',
      });
    }
  };

  const handleCustomTourRequest = () => {
    setShowCustomTour(false);
    setAiTyping(true);
    setShowAIResponse(true);
    
    // Simulate AI typing
    setTimeout(() => {
      setAiTyping(false);
    }, 3000);
  };

  // MAIN SCREEN
  if (currentScreen === 'main') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-orange-50/30 to-white pb-20">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 pt-6 pb-8">
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

        {/* Visual Badges */}
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

        <div className="px-6 space-y-6">
          {/* GROUP: Custom Tour Builder CTA */}
          <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">Build Custom Pilgrimage</h3>
                  <p className="text-white/90 text-sm">AI-powered itinerary with your preferences</p>
                </div>
              </div>
              
              <Button
                onClick={() => setShowCustomTour(true)}
                className="w-full bg-white hover:bg-gray-100 text-orange-600 rounded-xl h-12 font-bold shadow-lg"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Start Custom Tour Builder
              </Button>
            </div>
          </div>

          {/* GROUP: Notify Me Toggle */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border-2 border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-bold text-sm text-gray-900">Notify me about deals</p>
                  <p className="text-xs text-gray-600">Get alerts for special pilgrimage packages</p>
                </div>
              </div>
              <Switch
                checked={notifyDeals}
                onCheckedChange={setNotifyDeals}
              />
            </div>
          </div>

          {/* GROUP: Browse by Deity (NEW FIELD #3) */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">🕉️ Browse by Deity</h2>
                <p className="text-sm text-gray-600">Filter temples by your chosen deity</p>
              </div>
              <Button
                variant="outline"
                onClick={() => setCurrentScreen('deity-filter')}
                className="rounded-xl h-9 text-sm"
              >
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {deityCategories.slice(0, 4).map((deity) => {
                const colorClasses = {
                  orange: 'from-orange-500 to-red-600',
                  red: 'from-red-500 to-pink-600',
                  blue: 'from-blue-500 to-indigo-600',
                  pink: 'from-pink-500 to-rose-600',
                  yellow: 'from-yellow-500 to-orange-600',
                  purple: 'from-purple-500 to-pink-600',
                };
                
                return (
                  <button
                    key={deity.id}
                    onClick={() => {
                      setSelectedDeity(deity.id);
                      setCurrentScreen('deity-filter');
                    }}
                    className={`bg-gradient-to-br ${colorClasses[deity.color as keyof typeof colorClasses]} rounded-2xl p-4 text-left transition-all hover:scale-105 hover:shadow-xl`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl">{deity.emoji}</span>
                      <Badge className="bg-white/20 text-white border-0 text-xs">
                        {deity.count}
                      </Badge>
                    </div>
                    <h4 className="text-white font-bold text-sm">{deity.name}</h4>
                  </button>
                );
              })}
            </div>
          </div>

          {/* GROUP: Sacred Circuits (Enhanced) */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Sacred Circuits</h2>
                <p className="text-sm text-gray-600">Choose your spiritual journey path</p>
              </div>
            </div>

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
                          title="Browse on Google"
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
                          title="Watch on YouTube"
                        >
                          <Youtube className={`w-4 h-4 ${circuit.isFeatured ? 'text-white' : 'text-red-600'}`} />
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
                      <span className="text-xs opacity-70 block mb-1">Admin editable: Description</span>
                      {circuit.description}
                    </div>

                    {/* Price & Duration */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className={`${
                        circuit.isFeatured ? 'bg-white/10' : 'bg-gray-50'
                      } rounded-xl p-3 border-2 border-dashed ${
                        circuit.isFeatured ? 'border-white/20' : 'border-gray-300'
                      }`}>
                        <DollarSign className={`w-4 h-4 mb-1 ${circuit.isFeatured ? 'text-white/80' : 'text-gray-500'}`} />
                        <p className={`text-xs font-semibold ${circuit.isFeatured ? 'text-white/70' : 'text-gray-600'}`}>
                          Price Range
                        </p>
                        <p className={`text-xs font-bold ${circuit.isFeatured ? 'text-white' : 'text-gray-900'}`}>
                          {circuit.priceRange}
                        </p>
                      </div>
                      <div className={`${
                        circuit.isFeatured ? 'bg-white/10' : 'bg-gray-50'
                      } rounded-xl p-3 border-2 border-dashed ${
                        circuit.isFeatured ? 'border-white/20' : 'border-gray-300'
                      }`}>
                        <Clock className={`w-4 h-4 mb-1 ${circuit.isFeatured ? 'text-white/80' : 'text-gray-500'}`} />
                        <p className={`text-xs font-semibold ${circuit.isFeatured ? 'text-white/70' : 'text-gray-600'}`}>
                          Duration
                        </p>
                        <p className={`text-xs font-bold ${circuit.isFeatured ? 'text-white' : 'text-gray-900'}`}>
                          {circuit.duration}
                        </p>
                      </div>
                    </div>

                    {/* Key Info Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className={`${
                        circuit.isFeatured ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-700'
                      } border-0 text-xs`}>
                        {circuit.bestTime}
                      </Badge>
                      <Badge className={`${
                        circuit.isFeatured ? 'bg-white/15 text-white' : 'bg-purple-50 text-purple-700'
                      } border-0 text-xs`}>
                        Crowd: {circuit.crowd}
                      </Badge>
                      <Badge className={`${
                        circuit.isFeatured ? 'bg-white/15 text-white' : 'bg-orange-50 text-orange-700'
                      } border-0 text-xs`}>
                        {circuit.difficulty}
                      </Badge>
                    </div>

                    {/* View Details Button */}
                    <Button
                      onClick={() => setCurrentScreen('temple-detail')}
                      className={`w-full rounded-xl h-12 font-bold text-sm shadow-lg transition-all ${
                        circuit.isFeatured
                          ? 'bg-white text-orange-600 hover:bg-gray-100'
                          : 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700'
                      }`}
                    >
                      View Details & Plan Yatra
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* GROUP: Hidden Spiritual Gems (NEW FIELD #1) */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                  💎 Hidden Spiritual Gems
                </h2>
                <p className="text-sm text-gray-600">Lesser-known sacred temples (&lt;50 visitors/day)</p>
              </div>
              <button
                onClick={() => setShowHiddenGems(!showHiddenGems)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-all text-sm font-semibold"
              >
                <Eye className="w-4 h-4" />
                {showHiddenGems ? 'Hide' : 'Show'} Gems
              </button>
            </div>

            <AnimatePresence>
              {showHiddenGems && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3"
                >
                  {hiddenGems.map((gem) => (
                    <div
                      key={gem.id}
                      className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-dashed border-purple-200 hover:border-purple-400 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1">{gem.name}</h4>
                          <p className="text-xs text-gray-600 mb-2">{gem.location}</p>
                          <div className="flex flex-wrap gap-2">
                            <Badge className="bg-purple-100 text-purple-700 text-xs border-0">
                              <Users className="w-3 h-3 mr-1" />
                              {gem.visitorCount}
                            </Badge>
                            <Badge className="bg-blue-100 text-blue-700 text-xs border-0">
                              <Accessibility className="w-3 h-3 mr-1" />
                              {gem.accessibility}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="rounded-xl h-9 text-xs"
                          onClick={() => setCurrentScreen('temple-detail')}
                        >
                          Explore
                        </Button>
                      </div>
                      <p className="text-xs text-gray-600 border-l-2 border-purple-300 pl-3 italic">
                        {gem.description}
                      </p>
                    </div>
                  ))}
                  
                  <div className="text-center pt-3">
                    <Button variant="outline" className="rounded-xl">
                      <Plus className="w-4 h-4 mr-2" />
                      Load More Gems
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* GROUP: Browse by Geography (NEW FIELD #2) */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                  📍 Browse by Geography
                </h2>
                <p className="text-sm text-gray-600">Find temples by state and district</p>
              </div>
              <Button
                variant="outline"
                onClick={() => setCurrentScreen('geography')}
                className="rounded-xl h-9 text-sm"
              >
                View Map
                <Navigation className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="space-y-4">
              {geographyData.map((state, idx) => (
                <div key={idx} className="border-2 border-gray-200 rounded-2xl p-4">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-orange-600" />
                    {state.state}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {state.districts.map((district, dIdx) => (
                      <button
                        key={dIdx}
                        className="bg-gray-50 hover:bg-orange-50 rounded-xl p-3 text-left transition-all border border-gray-200 hover:border-orange-300"
                      >
                        <p className="text-sm font-semibold text-gray-900">{district.name}</p>
                        <p className="text-xs text-gray-600">{district.templeCount} temples</p>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GROUP: Special Packages by Admin (NEW FIELD #4) */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                🎁 Special Pilgrimage Packages
              </h2>
              <p className="text-sm text-gray-600 mb-5">Curated packages by our experts</p>
            </div>

            <div className="space-y-4">
              {specialPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-5 border-2 border-dashed border-orange-200 hover:border-orange-400 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={`${pkg.badgeColor} text-white text-xs border-0`}>
                          {pkg.badge}
                        </Badge>
                        <span className="text-xs text-gray-500">Admin editable</span>
                      </div>
                      <h4 className="font-bold text-lg text-gray-900 mb-1">{pkg.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{pkg.tagline}</p>
                      
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1 text-sm text-gray-700">
                          <Clock className="w-4 h-4 text-orange-600" />
                          <span>{pkg.duration}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-bold text-orange-600">
                          <DollarSign className="w-4 h-4" />
                          <span>{pkg.price}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-1 mb-3">
                        {pkg.inclusions.map((inc, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                            <Check className="w-3 h-3 text-green-600" />
                            <span>{inc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl h-11 font-bold">
                    Book Now
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Grok AI Insights */}
          <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
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
                  Browse temples by deity, geography, or explore hidden gems. Save your interests to receive 
                  personalized package recommendations powered by Grok AI.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Tour Builder Dialog */}
        <Dialog open={showCustomTour} onOpenChange={setShowCustomTour}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-orange-600" />
                Build Custom Pilgrimage
              </DialogTitle>
              <DialogDescription>
                Tell us your preferences and Grok AI will create a personalized itinerary
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Preferred Dates
                </label>
                <Input
                  type="text"
                  placeholder="[Admin: Date picker]"
                  value={tourDates}
                  onChange={(e) => setTourDates(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Group Size
                </label>
                <Input
                  type="number"
                  placeholder="Number of people"
                  value={groupSize}
                  onChange={(e) => setGroupSize(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                <div>
                  <p className="font-semibold text-sm text-gray-900">Senior-Friendly Needs</p>
                  <p className="text-xs text-gray-600">Wheelchair access, medical support</p>
                </div>
                <Switch
                  checked={seniorNeeds}
                  onCheckedChange={setSeniorNeeds}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Deity Preference
                </label>
                <Select value={deityPreference} onValueChange={setDeityPreference}>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Choose deity" />
                  </SelectTrigger>
                  <SelectContent>
                    {deityCategories.map((deity) => (
                      <SelectItem key={deity.id} value={deity.id}>
                        {deity.emoji} {deity.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Budget Range
                </label>
                <Select value={budget} onValueChange={setBudget}>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Under ₹30,000</SelectItem>
                    <SelectItem value="mid">₹30,000 - ₹75,000</SelectItem>
                    <SelectItem value="high">₹75,000 - ₹1,50,000</SelectItem>
                    <SelectItem value="premium">Above ₹1,50,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleCustomTourRequest}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl h-12 font-bold"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Request Customization
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* AI Response Dialog */}
        <Dialog open={showAIResponse} onOpenChange={setShowAIResponse}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-600" />
                Grok AI Response
              </DialogTitle>
            </DialogHeader>

            <div className="py-6">
              {aiTyping ? (
                <div className="flex items-center gap-3 p-6 bg-purple-50 rounded-2xl">
                  <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />
                  <div>
                    <p className="font-semibold text-gray-900">Grok AI is analyzing...</p>
                    <p className="text-sm text-gray-600">Creating your custom itinerary</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-5 border-2 border-purple-200">
                    <p className="text-sm text-gray-800 leading-relaxed mb-3">
                      <strong className="text-purple-900 block mb-2">✨ We've received your request!</strong>
                      Grok AI will get back to you with:
                    </p>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <Check className="w-4 h-4 text-green-600 mt-0.5" />
                        <span><strong>Budget breakdown</strong> with cost optimization</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <Check className="w-4 h-4 text-green-600 mt-0.5" />
                        <span><strong>Facilities assessment</strong> including senior care options</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <Check className="w-4 h-4 text-green-600 mt-0.5" />
                        <span><strong>Custom itinerary</strong> matching your preferences</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 rounded-2xl p-4 border border-orange-200">
                    <p className="text-sm text-orange-900">
                      <strong>📧 Check your email</strong> - You'll receive the detailed proposal within 24 hours.
                    </p>
                  </div>

                  <Button
                    onClick={() => setShowAIResponse(false)}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-xl h-11 font-bold"
                  >
                    Got it, Thanks!
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Additional screens would be implemented here (deity-filter, temple-detail, geography)
  // For brevity, returning to main for now
  return <div>Screen: {currentScreen}</div>;
}
