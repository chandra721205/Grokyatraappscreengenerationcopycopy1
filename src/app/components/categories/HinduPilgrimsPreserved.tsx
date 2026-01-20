import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Search,
  Globe,
  Youtube,
  Heart,
  Bell,
  Sparkles,
  ChevronRight,
  MapPin,
  Star,
  Calendar,
  CalendarDays,
  Users,
  DollarSign,
  Check,
  Info,
  Accessibility,
  Flame,
  Flower2,
  Sun,
  BookOpen,
  Save,
  ChevronDown,
  Filter,
  Map,
  Play,
  Eye,
  Clock,
  Bookmark,
  Medal,
  Shield,
  Heart as HeartIcon,
  EyeOff,
  Navigation,
  Gem,
  Package,
  Gift,
  Plus,
  Loader2,
  MessageSquare,
  Award,
} from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Switch } from '@/app/components/ui/switch';
import { toast } from 'sonner';
import { AdminEditable, AdminPlaceholder, AdminEditableCard, AdminEditableButton } from '@/app/components/AdminEditable';
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
// HINDU PILGRIMS – PRESERVED & ENHANCED
// ALL EXISTING ELEMENTS KEPT EXACTLY AS IS
// FOUR NEW SECTIONS ADDED BELOW
// ========================================
// 
// ✅ PRESERVED FROM ORIGINAL:
// - Beautiful grid-based card layout
// - Attractive circuit cards with icons & hover effects
// - Smart filter bar (State, Difficulty, Hidden Gems)
// - Browse module (YouTube, Google Maps)
// - Visual badges (Accessible, Medical, Heritage, Global)
// - Circuit detail view with admin-editable zones
// - Grok AI Insights panel
// - Enhanced typography & visual hierarchy
// - Smooth animations & interactions
//
// ✨ NEW SECTIONS ADDED:
// 1. 💎 Hidden Spiritual Gems (6+ cards, collapsible)
// 2. 📍 Browse by Geography (State grid + district filter)
// 3. 🕉️ Browse by Deity (7 deity filters + detail panel)
// 4. 🎁 Special Packages by Admin (3 curated packages)
//
// ========================================

type HinduCircuit = 
  | 'jyotirlinga'
  | 'divya-desam'
  | 'pancha-bhoota'
  | 'char-dham'
  | 'shakti-peetha'
  | 'navagraha';

type FlowScreen = 
  | 'landing'
  | 'circuit-detail'
  | 'deity-detail'
  | 'temple-detail'
  | 'interest-form'
  | 'confirmation';

interface HinduPilgrimsPreservedProps {
  onBack: () => void;
}

// 6 Sacred Circuits - PRESERVED FROM ORIGINAL
const hinduCircuits = [
  {
    id: 'jyotirlinga' as HinduCircuit,
    emoji: '🕉️',
    icon: Flame,
    name: '12 Jyotirlingas',
    subtitle: 'Sacred Shiva Shrines',
    description: '[Admin: 12 sacred Shiva temples across India]',
    dedication: 'Shiva',
    tag: 'MOST SACRED',
    gradient: 'from-orange-500 via-red-500 to-pink-600',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    borderColor: 'border-orange-200',
    tagBg: 'bg-orange-100',
    tagText: 'text-orange-700',
    isFeatured: true,
  },
  {
    id: 'divya-desam' as HinduCircuit,
    emoji: '🏛️',
    icon: BookOpen,
    name: '108 Divya Desams',
    subtitle: 'Vishnu Temples',
    description: '[Admin: 108 holy Vishnu temples]',
    dedication: 'Vishnu',
    tag: '108 TEMPLES',
    gradient: 'from-blue-500 via-indigo-500 to-purple-600',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-200',
    tagBg: 'bg-blue-100',
    tagText: 'text-blue-700',
    isFeatured: false,
  },
  {
    id: 'pancha-bhoota' as HinduCircuit,
    emoji: '🔥',
    icon: Flame,
    name: 'Pancha Bhoota Sthalams',
    subtitle: '5 Elements Circuit',
    description: '[Admin: 5 Shiva temples – 5 elements]',
    dedication: 'Shiva – 5 Elements',
    tag: '5 ELEMENTS',
    gradient: 'from-purple-500 via-pink-500 to-rose-600',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    borderColor: 'border-purple-200',
    tagBg: 'bg-purple-100',
    tagText: 'text-purple-700',
    isFeatured: false,
  },
  {
    id: 'char-dham' as HinduCircuit,
    emoji: '⛰️',
    icon: MapPin,
    name: 'Char Dham Yatra',
    subtitle: 'Four Divine Abodes',
    description: '[Admin: 4 Himalayan pilgrimage sites]',
    dedication: 'Vishnu & Shiva',
    tag: '4 DHAMS',
    gradient: 'from-green-500 via-emerald-500 to-teal-600',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    borderColor: 'border-green-200',
    tagBg: 'bg-green-100',
    tagText: 'text-green-700',
    isFeatured: false,
  },
  {
    id: 'shakti-peetha' as HinduCircuit,
    emoji: '🌺',
    icon: Flower2,
    name: '51 Shakti Peethas',
    subtitle: 'Divine Feminine Shrines',
    description: '[Admin: 51 Goddess temples]',
    dedication: 'Shakti',
    tag: '51 SACRED SITES',
    gradient: 'from-pink-500 via-rose-500 to-red-600',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    borderColor: 'border-pink-200',
    tagBg: 'bg-pink-100',
    tagText: 'text-pink-700',
    isFeatured: false,
  },
  {
    id: 'navagraha' as HinduCircuit,
    emoji: '☀️',
    icon: Sun,
    name: 'Navagraha Temples',
    subtitle: 'Nine Planets Circuit',
    description: '[Admin: 9 temples – Nine planetary deities]',
    dedication: 'Nine Planets',
    tag: '9 PLANETS',
    gradient: 'from-yellow-500 via-orange-500 to-amber-600',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    borderColor: 'border-yellow-200',
    tagBg: 'bg-yellow-100',
    tagText: 'text-yellow-700',
    isFeatured: false,
  },
];

// NEW: Hidden Spiritual Gems Data
const hiddenGems = [
  {
    id: 'gem-1',
    name: '[Admin: Hidden Temple Name 1]',
    location: '[Admin: City], [Admin: State]',
    visitorCount: '<20/day',
    accessibility: '♿ Senior-friendly',
    deity: '[Admin: Deity]',
    description: '[Admin: Edit description] Lorem ipsum serene ancient temple with peaceful ambiance.',
  },
  {
    id: 'gem-2',
    name: '[Admin: Hidden Temple Name 2]',
    location: '[Admin: City], [Admin: State]',
    visitorCount: '<30/day',
    accessibility: '🚗 Jeep access required',
    deity: '[Admin: Deity]',
    description: '[Admin: Edit description] Lorem ipsum mountain shrine with stunning valley views.',
  },
  {
    id: 'gem-3',
    name: '[Admin: Hidden Temple Name 3]',
    location: '[Admin: City], [Admin: State]',
    visitorCount: '<50/day',
    accessibility: '♿ Wheelchair accessible',
    deity: '[Admin: Deity]',
    description: '[Admin: Edit description] Lorem ipsum riverside temple perfect for meditation.',
  },
  {
    id: 'gem-4',
    name: '[Admin: Hidden Temple Name 4]',
    location: '[Admin: City], [Admin: State]',
    visitorCount: '<40/day',
    accessibility: '🥾 Moderate trekking',
    deity: '[Admin: Deity]',
    description: '[Admin: Edit description] Lorem ipsum forest temple surrounded by nature.',
  },
  {
    id: 'gem-5',
    name: '[Admin: Hidden Temple Name 5]',
    location: '[Admin: City], [Admin: State]',
    visitorCount: '<25/day',
    accessibility: '♿ Senior-friendly',
    deity: '[Admin: Deity]',
    description: '[Admin: Edit description] Lorem ipsum coastal temple with sea breeze atmosphere.',
  },
  {
    id: 'gem-6',
    name: '[Admin: Hidden Temple Name 6]',
    location: '[Admin: City], [Admin: State]',
    visitorCount: '<35/day',
    accessibility: '🚗 4WD recommended',
    deity: '[Admin: Deity]',
    description: '[Admin: Edit description] Lorem ipsum hilltop sanctuary with panoramic vistas.',
  },
];

// NEW: Geography Regions Data
const geographyRegions = [
  { id: 'north', name: 'North India', count: 24, icon: '⛰️' },
  { id: 'south', name: 'South India', count: 36, icon: '🏛️' },
  { id: 'east', name: 'East India', count: 18, icon: '🌅' },
  { id: 'west', name: 'West India', count: 22, icon: '🌊' },
];

