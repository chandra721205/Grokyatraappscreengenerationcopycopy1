import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Heart,
  Youtube,
  Globe,
  Navigation,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Clock,
  TrendingUp,
  Sparkles,
  Bell,
  ChevronRight,
  ChevronDown,
  Eye,
  EyeOff,
  Filter,
  Search,
  Package,
  Gift,
  Gem,
  Map,
  Mountain,
  Flame,
  Flower2,
  Sun,
  Waves,
  Award,
  Accessibility,
  Plus,
  Check,
  Loader2,
  MessageSquare,
  X,
  Star,
  Info,
  CircleDot,
  Image as ImageIcon,
  Leaf,
  Phone,
  Mail,
  ChevronUp,
  Edit,
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
// HINDU PILGRIMS - ULTIMATE ENHANCED VERSION
// Following exact specifications from user
// ========================================
//
// SCREEN 1: Enhanced Hindu Circuits Dashboard
// - Preserve existing elements
// - Add 4 new sections (Hidden Gems, Geography, Deity, Packages)
// - Interest capture system
// - Custom tour builder
// - YouTube/Google integration
//
// SCREEN 2: Deity-Centric View
// - Large deity banner
// - Associated circuits
// - Custom build form (pre-filled)
//
// SCREEN 3: Temple Detail Enhancement
// - All existing info preserved
// - Interest buttons row
// - Nearby temples
// - Grok AI tips
//
// ALL CONTENT: Admin-editable with dashed borders
// ALL INTERACTIONS: Fully functional
//
// ========================================

type Screen = 'dashboard' | 'deity-focus' | 'temple-detail';
type Deity = 'all' | 'vishnu' | 'shiva' | 'shakti' | 'ganesha' | 'hanuman' | 'surya' | 'kartikeya';
type Region = 'north' | 'south' | 'east' | 'west' | null;

interface HinduPilgrimsUltimateProps {
  onBack: () => void;
}

// ========================================
// DATA: SACRED CIRCUITS (Existing)
// ========================================

const sacredCircuits = [
  {
    id: 'char-dham',
    name: '[Admin: Char Dham Yatra]',
    subtitle: 'Four Divine Abodes',
    deity: 'vishnu',
    deityName: 'Vishnu & Shiva',
    icon: Mountain,
    emoji: '⛰️',
    priceRange: '₹35,000 - ₹75,000',
    duration: '10-15 days',
    keyTemples: ['[Admin: Temple 1]', '[Admin: Temple 2]', '[Admin: Temple 3]', '[Admin: Temple 4]'],
    states: '[Admin: State Name]',
    bestTime: 'May - October',
    crowdLevel: 'High',
    difficulty: 'Challenging',
    gradient: 'from-green-500 via-emerald-500 to-teal-600',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    description: '[Admin: Edit description] Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sacred pilgrimage to the four holiest sites in the Himalayas.',
    rating: 4.8,
    reviews: 245,
  },
  {
    id: 'jyotirlinga',
    name: '[Admin: 12 Jyotirlingas]',
    subtitle: 'Sacred Shiva Shrines',
    deity: 'shiva',
    deityName: 'Lord Shiva',
    icon: Flame,
    emoji: '🕉️',
    priceRange: '₹50,000 - ₹1,20,000',
    duration: '15-30 days',
    keyTemples: ['[Admin: Temple A]', '[Admin: Temple B]', '[Admin: Temple C]', '[Admin: Temple D]'],
    states: 'Multiple States',
    bestTime: 'October - March',
    crowdLevel: 'Very High',
    difficulty: 'Moderate',
    gradient: 'from-orange-500 via-red-500 to-pink-600',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    description: '[Admin: Edit description] Lorem ipsum dolor sit amet. Visit all 12 sacred Jyotirlinga shrines spread across India.',
    rating: 4.9,
    reviews: 312,
  },
  {
    id: 'divya-desam',
    name: '[Admin: 108 Divya Desams]',
    subtitle: 'Vishnu Sacred Temples',
    deity: 'vishnu',
    deityName: 'Lord Vishnu',
    icon: Flower2,
    emoji: '🪷',
    priceRange: '₹60,000 - ₹1,50,000',
    duration: '20-45 days',
    keyTemples: ['[Admin: Temple X]', '[Admin: Temple Y]', '[Admin: Temple Z]', '[Admin: Temple W]'],
    states: 'South India',
    bestTime: 'November - February',
    crowdLevel: 'Moderate',
    difficulty: 'Easy to Moderate',
    gradient: 'from-blue-500 via-indigo-500 to-purple-600',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    description: '[Admin: Edit description] Lorem ipsum dolor sit amet. Sacred temples glorified by the Alvars in Tamil literature.',
    rating: 4.7,
    reviews: 189,
  },
  {
    id: 'shakti-peetha',
    name: '[Admin: 51 Shakti Peethas]',
    subtitle: 'Divine Feminine Shrines',
    deity: 'shakti',
    deityName: 'Goddess Shakti',
    icon: Sparkles,
    emoji: '🌺',
    priceRange: '₹70,000 - ₹1,80,000',
    duration: '25-40 days',
    keyTemples: ['[Admin: Temple P]', '[Admin: Temple Q]', '[Admin: Temple R]', '[Admin: Temple S]'],
    states: 'Pan-India',
    bestTime: 'October - April',
    crowdLevel: 'Moderate to High',
    difficulty: 'Moderate',
    gradient: 'from-pink-500 via-rose-500 to-red-600',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    description: '[Admin: Edit description] Lorem ipsum dolor sit amet. Sacred seats of the Divine Mother goddess Shakti.',
    rating: 4.8,
    reviews: 203,
  },
  {
    id: 'navagraha',
    name: '[Admin: Navagraha Temples] 🪐',
    subtitle: 'Cosmic Deity Shrines',
    deity: 'surya',
    deityName: 'Nine Celestial Gods',
    icon: Sun,
    emoji: '🪐',
    priceRange: '₹15,000 - ₹30,000',
    duration: '5-7 days',
    keyTemples: ['Sun Temple', 'Moon Temple', 'Mars Temple', 'Mercury Temple'],
    states: '[Admin: South State]',
    bestTime: 'Year-round',
    crowdLevel: 'Low to Moderate',
    difficulty: 'Easy',
    gradient: 'from-yellow-500 via-amber-500 to-orange-600',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    description: '[Admin: Edit description] Lorem ipsum dolor sit amet. Nine temples dedicated to the celestial bodies.',
    rating: 4.6,
    reviews: 156,
  },
  {
    id: 'pancha-bhoota',
    name: '[Admin: Pancha Bhoota Sthalams]',
    subtitle: 'Five Element Temples',
    deity: 'shiva',
    deityName: 'Lord Shiva',
    icon: Waves,
    emoji: '🌊',
    priceRange: '₹20,000 - ₹40,000',
    duration: '5-8 days',
    keyTemples: ['Earth Temple', 'Water Temple', 'Fire Temple', 'Air Temple'],
    states: '[Admin: South State]',
    bestTime: 'November - March',
    crowdLevel: 'Moderate',
    difficulty: 'Easy',
    gradient: 'from-cyan-500 via-teal-500 to-blue-600',
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
    description: '[Admin: Edit description] Lorem ipsum dolor sit amet. Five temples representing the five elements of nature.',
    rating: 4.7,
    reviews: 178,
  },
];

