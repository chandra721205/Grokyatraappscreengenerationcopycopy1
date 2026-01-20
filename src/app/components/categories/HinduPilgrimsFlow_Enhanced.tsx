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
  Phone,
  Stethoscope,
  Waves,
  Wind,
  Mountain,
  Leaf,
  Home,
  PlaneTakeoff,
  Train,
  Bus,
  Car,
  User,
  UserPlus,
  Briefcase,
  GraduationCap,
  Building,
  Tag,
  Percent,
  Receipt,
  FileText,
  ChevronUp,
  Navigation,
  Compass,
  Camera,
  CircleDot,
  Share2,
  Download,
  Plus,
  Minus,
  X,
  AlertCircle,
  CheckCircle2,
  Package,
  Wallet,
  CreditCard,
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
// HINDU PILGRIMS FLOW – ENHANCED HIGH-FIDELITY
// ========================================
//
// 🕉️ DIVINE AESTHETIC SYSTEM
// Colors: Sacred Saffron (#FF9933), Deep Blue (#000080), Divine Gold (#FFD700)
// Typography: Elegant, spiritual, accessible
// Components: High-fidelity, admin-editable, beautiful
//
// 📋 COMPLETE FEATURES:
// 1. ✅ Hindu Pilgrimage Explorer (Discovery Screen)
// 2. ✅ Attraction & Facility Detail Screen
// 3. ✅ Advanced Discount & Concession Portal
// 4. ✅ Sacred Journey Booking Flow (End-to-End)
// 5. ✅ Google/YouTube Browse with Interest Tracking
// 6. ✅ Multi-Age Facility Matrix
// 7. ✅ Professional Assistance (Coordinators, Medical Staff)
// 8. ✅ Dynamic Itinerary Generation
// 9. ✅ Post-Trip Feedback System
//
// ========================================

type FlowScreen = 
  | 'explorer'           // Discovery screen with all circuits
  | 'circuit-detail'     // Detail view for specific circuit
  | 'temple-detail'      // Individual temple/site detail
  | 'discount-portal'    // Discount & concession browsing
  | 'booking-step1'      // Destination selection
  | 'booking-step2'      // Transport selection
  | 'booking-step3'      // Service appointments
  | 'booking-step4'      // Summary & itinerary
  | 'feedback';          // Post-trip feedback

type HinduCircuit = 
  | 'jyotirlinga'
  | 'divya-desam'
  | 'pancha-bhoota'
  | 'char-dham'
  | 'shakti-peetha'
  | 'navagraha';

interface HinduPilgrimsFlowProps {
  onBack: () => void;
}