// NEW: Temple Data by Region
const templesByRegion = {
  north: [
    {
      id: 'north-1',
      name: '[Admin: Temple Name Alpha]',
      district: '[Admin: District]',
      state: '[Admin: State]',
      deity: '[Admin: Primary Deity]',
      rating: 4.5,
      reviews: 120,
    },
    {
      id: 'north-2',
      name: '[Admin: Temple Name Beta]',
      district: '[Admin: District]',
      state: '[Admin: State]',
      deity: '[Admin: Primary Deity]',
      rating: 4.7,
      reviews: 89,
    },
    {
      id: 'north-3',
      name: '[Admin: Temple Name Gamma]',
      district: '[Admin: District]',
      state: '[Admin: State]',
      deity: '[Admin: Primary Deity]',
      rating: 4.6,
      reviews: 95,
    },
  ],
  south: [
    {
      id: 'south-1',
      name: '[Admin: Temple Name Delta]',
      district: '[Admin: District]',
      state: '[Admin: State]',
      deity: '[Admin: Primary Deity]',
      rating: 4.8,
      reviews: 210,
    },
    {
      id: 'south-2',
      name: '[Admin: Temple Name Epsilon]',
      district: '[Admin: District]',
      state: '[Admin: State]',
      deity: '[Admin: Primary Deity]',
      rating: 4.9,
      reviews: 156,
    },
    {
      id: 'south-3',
      name: '[Admin: Temple Name Zeta]',
      district: '[Admin: District]',
      state: '[Admin: State]',
      deity: '[Admin: Primary Deity]',
      rating: 4.7,
      reviews: 178,
    },
  ],
  east: [
    {
      id: 'east-1',
      name: '[Admin: Temple Name Eta]',
      district: '[Admin: District]',
      state: '[Admin: State]',
      deity: '[Admin: Primary Deity]',
      rating: 4.4,
      reviews: 67,
    },
    {
      id: 'east-2',
      name: '[Admin: Temple Name Theta]',
      district: '[Admin: District]',
      state: '[Admin: State]',
      deity: '[Admin: Primary Deity]',
      rating: 4.6,
      reviews: 82,
    },
  ],
  west: [
    {
      id: 'west-1',
      name: '[Admin: Temple Name Iota]',
      district: '[Admin: District]',
      state: '[Admin: State]',
      deity: '[Admin: Primary Deity]',
      rating: 4.5,
      reviews: 134,
    },
    {
      id: 'west-2',
      name: '[Admin: Temple Name Kappa]',
      district: '[Admin: District]',
      state: '[Admin: State]',
      deity: '[Admin: Primary Deity]',
      rating: 4.7,
      reviews: 98,
    },
  ],
};

// NEW: Deity Categories Data
const deityCategories = [
  { 
    id: 'vishnu', 
    name: 'Vishnu', 
    emoji: '🕉️', 
    shortName: 'Vishnu', 
    count: 24,
    keyCircuits: [
      '108 Divya Desams',
      'Char Dham (Badrinath)',
      '[Admin: Circuit 3]'
    ],
    temples: [
      '[Admin: Temple Name 1]',
      '[Admin: Temple Name 2]',
      '[Admin: Temple Name 3]'
    ]
  },
  { 
    id: 'shiva', 
    name: 'Shiva', 
    emoji: '🔱', 
    shortName: 'Shiva', 
    count: 45,
    keyCircuits: [
      '12 Jyotirlingas',
      'Pancha Bhoota Sthalams',
      '[Admin: Circuit 3]'
    ],
    temples: [
      '[Admin: Temple Name 1]',
      '[Admin: Temple Name 2]',
      '[Admin: Temple Name 3]'
    ]
  },
  { 
    id: 'shakti', 
    name: 'Shakti', 
    emoji: '⚡', 
    shortName: 'Shakti', 
    count: 51,
    keyCircuits: [
      '51 Shakti Peethas',
      '[Admin: Circuit 2]',
      '[Admin: Circuit 3]'
    ],
    temples: [
      '[Admin: Temple Name 1]',
      '[Admin: Temple Name 2]',
      '[Admin: Temple Name 3]'
    ]
  },
  { 
    id: 'ganesha', 
    name: 'Ganesha', 
    emoji: '🐘', 
    shortName: 'Ganesh', 
    count: 30,
    keyCircuits: [
      'Ashtavinayak Circuit',
      '[Admin: Circuit 2]',
      '[Admin: Circuit 3]'
    ],
    temples: [
      '[Admin: Temple Name 1]',
      '[Admin: Temple Name 2]',
      '[Admin: Temple Name 3]'
    ]
  },
  { 
    id: 'surya', 
    name: 'Surya', 
    emoji: '☀️', 
    shortName: 'Surya', 
    count: 12,
    keyCircuits: [
      'Navagraha Temples',
      '[Admin: Circuit 2]',
      '[Admin: Circuit 3]'
    ],
    temples: [
      '[Admin: Temple Name 1]',
      '[Admin: Temple Name 2]',
      '[Admin: Temple Name 3]'
    ]
  },
  { 
    id: 'chandra', 
    name: 'Chandra', 
    emoji: '🌙', 
    shortName: 'Chandra', 
    count: 8,
    keyCircuits: [
      'Navagraha Temples',
      '[Admin: Circuit 2]',
      '[Admin: Circuit 3]'
    ],
    temples: [
      '[Admin: Temple Name 1]',
      '[Admin: Temple Name 2]',
      '[Admin: Temple Name 3]'
    ]
  },
];

// NEW: Special Packages Data
const specialPackages = [
  {
    id: 'pkg-1',
    name: '[Admin: Char Dham Deluxe]',
    duration: '14 days',
    price: '₹1,50,000',
    badge: 'Premium Package',
    inclusions: [
      'All darshans booked',
      'Senior care included',
      'Helicopter access',
      'Medical assistance',
    ],
  },
  {
    id: 'pkg-2',
    name: '[Admin: South Temple Circuit]',
    duration: '10 days',
    price: '₹85,000',
    badge: 'Cultural Package',
    inclusions: [
      '15+ temple visits',
      'Traditional meals included',
      'Expert spiritual guide',
      'AC transport provided',
    ],
  },
  {
    id: 'pkg-3',
    name: '[Admin: Senior Pilgrimage]',
    duration: '8 days',
    price: '₹65,000',
    badge: 'Senior Care',
    inclusions: [
      'Medical support 24/7',
      'Wheelchair accessible',
      'Special dietary care',
      'Comfortable pacing',
    ],
  },
];