// ========================================
// DATA: HIDDEN SPIRITUAL GEMS (New)
// ========================================

const hiddenGems = [
  {
    id: 'gem-1',
    name: '[Admin: Hidden Temple Alpha]',
    location: '[Admin: City], [Admin: State]',
    visitorCount: '<20/day',
    accessibility: '♿ Senior-friendly',
    feature: '🌿 Peaceful Vibe',
    deity: '[Admin: Deity Name]',
    image: 'placeholder',
    description: '[Admin: Edit gem description] Lorem ipsum serene temple.',
    rating: 4.9,
  },
  {
    id: 'gem-2',
    name: '[Admin: Hidden Temple Beta]',
    location: '[Admin: City], [Admin: State]',
    visitorCount: '<30/day',
    accessibility: '🚗 Jeep access required',
    feature: '🏔️ Mountain View',
    deity: '[Admin: Deity Name]',
    image: 'placeholder',
    description: '[Admin: Edit gem description] Lorem ipsum mountain temple.',
    rating: 4.8,
  },
  {
    id: 'gem-3',
    name: '[Admin: Hidden Temple Gamma]',
    location: '[Admin: City], [Admin: State]',
    visitorCount: '<50/day',
    accessibility: '♿ Wheelchair accessible',
    feature: '🌊 Riverside',
    deity: '[Admin: Deity Name]',
    image: 'placeholder',
    description: '[Admin: Edit gem description] Lorem ipsum riverside temple.',
    rating: 4.7,
  },
  {
    id: 'gem-4',
    name: '[Admin: Hidden Temple Delta]',
    location: '[Admin: City], [Admin: State]',
    visitorCount: '<40/day',
    accessibility: '🥾 Moderate trekking',
    feature: '🌲 Forest Temple',
    deity: '[Admin: Deity Name]',
    image: 'placeholder',
    description: '[Admin: Edit gem description] Lorem ipsum forest temple.',
    rating: 4.6,
  },
  {
    id: 'gem-5',
    name: '[Admin: Hidden Temple Epsilon]',
    location: '[Admin: City], [Admin: State]',
    visitorCount: '<25/day',
    accessibility: '♿ Senior-friendly',
    feature: '🏖️ Beach Temple',
    deity: '[Admin: Deity Name]',
    image: 'placeholder',
    description: '[Admin: Edit gem description] Lorem ipsum beach temple.',
    rating: 4.8,
  },
  {
    id: 'gem-6',
    name: '[Admin: Hidden Temple Zeta]',
    location: '[Admin: City], [Admin: State]',
    visitorCount: '<35/day',
    accessibility: '🚗 4WD recommended',
    feature: '⛰️ Hill Station',
    deity: '[Admin: Deity Name]',
    image: 'placeholder',
    description: '[Admin: Edit gem description] Lorem ipsum hill temple.',
    rating: 4.7,
  },
];

// ========================================
// DATA: GEOGRAPHY REGIONS
// ========================================

const geographyRegions = [
  {
    id: 'north',
    name: 'North India',
    templeCount: 9,
    states: ['[Admin: State 1]', '[Admin: State 2]', '[Admin: State 3]'],
    icon: Mountain,
  },
  {
    id: 'south',
    name: 'South India',
    templeCount: 12,
    states: ['[Admin: State 4]', '[Admin: State 5]', '[Admin: State 6]'],
    icon: Waves,
  },
  {
    id: 'east',
    name: 'East India',
    templeCount: 7,
    states: ['[Admin: State 7]', '[Admin: State 8]'],
    icon: Sun,
  },
  {
    id: 'west',
    name: 'West India',
    templeCount: 8,
    states: ['[Admin: State 9]', '[Admin: State 10]'],
    icon: Flame,
  },
];

const geographyTemples = [
  {
    id: 'geo-temple-1',
    name: '[Admin: Temple Name 1]',
    district: '[Admin: District]',
    state: '[Admin: State]',
    deity: '[Admin: Primary Deity]',
    rating: 4.5,
    reviews: 120,
    region: 'north',
  },
  {
    id: 'geo-temple-2',
    name: '[Admin: Temple Name 2]',
    district: '[Admin: District]',
    state: '[Admin: State]',
    deity: '[Admin: Primary Deity]',
    rating: 4.7,
    reviews: 89,
    region: 'south',
  },
  {
    id: 'geo-temple-3',
    name: '[Admin: Temple Name 3]',
    district: '[Admin: District]',
    state: '[Admin: State]',
    deity: '[Admin: Primary Deity]',
    rating: 4.6,
    reviews: 95,
    region: 'east',
  },
];

// ========================================
// DATA: DEITY CATEGORIES
// ========================================

