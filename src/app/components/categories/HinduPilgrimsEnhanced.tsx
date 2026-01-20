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
  Bookmark,
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
// HINDU PILGRIMS - ENHANCED 3-SCREEN FLOW
// ========================================
//
// SCREEN 1: Main Hindu Circuits Dashboard
// - 6 Sacred Circuits (beautiful cards)
// - 4 New Modules (Hidden Gems, Geography, Deity, Packages)
// - Custom Tour CTA
// - Interest Capture System
//
// SCREEN 2: Deity-Focused Circuits
// - Deity Selection Grid
// - Custom Tour Builder (4-step form)
// - AI Confirmation Modal
//
// SCREEN 3: Temple Detail View
// - Complete temple information
// - Interactive features
// - Nearby temples
// - Grok AI integration
//
// ========================================

type Screen = 'dashboard' | 'deity-circuits' | 'temple-detail' | 'custom-tour';
type Deity = 'all' | 'vishnu' | 'shiva' | 'shakti' | 'ganesha' | 'hanuman' | 'surya' | 'others';

interface HinduPilgrimsEnhancedProps {
  onBack: () => void;
}

// ========================================
// DATA STRUCTURES
// ========================================

const sacredCircuits = [
  {
    id: 'char-dham',
    name: 'Char Dham Yatra',
    subtitle: 'Four Divine Abodes',
    deity: 'Vishnu & Shiva',
    icon: Mountain,
    emoji: '⛰️',
    priceRange: '₹35,000 - ₹75,000',
    duration: '10-15 days',
    keyTemples: ['Temple 1', 'Temple 2', 'Temple 3', 'Temple 4'],
    states: 'Uttarakhand',
    bestTime: 'May - October',
    crowdLevel: 'High',
    difficulty: 'Challenging',
    gradient: 'from-green-500 via-emerald-500 to-teal-600',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sacred pilgrimage to the four holiest sites.',
  },
  {
    id: 'jyotirlinga',
    name: '12 Jyotirlingas',
    subtitle: 'Sacred Shiva Shrines',
    deity: 'Lord Shiva',
    icon: Flame,
    emoji: '🕉️',
    priceRange: '₹50,000 - ₹1,20,000',
    duration: '15-30 days',
    keyTemples: ['Temple A', 'Temple B', 'Temple C', 'Temple D'],
    states: 'Multiple States',
    bestTime: 'October - March',
    crowdLevel: 'Very High',
    difficulty: 'Moderate',
    gradient: 'from-orange-500 via-red-500 to-pink-600',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    description: 'Lorem ipsum dolor sit amet. Visit all 12 sacred Jyotirlinga shrines across India.',
  },
  {
    id: 'divya-desam',
    name: '108 Divya Desams',
    subtitle: 'Vishnu Sacred Temples',
    deity: 'Lord Vishnu',
    icon: Flower2,
    emoji: '🪷',
    priceRange: '₹60,000 - ₹1,50,000',
    duration: '20-45 days',
    keyTemples: ['Temple X', 'Temple Y', 'Temple Z', 'Temple W'],
    states: 'South India',
    bestTime: 'November - February',
    crowdLevel: 'Moderate',
    difficulty: 'Easy to Moderate',
    gradient: 'from-blue-500 via-indigo-500 to-purple-600',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    description: 'Lorem ipsum dolor sit amet. Sacred temples glorified by the Alvars.',
  },
  {
    id: 'shakti-peetha',
    name: '51 Shakti Peethas',
    subtitle: 'Divine Feminine Shrines',
    deity: 'Goddess Shakti',
    icon: Sparkles,
    emoji: '🌺',
    priceRange: '₹70,000 - ₹1,80,000',
    duration: '25-40 days',
    keyTemples: ['Temple P', 'Temple Q', 'Temple R', 'Temple S'],
    states: 'Pan-India',
    bestTime: 'October - April',
    crowdLevel: 'Moderate to High',
    difficulty: 'Moderate',
    gradient: 'from-pink-500 via-rose-500 to-red-600',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    description: 'Lorem ipsum dolor sit amet. Sacred seats of the Divine Mother.',
  },
  {
    id: 'navagraha',
    name: 'Navagraha Temples',
    subtitle: 'Cosmic Deity Shrines',
    deity: 'Nine Celestial Gods',
    icon: Sun,
    emoji: '🪐',
    priceRange: '₹15,000 - ₹30,000',
    duration: '5-7 days',
    keyTemples: ['Sun Temple', 'Moon Temple', 'Mars Temple', 'Mercury Temple'],
    states: 'Tamil Nadu',
    bestTime: 'Year-round',
    crowdLevel: 'Low to Moderate',
    difficulty: 'Easy',
    gradient: 'from-yellow-500 via-amber-500 to-orange-600',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    description: 'Lorem ipsum dolor sit amet. Nine temples dedicated to celestial bodies.',
  },
  {
    id: 'pancha-bhoota',
    name: 'Pancha Bhoota Sthalams',
    subtitle: 'Five Element Temples',
    deity: 'Lord Shiva',
    icon: Waves,
    emoji: '🌊',
    priceRange: '₹20,000 - ₹40,000',
    duration: '5-8 days',
    keyTemples: ['Earth Temple', 'Water Temple', 'Fire Temple', 'Air Temple'],
    states: 'Tamil Nadu',
    bestTime: 'November - March',
    crowdLevel: 'Moderate',
    difficulty: 'Easy',
    gradient: 'from-cyan-500 via-teal-500 to-blue-600',
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
    description: 'Lorem ipsum dolor sit amet. Five temples representing the elements.',
  },
];