export function HinduPilgrimsPreserved({ onBack }: HinduPilgrimsPreservedProps) {
  const [currentScreen, setCurrentScreen] = useState<FlowScreen>('landing');
  const [selectedCircuit, setSelectedCircuit] = useState<HinduCircuit | null>(null);
  
  // PRESERVED: Filters State
  const [selectedState, setSelectedState] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [showHiddenGems, setShowHiddenGems] = useState(false);
  
  // PRESERVED: Interest Module State
  const [savedInterests, setSavedInterests] = useState<HinduCircuit[]>([]);
  const [interestNotes, setInterestNotes] = useState('');
  
  // NEW: Additional State for New Sections
  const [showHiddenGemsSection, setShowHiddenGemsSection] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedDeity, setSelectedDeity] = useState<string | null>(null);
  const [selectedTemple, setSelectedTemple] = useState<any | null>(null);
  const [savedPackages, setSavedPackages] = useState<Set<string>>(new Set());
  const [savedGems, setSavedGems] = useState<Set<string>>(new Set());
  const [savedTemples, setSavedTemples] = useState<Set<string>>(new Set());
  const [showCustomTourBuilder, setShowCustomTourBuilder] = useState(false);
  const [tourBuilderStep, setTourBuilderStep] = useState(1);
  const [prefilledDeity, setPrefilledDeity] = useState<string | null>(null);
  
  // Tour Builder Form State
  const [tourDates, setTourDates] = useState({ start: '', end: '' });
  const [groupSize, setGroupSize] = useState('1-5');
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [seniorCare, setSeniorCare] = useState(false);
  const [medicalAssistance, setMedicalAssistance] = useState(false);
  const [dietaryPrefs, setDietaryPrefs] = useState('');
  const [ritualPrefs, setRitualPrefs] = useState('');
  const [selectedDeities, setSelectedDeities] = useState<string[]>([]);
  const [selectedCircuits, setSelectedCircuits] = useState<HinduCircuit[]>([]);
  const [showGrokConfirmation, setShowGrokConfirmation] = useState(false);
  const [grokTyping, setGrokTyping] = useState(false);

  const handleGoogleMaps = (query: string) => {
    window.open(`https://www.google.com/maps/search/${encodeURIComponent(query + ' temples india')}`, '_blank');
    toast.success('Opening Google Maps for temple locations');
  };

  const handleYouTubeVideos = (query: string) => {
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' darshan pilgrimage')}`, '_blank');
    toast.success('Opening YouTube videos for spiritual journeys');
  };

  const handleCircuitClick = (circuitId: HinduCircuit) => {
    setSelectedCircuit(circuitId);
    setCurrentScreen('circuit-detail');
  };

  const handleToggleInterest = (circuitId: HinduCircuit) => {
    if (savedInterests.includes(circuitId)) {
      setSavedInterests(savedInterests.filter(id => id !== circuitId));
      toast.success('Removed from interests');
    } else {
      setSavedInterests([...savedInterests, circuitId]);
      toast.success('Added to interests');
    }
  };

  const handleTogglePackage = (pkgId: string) => {
    const newSaved = new Set(savedPackages);
    if (newSaved.has(pkgId)) {
      newSaved.delete(pkgId);
      toast('Package removed', { icon: '💔' });
    } else {
      newSaved.add(pkgId);
      toast.success('Package saved!', { icon: '❤️' });
    }
    setSavedPackages(newSaved);
  };

  const handleToggleGem = (gemId: string) => {
    const newSaved = new Set(savedGems);
    if (newSaved.has(gemId)) {
      newSaved.delete(gemId);
      toast('Removed from wishlist', { icon: '💔' });
    } else {
      newSaved.add(gemId);
      toast.success('Added to wishlist!', { icon: '❤️' });
    }
    setSavedGems(newSaved);
  };

  const handleToggleTemple = (templeId: string) => {
    const newSaved = new Set(savedTemples);
    if (newSaved.has(templeId)) {
      newSaved.delete(templeId);
      toast('Removed from wishlist', { icon: '💔' });
    } else {
      newSaved.add(templeId);
      toast.success('Added to wishlist!', { icon: '❤️' });
    }
    setSavedTemples(newSaved);
  };

  const handleBack = () => {
    if (currentScreen === 'landing') {
      onBack();
    } else if (currentScreen === 'circuit-detail') {
      setCurrentScreen('landing');
      setSelectedCircuit(null);
    } else if (currentScreen === 'deity-detail') {
      setCurrentScreen('landing');
      setSelectedDeity(null);
    } else if (currentScreen === 'temple-detail') {
      setCurrentScreen('landing');
      setSelectedTemple(null);
    } else {
      setCurrentScreen('landing');
    }
  };

  const handleTempleClick = (temple: any) => {
    setSelectedTemple(temple);
    setCurrentScreen('temple-detail');
  };

  const handleDeityClick = (deityId: string) => {
    setSelectedDeity(deityId);
    setCurrentScreen('deity-detail');
  };

  const handleOpenTourBuilder = (deityId?: string) => {
    if (deityId) {
      setPrefilledDeity(deityId);
      setSelectedDeities([deityId]);
    }
    setShowCustomTourBuilder(true);
    setTourBuilderStep(1);
  };

  // For detail screen
  if (currentScreen === 'circuit-detail' && selectedCircuit) {
    const circuit = hinduCircuits.find(c => c.id === selectedCircuit)!;
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-8">
        {/* Beautiful Header */}
        <div className={`bg-gradient-to-br ${circuit.gradient} px-6 pt-8 pb-6 rounded-b-[2rem] shadow-xl`}>
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-white text-sm font-semibold mb-6 hover:bg-white/20 px-3 py-2 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-3">
              {circuit.emoji}
            </div>
            <h1 className="text-white text-2xl font-bold mb-2">{circuit.name}</h1>
            <p className="text-white/90 text-sm">{circuit.subtitle}</p>
          </div>
        </div>

        <div className="px-6 -mt-4">
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
            <p className="text-gray-700 leading-relaxed">
              {circuit.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => handleYouTubeVideos(circuit.name)}
                className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl h-12 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Youtube className="w-5 h-5 mr-2" />
                YouTube Videos
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => handleGoogleMaps(circuit.name)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Globe className="w-5 h-5 mr-2" />
                Google Maps
              </Button>
            </motion.div>
          </div>

          <Button
            onClick={handleBack}
            variant="outline"
            className="w-full rounded-xl h-12"
          >
            Back to Sacred Circuits
          </Button>
        </div>
      </div>
    );
  }

  // DEITY DETAIL SCREEN (SCREEN 2)
  if (currentScreen === 'deity-detail' && selectedDeity) {
    const deity = deityCategories.find(d => d.id === selectedDeity)!;
    const relatedCircuits = hinduCircuits.filter(circuit => 
      circuit.dedication.toLowerCase().includes(deity.name.toLowerCase())
    );

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-white pb-8">
        {/* Deity Banner */}
        <div className="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 px-6 pt-8 pb-8 rounded-b-[2.5rem] shadow-2xl">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-white text-sm font-semibold mb-6 hover:bg-white/20 px-3 py-2 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Browse
          </button>

          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-28 h-28 bg-white/20 rounded-3xl flex items-center justify-center text-7xl mx-auto mb-4 backdrop-blur-md shadow-xl border-2 border-white/30"
            >
              {deity.emoji}
            </motion.div>
            <div className="border-2 border-dashed border-white/50 p-4 rounded-2xl bg-white/10 backdrop-blur-sm inline-block mb-3">
              <p className="text-xs text-white/80 mb-1 font-semibold">ADMIN_Deity_Name</p>
              <h1 className="text-white text-3xl font-bold tracking-tight">{deity.name}</h1>
            </div>
            <Badge className="bg-white/20 text-white border-white/30 text-sm px-4 py-1.5">
              📊 {deity.count} associated temples
            </Badge>
          </div>
        </div>

        <div className="px-6 -mt-6">
          {/* Deity Significance */}
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-6 border-2 border-dashed border-blue-200">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">Deity Significance</h2>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border border-dashed border-blue-300 mb-4">
              <p className="text-xs text-blue-600 mb-2 font-semibold">ADMIN_Significance_Para_1</p>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                [Admin: Edit significance paragraph 1] Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                {deity.name} holds immense spiritual importance in Hindu tradition, representing divine qualities 
                that inspire millions of devotees across generations.
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border border-dashed border-blue-300">
              <p className="text-xs text-blue-600 mb-2 font-semibold">ADMIN_Significance_Para_2</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                [Admin: Edit significance paragraph 2] The worship practices and sacred circuits dedicated to {deity.name} 
                offer profound spiritual experiences, combining ancient rituals with timeless wisdom that continues to 
                guide seekers on their path to enlightenment.
              </p>
            </div>
          </div>

          {/* Associated Circuits Grid */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Associated Sacred Circuits</h2>
            </div>
            <p className="text-sm text-gray-600 mb-5">Pilgrimage circuits dedicated to {deity.name}</p>

            <div className="grid grid-cols-1 gap-4">
              {deity.keyCircuits.map((circuit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-5 border-2 border-dashed border-blue-200 hover:shadow-xl hover:scale-[1.02] transition-all"
                >
                  <div className="border-2 border-dashed border-blue-300 p-3 rounded-xl bg-blue-50 mb-3">
                    <p className="text-xs text-blue-600 mb-1 font-semibold">ADMIN_Circuit_Name</p>
                    <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                      🕉️ {circuit}
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 rounded-xl border-blue-300"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Key Temples Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Key Temples</h2>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {deity.temples.map((temple, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTempleClick({ id: `dt-${idx}`, name: temple, deity: deity.name })}
                  className="bg-white rounded-2xl shadow-md p-4 border border-dashed border-blue-200 cursor-pointer hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🏛️</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-blue-600 mb-1">ADMIN_Temple_Name</p>
                      <p className="font-bold text-sm text-gray-900">{temple}</p>
                    </div>
                    <Button size="sm" variant="ghost">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Browse Integration */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 mb-6 border-2 border-purple-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Explore More</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => handleYouTubeVideos(deity.name + ' temples darshan')}
                className="bg-red-600 hover:bg-red-700 text-white rounded-xl h-12"
              >
                <Youtube className="w-5 h-5 mr-2" />
                YouTube
              </Button>
              <Button
                onClick={() => handleGoogleMaps(deity.name + ' temples india')}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12"
              >
                <Globe className="w-5 h-5 mr-2" />
                Maps
              </Button>
            </div>
          </div>

          {/* Custom Build Form - Pre-filled */}
          <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-3xl p-6 shadow-2xl">
            <div className="text-center mb-5">
              <h3 className="text-white text-xl font-bold mb-2">Build Your {deity.name} Pilgrimage</h3>
              <p className="text-white/90 text-sm">Pre-configured for {deity.name} devotional journey</p>
            </div>
            <Button
              onClick={() => handleOpenTourBuilder(deity.id)}
              className="w-full bg-white text-orange-600 hover:bg-gray-100 rounded-xl h-12 font-bold shadow-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Start Custom Tour Builder
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // TEMPLE DETAIL SCREEN (SCREEN 3) - ENHANCED
  if (currentScreen === 'temple-detail' && selectedTemple) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-white pb-24">
        {/* Header with Back Button */}
        <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 px-6 pt-8 pb-8 rounded-b-[2.5rem] shadow-2xl mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-white text-sm font-semibold mb-6 hover:bg-white/20 px-3 py-2 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Browse
          </button>

          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-28 h-28 bg-white/20 rounded-3xl flex items-center justify-center text-7xl mx-auto mb-4 backdrop-blur-md shadow-xl border-2 border-white/30"
            >
              🏛️
            </motion.div>
            <div className="border-2 border-dashed border-white/50 p-4 rounded-2xl bg-white/10 backdrop-blur-sm inline-block">
              <p className="text-xs text-white/80 mb-1 font-semibold">ADMIN_Temple_Name</p>
              <h1 className="text-white text-2xl font-bold tracking-tight">{selectedTemple.name}</h1>
            </div>
          </div>
        </div>

        <div className="px-6 space-y-6">
          {/* Interest Buttons Row */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => handleToggleTemple(selectedTemple.id)}
              className={`h-14 rounded-2xl font-bold transition-all ${
                savedTemples.has(selectedTemple.id)
                  ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg'
                  : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-pink-400'
              }`}
            >
              <Heart
                className={`w-5 h-5 mr-2 ${savedTemples.has(selectedTemple.id) ? 'fill-current' : ''}`}
              />
              {savedTemples.has(selectedTemple.id) ? 'Saved' : 'Save Temple'}
            </Button>
            <Button
              onClick={() => handleYouTubeVideos(selectedTemple.name + ' temple darshan')}
              className="bg-red-600 hover:bg-red-700 text-white h-14 rounded-2xl font-bold shadow-lg"
            >
              <Youtube className="w-5 h-5 mr-2" />
              Watch Videos
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => handleGoogleMaps(selectedTemple.name + ' temple')}
              className="bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-2xl font-bold shadow-lg"
            >
              <Globe className="w-5 h-5 mr-2" />
              View on Map
            </Button>
            <Button
              onClick={() => handleOpenTourBuilder()}
              className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white h-14 rounded-2xl font-bold shadow-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Custom Tour
            </Button>
          </div>

          {/* Temple Information - Admin Editable */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-dashed border-orange-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Info className="w-5 h-5 text-orange-600" />
                Temple Information
              </h2>
              <button className="text-gray-400 hover:text-orange-600 transition-colors">
                <span className="text-xs">✏️ Edit</span>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-xl border border-dashed border-orange-300">
                <p className="text-xs text-orange-600 mb-2 font-semibold">ADMIN_Temple_Description</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  [Admin: Add temple description] This sacred temple is renowned for its architectural beauty 
                  and spiritual significance. Pilgrims from across the country visit to seek blessings and 
                  experience divine peace.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 p-3 rounded-xl border border-dashed border-blue-200">
                  <p className="text-xs text-blue-600 mb-1">ADMIN_Location</p>
                  <p className="text-sm font-medium text-gray-900">{selectedTemple.location || 'Location X, State Y'}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-xl border border-dashed border-green-200">
                  <p className="text-xs text-green-600 mb-1">ADMIN_Deity</p>
                  <p className="text-sm font-medium text-gray-900">{selectedTemple.deity || 'Admin-Added Deity'}</p>
                </div>
              </div>

              <div className="bg-purple-50 p-3 rounded-xl border border-dashed border-purple-200">
                <p className="text-xs text-purple-600 mb-2 font-semibold">ADMIN_Best_Time_To_Visit</p>
                <p className="text-sm text-gray-700">[Admin: Add best time] October to March, especially during festival seasons</p>
              </div>

              <div className="bg-pink-50 p-3 rounded-xl border border-dashed border-pink-200">
                <p className="text-xs text-pink-600 mb-2 font-semibold">ADMIN_Timings</p>
                <p className="text-sm text-gray-700">[Admin: Add temple timings] 5:00 AM - 12:00 PM, 4:00 PM - 9:00 PM</p>
              </div>
            </div>
          </div>

          {/* Nearby Temples - Admin Managed */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-dashed border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Nearby Temples
              </h2>
              <button className="text-gray-400 hover:text-blue-600 transition-colors">
                <span className="text-xs">✏️ Edit</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {[
                { id: 'nt1', name: 'Admin-Added Temple 1', distance: '2.5 km' },
                { id: 'nt2', name: 'Admin-Added Temple 2', distance: '5.0 km' },
                { id: 'nt3', name: 'Admin-Added Temple 3', distance: '8.3 km' },
              ].map((nearbyTemple, idx) => (
                <motion.div
                  key={nearbyTemple.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-blue-50 p-4 rounded-xl border border-dashed border-blue-300 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => handleTempleClick({ id: nearbyTemple.id, name: nearbyTemple.name })}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-200 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      🏛️
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-blue-600 mb-1">ADMIN_Temple_{idx + 1}</p>
                      <p className="font-bold text-sm text-gray-900">{nearbyTemple.name}</p>
                      <p className="text-xs text-gray-600 mt-1">📍 {nearbyTemple.distance} away</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Similar Circuits - Admin Managed */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-dashed border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                Related Sacred Circuits
              </h2>
              <button className="text-gray-400 hover:text-purple-600 transition-colors">
                <span className="text-xs">✏️ Edit</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {[
                { id: 'sc1', name: 'Admin Circuit 1', temples: 12 },
                { id: 'sc2', name: 'Admin Circuit 2', temples: 8 },
              ].map((circuit, idx) => (
                <motion.div
                  key={circuit.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-purple-50 p-4 rounded-xl border border-dashed border-purple-300 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-200 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      🕉️
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-purple-600 mb-1">ADMIN_Circuit_{idx + 1}</p>
                      <p className="font-bold text-sm text-gray-900">{circuit.name}</p>
                      <p className="text-xs text-gray-600 mt-1">🏛️ {circuit.temples} temples</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Grok AI Tips - Expanded */}
          <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 rounded-3xl p-6 shadow-2xl border-2 border-dashed border-purple-400">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-lg font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                Grok AI Tips & Insights
              </h2>
              <button className="text-white/60 hover:text-yellow-300 transition-colors">
                <span className="text-xs">✏️ Edit</span>
              </button>
            </div>

            <div className="space-y-3">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                <p className="text-xs text-yellow-300 mb-2 font-semibold">ADMIN_AI_Tip_1</p>
                <p className="text-sm text-white/90 leading-relaxed">
                  💡 [Admin: Add AI tip] Best time to visit is early morning (5-7 AM) for peaceful darshan 
                  and to witness the traditional morning rituals.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                <p className="text-xs text-yellow-300 mb-2 font-semibold">ADMIN_AI_Tip_2</p>
                <p className="text-sm text-white/90 leading-relaxed">
                  🎯 [Admin: Add AI tip] Photography may be restricted in certain areas. Always check with 
                  temple authorities and respect sacred spaces.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                <p className="text-xs text-yellow-300 mb-2 font-semibold">ADMIN_AI_Tip_3</p>
                <p className="text-sm text-white/90 leading-relaxed">
                  ♿ [Admin: Add AI tip] Wheelchair accessibility available. Senior citizens can request 
                  special darshan passes at the administration office.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                <p className="text-xs text-yellow-300 mb-2 font-semibold">ADMIN_AI_Tip_4</p>
                <p className="text-sm text-white/90 leading-relaxed">
                  🍽️ [Admin: Add AI tip] Prasad (blessed food) is distributed after morning and evening 
                  aarti. Pure vegetarian meals available at temple canteen.
                </p>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 hover:from-yellow-500 hover:to-orange-600 mt-4 h-12 rounded-xl font-bold"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Ask Grok AI More Questions
              </Button>
            </div>
          </div>

          {/* Special Features */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-dashed border-green-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Star className="w-5 h-5 text-green-600" />
                Special Features
              </h2>
              <button className="text-gray-400 hover:text-green-600 transition-colors">
                <span className="text-xs">✏️ Edit</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 p-3 rounded-xl border border-dashed border-green-200 text-center">
                <p className="text-2xl mb-1">♿</p>
                <p className="text-xs font-semibold text-gray-700">Accessible</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl border border-dashed border-blue-200 text-center">
                <p className="text-2xl mb-1">🏥</p>
                <p className="text-xs font-semibold text-gray-700">Medical Aid</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-xl border border-dashed border-purple-200 text-center">
                <p className="text-2xl mb-1">🏛️</p>
                <p className="text-xs font-semibold text-gray-700">Heritage Site</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-xl border border-dashed border-orange-200 text-center">
                <p className="text-2xl mb-1">📸</p>
                <p className="text-xs font-semibold text-gray-700">Photo Allowed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LANDING SCREEN - PRESERVED + NEW SECTIONS
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-white pb-8">
      {/* ENHANCED: Beautiful Header with Gradient - Figma Design Integration */}
      <div 
        className="px-6 pt-8 pb-8 rounded-bl-[2.5rem] rounded-br-[2.5rem] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]"
        style={{ 
          backgroundImage: "linear-gradient(140.24deg, rgb(255, 105, 0) 0%, rgb(251, 44, 54) 50%, rgb(230, 0, 118) 100%)" 
        }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white text-sm font-bold mb-6 hover:bg-white/20 px-4 py-2 rounded-[14px] transition-all shadow-sm backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Journey
        </button>

        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center text-5xl mx-auto mb-4 backdrop-blur-md shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] border-2 border-white/30"
          >
            🕉️
          </motion.div>
          <h1 className="text-white text-3xl font-bold mb-2 tracking-tight">Hindu Pilgrims</h1>
          <p className="text-white/95 text-base">Spiritual Journeys – 5000+ Years of Tradition</p>
        </div>

        {/* ENHANCED: Senior-Friendly Features - Prominent Display in Header */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-[14px] flex items-center justify-center flex-shrink-0 shadow-md">
                <Accessibility className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-white text-xs font-bold mb-0.5">Accessible Darshan</p>
                <p className="text-white/80 text-[10px] leading-tight">Senior & Wheelchair</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-[14px] flex items-center justify-center flex-shrink-0 shadow-md">
                <Heart className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-white text-xs font-bold mb-0.5">Medical Support</p>
                <p className="text-white/80 text-[10px] leading-tight">On-site Assistance</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-[14px] flex items-center justify-center flex-shrink-0 shadow-md">
                <CalendarDays className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-white text-xs font-bold mb-0.5">Flexible Dates</p>
                <p className="text-white/80 text-[10px] leading-tight">Plan Your Journey</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-[14px] flex items-center justify-center flex-shrink-0 shadow-md">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-white text-xs font-bold mb-0.5">Group Tours</p>
                <p className="text-white/80 text-[10px] leading-tight">Family & Friends</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-6">
        {/* PRESERVED: Visual Badges Section */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6 border border-gray-100">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-2xl border border-blue-100">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Accessibility className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-blue-900">Accessible Darshan</p>
                <p className="text-[10px] text-blue-700">Senior & Wheelchair</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-2xl border border-green-100">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-green-900">Medical Support</p>
                <p className="text-[10px] text-green-700">On-site Assistance</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-2xl border border-orange-100">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Medal className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-orange-900">Ancient Heritage</p>
                <p className="text-[10px] text-orange-700">5000+ Years Old</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-2xl border border-purple-100">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-purple-900">Global Faiths</p>
                <p className="text-[10px] text-purple-700">Worldwide Unity</p>
              </div>
            </div>
          </div>
        </div>

        {/* PRESERVED: Smart Filter Bar */}
        <div className="bg-white rounded-3xl shadow-lg p-5 mb-6 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-orange-600" />
            <h3 className="text-base font-bold text-gray-900">Smart Filters</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold mb-2 text-gray-700">State / Region</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full h-11 px-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              >
                <option value="">All States</option>
                <option value="north">North India</option>
                <option value="south">South India</option>
                <option value="east">East India</option>
                <option value="west">West India</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold mb-2 text-gray-700">Difficulty Level</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDifficultyFilter('all')}
                  className={`h-11 rounded-[14px] text-sm font-bold transition-all shadow-md ${
                    difficultyFilter === 'all'
                      ? 'bg-gradient-to-r from-[#ff6900] to-[#e7000b] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Levels
                </button>
                <button
                  onClick={() => setDifficultyFilter('senior')}
                  className={`h-11 rounded-[14px] text-sm font-bold transition-all shadow-md ${
                    difficultyFilter === 'senior'
                      ? 'bg-[#155DFC] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Senior-Friendly
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-orange-100">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm font-bold text-gray-900">Show Hidden Gems</p>
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

        {/* PRESERVED: Sacred Circuits */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Sacred Circuits</h2>
          <p className="text-sm text-gray-600 mb-5">Choose your spiritual journey path</p>

          <div className="grid grid-cols-1 gap-5">
            {hinduCircuits.map((circuit, index) => (
              <AdminEditableCard
                key={circuit.id}
                label={`ADMIN_Circuit${index + 1}_Card_${circuit.id}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="group"
                >
                  <div
                    className={`${
                      circuit.isFeatured
                        ? `bg-gradient-to-br ${circuit.gradient} shadow-2xl`
                        : 'bg-white border-2 border-gray-200 shadow-lg hover:shadow-2xl'
                    } rounded-3xl p-6 transition-all duration-300 cursor-pointer relative overflow-hidden`}
                    onClick={() => handleCircuitClick(circuit.id)}
                  >
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                    <circuit.icon className="w-full h-full" />
                  </div>

                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 ${
                        circuit.isFeatured ? 'bg-white/20 border-white/30' : circuit.iconBg
                      } border-2 rounded-2xl flex items-center justify-center shadow-lg`}>
                        <circuit.icon className={`w-7 h-7 ${
                          circuit.isFeatured ? 'text-white' : circuit.iconColor
                        }`} />
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleInterest(circuit.id);
                        }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md ${
                          savedInterests.includes(circuit.id)
                            ? 'bg-pink-100'
                            : circuit.isFeatured ? 'bg-white/20' : 'bg-gray-100'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${
                          savedInterests.includes(circuit.id)
                            ? 'text-pink-600 fill-pink-600'
                            : circuit.isFeatured ? 'text-white' : 'text-gray-600'
                        }`} />
                      </button>
                    </div>

                    <AdminEditable label={`ADMIN_Circuit${index + 1}_Title`} inline>
                      <h3 className={`text-xl font-bold mb-1 ${
                        circuit.isFeatured ? 'text-white' : 'text-gray-900'
                      }`}>
                        {circuit.name}
                      </h3>
                    </AdminEditable>
                    
                    <AdminEditable label={`ADMIN_Circuit${index + 1}_Subtitle`} inline>
                      <p className={`text-sm mb-3 ${
                        circuit.isFeatured ? 'text-white/90' : 'text-gray-600'
                      }`}>
                        {circuit.subtitle}
                      </p>
                    </AdminEditable>

                    <AdminEditable label={`ADMIN_Circuit${index + 1}_Description`} inline>
                      <p className={`text-xs mb-4 leading-relaxed ${
                        circuit.isFeatured ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        {circuit.description}
                      </p>
                    </AdminEditable>

                    <div className="flex items-center gap-2 mb-4">
                      <AdminEditable label={`ADMIN_Circuit${index + 1}_Tag`} inline>
                        <div className={`${
                          circuit.isFeatured ? 'bg-white/20' : circuit.tagBg
                        } px-3 py-1.5 rounded-lg`}>
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${
                            circuit.isFeatured ? 'text-white' : circuit.tagText
                          }`}>
                            {circuit.tag}
                          </span>
                        </div>
                      </AdminEditable>
                      
                      <AdminEditable label={`ADMIN_Circuit${index + 1}_Dedication`} inline>
                        <div className={`${
                          circuit.isFeatured ? 'bg-white/10' : 'bg-gray-100'
                        } px-3 py-1.5 rounded-lg`}>
                          <span className={`text-[10px] font-semibold ${
                            circuit.isFeatured ? 'text-white/90' : 'text-gray-600'
                          }`}>
                            Dedicated to: {circuit.dedication}
                          </span>
                        </div>
                      </AdminEditable>
                    </div>

                    {/* EXACT FIGMA DESIGN: Single View Details Button */}
                    <AdminEditable label={`ADMIN_Circuit${index + 1}_ButtonLink`} inline>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCircuitClick(circuit.id);
                        }}
                        className={`w-full rounded-[14px] h-11 font-bold text-sm ${
                          circuit.isFeatured
                            ? 'bg-white text-[#f54900] hover:bg-gray-100'
                            : 'bg-gradient-to-r from-[#ff6900] to-[#e7000b] text-white hover:from-[#ff7a1a] hover:to-[#f0111b]'
                        } shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] transition-all flex items-center justify-center`}
                      >
                        <span>View Details</span>
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </AdminEditable>
                  </div>
                </div>
              </motion.div>
              </AdminEditableCard>
            ))}
          </div>
        </div>

        {/* ENHANCED: Prominent Custom Yatra CTA - Figma Design */}
        <div className="mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-3xl p-6 shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.2),0px_8px_10px_-6px_rgba(0,0,0,0.15)]"
          >
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-3 backdrop-blur-md shadow-lg border-2 border-white/30">
                🛕
              </div>
              <h3 className="text-white text-xl font-bold mb-2">Plan Your Custom Yatra</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Personalized spiritual journey with senior care, medical support & flexible dates
              </p>
            </div>
            
            <Button
              onClick={() => handleOpenTourBuilder()}
              className="w-full bg-white text-orange-600 hover:bg-gray-100 rounded-2xl h-14 font-bold text-base shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Create My Custom Pilgrimage
            </Button>
            
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 text-center border border-white/20">
                <p className="text-white text-xs font-bold">♿ Senior Care</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 text-center border border-white/20">
                <p className="text-white text-xs font-bold">🏥 Medical</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 text-center border border-white/20">
                <p className="text-white text-xs font-bold">👥 Groups</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ========================================
            NEW SECTION A: 💎 HIDDEN SPIRITUAL GEMS
            ======================================== */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">💎 Hidden Spiritual Gems</h2>
              <p className="text-sm text-gray-600">Lesser-known temples with authentic devotion</p>
            </div>
            <Button
              onClick={() => setShowHiddenGemsSection(!showHiddenGemsSection)}
              variant="outline"
              size="sm"
              className="border-2 border-purple-400 text-purple-600 hover:bg-purple-50 rounded-[14px] font-bold shadow-md h-11"
            >
              {showHiddenGemsSection ? (
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
            {showHiddenGemsSection && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"
              >
                {hiddenGems.map((gem, index) => (
                  <motion.div
                    key={gem.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    onClick={() => handleTempleClick({ ...gem, isGem: true })}
                    className="bg-white rounded-3xl overflow-hidden border-2 border-dashed border-purple-200 transition-all duration-200 cursor-pointer"
                    style={{ boxShadow: 'rgba(0,0,0,0.05) 0px 2px 8px' }}
                  >
                    {/* Temple Thumbnail */}
                    <div className="relative h-48 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 border-b-2 border-dashed border-purple-200">
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <div className="w-20 h-20 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3 shadow-lg border-2 border-dashed border-purple-300">
                          <MapPin className="w-10 h-10 text-purple-600" />
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-dashed border-purple-300">
                          <p className="text-xs text-purple-700 font-semibold">[Admin: Temple Image]</p>
                        </div>
                      </div>
                      
                      {/* Heart Icon - Top Left */}
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleGem(gem.id);
                        }}
                        whileTap={{ scale: 0.9 }}
                        animate={savedGems.has(gem.id) ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 0.3 }}
                        className="absolute top-3 left-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
                      >
                        <Heart
                          className={`w-5 h-5 transition-all ${
                            savedGems.has(gem.id)
                              ? 'fill-current'
                              : ''
                          }`}
                          style={savedGems.has(gem.id) ? { color: '#FF4757' } : { color: '#9CA3AF' }}
                        />
                      </motion.button>

                      {/* Visitor Count Badge - Top Right */}
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-purple-600 text-white shadow-lg border-2 border-white">
                          👥 {gem.visitorCount}
                        </Badge>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 space-y-3">
                      {/* Temple Name */}
                      <div className="border-2 border-dashed border-purple-300 p-3 rounded-xl bg-purple-50">
                        <p className="text-xs text-purple-600 mb-1 font-semibold">ADMIN_Temple_Name</p>
                        <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                          🏛️ {gem.name}
                        </h3>
                      </div>

                      {/* Location */}
                      <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-xl border border-gray-200">
                        <MapPin className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 mb-1">Location</p>
                          <p className="text-sm text-gray-700 font-medium">{gem.location}</p>
                        </div>
                      </div>

                      {/* Accessibility */}
                      <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-xl border border-blue-200">
                        <Accessibility className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-xs text-blue-600 mb-1">Accessibility</p>
                          <p className="text-sm text-gray-700 font-medium">{gem.accessibility}</p>
                        </div>
                      </div>

                      {/* Peaceful Vibe Indicator */}
                      <div className="flex items-center gap-2 bg-green-50 p-3 rounded-xl border border-green-200">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-lg">🌿</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-green-600 mb-1">Atmosphere</p>
                          <p className="text-sm text-gray-700 font-medium">Peaceful Vibe</p>
                        </div>
                      </div>

                      {/* Deity Info */}
                      <div className="bg-gray-50 p-3 rounded-xl border border-dashed border-gray-300">
                        <p className="text-xs text-gray-500 mb-1">ADMIN_Deity</p>
                        <p className="text-sm text-gray-700 font-medium">🕉️ {gem.deity}</p>
                      </div>

                      {/* Description (1-2 lines) */}
                      <div className="bg-orange-50 p-3 rounded-xl border-2 border-dashed border-orange-300">
                        <p className="text-xs text-orange-600 mb-1 font-semibold">ADMIN_Description</p>
                        <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">
                          {gem.description}
                        </p>
                      </div>

                      {/* Explore Button */}
                      <Button
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-[14px] h-11 font-bold shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] transition-all hover:scale-105"
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        Explore Gem →
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* See More Hidden Gems Button */}
              <div className="flex justify-center mt-6">
                <Button
                  onClick={() => {
                    // Load more gems functionality
                    console.log('Loading more hidden gems...');
                  }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-[14px] h-12 px-8 font-bold shadow-lg transition-all hover:scale-105"
                >
                  See More Hidden Gems →
                </Button>
              </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ========================================
            NEW SECTION B: 📍 BROWSE BY GEOGRAPHY
            ======================================== */}
        <div className="mb-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">📍 Browse by Geography</h2>
            <p className="text-sm text-gray-600">Explore temples by state and district</p>
          </div>

          {/* Interactive State Grid - 4 regions */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {geographyRegions.map((region) => (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region.id === selectedRegion ? null : region.id)}
                className={`bg-white rounded-3xl p-5 border-2 transition-all hover:scale-105 ${
                  selectedRegion === region.id
                    ? 'border-green-500 shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]'
                    : 'border-dashed border-green-200 hover:border-green-300 shadow-md'
                }`}
              >
                <div className="text-4xl mb-3">{region.icon}</div>
                <div className="border border-dashed border-green-300 p-3 rounded-xl bg-green-50">
                  <p className="text-xs text-green-600 mb-1">ADMIN_Region</p>
                  <h3 className="font-bold text-base text-gray-900">{region.name}</h3>
                </div>
                <div className="mt-3 bg-green-100 text-green-800 text-sm font-bold px-3 py-2 rounded-full">
                  [{region.count} temples]
                </div>
              </button>
            ))}
          </div>

          {/* District Filter System */}
          <div className="bg-white rounded-3xl shadow-lg p-5 border-2 border-dashed border-green-200 mb-4">
            <h3 className="font-bold text-sm mb-3">District Filter System</h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="border-dashed">
                  <SelectValue placeholder="[Admin: State Dropdown]" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="state1">[Admin: State 1]</SelectItem>
                  <SelectItem value="state2">[Admin: State 2]</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger className="border-dashed">
                  <SelectValue placeholder="[Admin: District]" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dist1">[Admin: District 1]</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-[14px] h-11 font-bold shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] transition-all hover:scale-105">
              <Search className="w-4 h-4 mr-2" />
              Show Temples
            </Button>
          </div>

          {/* Temple Cards for Selected Region */}
          {selectedRegion && templesByRegion[selectedRegion as keyof typeof templesByRegion] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {templesByRegion[selectedRegion as keyof typeof templesByRegion].map((temple, index) => (
                <motion.div
                  key={temple.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-5 border-2 border-dashed border-green-200 hover:shadow-xl hover:scale-[1.02] transition-all relative"
                >
                  {/* Heart Icon - Top Right */}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleTemple(temple.id);
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-all border border-gray-200"
                  >
                    <Heart
                      className={`w-4 h-4 transition-all ${
                        savedTemples.has(temple.id)
                          ? 'fill-current'
                          : ''
                      }`}
                      style={savedTemples.has(temple.id) ? { color: '#FF4757' } : { color: '#9CA3AF' }}
                    />
                  </motion.button>

                  {/* Temple Name */}
                  <div className="border-2 border-dashed border-green-300 p-3 rounded-xl bg-green-50 mb-3">
                    <p className="text-xs text-green-600 mb-1 font-semibold">ADMIN_Temple_Name</p>
                    <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                      🏛️ {temple.name}
                    </h3>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm text-gray-700 font-medium">
                        📍 {temple.district}, {temple.state}
                      </p>
                    </div>
                  </div>

                  {/* Primary Deity */}
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Primary Deity</p>
                      <p className="text-sm text-gray-700 font-medium">
                        🕉️ {temple.deity}
                      </p>
                    </div>
                  </div>

                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Rating</p>
                      <p className="text-sm text-gray-700 font-medium">
                        ⭐ {temple.rating} ({temple.reviews} reviews)
                      </p>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white rounded-[14px] h-11 font-bold shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] transition-all hover:scale-105"
                  >
                    <ChevronRight className="w-4 h-4 mr-2" />
                    View Details →
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Load More Temples Button */}
          {selectedRegion && (
            <div className="flex justify-center mt-6">
              <Button
                onClick={() => {
                  console.log('Loading more temples for region:', selectedRegion);
                }}
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-[14px] h-12 px-8 font-bold shadow-lg transition-all hover:scale-105"
              >
                Load More Temples
              </Button>
            </div>
          )}
        </div>

        {/* ========================================
            NEW SECTION C: 🕉️ BROWSE BY DEITY
            ======================================== */}
        <div className="mb-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">🕉️ Browse by Deity</h2>
            <p className="text-sm text-gray-600">Filter by the deity you wish to worship</p>
          </div>

          {/* Deity Filter Bar - Horizontal Scroll */}
          <div className="bg-white rounded-3xl shadow-lg p-5 mb-6 border-2 border-dashed border-blue-200">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {deityCategories.map((deity) => (
                <button
                  key={deity.id}
                  onClick={() => setSelectedDeity(deity.id === selectedDeity ? null : deity.id)}
                  className={`flex-shrink-0 w-24 p-3 rounded-xl border-2 transition-all hover:scale-105 ${
                    selectedDeity === deity.id
                      ? 'border-blue-500 bg-blue-50 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] scale-105'
                      : 'border-gray-300 bg-white hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <div className="text-3xl mb-2 text-center">{deity.emoji}</div>
                  <div className="border border-dashed border-gray-300 p-2 rounded-lg bg-gray-50">
                    <p className="text-[10px] text-gray-500 text-center mb-0.5">ADMIN</p>
                    <p className="font-bold text-[10px] text-gray-900 text-center">{deity.shortName}</p>
                  </div>
                </button>
              ))}
              
              {/* + More Button */}
              <button
                onClick={() => {
                  console.log('Show more deities...');
                }}
                className="flex-shrink-0 w-24 p-3 rounded-xl border-2 border-dashed border-gray-400 bg-gray-50 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md transition-all hover:scale-105"
              >
                <div className="text-3xl mb-2 text-center">+</div>
                <div className="p-2 rounded-lg">
                  <p className="font-bold text-xs text-gray-700 text-center">More</p>
                </div>
              </button>
            </div>
          </div>

          {/* Selected Deity Panel */}
          {selectedDeity && (() => {
            const selectedDeityData = deityCategories.find(d => d.id === selectedDeity);
            if (!selectedDeityData) return null;
            
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 border-2 border-dashed border-blue-300 shadow-xl mb-6"
              >
                {/* Deity Header */}
                <div className="mb-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-5xl">
                      {selectedDeityData.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="border-2 border-dashed border-blue-400 p-3 rounded-xl bg-white inline-block">
                        <p className="text-xs text-blue-600 mb-1 font-semibold">ADMIN_Deity_Name</p>
                        <h3 className="text-xl font-bold text-gray-900 uppercase">
                          {selectedDeityData.name} (Selected)
                        </h3>
                      </div>
                    </div>
                  </div>
                  
                  {/* Count */}
                  <p className="text-sm text-gray-700 font-medium ml-[68px]">
                    {selectedDeityData.count} associated temples & circuits
                  </p>
                </div>

                {/* Featured Circuits */}
                <div className="bg-white rounded-2xl p-5 mb-4 border-2 border-dashed border-blue-200">
                  <h4 className="text-sm font-bold text-gray-900 mb-3">
                    Featured {selectedDeityData.name} Circuits:
                  </h4>
                  <ul className="space-y-2">
                    {selectedDeityData.keyCircuits.map((circuit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span className={circuit.startsWith('[Admin') ? 'text-gray-500 italic' : 'font-medium'}>{circuit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Build Custom Pilgrimage Button */}
                <Button 
                  onClick={() => handleOpenTourBuilder(selectedDeity)}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-[14px] h-12 font-bold shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] transition-all hover:scale-105"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Build Custom {selectedDeityData.name} Pilgrimage →
                </Button>
              </motion.div>
            );
          })()}

          {/* Deity-Specific Temples Grid (Same format as Geography results) */}
          {selectedDeity && (() => {
            const selectedDeityData = deityCategories.find(d => d.id === selectedDeity);
            if (!selectedDeityData) return null;
            
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {selectedDeityData.name} Temples
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedDeityData.temples.map((temple, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg p-5 border-2 border-dashed border-blue-200 hover:shadow-xl hover:scale-[1.02] transition-all relative"
                  >
                    {/* Heart Icon - Top Right */}
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        const templeId = `deity-${selectedDeity}-${index}`;
                        handleToggleTemple(templeId);
                      }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-all border border-gray-200"
                    >
                      <Heart
                        className="w-4 h-4 transition-all"
                        style={{ color: '#9CA3AF' }}
                      />
                    </motion.button>

                    {/* Temple Name */}
                    <div className="border-2 border-dashed border-blue-300 p-3 rounded-xl bg-blue-50 mb-3">
                      <p className="text-xs text-blue-600 mb-1 font-semibold">ADMIN_Temple_Name</p>
                      <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                        🏛️ {temple}
                      </h3>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="text-sm text-gray-700 font-medium">
                          📍 [Admin: District], [Admin: State]
                        </p>
                      </div>
                    </div>

                    {/* Primary Deity */}
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">Primary Deity</p>
                        <p className="text-sm text-gray-700 font-medium">
                          🕉️ {selectedDeityData.name}
                        </p>
                      </div>
                    </div>

                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">Rating</p>
                        <p className="text-sm text-gray-700 font-medium">
                          ⭐ 4.{Math.floor(Math.random() * 5) + 5} ({Math.floor(Math.random() * 500) + 50} reviews)
                        </p>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <Button
                      onClick={() => handleTempleClick({ 
                        id: `deity-${selectedDeity}-${index}`, 
                        name: temple, 
                        deity: selectedDeityData.name 
                      })}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-[14px] h-11 font-bold shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] transition-all hover:scale-105"
                    >
                      <ChevronRight className="w-4 h-4 mr-2" />
                      View Details →
                    </Button>
                  </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })()}
        </div>

        {/* ========================================
            NEW SECTION D: 🎁 SPECIAL PACKAGES
            ======================================== */}
        <div className="mb-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">🎁 Special Pilgrimage Packages</h2>
            <p className="text-sm text-gray-600">Curated spiritual journeys with exclusive access</p>
          </div>

          {/* Package Cards - 3 cards horizontally */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {specialPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl shadow-lg p-6 border-2 border-dashed border-pink-200 hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                {/* Package Name with 🎁 Badge */}
                <div className="mb-5">
                  <div className="inline-block bg-gradient-to-r from-pink-500 to-rose-600 text-white px-4 py-2 rounded-xl mb-3">
                    <span className="text-sm font-bold">🎁 {pkg.badge}</span>
                  </div>
                  <div className="border-2 border-dashed border-pink-300 p-3 rounded-xl bg-pink-50">
                    <p className="text-xs text-pink-600 mb-1 font-semibold">ADMIN_Package_Name</p>
                    <h3 className="font-bold text-lg text-gray-900">{pkg.name}</h3>
                  </div>
                </div>

                {/* Inclusions List */}
                <div className="mb-5">
                  <ul className="space-y-2">
                    {pkg.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-green-600 mt-0.5">✅</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Duration and Price */}
                <div className="mb-5 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⏱️</span>
                    <span className="text-sm font-bold text-gray-900">{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">💰</span>
                    <span className="text-xl font-bold text-gray-900">{pkg.price}</span>
                  </div>
                </div>

                {/* Book Now Button */}
                <Button 
                  onClick={() => {
                    console.log('Booking package:', pkg.id);
                  }}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-[14px] h-12 font-bold shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] transition-all hover:scale-105"
                >
                  <ChevronRight className="w-4 h-4 mr-2" />
                  Book Now →
                </Button>
              </motion.div>
            ))}
          </div>

          {/* View All Packages Button */}
          <div className="flex justify-center">
            <Button
              onClick={() => {
                console.log('View all packages');
              }}
              className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-[14px] h-12 px-8 font-bold shadow-lg transition-all hover:scale-105"
            >
              <Package className="w-4 h-4 mr-2" />
              View All Packages →
            </Button>
          </div>
        </div>

        {/* PRESERVED: Explore More Card */}
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-6 mb-6 border-2 border-purple-100 shadow-xl">
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
              onClick={() => handleYouTubeVideos('hindu pilgrimage temples')}
              className="bg-[#e7000b] hover:bg-[#c7000a] text-white rounded-[14px] h-12 font-bold shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] transition-all hover:scale-[1.02]"
            >
              <Youtube className="w-4 h-4 mr-2" />
              ▶️ Watch Videos
            </Button>
            <Button
              onClick={() => handleGoogleMaps('hindu sacred temples')}
              className="bg-[#155DFC] hover:bg-[#0d4ad6] text-white rounded-[14px] h-12 font-bold shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] transition-all hover:scale-[1.02]"
            >
              <Globe className="w-4 h-4 mr-2" />
              🗺️ Explore on Map
            </Button>
          </div>

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
              className="h-10 text-sm bg-white border-purple-200"
            />
          </div>
        </div>

        {/* PRESERVED: Grok AI Insights */}
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
              CEREMONY TIMING & SACRED CIRCUITS
            </p>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-4 border border-white/20">
              <p className="text-purple-100 text-sm leading-relaxed">
                AI analysis shows <span className="text-yellow-300 font-bold">Pancha Bhoota Sthalams</span> experiencing 
                40% more interest for their meditative ambiance and unique elemental significance. 
                Best time: October-March for comfortable weather.
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
      </div>

      {/* FLOATING ACTION BUTTON - Custom Tour Builder */}
      <motion.button
        onClick={() => handleOpenTourBuilder()}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 font-bold text-sm z-50 hover:shadow-3xl transition-all"
      >
        <Plus className="w-6 h-6" />
        <span>Build Custom Pilgrimage</span>
      </motion.button>

      {/* CUSTOM TOUR BUILDER DIALOG - MULTI-STEP */}
      <Dialog open={showCustomTourBuilder} onOpenChange={(open) => {
        setShowCustomTourBuilder(open);
        if (!open) setTourBuilderStep(1);
      }}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Plus className="w-6 h-6 text-orange-600" />
              Build Your Custom Pilgrimage
            </DialogTitle>
            <DialogDescription>
              {tourBuilderStep === 1 && 'Step 1 of 4: Basics'}
              {tourBuilderStep === 2 && 'Step 2 of 4: Special Needs'}
              {tourBuilderStep === 3 && 'Step 3 of 4: Spiritual Focus'}
              {tourBuilderStep === 4 && 'Step 4 of 4: Submit'}
            </DialogDescription>
          </DialogHeader>

          {/* Progress Bar */}
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`h-2 flex-1 rounded-full transition-all ${
                  step <= tourBuilderStep ? 'bg-orange-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* STEP 1: BASIC DETAILS */}
          {tourBuilderStep === 1 && (
            <div className="space-y-4">
              {/* Dates */}
              <div className="border-2 border-dashed border-orange-200 rounded-xl p-4 bg-orange-50">
                <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-orange-600" />
                  Travel Dates
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">Start Date</label>
                    <Input
                      type="date"
                      value={tourDates.start}
                      onChange={(e) => setTourDates({ ...tourDates, start: e.target.value })}
                      className="bg-white border-orange-300"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">End Date</label>
                    <Input
                      type="date"
                      value={tourDates.end}
                      onChange={(e) => setTourDates({ ...tourDates, end: e.target.value })}
                      className="bg-white border-orange-300"
                    />
                  </div>
                </div>
              </div>

              {/* Group Size */}
              <div className="border-2 border-dashed border-blue-200 rounded-xl p-4 bg-blue-50">
                <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  Group Size
                </h4>
                <div className="space-y-2">
                  {['1-5', '6-15', '16+'].map((size) => (
                    <label key={size} className="flex items-center gap-3 bg-white p-3 rounded-lg cursor-pointer hover:bg-blue-50 transition-all">
                      <input
                        type="radio"
                        name="groupSize"
                        value={size}
                        checked={groupSize === size}
                        onChange={(e) => setGroupSize(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium">{size} people</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Budget Range */}
              <div className="border-2 border-dashed border-green-200 rounded-xl p-4 bg-green-50">
                <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  Budget Range (per person)
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">Minimum ₹</label>
                    <Input
                      type="number"
                      placeholder="25,000"
                      value={budgetMin}
                      onChange={(e) => setBudgetMin(e.target.value)}
                      className="bg-white border-green-300"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">Maximum ₹</label>
                    <Input
                      type="number"
                      placeholder="1,50,000"
                      value={budgetMax}
                      onChange={(e) => setBudgetMax(e.target.value)}
                      className="bg-white border-green-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SPECIAL REQUIREMENTS */}
          {tourBuilderStep === 2 && (
            <div className="space-y-4">
              {/* Accessibility & Medical */}
              <div className="border-2 border-dashed border-purple-200 rounded-xl p-4 bg-purple-50">
                <h4 className="font-bold text-sm mb-3">Accessibility & Medical Support</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 bg-white p-3 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={seniorCare}
                      onChange={(e) => setSeniorCare(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">♿ Senior care needed</span>
                  </label>
                  <label className="flex items-center gap-3 bg-white p-3 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={medicalAssistance}
                      onChange={(e) => setMedicalAssistance(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">👨‍⚕️ Medical assistance required</span>
                  </label>
                </div>
              </div>

              {/* Dietary Preferences */}
              <div className="border-2 border-dashed border-orange-200 rounded-xl p-4 bg-orange-50">
                <h4 className="font-bold text-sm mb-3">Dietary Preferences</h4>
                <Select value={dietaryPrefs} onValueChange={setDietaryPrefs}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select dietary preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="jain">Jain (No onion/garlic)</SelectItem>
                    <SelectItem value="sattvic">Sattvic</SelectItem>
                    <SelectItem value="none">No restrictions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Ritual Preferences */}
              <div className="border-2 border-dashed border-blue-200 rounded-xl p-4 bg-blue-50">
                <h4 className="font-bold text-sm mb-3">Ritual Preferences</h4>
                <Select value={ritualPrefs} onValueChange={setRitualPrefs}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select ritual preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="traditional">Traditional Puja</SelectItem>
                    <SelectItem value="archana">Archana/Abhishekam</SelectItem>
                    <SelectItem value="darshan">Simple Darshan</SelectItem>
                    <SelectItem value="guided">Guided Rituals</SelectItem>
                    <SelectItem value="observe">Observation Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* STEP 3: SPIRITUAL FOCUS */}
          {tourBuilderStep === 3 && (
            <div className="space-y-4">
              {/* Primary Deity */}
              <div className="border-2 border-dashed border-blue-200 rounded-xl p-4 bg-blue-50">
                <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  Primary Deity Focus
                </h4>
                <p className="text-xs text-blue-600 mb-2">ADMIN_Primary_Deity_Label</p>
                {prefilledDeity && (
                  <div className="mb-3 p-3 bg-blue-100 rounded-lg border border-blue-300">
                    <p className="text-xs text-blue-700 mb-1">Pre-selected from previous page:</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{deityCategories.find(d => d.id === prefilledDeity)?.emoji}</span>
                      <span className="font-bold text-sm">{deityCategories.find(d => d.id === prefilledDeity)?.name}</span>
                    </div>
                  </div>
                )}
                <Select 
                  value={selectedDeities[0] || ''} 
                  onValueChange={(value) => {
                    if (value && !selectedDeities.includes(value)) {
                      setSelectedDeities([value, ...selectedDeities.filter(id => id !== value)]);
                    }
                  }}
                >
                  <SelectTrigger className="bg-white border-blue-300">
                    <SelectValue placeholder="[Admin: Select primary deity]" />
                  </SelectTrigger>
                  <SelectContent>
                    {deityCategories.map((deity) => (
                      <SelectItem key={deity.id} value={deity.id}>
                        <div className="flex items-center gap-2">
                          <span>{deity.emoji}</span>
                          <span>{deity.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Include Circuits */}
              <div className="border-2 border-dashed border-orange-200 rounded-xl p-4 bg-orange-50">
                <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-orange-600" />
                  Include Sacred Circuits
                </h4>
                <p className="text-xs text-orange-600 mb-3">ADMIN_Circuits_Selection_Label</p>
                <p className="text-xs text-gray-600 mb-3">[Admin: Select which circuits to include in your pilgrimage]</p>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {hinduCircuits.map((circuit) => (
                    <label
                      key={circuit.id}
                      className="flex items-start gap-3 bg-white p-3 rounded-lg cursor-pointer hover:bg-orange-50 transition-all border border-orange-100"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCircuits.includes(circuit.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCircuits([...selectedCircuits, circuit.id]);
                          } else {
                            setSelectedCircuits(selectedCircuits.filter(id => id !== circuit.id));
                          }
                        }}
                        className="w-4 h-4 mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <circuit.icon className="w-4 h-4 text-orange-600" />
                          <span className="text-sm font-bold">{circuit.name}</span>
                          {circuit.tag && (
                            <Badge className="text-[10px] px-2 py-0 bg-orange-100 text-orange-700 border-orange-300">
                              {circuit.tag}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-600">{circuit.subtitle}</p>
                        <p className="text-xs text-gray-500 mt-1">{circuit.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="mt-3 p-2 bg-orange-100 rounded-lg border border-dashed border-orange-300">
                  <p className="text-xs text-orange-700 text-center">
                    💡 Selected circuits: <span className="font-bold">{selectedCircuits.length}</span>
                  </p>
                </div>
              </div>

              {/* Additional Deities (Optional) */}
              <div className="border-2 border-dashed border-purple-200 rounded-xl p-4 bg-purple-50">
                <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-purple-600" />
                  Additional Deities (Optional)
                </h4>
                <p className="text-xs text-purple-600 mb-3">ADMIN_Additional_Deities_Label</p>
                <p className="text-xs text-gray-600 mb-3">[Admin: Select other deities to include]</p>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {deityCategories.map((deity) => (
                    <label
                      key={deity.id}
                      className="flex items-center gap-3 bg-white p-3 rounded-lg cursor-pointer hover:bg-purple-50 transition-all"
                    >
                      <input
                        type="checkbox"
                        checked={selectedDeities.includes(deity.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedDeities([...selectedDeities, deity.id]);
                          } else {
                            setSelectedDeities(selectedDeities.filter(id => id !== deity.id));
                          }
                        }}
                        className="w-4 h-4"
                      />
                      <span className="text-xl">{deity.emoji}</span>
                      <span className="text-sm font-medium">{deity.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW & SUBMIT */}
          {tourBuilderStep === 4 && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl p-5 border-2 border-dashed border-orange-200">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5 text-orange-600" />
                  Review Your Pilgrimage Plan
                </h4>

                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Dates</p>
                    <p className="text-sm font-medium">{tourDates.start || 'Not set'} to {tourDates.end || 'Not set'}</p>
                  </div>

                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Group Size</p>
                    <p className="text-sm font-medium">{groupSize} people</p>
                  </div>

                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Budget Range</p>
                    <p className="text-sm font-medium">₹{budgetMin || '0'} - ₹{budgetMax || '0'}</p>
                  </div>

                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Special Requirements</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {seniorCare && <Badge>♿ Senior Care</Badge>}
                      {medicalAssistance && <Badge>👨‍⚕️ Medical</Badge>}
                      {dietaryPrefs && <Badge>🍽️ {dietaryPrefs}</Badge>}
                      {ritualPrefs && <Badge>🕉️ {ritualPrefs}</Badge>}
                      {!seniorCare && !medicalAssistance && !dietaryPrefs && !ritualPrefs && (
                        <span className="text-sm text-gray-500">None specified</span>
                      )}
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-2">Selected Deities</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedDeities.length > 0 ? (
                        selectedDeities.map(id => {
                          const deity = deityCategories.find(d => d.id === id);
                          return (
                            <div key={id} className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-lg border border-blue-200">
                              <span className="text-sm">{deity?.emoji}</span>
                              <span className="text-xs font-medium">{deity?.name}</span>
                            </div>
                          );
                        })
                      ) : (
                        <span className="text-sm text-gray-500">None selected</span>
                      )}
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-2">Selected Circuits</p>
                    <div className="space-y-2">
                      {selectedCircuits.length > 0 ? (
                        selectedCircuits.map(circuitId => {
                          const circuit = hinduCircuits.find(c => c.id === circuitId);
                          if (!circuit) return null;
                          return (
                            <div key={circuitId} className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-lg border border-orange-200">
                              <circuit.icon className="w-4 h-4 text-orange-600" />
                              <span className="text-xs font-medium flex-1">{circuit.name}</span>
                              <Badge className="text-[10px] px-2 py-0 bg-orange-100 text-orange-700 border-orange-300">
                                {circuit.tag}
                              </Badge>
                            </div>
                          );
                        })
                      ) : (
                        <span className="text-sm text-gray-500">No circuits selected</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="space-y-3 pt-4 border-t">
            <div className="flex gap-3">
              {tourBuilderStep > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setTourBuilderStep(tourBuilderStep - 1)}
                  className="flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              {tourBuilderStep < 4 ? (
                <Button
                  onClick={() => setTourBuilderStep(tourBuilderStep + 1)}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700"
                >
                  Next Step
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setShowCustomTourBuilder(false);
                    setShowGrokConfirmation(true);
                    setGrokTyping(true);
                    setTimeout(() => setGrokTyping(false), 3000);
                  }}
                  className="flex-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:shadow-xl"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Request Customization with Grok AI →
                </Button>
              )}
            </div>
            
            {/* Save for Later Button - Shows on Step 4 */}
            {tourBuilderStep === 4 && (
              <Button
                variant="outline"
                onClick={() => {
                  // Save the current form data
                  const tourData = {
                    dates: tourDates,
                    groupSize,
                    budget: { min: budgetMin, max: budgetMax },
                    specialNeeds: { seniorCare, medicalAssistance, dietaryPrefs, ritualPrefs },
                    deities: selectedDeities,
                    circuits: selectedCircuits,
                    savedAt: new Date().toISOString()
                  };
                  localStorage.setItem('savedPilgrimageTour', JSON.stringify(tourData));
                  toast.success('✓ Pilgrimage plan saved! You can come back anytime.');
                  setShowCustomTourBuilder(false);
                }}
                className="w-full border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              >
                <Bookmark className="w-4 h-4 mr-2" />
                💾 Save for Later
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* GROK AI CONFIRMATION MODAL */}
      <Dialog open={showGrokConfirmation} onOpenChange={setShowGrokConfirmation}>
        <DialogContent className="max-w-lg">
          <div className="text-center py-4">
            {/* Success Checkmark Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-xl"
            >
              <Check className="w-10 h-10 text-white" strokeWidth={3} />
            </motion.div>

            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
                ✓ Request Received!
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 text-left">
              <p className="text-gray-700 leading-relaxed px-2 text-center">
                Thank you! <span className="font-bold text-purple-600">Grok AI</span> has received your custom pilgrimage 
                request. We'll get back to you within <span className="font-bold">24 hours</span> with:
              </p>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border-2 border-purple-100">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">•</span>
                    </div>
                    <span className="text-sm font-medium text-gray-800">Detailed budget breakdown</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">•</span>
                    </div>
                    <span className="text-sm font-medium text-gray-800">Senior care facility options</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">•</span>
                    </div>
                    <span className="text-sm font-medium text-gray-800">Custom itinerary with temple timings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">•</span>
                    </div>
                    <span className="text-sm font-medium text-gray-800">Travel and accommodation details</span>
                  </li>
                </ul>
              </div>

              {/* AI Typing Indicator */}
              {grokTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 rounded-2xl p-4 flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-semibold mb-1">Grok AI is analyzing your request...</p>
                    <div className="flex gap-1.5">
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                        className="w-2 h-2 bg-yellow-300 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                        className="w-2 h-2 bg-yellow-300 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                        className="w-2 h-2 bg-yellow-300 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => {
                  setShowGrokConfirmation(false);
                  setTourBuilderStep(1);
                  // Reset form
                  setTourDates({ start: '', end: '' });
                  setGroupSize('1-5');
                  setBudgetMin('');
                  setBudgetMax('');
                  setSeniorCare(false);
                  setMedicalAssistance(false);
                  setDietaryPrefs('');
                  setRitualPrefs('');
                  setSelectedDeities([]);
                  setPrefilledDeity(null);
                  toast.success('Your request has been saved! 🙏');
                }}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white h-12 font-bold rounded-xl"
              >
                OK, Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}