const deityCategories = [
  {
    id: 'vishnu' as Deity,
    name: 'Vishnu',
    fullName: 'Lord Vishnu',
    icon: Flower2,
    emoji: '🪷',
    count: 108,
    gradient: 'from-blue-500 to-purple-600',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    description: '[Admin: Edit deity description] Lorem ipsum preserver of the universe.',
  },
  {
    id: 'shiva' as Deity,
    name: 'Shiva',
    fullName: 'Lord Shiva',
    icon: Flame,
    emoji: '🕉️',
    count: 45,
    gradient: 'from-orange-500 to-red-600',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    description: '[Admin: Edit deity description] Lorem ipsum destroyer and transformer.',
  },
  {
    id: 'shakti' as Deity,
    name: 'Shakti',
    fullName: 'Goddess Shakti',
    icon: Sparkles,
    emoji: '🌺',
    count: 51,
    gradient: 'from-pink-500 to-red-600',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    description: '[Admin: Edit deity description] Lorem ipsum divine feminine energy.',
  },
  {
    id: 'ganesha' as Deity,
    name: 'Ganesha',
    fullName: 'Lord Ganesha',
    icon: Award,
    emoji: '🐘',
    count: 30,
    gradient: 'from-yellow-500 to-orange-600',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    description: '[Admin: Edit deity description] Lorem ipsum remover of obstacles.',
  },
  {
    id: 'hanuman' as Deity,
    name: 'Hanuman',
    fullName: 'Lord Hanuman',
    icon: TrendingUp,
    emoji: '🦁',
    count: 25,
    gradient: 'from-red-500 to-orange-600',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    description: '[Admin: Edit deity description] Lorem ipsum symbol of devotion.',
  },
  {
    id: 'surya' as Deity,
    name: 'Surya',
    fullName: 'Lord Surya',
    icon: Sun,
    emoji: '☀️',
    count: 12,
    gradient: 'from-amber-500 to-yellow-600',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    description: '[Admin: Edit deity description] Lorem ipsum sun god.',
  },
  {
    id: 'kartikeya' as Deity,
    name: 'Kartikeya',
    fullName: 'Lord Kartikeya',
    icon: CircleDot,
    emoji: '🦚',
    count: 15,
    gradient: 'from-green-500 to-teal-600',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    description: '[Admin: Edit deity description] Lorem ipsum god of war.',
  },
];

// ========================================
// DATA: SPECIAL PACKAGES
// ========================================

const specialPackages = [
  {
    id: 'pkg-1',
    name: '[Admin: Char Dham Deluxe]',
    duration: '14 days',
    price: '₹1,50,000',
    badge: '🎁 Premium Package',
    inclusions: [
      '[Admin: All darshans booked]',
      '[Admin: Senior care included]',
      '[Admin: Helicopter to Kedarnath]',
      '[Admin: 5-star accommodation]',
    ],
    gradient: 'from-purple-500 to-pink-600',
    icon: Gift,
    description: '[Admin: Edit package description] Lorem ipsum premium pilgrimage.',
  },
  {
    id: 'pkg-2',
    name: '[Admin: South Temple Circuit]',
    duration: '10 days',
    price: '₹85,000',
    badge: '🌟 Cultural Package',
    inclusions: [
      '[Admin: 15+ temple visits]',
      '[Admin: Traditional meals]',
      '[Admin: Expert guide]',
      '[Admin: AC transport]',
    ],
    gradient: 'from-blue-500 to-indigo-600',
    icon: Flower2,
    description: '[Admin: Edit package description] Lorem ipsum cultural journey.',
  },
  {
    id: 'pkg-3',
    name: '[Admin: Senior Pilgrimage]',
    duration: '8 days',
    price: '₹65,000',
    badge: '♿ Senior Care',
    inclusions: [
      '[Admin: Medical support 24/7]',
      '[Admin: Wheelchair access]',
      '[Admin: Special dietary care]',
      '[Admin: Slower pace]',
    ],
    gradient: 'from-green-500 to-teal-600',
    icon: Accessibility,
    description: '[Admin: Edit package description] Lorem ipsum senior-friendly.',
  },
];

// ========================================
// MAIN COMPONENT
// ========================================

