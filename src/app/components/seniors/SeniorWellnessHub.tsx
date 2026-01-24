import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Search, 
  Heart, 
  Shield, 
  Users, 
  MapPin, 
  Star, 
  ChevronRight, 
  Clock, 
  Stethoscope,
  Hospital,
  Bell,
  Zap,
  Check,
  Mountain,
  Leaf,
  Sparkles,
  Filter,
  Plus,
  CreditCard,
  CheckCircle,
  Phone,
  AlertCircle,
  Activity,
  Accessibility,
  UserCheck,
  Calendar,
  Edit3,
  ChevronDown,
  Info,
  Thermometer,
  Wind,
  Sunrise,
  CloudRain,
  Sun,
} from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { PersonalizedDealsAlert } from '@/app/components/shared/PersonalizedDealsAlert';
import { 
  HealthSafetyScreen, 
  CaretakerDetailScreen, 
  TransportPlanner 
} from '@/app/components/seniors/SeniorTourismFlows';

interface SeniorWellnessHubProps {
  onBack: () => void;
}

type MainView = 'home' | 'devotional' | 'nature' | 'wellness';
type BookingStep = 'list' | 'details' | 'safety-care' | 'transport' | 'summary' | 'payment' | 'confirmed';

export function SeniorWellnessHub({ onBack }: SeniorWellnessHubProps) {
  const [mainView, setMainView] = useState<MainView>('home');
  const [bookingStep, setBookingStep] = useState<BookingStep>('list');
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedCareServices, setSelectedCareServices] = useState<string[]>([]);
  const [selectedTransport, setSelectedTransport] = useState<string | null>(null);

  // Route to appropriate view
  if (mainView === 'devotional') {
    if (bookingStep === 'list') {
      return <DevotionalYatrasPage onBack={() => setMainView('home')} onSelectPackage={(pkg) => { setSelectedPackage(pkg); setBookingStep('details'); }} />;
    }
    if (bookingStep === 'details') {
      return <DevotionalDetailsPage onBack={() => setBookingStep('list')} onContinue={() => setBookingStep('safety-care')} packageName={selectedPackage || ''} />;
    }
    if (bookingStep === 'safety-care') {
      return <HealthSafetyCareStep onBack={() => setBookingStep('details')} onContinue={(services) => { setSelectedCareServices(services); setBookingStep('transport'); }} subCategory="devotional" />;
    }
    if (bookingStep === 'transport') {
      return <TransportPlannerStep onBack={() => setBookingStep('safety-care')} onContinue={(transport) => { setSelectedTransport(transport); setBookingStep('summary'); }} subCategory="devotional" />;
    }
    if (bookingStep === 'summary') {
      return <BookingSummaryPage onBack={() => setBookingStep('transport')} onContinue={() => setBookingStep('payment')} packageName={selectedPackage || ''} careServices={selectedCareServices} transport={selectedTransport || ''} subCategory="devotional" />;
    }
    if (bookingStep === 'payment') {
      return <PaymentPage onBack={() => setBookingStep('summary')} onComplete={() => setBookingStep('confirmed')} subCategory="devotional" />;
    }
    if (bookingStep === 'confirmed') {
      return <ConfirmationPage onBackToHome={() => { setMainView('home'); setBookingStep('list'); }} />;
    }
  }

  if (mainView === 'nature') {
    if (bookingStep === 'list') {
      return <RelaxationNaturePage onBack={() => setMainView('home')} onSelectPackage={(pkg) => { setSelectedPackage(pkg); setBookingStep('details'); }} />;
    }
    if (bookingStep === 'details') {
      return <NatureDetailsPage onBack={() => setBookingStep('list')} onContinue={() => setBookingStep('safety-care')} packageName={selectedPackage || ''} />;
    }
    if (bookingStep === 'safety-care') {
      return <HealthSafetyCareStep onBack={() => setBookingStep('details')} onContinue={(services) => { setSelectedCareServices(services); setBookingStep('transport'); }} subCategory="nature" />;
    }
    if (bookingStep === 'transport') {
      return <TransportPlannerStep onBack={() => setBookingStep('safety-care')} onContinue={(transport) => { setSelectedTransport(transport); setBookingStep('summary'); }} subCategory="nature" />;
    }
    if (bookingStep === 'summary') {
      return <BookingSummaryPage onBack={() => setBookingStep('transport')} onContinue={() => setBookingStep('payment')} packageName={selectedPackage || ''} careServices={selectedCareServices} transport={selectedTransport || ''} subCategory="nature" />;
    }
    if (bookingStep === 'payment') {
      return <PaymentPage onBack={() => setBookingStep('summary')} onComplete={() => setBookingStep('confirmed')} subCategory="nature" />;
    }
    if (bookingStep === 'confirmed') {
      return <ConfirmationPage onBackToHome={() => { setMainView('home'); setBookingStep('list'); }} />;
    }
  }

  if (mainView === 'wellness') {
    if (bookingStep === 'list') {
      return <WellnessRetreatsPage onBack={() => setMainView('home')} onSelectPackage={(pkg) => { setSelectedPackage(pkg); setBookingStep('details'); }} />;
    }
    if (bookingStep === 'details') {
      return <WellnessDetailsPage onBack={() => setBookingStep('list')} onContinue={() => setBookingStep('safety-care')} packageName={selectedPackage || ''} />;
    }
    if (bookingStep === 'safety-care') {
      return <HealthSafetyCareStep onBack={() => setBookingStep('details')} onContinue={(services) => { setSelectedCareServices(services); setBookingStep('transport'); }} subCategory="wellness" />;
    }
    if (bookingStep === 'transport') {
      return <TransportPlannerStep onBack={() => setBookingStep('safety-care')} onContinue={(transport) => { setSelectedTransport(transport); setBookingStep('summary'); }} subCategory="wellness" />;
    }
    if (bookingStep === 'summary') {
      return <BookingSummaryPage onBack={() => setBookingStep('transport')} onContinue={() => setBookingStep('payment')} packageName={selectedPackage || ''} careServices={selectedCareServices} transport={selectedTransport || ''} subCategory="wellness" />;
    }
    if (bookingStep === 'payment') {
      return <PaymentPage onBack={() => setBookingStep('summary')} onComplete={() => setBookingStep('confirmed')} subCategory="wellness" />;
    }
    if (bookingStep === 'confirmed') {
      return <ConfirmationPage onBackToHome={() => { setMainView('home'); setBookingStep('list'); }} />;
    }
  }

  // Home/Landing
  return <SeniorTourismHome onBack={onBack} onSelectCategory={(cat) => { setMainView(cat); setBookingStep('list'); }} />;
}