const deityCategories = [
  {
    id: 'vishnu' as Deity,
    name: 'Lord Vishnu',
    icon: Flower2,
    emoji: '🪷',
    count: 108,
    gradient: 'from-blue-500 to-purple-600',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    id: 'shiva' as Deity,
    name: 'Lord Shiva',
    icon: Flame,
    emoji: '🕉️',
    count: 45,
    gradient: 'from-orange-500 to-red-600',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
  {
    id: 'shakti' as Deity,
    name: 'Goddess Shakti',
    icon: Sparkles,
    emoji: '🌺',
    count: 51,
    gradient: 'from-pink-500 to-red-600',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
  },
  {
    id: 'ganesha' as Deity,
    name: 'Lord Ganesha',
    icon: Award,
    emoji: '🐘',
    count: 30,
    gradient: 'from-yellow-500 to-orange-600',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
  },
  {
    id: 'hanuman' as Deity,
    name: 'Lord Hanuman',
    icon: TrendingUp,
    emoji: '🦁',
    count: 25,
    gradient: 'from-red-500 to-orange-600',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
  },
  {
    id: 'surya' as Deity,
    name: 'Lord Surya',
    icon: Sun,
    emoji: '☀️',
    count: 12,
    gradient: 'from-amber-500 to-yellow-600',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    id: 'others' as Deity,
    name: 'Other Deities',
    icon: CircleDot,
    emoji: '⭐',
    count: 20,
    gradient: 'from-gray-500 to-gray-600',
    iconBg: 'bg-gray-100',
    iconColor: 'text-gray-600',
  },
];

const hiddenGems = [
  {
    id: 'gem-1',
    name: 'Hidden Temple Name 1',
    location: 'District Name, State',
    visitorCount: '< 20 visitors/day',
    accessibility: '♿ Senior-friendly',
    specialFeature: 'Ancient architecture',
    deity: 'Lord Shiva',
  },
  {
    id: 'gem-2',
    name: 'Hidden Temple Name 2',
    location: 'District Name, State',
    visitorCount: '< 30 visitors/day',
    accessibility: '🚗 Jeep access required',
    specialFeature: 'Cave temple',
    deity: 'Goddess Durga',
  },
  {
    id: 'gem-3',
    name: 'Hidden Temple Name 3',
    location: 'District Name, State',
    visitorCount: '< 50 visitors/day',
    accessibility: '♿ Senior-friendly',
    specialFeature: 'Riverside location',
    deity: 'Lord Vishnu',
  },
  {
    id: 'gem-4',
    name: 'Hidden Temple Name 4',
    location: 'District Name, State',
    visitorCount: '< 40 visitors/day',
    accessibility: '🥾 Moderate trekking',
    specialFeature: 'Mountain shrine',
    deity: 'Lord Hanuman',
  },
  {
    id: 'gem-5',
    name: 'Hidden Temple Name 5',
    location: 'District Name, State',
    visitorCount: '< 25 visitors/day',
    accessibility: '♿ Wheelchair accessible',
    specialFeature: 'Sea-facing temple',
    deity: 'Goddess Lakshmi',
  },
  {
    id: 'gem-6',
    name: 'Hidden Temple Name 6',
    location: 'District Name, State',
    visitorCount: '< 35 visitors/day',
    accessibility: '🚗 4WD recommended',
    specialFeature: 'Forest temple',
    deity: 'Lord Ayyappa',
  },
];

const geographyStates = [
  { id: 'state-1', name: 'State Name 1', templeCount: 45, districts: 12 },
  { id: 'state-2', name: 'State Name 2', templeCount: 38, districts: 8 },
  { id: 'state-3', name: 'State Name 3', templeCount: 52, districts: 15 },
  { id: 'state-4', name: 'State Name 4', templeCount: 30, districts: 10 },
  { id: 'state-5', name: 'State Name 5', templeCount: 25, districts: 7 },
  { id: 'state-6', name: 'State Name 6', templeCount: 40, districts: 11 },
];

const specialPackages = [
  {
    id: 'pkg-1',
    name: 'Festival Season Package',
    duration: '12 days',
    price: '₹45,000',
    inclusions: ['Transport', 'Accommodation', 'Meals', 'Darshan tickets', 'Guide service'],
    tag: 'FESTIVAL SPECIAL',
    gradient: 'from-purple-500 to-pink-600',
    icon: Gift,
  },
  {
    id: 'pkg-2',
    name: 'Senior Citizen Package',
    duration: '8 days',
    price: '₹32,000',
    inclusions: ['Medical support', 'Wheelchair access', 'Special meals', 'AC transport'],
    tag: 'SENIOR FRIENDLY',
    gradient: 'from-green-500 to-teal-600',
    icon: Accessibility,
  },
  {
    id: 'pkg-3',
    name: 'Low-Crowd Experience',
    duration: '10 days',
    price: '₹38,000',
    inclusions: ['Off-peak timing', 'Priority darshan', 'Peaceful locations', 'Meditation sessions'],
    tag: 'PEACEFUL',
    gradient: 'from-blue-500 to-indigo-600',
    icon: Award,
  },
];

export function HinduPilgrimsEnhanced({ onBack }: HinduPilgrimsEnhancedProps) {
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
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [formStep, setFormStep] = useState(1);

  // Custom tour form state
  const [tourForm, setTourForm] = useState({
    startDate: '',
    endDate: '',
    groupSize: '',
    seniorNeeds: '',
    deity: '',
    budget: '',
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

    // Simulate AI processing
    setTimeout(() => {
      setIsAITyping(false);
    }, 3000);
  };

  const handleViewDetails = (circuit: any) => {
    setSelectedCircuit(circuit);
    setSelectedTemple({
      name: circuit.name,
      deity: circuit.deity,
      description: circuit.description,
      ...circuit,
    });
    setCurrentScreen('temple-detail');
  };

  // ========================================
  // SCREEN 1: DASHBOARD
  // ========================================

  if (currentScreen === 'dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg">
          <div className="max-w-7xl mx-auto p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onBack}
                  className="text-white hover:bg-white/20"
                >
                  <ArrowLeft className="w-6 h-6" />
                </Button>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">🕉️</span>
                    <h1 className="text-3xl font-bold">Hindu Pilgrims</h1>
                  </div>
                  <p className="text-white/90 text-sm mt-1">Sacred Circuits & Divine Journeys</p>
                </div>
              </div>
              <Button
                onClick={() => setShowCustomTourModal(true)}
                className="bg-white text-orange-600 hover:bg-orange-50 shadow-xl"
              >
                <Plus className="w-5 h-5 mr-2" />
                Build Custom Pilgrimage
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6 space-y-8">
          {/* Notification Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl p-6 border-2 border-dashed border-orange-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-6 h-6 text-orange-600" />
                <div>
                  <p className="font-semibold text-gray-900">Notify me about deals & budget updates</p>
                  <p className="text-sm text-gray-500">Admin editable: Notification description</p>
                </div>
              </div>
              <Switch checked={notifyDeals} onCheckedChange={setNotifyDeals} />
            </div>
          </motion.div>

          {/* Sacred Circuits */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Sacred Circuits</h2>
                <p className="text-gray-600 text-sm">Admin editable: Section description</p>
              </div>
              <Badge className="bg-orange-100 text-orange-800 px-4 py-2">6 Major Circuits</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sacredCircuits.map((circuit, index) => {
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
                    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                      {/* Gradient Header */}
                      <div className={`bg-gradient-to-r ${circuit.gradient} p-6 text-white relative overflow-hidden`}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                        
                        <div className="relative">
                          <div className="flex items-start justify-between mb-3">
                            <div className={`${circuit.iconBg} p-4 rounded-2xl`}>
                              <Icon className={`w-8 h-8 ${circuit.iconColor}`} />
                            </div>
                            <button
                              onClick={() => handleSaveInterest(circuit.id)}
                              className={`p-3 rounded-full transition-all ${
                                isSaved ? 'bg-red-500 scale-110' : 'bg-white/20 hover:bg-white/30'
                              }`}
                            >
                              <Heart className={`w-5 h-5 ${isSaved ? 'fill-white' : ''}`} />
                            </button>
                          </div>
                          <h3 className="text-xl font-bold mb-1 border-b-2 border-dashed border-white/40 pb-2">
                            {circuit.name}
                          </h3>
                          <p className="text-sm text-white/90">{circuit.subtitle}</p>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6 space-y-4 border-2 border-dashed border-gray-100">
                        <div className="bg-gray-50 p-3 rounded-xl border-2 border-dashed border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">Admin editable: Description</p>
                          <p className="text-sm text-gray-700">{circuit.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                            <div className="flex items-center gap-2 mb-1">
                              <DollarSign className="w-4 h-4 text-gray-500" />
                              <span className="text-xs text-gray-500">Price Range</span>
                            </div>
                            <p className="text-sm font-semibold text-gray-900">{circuit.priceRange}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                            <div className="flex items-center gap-2 mb-1">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <span className="text-xs text-gray-500">Duration</span>
                            </div>
                            <p className="text-sm font-semibold text-gray-900">{circuit.duration}</p>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                          <p className="text-xs text-gray-500 mb-2">Key Temples (Admin editable)</p>
                          <div className="flex flex-wrap gap-1">
                            {circuit.keyTemples.map((temple, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {temple}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center gap-2 bg-blue-50 p-2 rounded">
                            <MapPin className="w-3 h-3 text-blue-600" />
                            <span>{circuit.states}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-green-50 p-2 rounded">
                            <Calendar className="w-3 h-3 text-green-600" />
                            <span>{circuit.bestTime}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-orange-50 p-2 rounded">
                            <Users className="w-3 h-3 text-orange-600" />
                            <span>{circuit.crowdLevel}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-purple-50 p-2 rounded">
                            <TrendingUp className="w-3 h-3 text-purple-600" />
                            <span>{circuit.difficulty}</span>
                          </div>
                        </div>

                        <div className="space-y-2 pt-2">
                          <Button
                            onClick={() => handleViewDetails(circuit)}
                            className={`w-full bg-gradient-to-r ${circuit.gradient} text-white hover:shadow-lg`}
                          >
                            <Navigation className="w-4 h-4 mr-2" />
                            View Details & Plan Yatra
                          </Button>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                toast.success('Opening YouTube...');
                                window.open('https://youtube.com', '_blank');
                              }}
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <Youtube className="w-4 h-4 mr-2" />
                              Videos
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                toast.success('Opening Google Maps...');
                                window.open('https://maps.google.com', '_blank');
                              }}
                              className="text-blue-600 border-blue-200 hover:bg-blue-50"
                            >
                              <Globe className="w-4 h-4 mr-2" />
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

          {/* Browse by Deity */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Sparkles className="w-7 h-7 text-orange-600" />
                Browse by Deity
              </h2>
              <p className="text-gray-600 text-sm">Admin editable: Section description</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {deityCategories.map((deity, index) => {
                const Icon = deity.icon;
                
                return (
                  <motion.div
                    key={deity.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      setSelectedDeity(deity.id);
                      setCurrentScreen('deity-circuits');
                    }}
                    className="cursor-pointer group"
                  >
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-dashed border-gray-200">
                      <div className={`${deity.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-8 h-8 ${deity.iconColor}`} />
                      </div>
                      <h3 className="text-center font-bold text-gray-900 mb-2">{deity.name}</h3>
                      <Badge className="w-full justify-center bg-gray-100 text-gray-700">
                        {deity.count} temples
                      </Badge>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <Button
              onClick={() => setCurrentScreen('deity-circuits')}
              variant="outline"
              className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
            >
              See All Deity Circuits
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Hidden Spiritual Gems */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Gem className="w-7 h-7 text-purple-600" />
                  Hidden Spiritual Gems
                </h2>
                <p className="text-gray-600 text-sm">Admin editable: Lesser-known temples</p>
              </div>
              <Button
                onClick={() => setShowHiddenGems(!showHiddenGems)}
                variant="outline"
                className="border-purple-200 text-purple-600 hover:bg-purple-50"
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
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {hiddenGems.map((gem, index) => (
                    <motion.div
                      key={gem.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-dashed border-purple-200"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h3 className="font-bold text-gray-900 flex-1 border-b-2 border-dashed border-purple-300 pb-2">
                            {gem.name}
                          </h3>
                          <Badge className="bg-purple-600 text-white text-xs">
                            {gem.visitorCount}
                          </Badge>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 bg-white p-2 rounded border border-purple-200">
                            <MapPin className="w-4 h-4 text-purple-600" />
                            <span className="text-gray-700">{gem.location}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-white p-2 rounded border border-purple-200">
                            <Sparkles className="w-4 h-4 text-purple-600" />
                            <span className="text-gray-700">Deity: {gem.deity}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-white p-2 rounded border border-purple-200">
                            <Info className="w-4 h-4 text-purple-600" />
                            <span className="text-gray-700">{gem.accessibility}</span>
                          </div>
                          <div className="bg-white p-2 rounded border border-purple-200">
                            <p className="text-xs text-gray-500 mb-1">Admin editable: Special feature</p>
                            <p className="text-gray-700">{gem.specialFeature}</p>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          Explore This Gem
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Browse by Geography */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Map className="w-7 h-7 text-green-600" />
                  Browse by Geography
                </h2>
                <p className="text-gray-600 text-sm">Admin editable: Select state to view temples</p>
              </div>
              <Button
                variant="outline"
                className="border-green-200 text-green-600 hover:bg-green-50"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter by District
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {geographyStates.map((state, index) => (
                <motion.div
                  key={state.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedState(state.id)}
                  className={`bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 ${
                    selectedState === state.id ? 'border-green-500' : 'border-dashed border-green-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-2 border-b-2 border-dashed border-green-300 pb-2">
                        {state.name}
                      </h3>
                      <p className="text-sm text-gray-600">{state.districts} districts</p>
                    </div>
                    <Badge className="bg-green-600 text-white">
                      {state.templeCount} temples
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    View Temples
                  </Button>
                </motion.div>
              ))}
            </div>

            {selectedState && (
              <div className="text-center">
                <Button
                  variant="outline"
                  className="border-green-200 text-green-600 hover:bg-green-50"
                >
                  Load More Temples
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </div>

          {/* Special Packages */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Package className="w-7 h-7 text-blue-600" />
                Special Pilgrimage Packages
              </h2>
              <p className="text-gray-600 text-sm">Admin editable: Curated packages</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {specialPackages.map((pkg, index) => {
                const Icon = pkg.icon;
                
                return (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                      <div className={`bg-gradient-to-r ${pkg.gradient} p-6 text-white`}>
                        <div className="flex items-center justify-between mb-3">
                          <Icon className="w-8 h-8" />
                          <Badge className="bg-white/20 text-white border-0">
                            {pkg.tag}
                          </Badge>
                        </div>
                        <h3 className="font-bold text-lg border-b-2 border-dashed border-white/40 pb-2">
                          {pkg.name}
                        </h3>
                      </div>
                      <div className="p-6 space-y-3 border-2 border-dashed border-gray-100">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Duration:</span>
                          <span className="font-semibold">{pkg.duration}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Price:</span>
                          <span className="font-bold text-lg text-gray-900">{pkg.price}</span>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                          <p className="text-xs text-gray-500 mb-2">Admin editable: Inclusions</p>
                          <ul className="space-y-1">
                            {pkg.inclusions.map((item, i) => (
                              <li key={i} className="text-sm text-gray-700 flex items-center gap-2">
                                <Check className="w-3 h-3 text-green-600" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Button className={`w-full bg-gradient-to-r ${pkg.gradient} text-white`}>
                          <Package className="w-4 h-4 mr-2" />
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Custom Tour Modal */}
        <Dialog open={showCustomTourModal} onOpenChange={setShowCustomTourModal}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-3">
                <Navigation className="w-7 h-7 text-orange-600" />
                Build Custom Pilgrimage
              </DialogTitle>
              <DialogDescription>
                Fill in your requirements. Step {formStep} of 4
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              {formStep === 1 && (
                <div className="space-y-4">
                  <h3 className="font-bold text-lg">Step 1: Basic Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Start Date</label>
                      <Input
                        type="date"
                        value={tourForm.startDate}
                        onChange={(e) => setTourForm({ ...tourForm, startDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">End Date</label>
                      <Input
                        type="date"
                        value={tourForm.endDate}
                        onChange={(e) => setTourForm({ ...tourForm, endDate: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Group Size</label>
                    <Select
                      value={tourForm.groupSize}
                      onValueChange={(value) => setTourForm({ ...tourForm, groupSize: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select group size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 people</SelectItem>
                        <SelectItem value="10-50">10-50 people</SelectItem>
                        <SelectItem value="50+">50+ people</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {formStep === 2 && (
                <div className="space-y-4">
                  <h3 className="font-bold text-lg">Step 2: Special Needs</h3>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Senior Care Requirements ♿</label>
                    <Select
                      value={tourForm.seniorNeeds}
                      onValueChange={(value) => setTourForm({ ...tourForm, seniorNeeds: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select requirements" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No special needs</SelectItem>
                        <SelectItem value="wheelchair">Wheelchair access</SelectItem>
                        <SelectItem value="mobility">Mobility assistance</SelectItem>
                        <SelectItem value="medical">Medical support</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {formStep === 3 && (
                <div className="space-y-4">
                  <h3 className="font-bold text-lg">Step 3: Spiritual Preferences</h3>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Primary Deity Focus</label>
                    <Select
                      value={tourForm.deity}
                      onValueChange={(value) => setTourForm({ ...tourForm, deity: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select deity" />
                      </SelectTrigger>
                      <SelectContent>
                        {deityCategories.map(d => (
                          <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {formStep === 4 && (
                <div className="space-y-4">
                  <h3 className="font-bold text-lg">Step 4: Budget Range</h3>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Select Budget</label>
                    <Select
                      value={tourForm.budget}
                      onValueChange={(value) => setTourForm({ ...tourForm, budget: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="economy">Economy (₹20k-40k)</SelectItem>
                        <SelectItem value="standard">Standard (₹40k-80k)</SelectItem>
                        <SelectItem value="premium">Premium (₹80k+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-4">
                {formStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={() => setFormStep(formStep - 1)}
                  >
                    Previous
                  </Button>
                )}
                {formStep < 4 ? (
                  <Button
                    onClick={() => setFormStep(formStep + 1)}
                    className="ml-auto bg-orange-600 hover:bg-orange-700"
                  >
                    Next Step
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleCustomTourSubmit}
                    className="ml-auto bg-gradient-to-r from-orange-500 to-red-600 text-white"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Request Customization
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* AI Confirmation Modal */}
        <Dialog open={showAIConfirmation} onOpenChange={setShowAIConfirmation}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-3">
                <Sparkles className="w-7 h-7 text-purple-600" />
                Grok AI Processing
              </DialogTitle>
            </DialogHeader>

            <div className="py-6">
              {isAITyping ? (
                <div className="flex flex-col items-center justify-center space-y-4">
                  <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
                  <div className="flex gap-1">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6 }}
                      className="w-2 h-2 bg-purple-600 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                      className="w-2 h-2 bg-purple-600 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                      className="w-2 h-2 bg-purple-600 rounded-full"
                    />
                  </div>
                  <p className="text-gray-600 text-center">
                    Grok AI is analyzing your preferences...
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Request Received!</h3>
                        <p className="text-sm text-gray-600">Reference: GROK-{Math.floor(Math.random() * 100000)}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      We've received your request! Grok AI is analyzing your preferences and will get back to you within 24 hours with a customized itinerary including:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Detailed budget breakdown</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Senior care facilities information</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Custom itinerary with timing</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm">All requested details</span>
                      </li>
                    </ul>
                  </div>
                  <Button
                    onClick={() => {
                      setShowAIConfirmation(false);
                      setFormStep(1);
                    }}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    Close
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
  // SCREEN 2: DEITY CIRCUITS
  // ========================================

  if (currentScreen === 'deity-circuits') {
    const selectedDeityData = deityCategories.find(d => d.id === selectedDeity) || deityCategories[0];
    const Icon = selectedDeityData.icon;

    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
        <div className={`bg-gradient-to-r ${selectedDeityData.gradient} text-white p-6`}>
          <div className="max-w-7xl mx-auto">
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
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <span className="text-4xl">{selectedDeityData.emoji}</span>
                  {selectedDeityData.name}
                </h1>
                <p className="text-white/90 text-sm mt-1">{selectedDeityData.count} temples & circuits</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6 space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Associated Sacred Circuits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sacredCircuits.slice(0, 3).map((circuit) => (
                <div
                  key={circuit.id}
                  className={`bg-gradient-to-br ${circuit.gradient} text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer`}
                  onClick={() => handleViewDetails(circuit)}
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

          <div className="text-center">
            <Button
              onClick={() => setShowCustomTourModal(true)}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-lg px-8 py-6"
            >
              <Plus className="w-5 h-5 mr-2" />
              Build by Deity Preference
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
  // SCREEN 3: TEMPLE DETAIL
  // ========================================

  if (currentScreen === 'temple-detail' && selectedTemple) {
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
                  <h1 className="text-3xl font-bold">{selectedTemple.name}</h1>
                  <p className="text-white/90 text-sm mt-1">Dedicated to {selectedTemple.deity}</p>
                </div>
              </div>
              <button
                onClick={() => handleSaveInterest(selectedTemple.id || 'temple')}
                className={`p-4 rounded-full transition-all ${
                  savedInterests.has(selectedTemple.id || 'temple')
                    ? 'bg-red-500 scale-110'
                    : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                <Heart
                  className={`w-6 h-6 ${
                    savedInterests.has(selectedTemple.id || 'temple') ? 'fill-white' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6 space-y-8">
          {/* Temple Information */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-dashed border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Temple Significance</h2>
            <div className="bg-gray-50 p-6 rounded-xl border-2 border-dashed border-gray-200">
              <p className="text-sm text-gray-500 mb-2">Admin editable: Significance</p>
              <p className="text-gray-700">
                {selectedTemple.description}
              </p>
            </div>
          </div>

          {/* Interactive Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              className="bg-red-600 hover:bg-red-700 text-white h-16"
              onClick={() => {
                toast.success('Opening YouTube videos...');
                window.open('https://youtube.com', '_blank');
              }}
            >
              <Youtube className="w-5 h-5 mr-2" />
              Watch Temple Videos
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white h-16"
              onClick={() => {
                toast.success('Opening Google Maps...');
                window.open('https://maps.google.com', '_blank');
              }}
            >
              <Globe className="w-5 h-5 mr-2" />
              View on Map
            </Button>
            <Button
              className="bg-orange-600 hover:bg-orange-700 text-white h-16"
              onClick={() => setShowCustomTourModal(true)}
            >
              <Navigation className="w-5 h-5 mr-2" />
              Request Custom Tour
            </Button>
          </div>

          {/* Grok AI Section */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-xl p-8 border-2 border-dashed border-purple-200">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-purple-600" />
              <h2 className="text-2xl font-bold">Grok AI Travel Tips</h2>
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-purple-200">
                  <p className="text-sm text-gray-500 mb-1">Admin editable: Tip {i}</p>
                  <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <div className="bg-white p-4 rounded-xl border-2 border-purple-300">
                <p className="text-sm text-gray-500 mb-2">Ask Grok About This Temple</p>
                <Input placeholder="e.g., What are the darshan timings?" className="mb-3" />
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Ask Grok
                </Button>
              </div>
            </div>
          </div>

          {/* Nearby Temples */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Nearby Temples</h2>
            <p className="text-sm text-gray-500">Admin editable: Nearby temples list</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {sacredCircuits.slice(0, 4).map((temple) => (
                <div
                  key={temple.id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer border-2 border-dashed border-gray-200"
                  onClick={() => handleViewDetails(temple)}
                >
                  <h3 className="font-bold mb-2">{temple.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{temple.subtitle}</p>
                  <Button size="sm" variant="outline" className="w-full">
                    View Details
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