export function HinduPilgrimsUltimate({ onBack }: HinduPilgrimsUltimateProps) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [selectedDeity, setSelectedDeity] = useState<Deity>('all');
  const [selectedCircuit, setSelectedCircuit] = useState<any>(null);
  const [selectedTemple, setSelectedTemple] = useState<any>(null);
  const [showHiddenGems, setShowHiddenGems] = useState(false);
  const [showCustomTourModal, setShowCustomTourModal] = useState(false);
  const [showAIConfirmation, setShowAIConfirmation] = useState(false);
  const [isAITyping, setIsAITyping] = useState(false);
  const [savedInterests, setSavedInterests] = useState<Set<string>>(new Set());
  const [notifyDeals, setNotifyDeals] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<Region>(null);
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [formStep, setFormStep] = useState(1);
  const [grokQuery, setGrokQuery] = useState('');

  // Form state
  const [tourForm, setTourForm] = useState({
    startDate: '',
    endDate: '',
    groupSize: '',
    budget: '',
    seniorCare: false,
    medicalAssistance: false,
    dietary: '',
    ritual: '',
    deity: selectedDeity,
  });

  const handleSaveInterest = (id: string) => {
    const newSaved = new Set(savedInterests);
    if (newSaved.has(id)) {
      newSaved.delete(id);
      toast.success('Removed from saved interests');
    } else {
      newSaved.add(id);
      toast.success('Added to saved interests ❤️');
    }
    setSavedInterests(newSaved);
  };

  const handleCustomTourSubmit = () => {
    setShowCustomTourModal(false);
    setIsAITyping(true);
    setShowAIConfirmation(true);

    setTimeout(() => {
      setIsAITyping(false);
    }, 3000);
  };

  const handleViewDetails = (circuit: any) => {
    setSelectedCircuit(circuit);
    setSelectedTemple({
      name: circuit.name,
      deity: circuit.deityName,
      description: circuit.description,
      ...circuit,
    });
    setCurrentScreen('temple-detail');
  };

  const handleWatchVideos = (name: string) => {
    toast.success('Opening YouTube videos...');
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(name)}`, '_blank');
  };

  const handleViewMap = (name: string) => {
    toast.success('Opening Google Maps...');
    window.open(`https://www.google.com/maps/search/${encodeURIComponent(name)}`, '_blank');
  };

  // ========================================
  // SCREEN 1: DASHBOARD
  // ========================================

  if (currentScreen === 'dashboard') {
    const filteredCircuits = selectedDeity === 'all'
      ? sacredCircuits
      : sacredCircuits.filter(c => c.deity === selectedDeity);

    const filteredGeoTemples = selectedRegion
      ? geographyTemples.filter(t => t.region === selectedRegion)
      : geographyTemples;

    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50 pb-20">
        {/* Sticky Header */}
        <div className="sticky top-0 z-40 bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-xl">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onBack}
                  className="text-white hover:bg-white/20 transition-all"
                >
                  <ArrowLeft className="w-6 h-6" />
                </Button>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">🕉️</span>
                    <div>
                      <h1 className="text-3xl font-bold">Hindu Pilgrims</h1>
                      <p className="text-white/90 text-sm mt-1">
                        Sacred Circuits & Divine Journeys
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">
          {/* Notification Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-dashed border-orange-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Bell className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">[Admin: Notification toggle text]</p>
                  <p className="text-sm text-gray-500">Notify me about deals & budget updates</p>
                </div>
              </div>
              <Switch checked={notifyDeals} onCheckedChange={setNotifyDeals} />
            </div>
          </motion.div>

          {/* EXISTING: Sacred Circuits Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Mountain className="w-8 h-8 text-orange-600" />
                  Sacred Circuits
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  [Admin: Edit section description] - Six major pilgrimage circuits
                </p>
              </div>
              <Badge className="bg-orange-100 text-orange-800 px-4 py-2 text-lg">
                6 Circuits
              </Badge>
            </div>

            {/* Sacred Circuits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCircuits.map((circuit, index) => {
                const Icon = circuit.icon;
                const isSaved = savedInterests.has(circuit.id);

                return (
                  <motion.div
                    key={circuit.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-200 hover:scale-[1.02]">
                      {/* Gradient Header */}
                      <div className={`bg-gradient-to-r ${circuit.gradient} p-6 text-white relative overflow-hidden`}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                        
                        <div className="relative">
                          <div className="flex items-start justify-between mb-3">
                            <div className={`${circuit.iconBg} p-3 rounded-xl`}>
                              <Icon className={`w-7 h-7 ${circuit.iconColor}`} />
                            </div>
                            <button
                              onClick={() => handleSaveInterest(circuit.id)}
                              className={`p-2 rounded-full transition-all ${
                                isSaved ? 'bg-red-500 scale-110' : 'bg-white/20 hover:bg-white/30'
                              }`}
                            >
                              <Heart className={`w-5 h-5 ${isSaved ? 'fill-white' : ''}`} />
                            </button>
                          </div>
                          <div className="border border-dashed border-white/50 p-2 rounded-lg bg-white/10">
                            <h3 className="text-lg font-bold">{circuit.name}</h3>
                          </div>
                          <p className="text-sm text-white/90 mt-2">{circuit.subtitle}</p>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5 space-y-3">
                        <div className="bg-gray-50 p-3 rounded-lg border border-dashed border-gray-300">
                          <p className="text-xs text-gray-500 mb-1">ADMIN_Editable_Description</p>
                          <p className="text-sm text-gray-700">{circuit.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-gray-50 p-2 rounded-lg">
                            <div className="flex items-center gap-1 mb-1">
                              <DollarSign className="w-3 h-3 text-gray-500" />
                              <span className="text-xs text-gray-500">Price</span>
                            </div>
                            <p className="text-xs font-bold text-gray-900">{circuit.priceRange}</p>
                          </div>
                          <div className="bg-gray-50 p-2 rounded-lg">
                            <div className="flex items-center gap-1 mb-1">
                              <Clock className="w-3 h-3 text-gray-500" />
                              <span className="text-xs text-gray-500">Duration</span>
                            </div>
                            <p className="text-xs font-bold text-gray-900">{circuit.duration}</p>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-2 rounded-lg border border-dashed border-gray-300">
                          <p className="text-xs text-gray-500 mb-1">ADMIN_Key_Temples</p>
                          <div className="flex flex-wrap gap-1">
                            {circuit.keyTemples.map((temple, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {temple}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-1 text-xs">
                          <div className="flex items-center gap-1 bg-blue-50 p-1.5 rounded">
                            <MapPin className="w-3 h-3 text-blue-600" />
                            <span>{circuit.states}</span>
                          </div>
                          <div className="flex items-center gap-1 bg-green-50 p-1.5 rounded">
                            <Calendar className="w-3 h-3 text-green-600" />
                            <span className="text-xs">{circuit.bestTime}</span>
                          </div>
                          <div className="flex items-center gap-1 bg-orange-50 p-1.5 rounded">
                            <Users className="w-3 h-3 text-orange-600" />
                            <span className="text-xs">{circuit.crowdLevel}</span>
                          </div>
                          <div className="flex items-center gap-1 bg-yellow-50 p-1.5 rounded">
                            <Star className="w-3 h-3 text-yellow-600" />
                            <span className="text-xs">{circuit.rating} ({circuit.reviews})</span>
                          </div>
                        </div>

                        <div className="space-y-2 pt-2">
                          <Button
                            onClick={() => handleViewDetails(circuit)}
                            className={`w-full bg-gradient-to-r ${circuit.gradient} text-white text-sm`}
                          >
                            <Navigation className="w-4 h-4 mr-2" />
                            View Details & Plan Yatra
                          </Button>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleWatchVideos(circuit.name)}
                              className="text-red-600 border-red-200 hover:bg-red-50 text-xs"
                            >
                              <Youtube className="w-3 h-3 mr-1" />
                              Videos
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewMap(circuit.name)}
                              className="text-blue-600 border-blue-200 hover:bg-blue-50 text-xs"
                            >
                              <Globe className="w-3 h-3 mr-1" />
                              Map
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* SECTION A: 💎 HIDDEN SPIRITUAL GEMS */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Gem className="w-8 h-8 text-purple-600" />
                  Hidden Spiritual Gems 💎
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  [Admin: Edit subtitle] Lesser-known temples with &lt;50 visitors/day
                </p>
              </div>
              <Button
                onClick={() => setShowHiddenGems(!showHiddenGems)}
                variant="outline"
                className="border border-purple-300 text-purple-600 hover:bg-purple-50"
              >
                {showHiddenGems ? (
                  <>
                    <EyeOff className="w-4 h-4 mr-2" />
                    Hide Gems
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Show Hidden Gems
                  </>
                )}
              </Button>
            </div>

            <AnimatePresence>
              {showHiddenGems && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {hiddenGems.map((gem, index) => {
                    const isSaved = savedInterests.has(gem.id);

                    return (
                      <motion.div
                        key={gem.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all hover:scale-[1.02]"
                      >
                        {/* Thumbnail */}
                        <div className="relative h-40 bg-gradient-to-br from-purple-100 to-pink-100 border-b-2 border-dashed border-purple-300">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <ImageIcon className="w-12 h-12 text-purple-400" />
                            <span className="absolute bottom-2 left-2 text-xs bg-white/80 px-2 py-1 rounded">
                              [Admin: Image]
                            </span>
                          </div>
                          <button
                            onClick={() => handleSaveInterest(gem.id)}
                            className={`absolute top-2 right-2 p-2 rounded-full transition-all ${
                              isSaved ? 'bg-red-500 scale-110' : 'bg-white/90 hover:bg-white'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${isSaved ? 'fill-white text-white' : 'text-gray-600'}`} />
                          </button>
                        </div>

                        {/* Content */}
                        <div className="p-5 space-y-3">
                          <div className="border border-dashed border-purple-300 p-2 rounded-lg bg-purple-50">
                            <p className="text-xs text-purple-600 mb-1">ADMIN_Temple_Name</p>
                            <h3 className="font-bold text-gray-900">{gem.name}</h3>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-purple-600" />
                              <span className="text-gray-700">{gem.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-purple-600" />
                              <Badge className="bg-purple-100 text-purple-800 text-xs">
                                {gem.visitorCount}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                              <span>{gem.accessibility}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                              <Leaf className="w-4 h-4 text-green-600" />
                              <span>{gem.feature}</span>
                            </div>
                          </div>

                          <div className="bg-gray-50 p-2 rounded-lg border border-dashed border-gray-300">
                            <p className="text-xs text-gray-500 mb-1">ADMIN_Description</p>
                            <p className="text-xs text-gray-700">{gem.description}</p>
                          </div>

                          <Button
                            size="sm"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                          >
                            <Navigation className="w-4 h-4 mr-2" />
                            Explore This Gem →
                          </Button>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* SECTION B: 📍 BROWSE BY GEOGRAPHY */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Map className="w-8 h-8 text-green-600" />
                Browse Temples by Geography 📍
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                [Admin: Edit subtitle] Select a region to explore temples
              </p>
            </div>

            {/* Region Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {geographyRegions.map((region) => {
                const Icon = region.icon;
                const isSelected = selectedRegion === region.id;

                return (
                  <motion.button
                    key={region.id}
                    onClick={() => setSelectedRegion(isSelected ? null : region.id as Region)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`bg-white rounded-xl shadow-md p-6 transition-all ${
                      isSelected
                        ? 'border-2 border-green-500 shadow-xl'
                        : 'border border-dashed border-green-300 hover:shadow-lg'
                    }`}
                  >
                    <Icon className={`w-8 h-8 mx-auto mb-3 ${isSelected ? 'text-green-600' : 'text-gray-400'}`} />
                    <div className="border border-dashed border-green-300 p-2 rounded-lg bg-green-50 mb-2">
                      <p className="text-xs text-green-600">ADMIN_Region</p>
                      <h3 className="font-bold text-gray-900">{region.name}</h3>
                    </div>
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      {region.templeCount} temples
                    </Badge>
                  </motion.button>
                );
              })}
            </div>

            {/* District Filter */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-dashed border-green-300">
              <h3 className="font-bold text-lg mb-4">District Filter System</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-dashed border-gray-300 p-3 rounded-lg">
                  <label className="text-xs text-gray-500 mb-2 block">ADMIN_State_Dropdown</label>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="state1">[Admin: State 1]</SelectItem>
                      <SelectItem value="state2">[Admin: State 2]</SelectItem>
                      <SelectItem value="state3">[Admin: State 3]</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="border border-dashed border-gray-300 p-3 rounded-lg">
                  <label className="text-xs text-gray-500 mb-2 block">ADMIN_District_Dropdown</label>
                  <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="district1">[Admin: District 1]</SelectItem>
                      <SelectItem value="district2">[Admin: District 2]</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Search className="w-4 h-4 mr-2" />
                    View Temples
                  </Button>
                </div>
              </div>
            </div>

            {/* Temple Cards for Selected Region */}
            {selectedRegion && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredGeoTemples.map((temple) => {
                  const isSaved = savedInterests.has(temple.id);

                  return (
                    <div
                      key={temple.id}
                      className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 border border-dashed border-green-300 p-2 rounded-lg">
                          <p className="text-xs text-green-600">ADMIN_Temple</p>
                          <h3 className="font-bold text-gray-900 text-sm">{temple.name}</h3>
                        </div>
                        <button
                          onClick={() => handleSaveInterest(temple.id)}
                          className={`ml-2 p-2 rounded-full ${
                            isSaved ? 'bg-red-500' : 'bg-gray-100'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isSaved ? 'fill-white text-white' : 'text-gray-600'}`} />
                        </button>
                      </div>
                      <div className="space-y-2 text-xs mb-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3 text-green-600" />
                          <span>{temple.district}, {temple.state}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-3 h-3 text-green-600" />
                          <span>{temple.deity}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-3 h-3 text-yellow-600" />
                          <span>{temple.rating} ({temple.reviews} reviews)</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="w-full text-xs">
                        <Navigation className="w-3 h-3 mr-2" />
                        View Details →
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* SECTION C: 🕉️ BROWSE BY DEITY */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-blue-600" />
                Browse by Deity Focus 🕉️
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                [Admin: Edit subtitle] Filter circuits by deity preference
              </p>
            </div>

            {/* Deity Filter Bar (Horizontal Scroll) */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-dashed border-blue-300">
              <h3 className="font-bold text-lg mb-4">Deity Filter Bar</h3>
              <div className="flex gap-3 overflow-x-auto pb-2">
                <button
                  onClick={() => setSelectedDeity('all')}
                  className={`flex-shrink-0 p-4 rounded-xl border transition-all ${
                    selectedDeity === 'all'
                      ? 'border-2 border-blue-500 bg-blue-50'
                      : 'border border-dashed border-gray-300 hover:border-blue-300'
                  }`}
                >
                  <Star className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <div className="text-center">
                    <p className="font-bold text-sm">All</p>
                    <Badge className="mt-1 text-xs">6 circuits</Badge>
                  </div>
                </button>

                {deityCategories.map((deity) => {
                  const Icon = deity.icon;
                  const isSelected = selectedDeity === deity.id;

                  return (
                    <button
                      key={deity.id}
                      onClick={() => {
                        setSelectedDeity(deity.id);
                        setCurrentScreen('deity-focus');
                      }}
                      className={`flex-shrink-0 p-4 rounded-xl border transition-all ${
                        isSelected
                          ? `border-2 ${deity.iconColor.replace('text-', 'border-')} ${deity.iconBg}`
                          : 'border border-dashed border-gray-300 hover:shadow-md'
                      }`}
                    >
                      <div className={`w-12 h-12 ${deity.iconBg} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                        <Icon className={`w-6 h-6 ${deity.iconColor}`} />
                      </div>
                      <div className="text-center border border-dashed border-gray-300 p-1 rounded">
                        <p className="text-xs text-gray-500">ADMIN</p>
                        <p className="font-bold text-sm">{deity.emoji} {deity.name}</p>
                      </div>
                      <Badge className="mt-2 text-xs">
                        {deity.count} temples
                      </Badge>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Deity Detail Panel (when deity selected) */}
            {selectedDeity !== 'all' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-xl p-8 border-2 border-dashed border-blue-300"
              >
                {(() => {
                  const deity = deityCategories.find(d => d.id === selectedDeity);
                  if (!deity) return null;
                  const Icon = deity.icon;

                  return (
                    <>
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-16 h-16 ${deity.iconBg} rounded-2xl flex items-center justify-center`}>
                          <Icon className={`w-10 h-10 ${deity.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <div className="border border-dashed border-blue-400 p-3 rounded-lg bg-white">
                            <p className="text-xs text-blue-600">ADMIN_Deity_Name</p>
                            <h3 className="text-2xl font-bold text-gray-900">
                              {deity.emoji} {deity.fullName}
                            </h3>
                          </div>
                          <Badge className="mt-2 bg-blue-100 text-blue-800">
                            {deity.count} associated temples
                          </Badge>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-dashed border-blue-300 mb-6">
                        <p className="text-xs text-blue-600 mb-2">ADMIN_Deity_Description</p>
                        <p className="text-gray-700">{deity.description}</p>
                      </div>

                      <Button
                        onClick={() => setCurrentScreen('deity-focus')}
                        className={`w-full bg-gradient-to-r ${deity.gradient} text-white text-lg py-6`}
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Build Custom {deity.name} Pilgrimage
                      </Button>
                    </>
                  );
                })()}
              </motion.div>
            )}
          </div>

          {/* SECTION D: 🎁 SPECIAL PACKAGES BY ADMIN */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Package className="w-8 h-8 text-pink-600" />
                Special Pilgrimage Packages 🎁
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                [Admin: Edit subtitle] Curated spiritual journeys
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {specialPackages.map((pkg, index) => {
                const Icon = pkg.icon;
                const isSaved = savedInterests.has(pkg.id);

                return (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all hover:scale-[1.02]"
                  >
                    {/* Header */}
                    <div className={`bg-gradient-to-r ${pkg.gradient} p-6 text-white relative`}>
                      <div className="flex items-center justify-between mb-3">
                        <Icon className="w-8 h-8" />
                        <button
                          onClick={() => handleSaveInterest(pkg.id)}
                          className={`p-2 rounded-full ${
                            isSaved ? 'bg-red-500 scale-110' : 'bg-white/20 hover:bg-white/30'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                        </button>
                      </div>
                      <Badge className="bg-white/20 text-white border-0 mb-3">
                        {pkg.badge}
                      </Badge>
                      <div className="border border-dashed border-white/50 p-2 rounded-lg bg-white/10">
                        <p className="text-xs text-white/80">ADMIN_Package_Name</p>
                        <h3 className="font-bold text-lg">{pkg.name}</h3>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between border-b border-dashed border-gray-300 pb-3">
                        <span className="text-sm text-gray-600">⏱️ Duration:</span>
                        <span className="font-bold">{pkg.duration}</span>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300">
                        <p className="text-xs text-gray-500 mb-3">ADMIN_Inclusions</p>
                        <ul className="space-y-2">
                          {pkg.inclusions.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-dashed border-gray-300 pt-3">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-gray-600">Price:</span>
                          <span className="text-2xl font-bold text-gray-900">💰 {pkg.price}</span>
                        </div>
                        <Button
                          className={`w-full bg-gradient-to-r ${pkg.gradient} text-white`}
                        >
                          <Package className="w-4 h-4 mr-2" />
                          Book Now →
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Floating Action Button - Build Custom Pilgrimage */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Button
            onClick={() => setShowCustomTourModal(true)}
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-6 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110"
          >
            <Plus className="w-6 h-6 mr-2" />
            Build Custom Pilgrimage
          </Button>
        </motion.div>

        {/* Custom Tour Builder Modal (Multi-step) */}
        <Dialog open={showCustomTourModal} onOpenChange={setShowCustomTourModal}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">Custom Tour Builder</DialogTitle>
              <DialogDescription>
                [Admin: Edit form description] - Step {formStep} of 4
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-6">
              {/* Step 1: Basic Details */}
              {formStep === 1 && (
                <div className="space-y-4 border border-dashed border-gray-300 p-6 rounded-xl">
                  <h3 className="font-bold text-xl">Step 1: Basic Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-dashed border-gray-300 p-3 rounded-lg">
                      <label className="text-sm font-medium mb-2 block">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Dates (Admin editable)
                      </label>
                      <Input
                        type="date"
                        value={tourForm.startDate}
                        onChange={(e) => setTourForm({ ...tourForm, startDate: e.target.value })}
                      />
                    </div>
                    <div className="border border-dashed border-gray-300 p-3 rounded-lg">
                      <label className="text-sm font-medium mb-2 block">End Date</label>
                      <Input
                        type="date"
                        value={tourForm.endDate}
                        onChange={(e) => setTourForm({ ...tourForm, endDate: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="border border-dashed border-gray-300 p-3 rounded-lg">
                    <label className="text-sm font-medium mb-2 block">Group Size</label>
                    <div className="flex gap-4">
                      {['1-5', '6-15', '16+'].map((size) => (
                        <label key={size} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="groupSize"
                            value={size}
                            checked={tourForm.groupSize === size}
                            onChange={(e) => setTourForm({ ...tourForm, groupSize: e.target.value })}
                          />
                          <span>{size}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="border border-dashed border-gray-300 p-3 rounded-lg">
                    <label className="text-sm font-medium mb-2 block">Budget Range</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="₹ Min" />
                      <Input placeholder="₹ Max" />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Special Requirements */}
              {formStep === 2 && (
                <div className="space-y-4 border border-dashed border-gray-300 p-6 rounded-xl">
                  <h3 className="font-bold text-xl">Step 2: Special Requirements</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 border border-dashed border-gray-300 p-3 rounded-lg">
                      <input
                        type="checkbox"
                        checked={tourForm.seniorCare}
                        onChange={(e) => setTourForm({ ...tourForm, seniorCare: e.target.checked })}
                      />
                      <Accessibility className="w-5 h-5 text-blue-600" />
                      <span>♿ Senior care needed</span>
                    </label>
                    <label className="flex items-center gap-3 border border-dashed border-gray-300 p-3 rounded-lg">
                      <input
                        type="checkbox"
                        checked={tourForm.medicalAssistance}
                        onChange={(e) => setTourForm({ ...tourForm, medicalAssistance: e.target.checked })}
                      />
                      <Plus className="w-5 h-5 text-red-600" />
                      <span>👨‍⚕️ Medical assistance</span>
                    </label>
                    <div className="border border-dashed border-gray-300 p-3 rounded-lg">
                      <label className="text-sm font-medium mb-2 block">Dietary preferences</label>
                      <Input
                        placeholder="e.g., Vegetarian, Vegan, etc."
                        value={tourForm.dietary}
                        onChange={(e) => setTourForm({ ...tourForm, dietary: e.target.value })}
                      />
                    </div>
                    <div className="border border-dashed border-gray-300 p-3 rounded-lg">
                      <label className="text-sm font-medium mb-2 block">Ritual preferences</label>
                      <Input
                        placeholder="e.g., Early morning darshan, etc."
                        value={tourForm.ritual}
                        onChange={(e) => setTourForm({ ...tourForm, ritual: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Deity Focus (pre-filled) */}
              {formStep === 3 && (
                <div className="space-y-4 border border-dashed border-gray-300 p-6 rounded-xl">
                  <h3 className="font-bold text-xl">Step 3: Deity Focus</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-dashed border-blue-300">
                    <p className="text-sm text-blue-600 mb-2">Pre-filled from selection</p>
                    <Select
                      value={tourForm.deity}
                      onValueChange={(value) => setTourForm({ ...tourForm, deity: value as Deity })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {deityCategories.map(d => (
                          <SelectItem key={d.id} value={d.id}>
                            {d.emoji} {d.fullName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 4: Review & Submit */}
              {formStep === 4 && (
                <div className="space-y-4 border border-dashed border-gray-300 p-6 rounded-xl">
                  <h3 className="font-bold text-xl">Step 4: Review & Submit</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p><strong>Dates:</strong> {tourForm.startDate} to {tourForm.endDate}</p>
                    <p><strong>Group Size:</strong> {tourForm.groupSize}</p>
                    <p><strong>Budget:</strong> {tourForm.budget}</p>
                    <p><strong>Senior Care:</strong> {tourForm.seniorCare ? 'Yes' : 'No'}</p>
                    <p><strong>Deity Focus:</strong> {tourForm.deity}</p>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-4 border-t border-dashed border-gray-300">
                {formStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={() => setFormStep(formStep - 1)}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                )}
                {formStep < 4 ? (
                  <Button
                    onClick={() => setFormStep(formStep + 1)}
                    className="ml-auto bg-orange-600"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleCustomTourSubmit}
                    className="ml-auto bg-gradient-to-r from-orange-500 to-red-600"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Request Customization with Grok AI
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* AI Confirmation Modal */}
        <Dialog open={showAIConfirmation} onOpenChange={setShowAIConfirmation}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                ✓ Request Received!
              </DialogTitle>
            </DialogHeader>

            <div className="py-6">
              {isAITyping ? (
                <div className="flex flex-col items-center space-y-4">
                  <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
                  <div className="flex gap-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.2 }}
                        className="w-3 h-3 bg-purple-600 rounded-full"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 text-center">
                    [AI typing indicator...]
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                    <p className="text-gray-700 mb-4">
                      Thank you! Grok AI is analyzing your pilgrimage preferences. 
                      You'll receive a customized itinerary within 24 hours including:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-600" />
                        <span>• Detailed budget breakdown</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-600" />
                        <span>• Senior care facilities</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-600" />
                        <span>• Temple booking assistance</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-600" />
                        <span>• Travel logistics</span>
                      </li>
                    </ul>
                  </div>
                  <Button
                    onClick={() => {
                      setShowAIConfirmation(false);
                      setFormStep(1);
                    }}
                    className="w-full"
                  >
                    OK, Close
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // ========================================
  // SCREEN 2: DEITY-CENTRIC VIEW
  // ========================================

  if (currentScreen === 'deity-focus') {
    const deity = deityCategories.find(d => d.id === selectedDeity);
    if (!deity) return null;

    const Icon = deity.icon;
    const filteredCircuits = sacredCircuits.filter(c => c.deity === selectedDeity);

    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
        {/* Large Deity Banner */}
        <div className={`bg-gradient-to-r ${deity.gradient} text-white p-8`}>
          <div className="max-w-7xl mx-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentScreen('dashboard')}
              className="text-white hover:bg-white/20 mb-4"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div className="flex items-center gap-6">
              <div className={`w-24 h-24 ${deity.iconBg} rounded-3xl flex items-center justify-center`}>
                <Icon className={`w-16 h-16 ${deity.iconColor}`} />
              </div>
              <div className="flex-1">
                <div className="border-2 border-dashed border-white/50 p-4 rounded-xl bg-white/10 inline-block">
                  <p className="text-sm text-white/80 mb-2">ADMIN_Deity_Name</p>
                  <h1 className="text-4xl font-bold">{deity.emoji} {deity.fullName}</h1>
                </div>
                <Badge className="mt-3 bg-white/20 text-white text-lg">
                  {deity.count} associated temples
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-8 space-y-8">
          {/* Deity Significance */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-dashed border-gray-300">
            <h2 className="text-2xl font-bold mb-4">Deity Significance</h2>
            <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300">
              <p className="text-xs text-gray-500 mb-2">ADMIN_Significance_Text</p>
              <p className="text-gray-700">{deity.description}</p>
              <p className="text-gray-700 mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>

          {/* Associated Circuits Grid */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Associated Circuits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredCircuits.map((circuit) => (
                <div
                  key={circuit.id}
                  onClick={() => handleViewDetails(circuit)}
                  className={`bg-gradient-to-br ${circuit.gradient} text-white rounded-xl p-6 cursor-pointer hover:shadow-2xl transition-all hover:scale-105`}
                >
                  <h3 className="font-bold text-lg mb-2">{circuit.name}</h3>
                  <p className="text-sm text-white/90 mb-4">{circuit.subtitle}</p>
                  <Button variant="secondary" size="sm" className="w-full">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Build Form (Pre-filled) */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-xl p-8 border-2 border-dashed border-blue-300">
            <h2 className="text-2xl font-bold mb-6">Build Custom {deity.name} Pilgrimage</h2>
            <p className="text-gray-600 mb-6">
              [Admin: Edit form description] Pre-filled with your deity preference
            </p>
            <Button
              onClick={() => {
                setTourForm({ ...tourForm, deity: selectedDeity });
                setShowCustomTourModal(true);
              }}
              className={`w-full bg-gradient-to-r ${deity.gradient} text-white text-lg py-6`}
            >
              <Plus className="w-5 h-5 mr-2" />
              Start Custom Tour Builder
            </Button>
          </div>

          <Button
            onClick={() => setCurrentScreen('dashboard')}
            variant="outline"
            className="mx-auto block"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Circuits
          </Button>
        </div>
      </div>
    );
  }

  // ========================================
  // SCREEN 3: TEMPLE DETAIL ENHANCEMENT
  // ========================================

  if (currentScreen === 'temple-detail' && selectedTemple) {
    const isSaved = savedInterests.has(selectedTemple.id || 'temple');

    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
        <div className={`bg-gradient-to-r ${selectedCircuit?.gradient || 'from-orange-500 to-red-600'} text-white p-6`}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentScreen('dashboard')}
                  className="text-white hover:bg-white/20"
                >
                  <ArrowLeft className="w-6 h-6" />
                </Button>
                <div>
                  <div className="border-2 border-dashed border-white/50 p-3 rounded-xl bg-white/10 inline-block">
                    <p className="text-xs text-white/80 mb-1">ADMIN_Temple_Name</p>
                    <h1 className="text-3xl font-bold">{selectedTemple.name}</h1>
                  </div>
                  <p className="text-white/90 text-sm mt-2">
                    Dedicated to {selectedTemple.deity}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6 space-y-8">
          {/* Interest Buttons Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              onClick={() => handleSaveInterest(selectedTemple.id || 'temple')}
              variant="outline"
              className={`h-16 ${isSaved ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
            >
              <Heart className={`w-5 h-5 mr-2 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
              {isSaved ? 'Saved' : 'Save Temple'}
            </Button>
            <Button
              onClick={() => handleWatchVideos(selectedTemple.name)}
              className="bg-red-600 hover:bg-red-700 text-white h-16"
            >
              <Youtube className="w-5 h-5 mr-2" />
              Watch Videos
            </Button>
            <Button
              onClick={() => handleViewMap(selectedTemple.name)}
              className="bg-blue-600 hover:bg-blue-700 text-white h-16"
            >
              <Globe className="w-5 h-5 mr-2" />
              View on Map
            </Button>
            <Button
              onClick={() => setShowCustomTourModal(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white h-16"
            >
              <Navigation className="w-5 h-5 mr-2" />
              Custom Tour
            </Button>
          </div>

          {/* Temple Information */}
          <div className="bg-white rounded-xl shadow-xl p-8 border border-dashed border-gray-300">
            <h2 className="text-2xl font-bold mb-4">Temple Significance</h2>
            <div className="bg-gray-50 p-6 rounded-lg border border-dashed border-gray-300">
              <p className="text-xs text-gray-500 mb-2">ADMIN_Significance_Section</p>
              <p className="text-gray-700 leading-relaxed">
                {selectedTemple.description}
              </p>
            </div>
          </div>

          {/* Grok AI Tips (Expanded) */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-xl p-8 border-2 border-dashed border-purple-300">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-purple-600" />
              <div>
                <h2 className="text-2xl font-bold">Grok AI Travel Tips</h2>
                <p className="text-sm text-purple-600">
                  [Admin: Edit AI tips section]
                </p>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-white p-4 rounded-lg border border-dashed border-purple-200">
                  <p className="text-xs text-purple-500 mb-1">ADMIN_Tip_{i}</p>
                  <p className="text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tip number {i}.
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-purple-300">
              <h3 className="font-bold text-lg mb-4">Ask Grok About This Temple</h3>
              <Input
                placeholder="e.g., What are the darshan timings?"
                value={grokQuery}
                onChange={(e) => setGrokQuery(e.target.value)}
                className="mb-3"
              />
              <Button
                onClick={() => {
                  if (grokQuery) {
                    toast.success('Query sent to Grok AI!');
                    setGrokQuery('');
                  }
                }}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Ask Grok
              </Button>
            </div>
          </div>

          {/* Nearby Temples (Admin-managed) */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Nearby Temples</h2>
            <p className="text-sm text-gray-500 mb-4">
              [Admin: Edit nearby temples] Admin-managed grid
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {sacredCircuits.slice(0, 4).map((temple) => (
                <div
                  key={temple.id}
                  onClick={() => handleViewDetails(temple)}
                  className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition-all cursor-pointer border border-dashed border-gray-300"
                >
                  <div className="border border-dashed border-gray-300 p-2 rounded-lg bg-gray-50 mb-3">
                    <p className="text-xs text-gray-500">ADMIN</p>
                    <h3 className="font-bold text-sm">{temple.name}</h3>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">{temple.subtitle}</p>
                  <Button size="sm" variant="outline" className="w-full text-xs">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Similar Circuits (Admin-managed) */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Similar Circuits</h2>
            <p className="text-sm text-gray-500 mb-4">
              [Admin: Edit similar circuits] Admin-managed recommendations
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sacredCircuits.slice(0, 3).map((circuit) => (
                <div
                  key={circuit.id}
                  onClick={() => handleViewDetails(circuit)}
                  className={`bg-gradient-to-br ${circuit.gradient} text-white rounded-xl p-6 cursor-pointer hover:shadow-2xl transition-all`}
                >
                  <h3 className="font-bold text-lg mb-2">{circuit.name}</h3>
                  <p className="text-sm mb-4">{circuit.subtitle}</p>
                  <Button variant="secondary" size="sm" className="w-full">
                    Explore Circuit
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