// Sacred Circuits Data - Enhanced with all details
const sacredCircuits = [
  {
    id: 'jyotirlinga' as HinduCircuit,
    emoji: '🕉️',
    icon: Flame,
    name: '12 Jyotirlingas',
    deity: 'Lord Shiva',
    subtitle: 'Sacred Shiva Shrines',
    description: '[Admin: 12 sacred Shiva temples across India representing divine light]',
    state: '[Admin: Multiple States]',
    difficulty: 'Moderate',
    gradient: 'from-orange-500 via-red-500 to-pink-600',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    borderColor: 'border-orange-200',
    tag: 'MOST SACRED',
    tagBg: 'bg-orange-100',
    tagText: 'text-orange-700',
    isFeatured: true,
    totalSites: 12,
    avgDuration: '15-30 days',
    bestSeason: 'Oct-Mar',
  },
  {
    id: 'divya-desam' as HinduCircuit,
    emoji: '🏛️',
    icon: BookOpen,
    name: '108 Divya Desams',
    deity: 'Lord Vishnu',
    subtitle: 'Vishnu Temples',
    description: '[Admin: 108 holy Vishnu temples glorified by Alvars]',
    state: '[Admin: Tamil Nadu, Kerala, Andhra]',
    difficulty: 'Easy to Moderate',
    gradient: 'from-blue-500 via-indigo-500 to-purple-600',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-200',
    tag: '108 TEMPLES',
    tagBg: 'bg-blue-100',
    tagText: 'text-blue-700',
    isFeatured: false,
    totalSites: 108,
    avgDuration: '30-60 days',
    bestSeason: 'Year-round',
  },
  {
    id: 'pancha-bhoota' as HinduCircuit,
    emoji: '🔥',
    icon: Waves,
    name: 'Pancha Bhoota Sthalams',
    deity: 'Shiva - 5 Elements',
    subtitle: '5 Elements Circuit',
    description: '[Admin: 5 Shiva temples representing Earth, Water, Fire, Air, Space]',
    state: '[Admin: Tamil Nadu]',
    difficulty: 'Easy',
    gradient: 'from-purple-500 via-pink-500 to-rose-600',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    borderColor: 'border-purple-200',
    tag: '5 ELEMENTS',
    tagBg: 'bg-purple-100',
    tagText: 'text-purple-700',
    isFeatured: false,
    totalSites: 5,
    avgDuration: '3-5 days',
    bestSeason: 'Oct-Mar',
  },
  {
    id: 'char-dham' as HinduCircuit,
    emoji: '⛰️',
    icon: Mountain,
    name: 'Char Dham Yatra',
    deity: 'Vishnu & Shiva',
    subtitle: 'Four Divine Abodes',
    description: '[Admin: 4 Himalayan pilgrimage sites - Badrinath, Kedarnath, Gangotri, Yamunotri]',
    state: '[Admin: Uttarakhand]',
    difficulty: 'Challenging',
    gradient: 'from-green-500 via-emerald-500 to-teal-600',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    borderColor: 'border-green-200',
    tag: '4 DHAMS',
    tagBg: 'bg-green-100',
    tagText: 'text-green-700',
    isFeatured: true,
    totalSites: 4,
    avgDuration: '10-15 days',
    bestSeason: 'May-Oct',
  },
  {
    id: 'shakti-peetha' as HinduCircuit,
    emoji: '🌺',
    icon: Flower2,
    name: '51 Shakti Peethas',
    deity: 'Goddess Shakti',
    subtitle: 'Divine Feminine Shrines',
    description: '[Admin: 51 sacred Goddess temples across the subcontinent]',
    state: '[Admin: Pan-India & Neighboring Countries]',
    difficulty: 'Moderate',
    gradient: 'from-pink-500 via-rose-500 to-red-600',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    borderColor: 'border-pink-200',
    tag: '51 SACRED SITES',
    tagBg: 'bg-pink-100',
    tagText: 'text-pink-700',
    isFeatured: false,
    totalSites: 51,
    avgDuration: '20-40 days',
    bestSeason: 'Oct-Mar',
  },
  {
    id: 'navagraha' as HinduCircuit,
    emoji: '☀️',
    icon: Sun,
    name: 'Navagraha Temples',
    deity: 'Nine Planets',
    subtitle: 'Nine Planets Circuit',
    description: '[Admin: 9 temples dedicated to nine planetary deities]',
    state: '[Admin: Tamil Nadu]',
    difficulty: 'Easy',
    gradient: 'from-yellow-500 via-orange-500 to-amber-600',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    borderColor: 'border-yellow-200',
    tag: '9 PLANETS',
    tagBg: 'bg-yellow-100',
    tagText: 'text-yellow-700',
    isFeatured: false,
    totalSites: 9,
    avgDuration: '2-3 days',
    bestSeason: 'Year-round',
  },
];

// Discount categories
const discountCategories = [
  { id: 'student', name: 'Student Discounts', icon: GraduationCap, color: 'blue', desc: '[Admin: Up to 30% off]' },
  { id: 'railway', name: 'Railway Concessions', icon: Train, color: 'green', desc: '[Admin: Senior citizen benefits]' },
  { id: 'government', name: 'Govt Employee Schemes', icon: Building, color: 'purple', desc: '[Admin: Special rates]' },
  { id: 'transport', name: 'State Transport Benefits', icon: Bus, color: 'orange', desc: '[Admin: ST bus discounts]' },
  { id: 'group', name: 'Customized Group Discounts', icon: Users, color: 'pink', desc: '[Admin: Organization-based]' },
];