// ========================================
// HOME PAGE
// ========================================

interface SeniorTourismHomeProps {
  onBack: () => void;
  onSelectCategory: (category: MainView) => void;
}

function SeniorTourismHome({ onBack, onSelectCategory }: SeniorTourismHomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 pt-12 pb-8 rounded-b-[2rem]">
        <button onClick={onBack} className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-6">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>

        <h1 className="text-white text-4xl font-bold mb-2">Senior Tourism</h1>
        <p className="text-white/90 text-lg">Accessible journeys designed for comfort & safety</p>
      </div>

      <div className="px-6 -mt-4 pb-8">
        <Card className="bg-white rounded-3xl p-6 shadow-xl mb-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Journey Type</h2>
          
          <div className="space-y-5">
            {/* Devotional Yatras */}
            <motion.button
              onClick={() => onSelectCategory('devotional')}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-300 rounded-3xl p-6 hover:shadow-xl transition-all text-left"
            >
              <div className="flex items-start gap-5">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Mountain className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">🙏 Senior Devotional Yatras</h3>
                  <p className="text-base text-gray-600 mb-3">Accessible Spiritual Journeys</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-orange-200 text-orange-800 rounded-full text-sm font-semibold">Elevator Access</span>
                    <span className="px-3 py-1 bg-orange-200 text-orange-800 rounded-full text-sm font-semibold">Wheelchair-Friendly</span>
                    <span className="px-3 py-1 bg-orange-200 text-orange-800 rounded-full text-sm font-semibold">VIP Queue</span>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400 flex-shrink-0 mt-2" />
              </div>
            </motion.button>

            {/* Relaxation & Nature */}
            <motion.button
              onClick={() => onSelectCategory('nature')}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-3xl p-6 hover:shadow-xl transition-all text-left"
            >
              <div className="flex items-start gap-5">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">🌿 Senior Relaxation & Nature</h3>
                  <p className="text-base text-gray-600 mb-3">Gentle Scenic Escapes</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-semibold">Flat Terrain</span>
                    <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-semibold">Vehicle Access</span>
                    <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-semibold">Low Crowd</span>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400 flex-shrink-0 mt-2" />
              </div>
            </motion.button>

            {/* Wellness Retreats */}
            <motion.button
              onClick={() => onSelectCategory('wellness')}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-3xl p-6 hover:shadow-xl transition-all text-left"
            >
              <div className="flex items-start gap-5">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">💆 Wellness Retreats for Seniors</h3>
                  <p className="text-base text-gray-600 mb-3">Holistic Healing Stays</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm font-semibold">Doctor Supervised</span>
                    <span className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm font-semibold">Ayurveda</span>
                    <span className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm font-semibold">Gentle Yoga</span>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400 flex-shrink-0 mt-2" />
              </div>
            </motion.button>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ========================================
// SUB-CATEGORY 1: DEVOTIONAL YATRAS
// ========================================

interface PackageListProps {
  onBack: () => void;
  onSelectPackage: (pkg: string) => void;
}

function DevotionalYatrasPage({ onBack, onSelectPackage }: PackageListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filters = ['Elevator Access', 'Wheelchair-Friendly', 'Short Walk', 'Seating Available', 'Battery Car'];

  const destinations = [
    { 
      name: '[Destination Name]', 
      location: 'Location, State',
      accessibilityScore: 92,
      features: ['Direct elevator to sanctum', 'On-site medical center', 'VIP senior queue', 'Wheelchair pathways'],
      duration: '5 Days',
      price: 35000,
    },
    { 
      name: '[Destination Name]', 
      location: 'Location, State',
      accessibilityScore: 88,
      features: ['Battery car access', 'Dedicated senior rest area', 'Premium darshan timing', 'Medical assistance'],
      duration: '7 Days',
      price: 42000,
    },
    { 
      name: '[Destination Name]', 
      location: 'Location, State',
      accessibilityScore: 95,
      features: ['Elevator to all floors', 'Western toilets', 'Air-conditioned waiting', 'Nurse on standby'],
      duration: '4 Days',
      price: 28000,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 px-6 pt-12 pb-6 rounded-b-[2rem]">
        <button onClick={onBack} className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-6">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>

        <h1 className="text-white text-3xl font-bold mb-2">Senior Devotional Yatras</h1>
        <p className="text-white/90 text-base mb-4">Accessible Spiritual Journeys</p>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by Temple / District / Deity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-full bg-white border-0 shadow-lg text-base"
          />
        </div>

        {/* Accessibility Filter Bar */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                if (selectedFilters.includes(filter)) {
                  setSelectedFilters(selectedFilters.filter(f => f !== filter));
                } else {
                  setSelectedFilters([...selectedFilters, filter]);
                }
              }}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-semibold transition-all ${
                selectedFilters.includes(filter)
                  ? 'bg-white text-orange-700 shadow-md'
                  : 'bg-white/30 text-white hover:bg-white/50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 -mt-4 pb-8">
        <div className="space-y-4">
          {destinations.map((dest, i) => (
            <Card key={i} className="bg-white rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all">
              {/* Accessibility Score Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`px-4 py-2 rounded-full ${
                    dest.accessibilityScore >= 90 ? 'bg-green-100' : dest.accessibilityScore >= 80 ? 'bg-yellow-100' : 'bg-orange-100'
                  }`}>
                    <span className={`font-bold text-lg ${
                      dest.accessibilityScore >= 90 ? 'text-green-700' : dest.accessibilityScore >= 80 ? 'text-yellow-700' : 'text-orange-700'
                    }`}>
                      Accessibility Score: {dest.accessibilityScore}%
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{dest.duration}</p>
                  <p className="text-2xl font-bold text-orange-600">₹{dest.price.toLocaleString()}</p>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2">{dest.name}</h3>
              <div className="flex items-center gap-2 mb-4 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-base">{dest.location}</span>
              </div>

              {/* Senior-Friendly Features */}
              <div className="bg-orange-50 rounded-2xl p-4 mb-4">
                <p className="font-bold text-base mb-3 text-gray-900">Senior-Friendly Features</p>
                <div className="space-y-2">
                  {dest.features.map((feature, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => onSelectPackage(dest.name)}
                className="w-full h-12 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 hover:opacity-90 text-base font-semibold"
              >
                View Full Details <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function DevotionalDetailsPage({ onBack, onContinue, packageName }: { onBack: () => void; onContinue: () => void; packageName: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 px-6 pt-12 pb-8 rounded-b-[2rem]">
        <button onClick={onBack} className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-6">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white text-3xl font-bold mb-2">{packageName}</h1>
        <p className="text-white/90 text-base">Complete Itinerary Details</p>
      </div>

      <div className="px-6 -mt-4 pb-24">
        <Card className="bg-white rounded-3xl p-6 shadow-xl mb-6">
          <h2 className="text-2xl font-bold mb-5">Complete Itinerary</h2>
          <div className="space-y-4">
            {[
              { day: 'Day 1', title: 'Arrival & Check-in', desc: 'AC transport from station, settle in hotel' },
              { day: 'Day 2', title: 'Temple Visit (Morning)', desc: 'VIP darshan with elevator access' },
              { day: 'Day 3', title: 'Local Sightseeing', desc: 'Scenic drive, no walking required' },
              { day: 'Day 4', title: 'Rest Day', desc: 'Relax at hotel, optional spa' },
              { day: 'Day 5', title: 'Departure', desc: 'Check-out & drop to station' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 bg-orange-50 rounded-2xl">
                <div className="w-16 h-16 bg-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">{item.day}</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="fixed bottom-0 left-0 right-0 max-w-[375px] mx-auto bg-white border-t-4 border-orange-500 px-6 py-4 shadow-2xl">
          <Button
            onClick={onContinue}
            className="w-full h-14 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 hover:opacity-90 text-lg font-bold"
          >
            Select This Yatra <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// ========================================
// SUB-CATEGORY 2: RELAXATION & NATURE
// ========================================

function RelaxationNaturePage({ onBack, onSelectPackage }: PackageListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filters = ['Flat Terrain Only', 'Vehicle Access to Viewpoint', 'Garden/Lake Side', 'Low Crowd', 'Cool Climate'];

  const destinations = [
    {
      name: '[Hill Station Name]',
      location: 'Location, State',
      comfortScore: 'Leisurely',
      highlights: ['Scenic drive with multiple stops', 'Lakeside sitting area', 'Oxygen-rich environment', 'Accessible viewpoints'],
      duration: '6 Days',
      price: 38000,
    },
    {
      name: '[Garden/Park Name]',
      location: 'Location, State',
      comfortScore: 'Very Easy',
      highlights: ['Flat garden walks', 'Benches every 50m', 'Covered pathways', 'Cool breeze area'],
      duration: '4 Days',
      price: 25000,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 pt-12 pb-6 rounded-b-[2rem]">
        <button onClick={onBack} className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-6">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>

        <h1 className="text-white text-3xl font-bold mb-2">Senior Relaxation & Nature</h1>
        <p className="text-white/90 text-base mb-4">Gentle Scenic Escapes</p>

        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by hill station, garden, or backwater..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-full bg-white border-0 shadow-lg text-base"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                if (selectedFilters.includes(filter)) {
                  setSelectedFilters(selectedFilters.filter(f => f !== filter));
                } else {
                  setSelectedFilters([...selectedFilters, filter]);
                }
              }}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-semibold transition-all ${
                selectedFilters.includes(filter)
                  ? 'bg-white text-green-700 shadow-md'
                  : 'bg-white/30 text-white hover:bg-white/50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 -mt-4 pb-8">
        <div className="space-y-4">
          {destinations.map((dest, i) => (
            <Card key={i} className="bg-white rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="px-4 py-2 bg-green-100 rounded-full">
                  <span className="font-bold text-base text-green-700">Pace: {dest.comfortScore}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{dest.duration}</p>
                  <p className="text-2xl font-bold text-green-600">₹{dest.price.toLocaleString()}</p>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2">{dest.name}</h3>
              <div className="flex items-center gap-2 mb-4 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-base">{dest.location}</span>
              </div>

              <div className="bg-green-50 rounded-2xl p-4 mb-4">
                <p className="font-bold text-base mb-3 text-gray-900">Relaxation Highlights</p>
                <div className="space-y-2">
                  {dest.highlights.map((highlight, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => onSelectPackage(dest.name)}
                className="w-full h-12 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90 text-base font-semibold"
              >
                View Itinerary <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function NatureDetailsPage({ onBack, onContinue, packageName }: { onBack: () => void; onContinue: () => void; packageName: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 pt-12 pb-8 rounded-b-[2rem]">
        <button onClick={onBack} className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-6">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white text-3xl font-bold mb-2">{packageName}</h1>
        <p className="text-white/90 text-base">Gentle Nature Experience</p>
      </div>

      <div className="px-6 -mt-4 pb-24">
        <Card className="bg-white rounded-3xl p-6 shadow-xl mb-6">
          <h2 className="text-2xl font-bold mb-5">Experience Highlights</h2>
          <div className="space-y-3">
            {[
              'No strenuous walking - all flat terrain',
              'Scenic drive with photo stops every hour',
              'Accessible viewpoints (wheelchair-friendly)',
              'Rest benches every 100 meters',
              'Covered pathways for sun protection',
              'Climate-controlled transport',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-base text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </Card>

        <div className="fixed bottom-0 left-0 right-0 max-w-[375px] mx-auto bg-white border-t-4 border-green-500 px-6 py-4 shadow-2xl">
          <Button
            onClick={onContinue}
            className="w-full h-14 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90 text-lg font-bold"
          >
            Book This Relaxing Getaway <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// ========================================
// SUB-CATEGORY 3: WELLNESS RETREATS
// ========================================

function WellnessRetreatsPage({ onBack, onSelectPackage }: PackageListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filters = ['Doctor Supervised', 'Ayurveda', 'Gentle Yoga', 'Physiotherapy', '7 Days', '14 Days', '21 Days'];

  const retreats = [
    {
      name: '[Retreat Center Name]',
      location: 'Location, State',
      doctorSupervised: true,
      duration: '14 Days',
      therapies: ['Panchakarma', 'Chair Yoga', 'Diet Management', 'Physiotherapy'],
      price: 85000,
    },
    {
      name: '[Wellness Resort Name]',
      location: 'Location, State',
      doctorSupervised: true,
      duration: '21 Days',
      therapies: ['Ayurvedic Massage', 'Meditation', 'Gentle Exercise', 'Nutrition Counseling'],
      price: 120000,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 pt-12 pb-6 rounded-b-[2rem]">
        <button onClick={onBack} className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-6">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>

        <h1 className="text-white text-3xl font-bold mb-2">Wellness Retreats for Seniors</h1>
        <p className="text-white/90 text-base mb-4">Holistic Healing Stays</p>

        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by retreat center, city, or therapy..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-full bg-white border-0 shadow-lg text-base"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                if (selectedFilters.includes(filter)) {
                  setSelectedFilters(selectedFilters.filter(f => f !== filter));
                } else {
                  setSelectedFilters([...selectedFilters, filter]);
                }
              }}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-semibold transition-all ${
                selectedFilters.includes(filter)
                  ? 'bg-white text-purple-700 shadow-md'
                  : 'bg-white/30 text-white hover:bg-white/50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 -mt-4 pb-8">
        <div className="space-y-4">
          {retreats.map((retreat, i) => (
            <Card key={i} className="bg-white rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  {retreat.doctorSupervised && (
                    <div className="px-3 py-1 bg-blue-100 rounded-full flex items-center gap-1">
                      <Stethoscope className="w-4 h-4 text-blue-700" />
                      <span className="text-sm font-bold text-blue-700">Doctor Supervised</span>
                    </div>
                  )}
                  <div className="px-3 py-1 bg-purple-100 rounded-full">
                    <span className="text-sm font-bold text-purple-700">Duration: {retreat.duration}</span>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2">{retreat.name}</h3>
              <div className="flex items-center gap-2 mb-4 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-base">{retreat.location}</span>
              </div>

              <div className="bg-purple-50 rounded-2xl p-4 mb-4">
                <p className="font-bold text-base mb-3 text-gray-900">Therapies Included</p>
                <div className="grid grid-cols-2 gap-2">
                  {retreat.therapies.map((therapy, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{therapy}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Package</p>
                  <p className="text-2xl font-bold text-purple-600">₹{retreat.price.toLocaleString()}</p>
                </div>
                <Button
                  onClick={() => onSelectPackage(retreat.name)}
                  className="h-12 px-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-base font-semibold"
                >
                  View Retreat Details <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function WellnessDetailsPage({ onBack, onContinue, packageName }: { onBack: () => void; onContinue: () => void; packageName: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 pt-12 pb-8 rounded-b-[2rem]">
        <button onClick={onBack} className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-6">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white text-3xl font-bold mb-2">{packageName}</h1>
        <p className="text-white/90 text-base">Comprehensive Wellness Program</p>
      </div>

      <div className="px-6 -mt-4 pb-24">
        <Card className="bg-white rounded-3xl p-6 shadow-xl mb-6">
          <h2 className="text-2xl font-bold mb-5">Daily Schedule</h2>
          <div className="space-y-3">
            {[
              { time: '6:00 AM', activity: 'Gentle Chair Yoga', desc: 'No floor exercises' },
              { time: '8:00 AM', activity: 'Healthy Breakfast', desc: 'Low-salt, diabetic-friendly' },
              { time: '10:00 AM', activity: 'Ayurvedic Therapy Session', desc: 'Knee/back pain treatment' },
              { time: '12:00 PM', activity: 'Doctor Consultation', desc: 'Progress monitoring' },
              { time: '2:00 PM', activity: 'Lunch & Rest', desc: 'Personalized diet plan' },
              { time: '4:00 PM', activity: 'Physiotherapy', desc: 'Gentle exercises' },
              { time: '6:00 PM', activity: 'Meditation Session', desc: 'Stress relief' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-3 bg-purple-50 rounded-xl">
                <div className="w-20 text-center flex-shrink-0">
                  <p className="text-sm font-bold text-purple-700">{item.time}</p>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base mb-1">{item.activity}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="fixed bottom-0 left-0 right-0 max-w-[375px] mx-auto bg-white border-t-4 border-purple-500 px-6 py-4 shadow-2xl">
          <Button
            onClick={onContinue}
            className="w-full h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-lg font-bold"
          >
            Book This Wellness Retreat <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// ========================================
// PHASE 3: HEALTH & SAFETY CARE STEP
// ========================================

interface HealthSafetyCareStepProps {
  onBack: () => void;
  onContinue: (services: string[]) => void;
  subCategory: 'devotional' | 'nature' | 'wellness';
}

function HealthSafetyCareStep({ onBack, onContinue, subCategory }: HealthSafetyCareStepProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const categoryColors = {
    devotional: { from: 'from-orange-600', to: 'to-amber-600' },
    nature: { from: 'from-green-600', to: 'to-emerald-600' },
    wellness: { from: 'from-purple-600', to: 'to-pink-600' },
  };

  const colors = categoryColors[subCategory];

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className={`bg-gradient-to-r ${colors.from} ${colors.to} px-6 pt-12 pb-8 rounded-b-[2rem]`}>
        <button onClick={onBack} className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-6">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white text-3xl font-bold mb-2">Step 3: Customize Your Care & Safety</h1>
        <p className="text-white/90 text-base">Essential protections + optional add-ons</p>
      </div>

      <div className="px-6 -mt-4 pb-8">
        {/* SECTION A: INCLUDED SAFETY */}
        <Card className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-6 shadow-xl mb-6 text-white">
          <h2 className="text-2xl font-bold mb-4">Your Safety Net (Included in all Senior Tours)</h2>
          <div className="space-y-3">
            {[
              { icon: Hospital, text: 'Guaranteed Hospital Proximity (within 15 km)' },
              { icon: Ambulance, text: '24/7 Emergency Evacuation Plan' },
              { icon: Zap, text: 'SOS Alert Button & Live Location Sharing' },
              { icon: Shield, text: 'Onboard Medical Kit (Oxygen, BP Monitor)' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-white/20 backdrop-blur-sm rounded-xl">
                <item.icon className="w-6 h-6 flex-shrink-0" />
                <span className="text-base font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* SECTION B: ADD-ON CARE SERVICES */}
        <Card className="bg-white rounded-3xl p-6 shadow-xl mb-6">
          <h2 className="text-2xl font-bold mb-5">Add Personal Care Services</h2>

          <div className="space-y-4">
            {/* Doctor-on-Tour */}
            <div className={`p-5 rounded-2xl border-2 transition-all ${
              selectedServices.includes('doctor') ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'
            }`}>
              <div className="flex items-start gap-4 mb-3">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Stethoscope className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold">Doctor-on-Tour</h3>
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">RECOMMENDED</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">MBBS doctor accompanies your entire journey</p>
                  <div className="text-2xl font-bold text-blue-600">₹800/day</div>
                </div>
              </div>
              <div className="space-y-1 mb-4 text-sm text-gray-700">
                <p>• Daily health checkups</p>
                <p>• Medicine management & reminders</p>
                <p>• Immediate medical assistance</p>
              </div>
              <Button
                onClick={() => toggleService('doctor')}
                className={`w-full h-12 rounded-full ${
                  selectedServices.includes('doctor')
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {selectedServices.includes('doctor') ? (
                  <><Check className="w-5 h-5 mr-2" /> Selected</>
                ) : (
                  'Select This Service'
                )}
              </Button>
            </div>

            {/* One-on-One Caretaker */}
            <div className={`p-5 rounded-2xl border-2 transition-all ${
              selectedServices.includes('personal-caretaker') ? 'border-purple-600 bg-purple-50' : 'border-gray-200 bg-white'
            }`}>
              <div className="flex items-start gap-4 mb-3">
                <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">One-on-One Caretaker</h3>
                  <p className="text-sm text-gray-600 mb-2">Dedicated personal assistance throughout your trip</p>
                  <div className="text-2xl font-bold text-purple-600">₹1,500/day</div>
                </div>
              </div>
              <div className="space-y-1 mb-4 text-sm text-gray-700">
                <p>• 24/7 dedicated help</p>
                <p>• Mobility aid & walking support</p>
                <p>• Meal & medication assistance</p>
              </div>
              <Button
                onClick={() => toggleService('personal-caretaker')}
                className={`w-full h-12 rounded-full ${
                  selectedServices.includes('personal-caretaker')
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {selectedServices.includes('personal-caretaker') ? (
                  <><Check className="w-5 h-5 mr-2" /> Selected</>
                ) : (
                  'Select This Service'
                )}
              </Button>
            </div>

            {/* Group Caretaker */}
            <div className={`p-5 rounded-2xl border-2 transition-all ${
              selectedServices.includes('group-caretaker') ? 'border-green-600 bg-green-50' : 'border-gray-200 bg-white'
            }`}>
              <div className="flex items-start gap-4 mb-3">
                <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">Group Caretaker</h3>
                  <p className="text-sm text-gray-600 mb-2">Shared care for small groups (4-6 seniors)</p>
                  <div className="text-2xl font-bold text-green-600">₹400/day/person</div>
                </div>
              </div>
              <div className="space-y-1 mb-4 text-sm text-gray-700">
                <p>• Shared care for 4-6 people</p>
                <p>• Basic assistance & coordination</p>
                <p>• Cost-effective option</p>
              </div>
              <Button
                onClick={() => toggleService('group-caretaker')}
                className={`w-full h-12 rounded-full ${
                  selectedServices.includes('group-caretaker')
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {selectedServices.includes('group-caretaker') ? (
                  <><Check className="w-5 h-5 mr-2" /> Selected</>
                ) : (
                  'Select This Service'
                )}
              </Button>
            </div>

            {/* Optional Nurse */}
            <div className={`p-5 rounded-2xl border-2 transition-all ${
              selectedServices.includes('nurse') ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 bg-white'
            }`}>
              <div className="flex items-start gap-4 mb-3">
                <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">Optional Nurse</h3>
                  <p className="text-sm text-gray-600 mb-2">Professional nursing care for medical needs</p>
                  <div className="text-2xl font-bold text-indigo-600">₹1,200/day</div>
                </div>
              </div>
              <div className="space-y-1 mb-4 text-sm text-gray-700">
                <p>• Medical procedures & injections</p>
                <p>• Wound care & dressing</p>
                <p>• Vital signs monitoring</p>
              </div>
              <Button
                onClick={() => toggleService('nurse')}
                className={`w-full h-12 rounded-full ${
                  selectedServices.includes('nurse')
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {selectedServices.includes('nurse') ? (
                  <><Check className="w-5 h-5 mr-2" /> Selected</>
                ) : (
                  'Select This Service'
                )}
              </Button>
            </div>
          </div>
        </Card>

        <Button
          onClick={() => onContinue(selectedServices)}
          className={`w-full h-14 rounded-full bg-gradient-to-r ${colors.from} ${colors.to} hover:opacity-90 text-lg font-bold`}
        >
          Continue to Transport Selection <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}

// ========================================
// PHASE 4: TRANSPORT PLANNER STEP
// ========================================

interface TransportPlannerStepProps {
  onBack: () => void;
  onContinue: (transport: string) => void;
  subCategory: 'devotional' | 'nature' | 'wellness';
}

function TransportPlannerStep({ onBack, onContinue, subCategory }: TransportPlannerStepProps) {
  const [selectedTransport, setSelectedTransport] = useState<string | null>(null);

  const categoryColors = {
    devotional: { from: 'from-orange-600', to: 'to-amber-600' },
    nature: { from: 'from-green-600', to: 'to-emerald-600' },
    wellness: { from: 'from-purple-600', to: 'to-pink-600' },
  };

  const colors = categoryColors[subCategory];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className={`bg-gradient-to-r ${colors.from} ${colors.to} px-6 pt-12 pb-8 rounded-b-[2rem]`}>
        <button onClick={onBack} className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-6">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white text-3xl font-bold mb-2">Step 4: Transport Planner</h1>
        <p className="text-white/90 text-base">Choose senior-friendly transport</p>
      </div>

      <div className="px-6 -mt-4 pb-8">
        {/* AI Recommendation */}
        <Card className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-5 shadow-xl mb-6 text-white">
          <div className="flex items-start gap-3">
            <Sparkles className="w-7 h-7 flex-shrink-0" />
            <div>
              <p className="font-bold text-lg mb-2">AI Recommendation</p>
              <p className="text-base leading-relaxed">
                For temple visits at high altitude, we recommend <strong>Helicopter</strong> to skip the trek and avoid altitude sickness. Comfortable & fast.
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-white rounded-3xl p-6 shadow-xl mb-6">
          <h2 className="text-2xl font-bold mb-5">Select Transport Mode</h2>
          
          <div className="space-y-4">
            {[
              { id: 'helicopter', name: 'Helicopter', desc: 'Skip trek, direct access', icon: '🚁', price: 25000, senior: 'Best for high-altitude temples' },
              { id: 'ac-bus', name: 'AC Comfortable Bus', desc: 'Reclining seats, rest stops', icon: '🚌', price: 3500, senior: 'Frequent breaks, smooth ride' },
              { id: 'train', name: 'Train (AC)', desc: 'Lower berths, accessible toilets', icon: '🚆', price: 4200, senior: 'Spacious, flat boarding' },
              { id: 'private-car', name: 'Private Car', desc: 'Door-to-door, flexible timing', icon: '🚗', price: 8500, senior: 'Personalized stops' },
            ].map((mode) => (
              <motion.button
                key={mode.id}
                onClick={() => setSelectedTransport(mode.id)}
                whileTap={{ scale: 0.98 }}
                className={`w-full p-5 rounded-2xl border-2 transition-all text-left ${
                  selectedTransport === mode.id
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl flex-shrink-0">{mode.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold">{mode.name}</h3>
                      <span className="text-2xl font-bold text-green-600">₹{mode.price.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{mode.desc}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">Senior-friendly: {mode.senior}</span>
                    </div>
                  </div>
                  <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${
                    selectedTransport === mode.id ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'
                  }`}>
                    {selectedTransport === mode.id && <Check className="w-5 h-5 text-white" />}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </Card>

        <Button
          onClick={() => selectedTransport && onContinue(selectedTransport)}
          disabled={!selectedTransport}
          className={`w-full h-14 rounded-full bg-gradient-to-r ${colors.from} ${colors.to} hover:opacity-90 disabled:opacity-50 text-lg font-bold`}
        >
          Continue to Booking Summary <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}

// ========================================
// PHASE 5: FINAL BOOKING SUMMARY
// ========================================

interface BookingSummaryPageProps {
  onBack: () => void;
  onContinue: () => void;
  packageName: string;
  careServices: string[];
  transport: string;
  subCategory: 'devotional' | 'nature' | 'wellness';
}

function BookingSummaryPage({ onBack, onContinue, packageName, careServices, transport, subCategory }: BookingSummaryPageProps) {
  const categoryColors = {
    devotional: { from: 'from-orange-600', to: 'to-amber-600' },
    nature: { from: 'from-green-600', to: 'to-emerald-600' },
    wellness: { from: 'from-purple-600', to: 'to-pink-600' },
  };

  const colors = categoryColors[subCategory];

  const baseCost = 35000;
  const careCosts = {
    'doctor': 5600, // 800 x 7 days
    'personal-caretaker': 10500, // 1500 x 7
    'group-caretaker': 2800, // 400 x 7
    'nurse': 8400, // 1200 x 7
  };

  const transportCosts: Record<string, number> = {
    'helicopter': 25000,
    'ac-bus': 3500,
    'train': 4200,
    'private-car': 8500,
  };

  const totalCareCost = careServices.reduce((sum, service) => sum + (careCosts[service as keyof typeof careCosts] || 0), 0);
  const transportCost = transportCosts[transport] || 0;
  const totalCost = baseCost + totalCareCost + transportCost;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className={`bg-gradient-to-r ${colors.from} ${colors.to} px-6 pt-12 pb-8 rounded-b-[2rem]`}>
        <button onClick={onBack} className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-6">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white text-3xl font-bold mb-2">Booking Summary</h1>
        <p className="text-white/90 text-base">Review your complete package</p>
      </div>

      <div className="px-6 -mt-4 pb-8">
        <Card className="bg-white rounded-3xl p-6 shadow-xl mb-6">
          <h2 className="text-2xl font-bold mb-5">Package Details</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Selected Package</p>
              <p className="font-bold text-lg">{packageName}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Duration</p>
                <p className="font-semibold">7 Days / 6 Nights</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Travelers</p>
                <p className="font-semibold">2 Adults</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-white rounded-3xl p-6 shadow-xl mb-6">
          <h2 className="text-2xl font-bold mb-5">Cost Breakdown</h2>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span className="text-base font-medium">Base Package</span>
              <span className="text-lg font-bold">₹{baseCost.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span className="text-base font-medium">Transport ({transport})</span>
              <span className="text-lg font-bold">₹{transportCost.toLocaleString()}</span>
            </div>

            {careServices.length > 0 && (
              <div className="p-3 bg-blue-50 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-base font-bold">Care Services</span>
                  <span className="text-lg font-bold text-blue-600">₹{totalCareCost.toLocaleString()}</span>
                </div>
                <div className="space-y-1">
                  {careServices.map((service, i) => (
                    <div key={i} className="flex justify-between text-sm text-gray-700">
                      <span>• {service.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                      <span>₹{(careCosts[service as keyof typeof careCosts] || 0).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="h-px bg-gray-300 my-3"></div>

            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-300">
              <span className="text-xl font-bold">Total Amount</span>
              <span className="text-3xl font-bold text-green-600">₹{totalCost.toLocaleString()}</span>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-3xl p-5 shadow-lg mb-6 border-2 border-blue-300">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-blue-700 flex-shrink-0 mt-1" />
            <div>
              <p className="font-bold text-base text-blue-900 mb-1">Included Safety Features</p>
              <p className="text-sm text-blue-800">
                ✓ Hospital proximity guarantee ✓ 24/7 evacuation plan ✓ SOS alert system ✓ Medical kit onboard
              </p>
            </div>
          </div>
        </Card>

        <Button
          onClick={onContinue}
          className={`w-full h-14 rounded-full bg-gradient-to-r ${colors.from} ${colors.to} hover:opacity-90 text-lg font-bold`}
        >
          Proceed to Payment <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}

// ========================================
// PAYMENT & CONFIRMATION
// ========================================

interface PaymentPageProps {
  onBack: () => void;
  onComplete: () => void;
  subCategory: 'devotional' | 'nature' | 'wellness';
}

function PaymentPage({ onBack, onComplete, subCategory }: PaymentPageProps) {
  const categoryColors = {
    devotional: { from: 'from-orange-600', to: 'to-amber-600' },
    nature: { from: 'from-green-600', to: 'to-emerald-600' },
    wellness: { from: 'from-purple-600', to: 'to-pink-600' },
  };

  const colors = categoryColors[subCategory];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className={`bg-gradient-to-r ${colors.from} ${colors.to} px-6 pt-12 pb-8 rounded-b-[2rem]`}>
        <button onClick={onBack} className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-6">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white text-3xl font-bold mb-2">Payment</h1>
        <p className="text-white/90 text-base">Secure payment gateway</p>
      </div>

      <div className="px-6 -mt-4 pb-8">
        <Card className="bg-white rounded-3xl p-6 shadow-xl mb-6">
          <h2 className="text-2xl font-bold mb-5">Select Payment Method</h2>
          <div className="space-y-3">
            {['Credit/Debit Card', 'UPI', 'Net Banking', 'Wallet'].map((method, i) => (
              <button key={i} className="w-full p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all text-left font-semibold text-base">
                {method}
              </button>
            ))}
          </div>
        </Card>

        <Button
          onClick={onComplete}
          className="w-full h-14 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90 text-lg font-bold"
        >
          <CreditCard className="w-5 h-5 mr-2" /> Complete Payment
        </Button>
      </div>
    </div>
  );
}

interface ConfirmationPageProps {
  onBackToHome: () => void;
}

function ConfirmationPage({ onBackToHome }: ConfirmationPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 pt-12 pb-8 rounded-b-[2rem]">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-white text-4xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-white/95 text-lg">Your senior tourism package is secured</p>
        </div>
      </div>

      <div className="px-6 -mt-4 pb-8">
        <Card className="bg-white rounded-3xl p-6 shadow-xl mb-6">
          <div className="text-center mb-6">
            <p className="text-lg text-gray-600 mb-2">Booking ID</p>
            <p className="text-4xl font-bold text-indigo-600">GY-SR-2026-1234</p>
          </div>

          <div className="space-y-3">
            {[
              { icon: CheckCircle, text: 'Confirmation email sent' },
              { icon: Phone, text: 'Support team will call within 24h' },
              { icon: Shield, text: 'Travel insurance activated' },
              { icon: Calendar, text: 'Trip dashboard access granted' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                <item.icon className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-base">{item.text}</span>
              </div>
            ))}
          </div>
        </Card>

        <Button
          onClick={onBackToHome}
          className="w-full h-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-lg font-bold"
        >
          Return to Senior Tourism Home
        </Button>
      </div>
    </div>
  );
}
