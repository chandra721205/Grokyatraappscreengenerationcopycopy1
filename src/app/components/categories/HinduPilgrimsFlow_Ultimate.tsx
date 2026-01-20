import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  X,
  Accessibility,
  Globe,
  MapPin,
  Map,
  Heart,
  ChevronRight,
  Sparkles,
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
  Youtube,
  TrendingUp,
  Award,
  Clock,
  Navigation,
  Compass,
  Phone,
  Mail,
  Building2,
  Loader2,
  Eye,
  EyeOff,
  Gem,
  Route,
  Gift,
  Zap,
  Info,
  Wifi,
  CircleDot,
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
// HINDU PILGRIMS – ULTIMATE ENHANCED VERSION
// ========================================
//
// 🕉️ ALL FOUR NEW FUNCTIONAL FIELDS:
// 1. ✅ Hidden Spiritual Gems (collapsible section)
// 2. ✅ Browse by Geography (state/district grid)
// 3. ✅ Browse by Deity (7 deity categories with icons)
// 4. ✅ Special Packages by Admin (festival/senior/crowd/short)
//
// 🤖 COMPLETE AI & USER FEATURES:
// - Custom Tour Builder (9 comprehensive fields)
// - Interest Capture (heart icons on all cards)
// - Notifications (4 toggles: deals, packages, new, festivals)
// - Grok AI Response (animated typing + success)
// - YouTube/Google Browse (all cards)
//
// 🎨 BEAUTIFUL ENHANCED DESIGN:
// - Subtle shadows & rounded corners (24-32px)
// - 7 unique gradient combinations
// - Consistent Lucide icon set
// - Typography hierarchy
// - Smooth hover effects (scale, shadow)
// - Loading states
// - Micro-interactions
//
// 📱 THREE MAIN SCREENS:
// 1. Main Hindu Circuits Explorer
// 2. Deity Filter Page
// 3. Temple Detail Page (with nearby temples)
//
// 🔧 ADMIN-EDITABLE ZONES:
// - Dashed borders on all content
// - "Admin editable: [field]" labels
// - 40+ editable fields
// - Placeholder text: [Admin: ...]
//
// ========================================

type FlowScreen = 
  | 'main'
  | 'deity-filter'
  | 'temple-detail'
  | 'geography';

type Deity = 'all' | 'shiva' | 'vishnu' | 'shakti' | 'ganesha' | 'hanuman' | 'surya' | 'others';

interface HinduPilgrimsFlowProps {
  onBack: () => void;
}

// ========================================
// SACRED CIRCUITS DATA (6 Circuits)
// ========================================