export function HinduPilgrimsFlow({ onBack }: HinduPilgrimsFlowProps) {
  const [currentScreen, setCurrentScreen] = useState<FlowScreen>('explorer');
  const [selectedCircuit, setSelectedCircuit] = useState<HinduCircuit | null>(null);
  const [notedInterests, setNotedInterests] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    difficulty: 'all',
    state: 'all',
    deity: 'all',
  });

  // Booking flow states
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [reachingTransport, setReachingTransport] = useState('');
  const [localTransport, setLocalTransport] = useState('');
  const [tourCoordinator, setTourCoordinator] = useState('');
  const [medicalStaff, setMedicalStaff] = useState('');
  const [tripDuration, setTripDuration] = useState('');
  const [groupSize, setGroupSize] = useState('');
  const [budgetRange, setBudgetRange] = useState('');

  // Discount portal states
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);
  const [organizationId, setOrganizationId] = useState('');
  
  // Feedback states
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleGoogleBrowse = (query: string) => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query + ' temple pilgrimage india')}`, '_blank');
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
        description: 'You\'ll receive alerts when special offers match your preferences',
        icon: '🔔',
      });
    }
  };

  const handleCircuitClick = (circuitId: HinduCircuit) => {
    setSelectedCircuit(circuitId);
    setCurrentScreen('circuit-detail');
  };

  const handleStartBooking = () => {
    setCurrentScreen('booking-step1');
  };

  const handleBack = () => {
    if (currentScreen === 'explorer') {
      onBack();
    } else if (currentScreen === 'circuit-detail' || currentScreen === 'temple-detail' || currentScreen === 'discount-portal') {
      setCurrentScreen('explorer');
    } else if (currentScreen === 'booking-step1') {
      setCurrentScreen('explorer');
    } else if (currentScreen === 'booking-step2') {
      setCurrentScreen('booking-step1');
    } else if (currentScreen === 'booking-step3') {
      setCurrentScreen('booking-step2');
    } else if (currentScreen === 'booking-step4') {
      setCurrentScreen('booking-step3');
    } else if (currentScreen === 'feedback') {
      setCurrentScreen('explorer');
    } else {
      setCurrentScreen('explorer');
    }
  };

  // Route to screens
  if (currentScreen === 'circuit-detail' && selectedCircuit) {
    const circuit = sacredCircuits.find(c => c.id === selectedCircuit)!;
    return (
      <CircuitDetailScreen
        circuit={circuit}
        onBack={handleBack}
        onGoogleBrowse={handleGoogleBrowse}
        onYouTubeBrowse={handleYouTubeBrowse}
        onNoteInterest={handleNoteInterest}
        onStartBooking={handleStartBooking}
        onViewTemple={() => setCurrentScreen('temple-detail')}
      />
    );
  }

  if (currentScreen === 'temple-detail') {
    return (
      <TempleDetailScreen
        onBack={handleBack}
        onGoogleBrowse={handleGoogleBrowse}
        onYouTubeBrowse={handleYouTubeBrowse}
        onStartBooking={handleStartBooking}
      />
    );
  }

  if (currentScreen === 'discount-portal') {
    return (
      <DiscountPortalScreen
        onBack={handleBack}
        selectedDiscounts={selectedDiscounts}
        setSelectedDiscounts={setSelectedDiscounts}
        organizationId={organizationId}
        setOrganizationId={setOrganizationId}
        onContinue={() => setCurrentScreen('booking-step1')}
      />
    );
  }

  if (currentScreen === 'booking-step1') {
    return (
      <BookingStep1Screen
        onBack={handleBack}
        selectedDestinations={selectedDestinations}
        setSelectedDestinations={setSelectedDestinations}
        onContinue={() => setCurrentScreen('booking-step2')}
      />
    );
  }

  if (currentScreen === 'booking-step2') {
    return (
      <BookingStep2Screen
        onBack={handleBack}
        reachingTransport={reachingTransport}
        setReachingTransport={setReachingTransport}
        localTransport={localTransport}
        setLocalTransport={setLocalTransport}
        onContinue={() => setCurrentScreen('booking-step3')}
      />
    );
  }

  if (currentScreen === 'booking-step3') {
    return (
      <BookingStep3Screen
        onBack={handleBack}
        tourCoordinator={tourCoordinator}
        setTourCoordinator={setTourCoordinator}
        medicalStaff={medicalStaff}
        setMedicalStaff={setMedicalStaff}
        onContinue={() => setCurrentScreen('booking-step4')}
      />
    );
  }

  if (currentScreen === 'booking-step4') {
    return (
      <BookingStep4Screen
        onBack={handleBack}
        selectedDestinations={selectedDestinations}
        reachingTransport={reachingTransport}
        localTransport={localTransport}
        tourCoordinator={tourCoordinator}
        medicalStaff={medicalStaff}
        onComplete={() => setCurrentScreen('feedback')}
      />
    );
  }

  if (currentScreen === 'feedback') {
    return (
      <FeedbackScreen
        onBack={handleBack}
        rating={rating}
        setRating={setRating}
        feedback={feedback}
        setFeedback={setFeedback}
        onSubmit={() => {
          toast.success('Thank you for your feedback! 🙏');
          setCurrentScreen('explorer');
        }}
      />
    );
  }

  // MAIN EXPLORER SCREEN
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-white pb-20">
      {/* Divine Header */}
      <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 px-6 pt-8 pb-10 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-300 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-white text-sm font-semibold hover:bg-white/20 px-4 py-2.5 rounded-2xl transition-all backdrop-blur-sm border border-white/30"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Journey
            </button>
            <button className="flex items-center gap-2 bg-white/20 rounded-2xl px-4 py-2.5 backdrop-blur-sm border border-white/30">
              <Map className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-semibold">[Journey Map]</span>
            </button>
          </div>

          {/* Title Section */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 bg-white/20 rounded-[2rem] flex items-center justify-center text-6xl mx-auto mb-5 backdrop-blur-md shadow-2xl border-2 border-white/30"
            >
              🕉️
            </motion.div>
            <h1 className="text-white text-4xl font-bold mb-3 tracking-tight drop-shadow-lg">Hindu Pilgrimage Explorer</h1>
            <p className="text-white/95 text-lg font-medium mb-1">Sacred Circuits of Divine India</p>
            <p className="text-white/80 text-sm">Explore the beauty and history of ancient temples</p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search circuits, temples, deities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-14 pr-14 h-14 rounded-2xl bg-white border-0 shadow-xl text-base"
            />
            <Filter className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="px-6 -mt-3">
        {/* Quick Actions - Browse Discounts */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-5 mb-6 shadow-2xl border-2 border-blue-400">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Tag className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Browse Discounts</h3>
                <p className="text-white/90 text-sm">Student, Railway, Govt schemes & more</p>
              </div>
            </div>
            <Button
              onClick={() => setCurrentScreen('discount-portal')}
              className="bg-white text-blue-700 hover:bg-blue-50 rounded-xl h-11 px-6 font-bold shadow-lg"
            >
              View All
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Sacred Circuits Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Sacred Circuits</h2>
              <p className="text-sm text-gray-600">6 divine pilgrimage paths across India</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                6 Circuits
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {sacredCircuits.map((circuit, index) => (
              <motion.div
                key={circuit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleCircuitClick(circuit.id)}
                className="group cursor-pointer"
              >
                <div
                  className={`${
                    circuit.isFeatured
                      ? `bg-gradient-to-br ${circuit.gradient} shadow-2xl`
                      : 'bg-white border-2 border-gray-200 shadow-xl hover:shadow-2xl'
                  } rounded-[2rem] p-6 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden`}
                >
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-40 h-40 opacity-10">
                    <circuit.icon className="w-full h-full" />
                  </div>

                  <div className="relative">
                    {/* Header Row */}
                    <div className="flex items-start justify-between mb-5">
                      {/* Icon */}
                      <div className={`w-16 h-16 ${
                        circuit.isFeatured ? 'bg-white/20 border-white/30' : circuit.iconBg
                      } border-2 rounded-[1.25rem] flex items-center justify-center shadow-xl`}>
                        <circuit.icon className={`w-8 h-8 ${
                          circuit.isFeatured ? 'text-white' : circuit.iconColor
                        }`} />
                      </div>

                      {/* Browse Icons */}
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleGoogleBrowse(circuit.name);
                          }}
                          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all shadow-md ${
                            circuit.isFeatured ? 'bg-white/20 hover:bg-white/30' : 'bg-blue-50 hover:bg-blue-100'
                          }`}
                        >
                          <Globe className={`w-5 h-5 ${circuit.isFeatured ? 'text-white' : 'text-blue-600'}`} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleYouTubeBrowse(circuit.name);
                          }}
                          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all shadow-md ${
                            circuit.isFeatured ? 'bg-white/20 hover:bg-white/30' : 'bg-red-50 hover:bg-red-100'
                          }`}
                        >
                          <Youtube className={`w-5 h-5 ${circuit.isFeatured ? 'text-white' : 'text-red-600'}`} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNoteInterest(circuit.name);
                          }}
                          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all shadow-md ${
                            notedInterests.includes(circuit.name)
                              ? 'bg-pink-100'
                              : circuit.isFeatured ? 'bg-white/20 hover:bg-white/30' : 'bg-gray-50 hover:bg-gray-100'
                          }`}
                        >
                          <Heart className={`w-5 h-5 ${
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
                    
                    <p className={`text-base mb-1 font-semibold ${
                      circuit.isFeatured ? 'text-white/95' : 'text-orange-600'
                    }`}>
                      {circuit.subtitle}
                    </p>

                    <p className={`text-sm mb-5 leading-relaxed ${
                      circuit.isFeatured ? 'text-white/85' : 'text-gray-600'
                    }`}>
                      {circuit.description}
                    </p>

                    {/* Tags Row */}
                    <div className="flex flex-wrap gap-2 mb-5">
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
                          Deity: {circuit.deity}
                        </span>
                      </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      <div className={`${
                        circuit.isFeatured ? 'bg-white/10' : 'bg-gray-50'
                      } rounded-xl p-3`}>
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
                      } rounded-xl p-3`}>
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
                      } rounded-xl p-3`}>
                        <CircleDot className={`w-4 h-4 mb-1 ${circuit.isFeatured ? 'text-white/80' : 'text-gray-500'}`} />
                        <p className={`text-xs font-semibold ${circuit.isFeatured ? 'text-white/70' : 'text-gray-600'}`}>
                          Sites
                        </p>
                        <p className={`text-xs font-bold ${circuit.isFeatured ? 'text-white' : 'text-gray-900'}`}>
                          {circuit.totalSites}
                        </p>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Button
                      className={`w-full rounded-xl h-12 font-bold text-sm shadow-lg ${
                        circuit.isFeatured
                          ? 'bg-white text-orange-600 hover:bg-gray-100'
                          : 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700'
                      }`}
                    >
                      Explore Circuit
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-5">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm text-indigo-900 leading-relaxed font-medium">
                <strong className="block mb-2 text-base">Explore the Beauty and History</strong>
                Click Google or YouTube icons to browse temples and note your interests. We'll notify you when budget deals and special offers match your preferences for these sacred circuits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// CIRCUIT DETAIL SCREEN
// ========================================
interface CircuitDetailScreenProps {
  circuit: typeof sacredCircuits[0];
  onBack: () => void;
  onGoogleBrowse: (query: string) => void;
  onYouTubeBrowse: (query: string) => void;
  onNoteInterest: (interest: string) => void;
  onStartBooking: () => void;
  onViewTemple: () => void;
}

function CircuitDetailScreen({
  circuit,
  onBack,
  onGoogleBrowse,
  onYouTubeBrowse,
  onNoteInterest,
  onStartBooking,
  onViewTemple,
}: CircuitDetailScreenProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Mock temple data for the circuit
  const temples = Array.from({ length: Math.min(circuit.totalSites, 5) }, (_, i) => ({
    id: i + 1,
    name: `[Admin: Temple ${i + 1} Name]`,
    location: `[Admin: City, State]`,
    deity: circuit.deity,
    description: `[Admin: Temple ${i + 1} description]`,
    accessibility: i % 2 === 0,
    medicalSupport: i % 3 === 0,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header */}
      <div className={`bg-gradient-to-br ${circuit.gradient} px-6 pt-8 pb-8 rounded-b-[2.5rem] shadow-2xl`}>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white text-sm font-semibold mb-6 hover:bg-white/20 px-4 py-2.5 rounded-2xl transition-all backdrop-blur-sm border border-white/30"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Explorer
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-white/20 rounded-[1.5rem] flex items-center justify-center backdrop-blur-md shadow-2xl border-2 border-white/30">
            <circuit.icon className="w-11 h-11 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-white text-3xl font-bold mb-1">{circuit.name}</h1>
            <p className="text-white/95 text-base font-medium">{circuit.subtitle}</p>
          </div>
        </div>

        {/* Browse Actions */}
        <div className="grid grid-cols-3 gap-3">
          <Button
            onClick={() => onYouTubeBrowse(circuit.name)}
            className="bg-white hover:bg-gray-100 text-red-600 rounded-xl h-11 font-bold shadow-lg"
          >
            <Play className="w-4 h-4 mr-2" />
            Videos
          </Button>
          <Button
            onClick={() => onGoogleBrowse(circuit.name)}
            className="bg-white hover:bg-gray-100 text-blue-600 rounded-xl h-11 font-bold shadow-lg"
          >
            <Globe className="w-4 h-4 mr-2" />
            Explore
          </Button>
          <Button
            onClick={() => onNoteInterest(circuit.name)}
            className="bg-white hover:bg-gray-100 text-pink-600 rounded-xl h-11 font-bold shadow-lg"
          >
            <Heart className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      <div className="px-6 pt-6">
        {/* Circuit Overview */}
        <div className="bg-white rounded-3xl p-6 shadow-xl mb-6 border border-gray-100">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-900">
            <BookOpen className="w-5 h-5 text-orange-600" />
            Circuit Overview
          </h3>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-2xl border border-orange-100">
              <p className="text-sm text-gray-700 leading-relaxed">
                {circuit.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 p-4 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <p className="font-bold text-sm text-gray-800">Duration</p>
                </div>
                <p className="text-xs text-gray-600">{circuit.avgDuration}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <p className="font-bold text-sm text-gray-800">Best Season</p>
                </div>
                <p className="text-xs text-gray-600">{circuit.bestSeason}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sacred Sites List */}
        <div className="bg-white rounded-3xl p-6 shadow-xl mb-6 border border-gray-100">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-900">
            <MapPin className="w-5 h-5 text-orange-600" />
            Sacred Sites ({circuit.totalSites})
          </h3>

          <div className="space-y-3">
            {temples.map((temple) => (
              <div
                key={temple.id}
                onClick={onViewTemple}
                className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-2xl border-2 border-gray-200 hover:border-orange-300 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-gray-900 mb-1">{temple.name}</h4>
                    <p className="text-xs text-gray-600 mb-2">{temple.location}</p>
                    <div className="flex gap-2">
                      {temple.accessibility && (
                        <Badge className="bg-blue-100 text-blue-700 text-[10px]">
                          <Accessibility className="w-3 h-3 mr-1" />
                          Accessible
                        </Badge>
                      )}
                      {temple.medicalSupport && (
                        <Badge className="bg-green-100 text-green-700 text-[10px]">
                          <Stethoscope className="w-3 h-3 mr-1" />
                          Medical
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onGoogleBrowse(temple.name);
                      }}
                      className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center hover:bg-blue-100 transition-all"
                    >
                      <Globe className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onYouTubeBrowse(temple.name);
                      }}
                      className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center hover:bg-red-100 transition-all"
                    >
                      <Youtube className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
              </div>
            ))}
            
            {circuit.totalSites > 5 && (
              <button className="w-full py-3 bg-orange-50 text-orange-700 font-semibold text-sm rounded-2xl hover:bg-orange-100 transition-all">
                View All {circuit.totalSites} Sites
                <ChevronDown className="w-4 h-4 inline-block ml-2" />
              </button>
            )}
          </div>
        </div>

        {/* Start Booking CTA */}
        <Button
          onClick={onStartBooking}
          className="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 text-white h-14 font-bold text-base shadow-2xl mb-4"
        >
          Start Sacred Journey Booking
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>

        {/* Info */}
        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-orange-900 leading-relaxed font-medium">
              Click on any temple to view detailed information about accessibility, facilities, and amenities. Browse on Google/YouTube to explore the beauty and history of each sacred site.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Continue in next part due to length...