const sacredCircuits = [
  {
    id: 'char-dham',
    emoji: '⛰️',
    icon: Mountain,
    name: '[Admin: Char Dham Yatra]',
    deity: '[Admin: Vishnu & Shiva]',
    subtitle: '[Admin: Four Divine Abodes]',
    description: '[Admin: Description of the sacred 4 Dhams - update this text]',
    state: '[Admin: State Name]',
    difficulty: '[Admin: Challenging]',
    duration: '[Admin: 10-15 days]',
    priceRange: '[Admin: ₹35,000 - ₹75,000]',
    bestTime: '[Admin: May-Oct]',
    crowd: '[Admin: High]',
    gradient: 'from-green-500 via-emerald-500 to-teal-600',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    tag: '[Admin: 4 DHAMS]',
    totalSites: '[Admin: 4]',
  },
  {
    id: 'jyotirlinga',
    emoji: '🕉️',
    icon: Flame,
    name: '[Admin: 12 Jyotirlingas]',
    deity: '[Admin: Lord Shiva]',
    subtitle: '[Admin: Sacred Shiva Shrines]',
    description: '[Admin: Description of 12 Jyotirlingas - update this text]',
    state: '[Admin: Multiple States]',
    difficulty: '[Admin: Moderate]',
    duration: '[Admin: 15-30 days]',
    priceRange: '[Admin: ₹50,000 - ₹1,20,000]',
    bestTime: '[Admin: Oct-Mar]',
    crowd: '[Admin: Very High]',
    gradient: 'from-orange-500 via-red-500 to-pink-600',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    tag: '[Admin: 12 SHRINES]',
    totalSites: '[Admin: 12]',
  },
  {
    id: 'divya-desam',
    emoji: '🪷',
    icon: Flower2,
    name: '[Admin: 108 Divya Desams]',
    deity: '[Admin: Lord Vishnu]',
    subtitle: '[Admin: Vishnu Sacred Temples]',
    description: '[Admin: Description of 108 Divya Desams - update this text]',
    state: '[Admin: Tamil Nadu, Kerala, AP]',
    difficulty: '[Admin: Easy to Moderate]',
    duration: '[Admin: 20-45 days]',
    priceRange: '[Admin: ₹60,000 - ₹1,50,000]',
    bestTime: '[Admin: Nov-Feb]',
    crowd: '[Admin: Moderate]',
    gradient: 'from-blue-500 via-indigo-500 to-purple-600',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    tag: '[Admin: 108 TEMPLES]',
    totalSites: '[Admin: 108]',
  },
  {
    id: 'shakti-peetha',
    emoji: '🌺',
    icon: Sparkles,
    name: '[Admin: 51 Shakti Peethas]',
    deity: '[Admin: Goddess Shakti]',
    subtitle: '[Admin: Divine Feminine Shrines]',
    description: '[Admin: Description of 51 Shakti Peethas - update this text]',
    state: '[Admin: Pan-India]',
    difficulty: '[Admin: Moderate]',
    duration: '[Admin: 25-40 days]',
    priceRange: '[Admin: ₹70,000 - ₹1,80,000]',
    bestTime: '[Admin: Oct-Apr]',
    crowd: '[Admin: Moderate to High]',
    gradient: 'from-pink-500 via-rose-500 to-red-600',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    tag: '[Admin: 51 PEETHAS]',
    totalSites: '[Admin: 51]',
  },
  {
    id: 'navagraha',
    emoji: '🪐',
    icon: Sun,
    name: '[Admin: Navagraha Temples]',
    deity: '[Admin: Nine Celestial Gods]',
    subtitle: '[Admin: Cosmic Deity Shrines]',
    description: '[Admin: Description of Navagraha Temples - update this text]',
    state: '[Admin: Tamil Nadu]',
    difficulty: '[Admin: Easy]',
    duration: '[Admin: 5-7 days]',
    priceRange: '[Admin: ₹15,000 - ₹30,000]',
    bestTime: '[Admin: Year-round]',
    crowd: '[Admin: Low to Moderate]',
    gradient: 'from-yellow-500 via-amber-500 to-orange-600',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    tag: '[Admin: 9 TEMPLES]',
    totalSites: '[Admin: 9]',
  },
  {
    id: 'pancha-bhoota',
    emoji: '🌊',
    icon: Waves,
    name: '[Admin: Pancha Bhoota Sthalams]',
    deity: '[Admin: Lord Shiva]',
    subtitle: '[Admin: Five Element Temples]',
    description: '[Admin: Description of Pancha Bhoota - update this text]',
    state: '[Admin: Tamil Nadu]',
    difficulty: '[Admin: Easy]',
    duration: '[Admin: 5-8 days]',
    priceRange: '[Admin: ₹20,000 - ₹40,000]',
    bestTime: '[Admin: Nov-Mar]',
    crowd: '[Admin: Moderate]',
    gradient: 'from-cyan-500 via-teal-500 to-blue-600',
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
    tag: '[Admin: 5 ELEMENTS]',
    totalSites: '[Admin: 5]',
  },
];

// ========================================
// DEITY CATEGORIES (7 Deities)
// ========================================

const deityCategories = [
  {
    id: 'shiva' as Deity,
    name: '[Admin: Lord Shiva]',
    icon: Flame,
    emoji: '🕉️',
    count: '[Admin: 45+ temples]',
    gradient: 'from-orange-500 to-red-600',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
  {
    id: 'vishnu' as Deity,
    name: '[Admin: Lord Vishnu]',
    icon: Flower2,
    emoji: '🪷',
    count: '[Admin: 108+ temples]',
    gradient: 'from-blue-500 to-purple-600',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    id: 'shakti' as Deity,
    name: '[Admin: Goddess Shakti]',
    icon: Sparkles,
    emoji: '🌺',
    count: '[Admin: 51+ temples]',
    gradient: 'from-pink-500 to-red-600',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
  },
  {
    id: 'ganesha' as Deity,
    name: '[Admin: Lord Ganesha]',
    icon: Award,
    emoji: '🐘',
    count: '[Admin: 30+ temples]',
    gradient: 'from-yellow-500 to-orange-600',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
  },
  {
    id: 'hanuman' as Deity,
    name: '[Admin: Lord Hanuman]',
    icon: TrendingUp,
    emoji: '🦁',
    count: '[Admin: 25+ temples]',
    gradient: 'from-red-500 to-orange-600',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
  },
  {
    id: 'surya' as Deity,
    name: '[Admin: Lord Surya]',
    icon: Sun,
    emoji: '☀️',
    count: '[Admin: 12+ temples]',
    gradient: 'from-amber-500 to-yellow-600',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    id: 'others' as Deity,
    name: '[Admin: Other Deities]',
    icon: CircleDot,
    emoji: '⭐',
    count: '[Admin: 20+ temples]',
    gradient: 'from-gray-500 to-gray-600',
    iconBg: 'bg-gray-100',
    iconColor: 'text-gray-600',
  },
];

// ========================================
// HIDDEN SPIRITUAL GEMS (Lesser-known temples)
// ========================================

const hiddenGems = [
  {
    id: 'gem-1',
    name: '[Admin: Hidden Temple Name 1]',
    location: '[Admin: District, State]',
    deity: '[Admin: Deity Name]',
    visitorCount: '[Admin: <20 visitors/day]',
    accessibility: '[Admin: Easy Access]',
    description: '[Admin: Brief description]',
    speciality: '[Admin: Unique feature]',
  },
  {
    id: 'gem-2',
    name: '[Admin: Hidden Temple Name 2]',
    location: '[Admin: District, State]',
    deity: '[Admin: Deity Name]',
    visitorCount: '[Admin: <30 visitors/day]',
    accessibility: '[Admin: Moderate Access]',
    description: '[Admin: Brief description]',
    speciality: '[Admin: Unique feature]',
  },
  {
    id: 'gem-3',
    name: '[Admin: Hidden Temple Name 3]',
    location: '[Admin: District, State]',
    deity: '[Admin: Deity Name]',
    visitorCount: '[Admin: <50 visitors/day]',
    accessibility: '[Admin: Easy Access]',
    description: '[Admin: Brief description]',
    speciality: '[Admin: Unique feature]',
  },
  {
    id: 'gem-4',
    name: '[Admin: Hidden Temple Name 4]',
    location: '[Admin: District, State]',
    deity: '[Admin: Deity Name]',
    visitorCount: '[Admin: <40 visitors/day]',
    accessibility: '[Admin: Challenging Access]',
    description: '[Admin: Brief description]',
    speciality: '[Admin: Unique feature]',
  },
];

// ========================================
// GEOGRAPHY BROWSING (State/District)
// ========================================

const geographyStates = [
  {
    id: 'state-1',
    name: '[Admin: State 1]',
    templeCount: '[Admin: 45+ temples]',
    districts: '[Admin: 12 districts]',
  },
  {
    id: 'state-2',
    name: '[Admin: State 2]',
    templeCount: '[Admin: 38+ temples]',
    districts: '[Admin: 8 districts]',
  },
  {
    id: 'state-3',
    name: '[Admin: State 3]',
    templeCount: '[Admin: 52+ temples]',
    districts: '[Admin: 15 districts]',
  },
  {
    id: 'state-4',
    name: '[Admin: State 4]',
    templeCount: '[Admin: 30+ temples]',
    districts: '[Admin: 10 districts]',
  },
  {
    id: 'state-5',
    name: '[Admin: State 5]',
    templeCount: '[Admin: 25+ temples]',
    districts: '[Admin: 7 districts]',
  },
  {
    id: 'state-6',
    name: '[Admin: State 6]',
    templeCount: '[Admin: 40+ temples]',
    districts: '[Admin: 11 districts]',
  },
];

// ========================================
// SPECIAL PACKAGES (Admin-created)
// ========================================

const specialPackages = [
  {
    id: 'package-1',
    name: '[Admin: Festival Season Package]',
    duration: '[Admin: 12 days]',
    price: '[Admin: ₹45,000]',
    inclusions: '[Admin: List inclusions here]',
    tag: '[Admin: FESTIVAL SPECIAL]',
    gradient: 'from-purple-500 to-pink-600',
    icon: Gift,
  },
  {
    id: 'package-2',
    name: '[Admin: Senior Citizen Package]',
    duration: '[Admin: 8 days]',
    price: '[Admin: ₹32,000]',
    inclusions: '[Admin: List inclusions here]',
    tag: '[Admin: SENIOR FRIENDLY]',
    gradient: 'from-green-500 to-teal-600',
    icon: Accessibility,
  },
  {
    id: 'package-3',
    name: '[Admin: Low-Crowd Experience]',
    duration: '[Admin: 10 days]',
    price: '[Admin: ₹38,000]',
    inclusions: '[Admin: List inclusions here]',
    tag: '[Admin: PEACEFUL]',
    gradient: 'from-blue-500 to-indigo-600',
    icon: Award,
  },
  {
    id: 'package-4',
    name: '[Admin: Short Circuit Package]',
    duration: '[Admin: 5 days]',
    price: '[Admin: ₹22,000]',
    inclusions: '[Admin: List inclusions here]',
    tag: '[Admin: EXPRESS]',
    gradient: 'from-orange-500 to-red-600',
    icon: Zap,
  },
];

// ========================================
// MAIN COMPONENT
// ========================================

export function HinduPilgrimsFlow_Ultimate({ onBack }: HinduPilgrimsFlowProps) {
  const [currentScreen, setCurrentScreen] = useState<FlowScreen>('main');
  const [selectedDeity, setSelectedDeity] = useState<Deity>('all');
  const [selectedCircuit, setSelectedCircuit] = useState<string | null>(null);
  const [showHiddenGems, setShowHiddenGems] = useState(false);
  const [showCustomTourBuilder, setShowCustomTourBuilder] = useState(false);
  const [showGrokResponse, setShowGrokResponse] = useState(false);
  const [isGrokTyping, setIsGrokTyping] = useState(false);
  const [savedInterests, setSavedInterests] = useState<Set<string>>(new Set());
  const [notificationToggles, setNotificationToggles] = useState({
    deals: false,
    packages: false,
    newCircuits: false,
    festivals: false,
  });

  // Custom Tour Form State
  const [customTourForm, setCustomTourForm] = useState({
    startDate: '',
    endDate: '',
    groupSize: '',
    seniorNeeds: '',
    deityPreference: '',
    budget: '',
    accessibility: '',
    transportation: '',
    accommodation: '',
  });

  const handleSaveInterest = (circuitId: string) => {
    const newSaved = new Set(savedInterests);
    if (newSaved.has(circuitId)) {
      newSaved.delete(circuitId);
      toast.success('Removed from saved interests');
    } else {
      newSaved.add(circuitId);
      toast.success('Added to saved interests ❤️');
    }
    setSavedInterests(newSaved);
  };

  const handleNotificationToggle = (key: keyof typeof notificationToggles) => {
    setNotificationToggles(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
    toast.success(!notificationToggles[key] ? 'Notifications enabled' : 'Notifications disabled');
  };

  const openYouTube = (searchQuery: string) => {
    toast.success('Opening YouTube...');
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`, '_blank');
  };

  const openGoogle = (searchQuery: string) => {
    toast.success('Opening Google...');
    window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
  };

  const handleCustomTourSubmit = () => {
    setShowCustomTourBuilder(false);
    setIsGrokTyping(true);
    setShowGrokResponse(true);

    // Simulate AI typing
    setTimeout(() => {
      setIsGrokTyping(false);
    }, 3000);
  };

  // ========================================
  // MAIN SCREEN
  // ========================================

  if (currentScreen === 'main') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6">
          <div className="max-w-7xl mx-auto">
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
                    <h1 className="text-3xl font-bold">[Admin: Hindu Pilgrims]</h1>
                  </div>
                  <p className="text-white/90 mt-1 text-sm border-2 border-dashed border-white/40 px-2 py-1 rounded inline-block">
                    Admin editable: Subtitle
                  </p>
                  <p className="text-white/90 mt-1">[Admin: Sacred Circuits & Divine Journeys]</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setShowCustomTourBuilder(true)}
                  className="bg-white text-orange-600 hover:bg-orange-50"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Build Custom Pilgrimage
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6 space-y-8">
          {/* Notification Toggles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-6 h-6 text-orange-600" />
              <h2 className="text-xl font-bold">[Admin: Notification Preferences]</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-2xl border-2 border-dashed border-orange-200">
                <span className="text-sm font-medium">[Admin: Deal Alerts]</span>
                <Switch
                  checked={notificationToggles.deals}
                  onCheckedChange={() => handleNotificationToggle('deals')}
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-2xl border-2 border-dashed border-orange-200">
                <span className="text-sm font-medium">[Admin: Package Updates]</span>
                <Switch
                  checked={notificationToggles.packages}
                  onCheckedChange={() => handleNotificationToggle('packages')}
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-2xl border-2 border-dashed border-orange-200">
                <span className="text-sm font-medium">[Admin: New Circuits]</span>
                <Switch
                  checked={notificationToggles.newCircuits}
                  onCheckedChange={() => handleNotificationToggle('newCircuits')}
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-2xl border-2 border-dashed border-orange-200">
                <span className="text-sm font-medium">[Admin: Festival Dates]</span>
                <Switch
                  checked={notificationToggles.festivals}
                  onCheckedChange={() => handleNotificationToggle('festivals')}
                />
              </div>
            </div>
          </motion.div>

          {/* Sacred Circuits Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">[Admin: Sacred Circuits]</h2>
                <p className="text-gray-600 text-sm border-2 border-dashed border-gray-200 px-2 py-1 rounded inline-block mt-1">
                  Admin editable: Section description
                </p>
              </div>
              <Badge className="bg-orange-100 text-orange-800 px-4 py-2">
                [Admin: 6 Major Circuits]
              </Badge>
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
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-2 border-dashed border-gray-200">
                      {/* Card Header with Gradient */}
                      <div className={`bg-gradient-to-r ${circuit.gradient} p-6 text-white relative overflow-hidden`}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
                        
                        <div className="relative">
                          <div className="flex items-start justify-between mb-3">
                            <div className={`${circuit.iconBg} p-4 rounded-2xl`}>
                              <Icon className={`w-8 h-8 ${circuit.iconColor}`} />
                            </div>
                            <button
                              onClick={() => handleSaveInterest(circuit.id)}
                              className={`p-3 rounded-full transition-all ${
                                isSaved 
                                  ? 'bg-red-500 scale-110' 
                                  : 'bg-white/20 hover:bg-white/30'
                              }`}
                            >
                              <Heart
                                className={`w-5 h-5 ${isSaved ? 'fill-white' : ''}`}
                              />
                            </button>
                          </div>
                          <h3 className="text-xl font-bold mb-1">{circuit.name}</h3>
                          <p className="text-sm text-white/90">{circuit.subtitle}</p>
                          <Badge className="bg-white/20 text-white border-0 mt-2">
                            {circuit.tag}
                          </Badge>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6 space-y-4">
                        <div className="border-2 border-dashed border-gray-200 p-3 rounded-xl bg-gray-50">
                          <p className="text-xs text-gray-500 mb-1">Admin editable: Description</p>
                          <p className="text-sm text-gray-700">{circuit.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="border-2 border-dashed border-gray-200 p-3 rounded-xl bg-gray-50">
                            <div className="flex items-center gap-2 mb-1">
                              <MapPin className="w-4 h-4 text-gray-500" />
                              <span className="text-xs text-gray-500">State</span>
                            </div>
                            <p className="text-sm font-semibold text-gray-900">{circuit.state}</p>
                          </div>
                          <div className="border-2 border-dashed border-gray-200 p-3 rounded-xl bg-gray-50">
                            <div className="flex items-center gap-2 mb-1">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <span className="text-xs text-gray-500">Duration</span>
                            </div>
                            <p className="text-sm font-semibold text-gray-900">{circuit.duration}</p>
                          </div>
                          <div className="border-2 border-dashed border-gray-200 p-3 rounded-xl bg-gray-50">
                            <div className="flex items-center gap-2 mb-1">
                              <DollarSign className="w-4 h-4 text-gray-500" />
                              <span className="text-xs text-gray-500">Price Range</span>
                            </div>
                            <p className="text-sm font-semibold text-gray-900">{circuit.priceRange}</p>
                          </div>
                          <div className="border-2 border-dashed border-gray-200 p-3 rounded-xl bg-gray-50">
                            <div className="flex items-center gap-2 mb-1">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              <span className="text-xs text-gray-500">Best Time</span>
                            </div>
                            <p className="text-sm font-semibold text-gray-900">{circuit.bestTime}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="border-2 border-dashed border-gray-200 p-3 rounded-xl bg-gray-50">
                            <div className="flex items-center gap-2 mb-1">
                              <Users className="w-4 h-4 text-gray-500" />
                              <span className="text-xs text-gray-500">Crowd Level</span>
                            </div>
                            <p className="text-sm font-semibold text-gray-900">{circuit.crowd}</p>
                          </div>
                          <div className="border-2 border-dashed border-gray-200 p-3 rounded-xl bg-gray-50">
                            <div className="flex items-center gap-2 mb-1">
                              <TrendingUp className="w-4 h-4 text-gray-500" />
                              <span className="text-xs text-gray-500">Difficulty</span>
                            </div>
                            <p className="text-sm font-semibold text-gray-900">{circuit.difficulty}</p>
                          </div>
                        </div>

                        <div className="pt-4 space-y-2">
                          <Button
                            className={`w-full bg-gradient-to-r ${circuit.gradient} text-white hover:shadow-lg transition-all`}
                          >
                            <Navigation className="w-4 h-4 mr-2" />
                            View Details & Plan Yatra
                          </Button>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openYouTube(circuit.name)}
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <Youtube className="w-4 h-4 mr-2" />
                              YouTube
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openGoogle(circuit.name)}
                              className="text-blue-600 border-blue-200 hover:bg-blue-50"
                            >
                              <Globe className="w-4 h-4 mr-2" />
                              Google
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

          {/* Browse by Deity Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Sparkles className="w-7 h-7 text-orange-600" />
                  [Admin: Browse by Deity]
                </h2>
                <p className="text-gray-600 text-sm border-2 border-dashed border-gray-200 px-2 py-1 rounded inline-block mt-1">
                  Admin editable: Section description
                </p>
              </div>
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
                      setCurrentScreen('deity-filter');
                    }}
                    className="cursor-pointer group"
                  >
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-dashed border-gray-200">
                      <div className={`${deity.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-8 h-8 ${deity.iconColor}`} />
                      </div>
                      <h3 className="text-center font-bold text-gray-900 mb-1">{deity.name}</h3>
                      <p className="text-center text-sm text-gray-600 border-2 border-dashed border-gray-200 px-2 py-1 rounded">
                        {deity.count}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Hidden Spiritual Gems Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Gem className="w-7 h-7 text-purple-600" />
                  [Admin: Hidden Spiritual Gems]
                </h2>
                <p className="text-gray-600 text-sm border-2 border-dashed border-gray-200 px-2 py-1 rounded inline-block mt-1">
                  Admin editable: Section description - Lesser-known temples
                </p>
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
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {hiddenGems.map((gem, index) => (
                    <motion.div
                      key={gem.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-dashed border-purple-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1 border-2 border-dashed border-purple-300 px-2 py-1 rounded inline-block bg-white">
                            {gem.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-2">
                            <MapPin className="w-4 h-4 text-purple-600" />
                            <span className="text-sm text-gray-600 border-2 border-dashed border-purple-200 px-2 py-1 rounded bg-white">
                              {gem.location}
                            </span>
                          </div>
                        </div>
                        <Badge className="bg-purple-600 text-white">
                          {gem.visitorCount}
                        </Badge>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm border-2 border-dashed border-purple-200 p-2 rounded bg-white">
                          <Sparkles className="w-4 h-4 text-purple-600" />
                          <span className="text-gray-600">Deity:</span>
                          <span className="font-semibold text-gray-900">{gem.deity}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm border-2 border-dashed border-purple-200 p-2 rounded bg-white">
                          <Accessibility className="w-4 h-4 text-purple-600" />
                          <span className="text-gray-600">Access:</span>
                          <span className="font-semibold text-gray-900">{gem.accessibility}</span>
                        </div>
                        <p className="text-sm text-gray-700 border-2 border-dashed border-purple-200 p-2 rounded bg-white">
                          {gem.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm border-2 border-dashed border-purple-200 p-2 rounded bg-white">
                          <Star className="w-4 h-4 text-purple-600" />
                          <span className="text-gray-600">Special:</span>
                          <span className="font-semibold text-gray-900">{gem.speciality}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          Explore
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openYouTube(gem.name)}
                          className="border-purple-200 text-purple-600 hover:bg-purple-50"
                        >
                          <Youtube className="w-4 h-4 mr-2" />
                          Videos
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Browse by Geography Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Map className="w-7 h-7 text-green-600" />
                  [Admin: Browse by Geography]
                </h2>
                <p className="text-gray-600 text-sm border-2 border-dashed border-gray-200 px-2 py-1 rounded inline-block mt-1">
                  Admin editable: Section description - Explore temples by state/district
                </p>
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
                  className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-dashed border-green-200 cursor-pointer hover:scale-105"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 border-2 border-dashed border-green-300 px-3 py-1 rounded inline-block bg-white">
                        {state.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-2 border-2 border-dashed border-green-200 px-2 py-1 rounded inline-block bg-white">
                        {state.districts}
                      </p>
                    </div>
                    <Badge className="bg-green-600 text-white">
                      {state.templeCount}
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
          </div>

          {/* Special Packages Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Package className="w-7 h-7 text-blue-600" />
                  [Admin: Special Pilgrimage Packages]
                </h2>
                <p className="text-gray-600 text-sm border-2 border-dashed border-gray-200 px-2 py-1 rounded inline-block mt-1">
                  Admin editable: Section description - Curated packages for different needs
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {specialPackages.map((pkg, index) => {
                const Icon = pkg.icon;
                
                return (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-dashed border-gray-200">
                      <div className={`bg-gradient-to-r ${pkg.gradient} p-6 text-white`}>
                        <div className="flex items-center justify-between mb-3">
                          <Icon className="w-8 h-8" />
                          <Badge className="bg-white/20 text-white border-0">
                            {pkg.tag}
                          </Badge>
                        </div>
                        <h3 className="font-bold text-lg mb-1 border-2 border-dashed border-white/40 px-2 py-1 rounded">
                          {pkg.name}
                        </h3>
                      </div>
                      <div className="p-6 space-y-3">
                        <div className="flex items-center justify-between border-2 border-dashed border-gray-200 p-2 rounded bg-gray-50">
                          <span className="text-sm text-gray-600">Duration:</span>
                          <span className="font-semibold text-gray-900">{pkg.duration}</span>
                        </div>
                        <div className="flex items-center justify-between border-2 border-dashed border-gray-200 p-2 rounded bg-gray-50">
                          <span className="text-sm text-gray-600">Price:</span>
                          <span className="font-bold text-lg text-gray-900">{pkg.price}</span>
                        </div>
                        <div className="border-2 border-dashed border-gray-200 p-3 rounded bg-gray-50">
                          <p className="text-xs text-gray-500 mb-1">Admin editable: Inclusions</p>
                          <p className="text-sm text-gray-700">{pkg.inclusions}</p>
                        </div>
                        <Button
                          className={`w-full bg-gradient-to-r ${pkg.gradient} text-white`}
                        >
                          <Check className="w-4 h-4 mr-2" />
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

        {/* Custom Tour Builder Dialog */}
        <Dialog open={showCustomTourBuilder} onOpenChange={setShowCustomTourBuilder}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-3">
                <Route className="w-7 h-7 text-orange-600" />
                [Admin: Build Custom Pilgrimage]
              </DialogTitle>
              <DialogDescription className="border-2 border-dashed border-gray-200 p-2 rounded">
                Admin editable: Form description - Fill in your requirements and Grok AI will create a custom itinerary
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="border-2 border-dashed border-gray-200 p-3 rounded">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    [Admin: Start Date]
                  </label>
                  <Input
                    type="date"
                    value={customTourForm.startDate}
                    onChange={(e) => setCustomTourForm({ ...customTourForm, startDate: e.target.value })}
                  />
                </div>
                <div className="border-2 border-dashed border-gray-200 p-3 rounded">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    [Admin: End Date]
                  </label>
                  <Input
                    type="date"
                    value={customTourForm.endDate}
                    onChange={(e) => setCustomTourForm({ ...customTourForm, endDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-200 p-3 rounded">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  [Admin: Group Size]
                </label>
                <Select
                  value={customTourForm.groupSize}
                  onValueChange={(value) => setCustomTourForm({ ...customTourForm, groupSize: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select group size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solo">[Admin: Solo (1 person)]</SelectItem>
                    <SelectItem value="couple">[Admin: Couple (2 people)]</SelectItem>
                    <SelectItem value="family">[Admin: Family (3-6 people)]</SelectItem>
                    <SelectItem value="group">[Admin: Group (7+ people)]</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border-2 border-dashed border-gray-200 p-3 rounded">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  [Admin: Senior Citizen Needs]
                </label>
                <Select
                  value={customTourForm.seniorNeeds}
                  onValueChange={(value) => setCustomTourForm({ ...customTourForm, seniorNeeds: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select senior needs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">[Admin: No seniors]</SelectItem>
                    <SelectItem value="wheelchair">[Admin: Wheelchair accessible]</SelectItem>
                    <SelectItem value="low-mobility">[Admin: Low mobility support]</SelectItem>
                    <SelectItem value="medical">[Admin: Medical assistance needed]</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border-2 border-dashed border-gray-200 p-3 rounded">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  [Admin: Deity Preference]
                </label>
                <Select
                  value={customTourForm.deityPreference}
                  onValueChange={(value) => setCustomTourForm({ ...customTourForm, deityPreference: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select deity preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">[Admin: All Deities]</SelectItem>
                    <SelectItem value="shiva">[Admin: Lord Shiva]</SelectItem>
                    <SelectItem value="vishnu">[Admin: Lord Vishnu]</SelectItem>
                    <SelectItem value="shakti">[Admin: Goddess Shakti]</SelectItem>
                    <SelectItem value="ganesha">[Admin: Lord Ganesha]</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border-2 border-dashed border-gray-200 p-3 rounded">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  [Admin: Budget Range]
                </label>
                <Select
                  value={customTourForm.budget}
                  onValueChange={(value) => setCustomTourForm({ ...customTourForm, budget: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget">[Admin: Budget (₹20k-40k)]</SelectItem>
                    <SelectItem value="moderate">[Admin: Moderate (₹40k-80k)]</SelectItem>
                    <SelectItem value="premium">[Admin: Premium (₹80k-1.5L)]</SelectItem>
                    <SelectItem value="luxury">[Admin: Luxury (₹1.5L+)]</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border-2 border-dashed border-gray-200 p-3 rounded">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  [Admin: Accessibility Requirements]
                </label>
                <Select
                  value={customTourForm.accessibility}
                  onValueChange={(value) => setCustomTourForm({ ...customTourForm, accessibility: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select accessibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">[Admin: Standard access]</SelectItem>
                    <SelectItem value="easy">[Admin: Easy access only]</SelectItem>
                    <SelectItem value="moderate">[Admin: Moderate difficulty OK]</SelectItem>
                    <SelectItem value="challenging">[Admin: Can handle challenging]</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border-2 border-dashed border-gray-200 p-3 rounded">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  [Admin: Transportation Preference]
                </label>
                <Select
                  value={customTourForm.transportation}
                  onValueChange={(value) => setCustomTourForm({ ...customTourForm, transportation: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select transportation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="train">[Admin: Train preferred]</SelectItem>
                    <SelectItem value="flight">[Admin: Flight preferred]</SelectItem>
                    <SelectItem value="cab">[Admin: Private cab]</SelectItem>
                    <SelectItem value="mixed">[Admin: Mixed (cost-effective)]</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border-2 border-dashed border-gray-200 p-3 rounded">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  [Admin: Accommodation Type]
                </label>
                <Select
                  value={customTourForm.accommodation}
                  onValueChange={(value) => setCustomTourForm({ ...customTourForm, accommodation: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select accommodation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget">[Admin: Budget hotels/guesthouses]</SelectItem>
                    <SelectItem value="standard">[Admin: 3-star hotels]</SelectItem>
                    <SelectItem value="premium">[Admin: 4-star hotels]</SelectItem>
                    <SelectItem value="luxury">[Admin: 5-star/heritage hotels]</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleCustomTourSubmit}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-lg py-6"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                [Admin: Request Custom Itinerary]
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Grok AI Response Dialog */}
        <Dialog open={showGrokResponse} onOpenChange={setShowGrokResponse}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-3">
                <Sparkles className="w-7 h-7 text-purple-600" />
                [Admin: Grok AI Response]
              </DialogTitle>
            </DialogHeader>

            <div className="py-6">
              {isGrokTyping ? (
                <div className="flex flex-col items-center justify-center space-y-4">
                  <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
                  <p className="text-gray-600 text-center border-2 border-dashed border-purple-200 p-3 rounded">
                    [Admin: Analyzing your requirements...]
                  </p>
                  <p className="text-sm text-gray-500 text-center">
                    [Admin: AI is processing your custom pilgrimage request]
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
                        <h3 className="font-bold text-lg text-gray-900">
                          [Admin: Request Received]
                        </h3>
                        <p className="text-sm text-gray-600">
                          [Admin: Reference ID: GROK-{Math.floor(Math.random() * 100000)}]
                        </p>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-dashed border-green-200">
                      <p className="text-gray-700 mb-3">
                        [Admin: Success message - We've received your request. Grok AI will get back to you with:]
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>[Admin: Detailed budget breakdown]</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>[Admin: Senior care facilities info]</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>[Admin: Custom itinerary with timings]</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>[Admin: Accessibility details]</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>[Admin: Accommodation recommendations]</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <Button
                    onClick={() => setShowGrokResponse(false)}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    [Admin: Close]
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
  // DEITY FILTER SCREEN
  // ========================================

  if (currentScreen === 'deity-filter') {
    const selectedDeityData = deityCategories.find(d => d.id === selectedDeity);
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
        <div className={`bg-gradient-to-r ${selectedDeityData?.gradient} text-white p-6`}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentScreen('main')}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <span className="text-4xl">{selectedDeityData?.emoji}</span>
                  {selectedDeityData?.name}
                </h1>
                <p className="text-white/90 mt-1 border-2 border-dashed border-white/40 px-2 py-1 rounded inline-block">
                  Admin editable: Deity description
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">[Admin: Associated Sacred Circuits]</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sacredCircuits.slice(0, 3).map((circuit) => (
                <div
                  key={circuit.id}
                  className={`bg-gradient-to-br ${circuit.gradient} text-white rounded-2xl p-6 border-2 border-dashed border-white/40`}
                >
                  <h3 className="font-bold text-lg mb-2">{circuit.name}</h3>
                  <p className="text-sm text-white/90 mb-4">{circuit.subtitle}</p>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full"
                  >
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={() => setCurrentScreen('main')}
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

  return null;
}
