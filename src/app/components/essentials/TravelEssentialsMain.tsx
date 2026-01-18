import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Search, Home as HomeIcon, Heart, Bell, User, 
  Hotel, Plane, Car, UtensilsCrossed, Smartphone, Users, 
  PawPrint, Package, Shield, MapPin, ChevronRight, Youtube, 
  ExternalLink, Clock, Wifi, CreditCard, Lock, Baby, 
  Accessibility, Stethoscope, Coffee, MapPinned, Navigation,
  Bike, Zap, MessageCircle
} from 'lucide-react';
import { SelfDriveVehicles } from '@/app/components/essentials/SelfDriveVehicles';
import { VehicleListings } from '@/app/components/essentials/VehicleListings';
import { VehicleBookingForm } from '@/app/components/essentials/VehicleBookingForm';
import { VehicleDetails } from '@/app/components/essentials/VehicleDetails';
import { VehicleComparison } from '@/app/components/essentials/VehicleComparison';

type Screen = 'home' | 'accommodation' | 'transportation' | 'self-drive' | 'vehicle-listings' | 'vehicle-booking' | 'vehicle-details' | 'vehicle-comparison';

export function TravelEssentialsMain() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [activeNavItem, setActiveNavItem] = useState<'home' | 'search' | 'favorites' | 'alerts' | 'profile'>('home');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('');
  const [compareVehicleIds, setCompareVehicleIds] = useState<string[]>([]);

  const handleGoogleSearch = (query: string) => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(`india ${query} travel`)}`, '_blank');
  };

  const handleYouTubeSearch = (query: string) => {
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(`india ${query} travel guide`)}`, '_blank');
  };

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
    setActiveNavItem('home');
  };

  const handleNavigateToListings = () => {
    setCurrentScreen('vehicle-listings');
  };

  const handleNavigateToBooking = (vehicleId?: string) => {
    if (vehicleId) {
      setSelectedVehicleId(vehicleId);
    }
    setCurrentScreen('vehicle-booking');
  };

  const handleSubmitBooking = (bookingData: any) => {
    console.log('Booking submitted:', bookingData);
    // Show success message and navigate back
    alert('✅ Booking submitted successfully! This is a demo - no actual booking was made.');
    setCurrentScreen('home');
  };

  const handleAddToComparison = (vehicleId: string) => {
    if (!compareVehicleIds.includes(vehicleId)) {
      setCompareVehicleIds([...compareVehicleIds, vehicleId]);
    }
  };

  const handleRemoveFromComparison = (vehicleId: string) => {
    setCompareVehicleIds(compareVehicleIds.filter(id => id !== vehicleId));
  };

  const handleNavigateToComparison = () => {
    setCurrentScreen('vehicle-comparison');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <AnimatePresence mode="wait">
        {currentScreen === 'home' && <HomeScreen key="home" onNavigate={navigateToScreen} onGoogleSearch={handleGoogleSearch} onYouTubeSearch={handleYouTubeSearch} />}
        {currentScreen === 'accommodation' && <AccommodationScreen key="accommodation" onBack={() => setCurrentScreen('home')} onGoogleSearch={handleGoogleSearch} onYouTubeSearch={handleYouTubeSearch} />}
        {currentScreen === 'transportation' && <TransportationScreen key="transportation" onBack={() => setCurrentScreen('home')} onGoogleSearch={handleGoogleSearch} onYouTubeSearch={handleYouTubeSearch} />}
        {currentScreen === 'self-drive' && (
          <SelfDriveVehicles 
            key="self-drive" 
            onBack={() => setCurrentScreen('home')} 
            onNavigateToListings={handleNavigateToListings}
            onNavigateToBooking={handleNavigateToBooking}
            onAddToComparison={handleAddToComparison}
            onRemoveFromComparison={handleRemoveFromComparison}
            onNavigateToComparison={handleNavigateToComparison}
          />
        )}
        {currentScreen === 'vehicle-listings' && (
          <VehicleListings 
            key="vehicle-listings" 
            onBack={() => setCurrentScreen('self-drive')}
            onSelectVehicle={(vehicleId) => handleNavigateToBooking(vehicleId)}
            onViewDetails={(vehicleId) => {
              setSelectedVehicleId(vehicleId);
              setCurrentScreen('vehicle-details');
            }}
            onCompareVehicles={(vehicleIds) => {
              setCompareVehicleIds(vehicleIds);
              setCurrentScreen('vehicle-comparison');
            }}
          />
        )}
        {currentScreen === 'vehicle-booking' && (
          <VehicleBookingForm 
            key="vehicle-booking" 
            onBack={() => setCurrentScreen('vehicle-listings')}
            onSubmitBooking={handleSubmitBooking}
            selectedVehicle={selectedVehicleId || 'Hyundai Creta'}
          />
        )}
        {currentScreen === 'vehicle-details' && (
          <VehicleDetails 
            key="vehicle-details" 
            onBack={() => setCurrentScreen('vehicle-listings')}
            onBookNow={() => {
              setCurrentScreen('vehicle-booking');
            }}
            vehicleId={selectedVehicleId}
          />
        )}
        {currentScreen === 'vehicle-comparison' && (
          <VehicleComparison 
            key="vehicle-comparison" 
            onBack={() => setCurrentScreen('vehicle-listings')}
            onSelectVehicle={(vehicleId) => {
              setSelectedVehicleId(vehicleId);
              setCurrentScreen('vehicle-details');
            }}
            vehicleIds={compareVehicleIds}
          />
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="max-w-md mx-auto flex items-center justify-around py-2 px-4">
          <NavButton
            icon={HomeIcon}
            label="Home"
            active={activeNavItem === 'home'}
            onClick={() => {
              setActiveNavItem('home');
              setCurrentScreen('home');
            }}
          />
          <NavButton
            icon={Search}
            label="Search"
            active={activeNavItem === 'search'}
            onClick={() => {
              setActiveNavItem('search');
              handleGoogleSearch('travel essentials');
            }}
          />
          <div className="relative">
            <button className="w-14 h-14 -mt-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-xl">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </button>
          </div>
          <NavButton
            icon={Bell}
            label="Alerts"
            active={activeNavItem === 'alerts'}
            onClick={() => setActiveNavItem('alerts')}
          />
          <NavButton
            icon={User}
            label="Profile"
            active={activeNavItem === 'profile'}
            onClick={() => setActiveNavItem('profile')}
          />
        </div>
      </div>

      {/* Floating Support Button */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl z-40 hover:scale-110 transition-transform">
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
          3
        </span>
      </button>
    </div>
  );
}

function NavButton({ icon: Icon, label, active, onClick }: { icon: any; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 transition-colors ${
        active ? 'text-purple-600' : 'text-gray-400'
      }`}
    >
      <Icon className="w-6 h-6" />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

// HOME SCREEN
function HomeScreen({ 
  onNavigate, 
  onGoogleSearch, 
  onYouTubeSearch 
}: { 
  onNavigate: (screen: Screen) => void; 
  onGoogleSearch: (query: string) => void;
  onYouTubeSearch: (query: string) => void;
}) {
  const categories = [
    { 
      id: 'accommodation', 
      icon: Hotel, 
      title: 'Accommodation', 
      description: 'Hotels, resorts, stays',
      gradient: 'from-purple-400 to-purple-600', 
      screen: 'accommodation' as Screen 
    },
    { 
      id: 'transportation', 
      icon: Plane, 
      title: 'Transportation', 
      description: 'Flights, trains, buses',
      gradient: 'from-cyan-400 to-blue-500', 
      screen: 'transportation' as Screen 
    },
    { 
      id: 'self-drive', 
      icon: Car, 
      title: 'Self Drive Vehicles', 
      description: 'Rent cars, bikes, scooters',
      gradient: 'from-yellow-400 to-orange-500', 
      screen: 'self-drive' as Screen,
      isNew: true
    },
    { 
      id: 'activities', 
      icon: UtensilsCrossed, 
      title: 'Activities', 
      description: 'Tours, dining, experiences',
      gradient: 'from-pink-400 to-pink-600' 
    },
    { 
      id: 'personal-assistance', 
      icon: Users, 
      title: 'Personal Assistance', 
      description: 'Guides, support, concierge',
      gradient: 'from-indigo-400 to-purple-600' 
    },
    { 
      id: 'digital-tools', 
      icon: Smartphone, 
      title: 'Digital Tools', 
      description: 'eSIM, insurance, safety',
      gradient: 'from-teal-400 to-cyan-500' 
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-24 pt-4 px-6 max-w-md mx-auto"
    >
      {/* Header Card */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl mb-6 border border-white/50">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-900">9:41</span>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            <div className="w-2 h-2 rounded-full bg-gray-900"></div>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-1">Travel Essentials</h1>
        <p className="text-sm text-gray-600 mb-4">Everything you need for a seamless journey</p>
        
        {/* Search Bar with Google Integration */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Browse Google for destinations..."
            className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => onGoogleSearch('destinations')}
            readOnly
          />
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => category.screen ? onNavigate(category.screen) : null}
            className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all border border-white/50 text-left relative"
          >
            {/* NEW Badge */}
            {category.isNew && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-lg">
                NEW
              </div>
            )}
            
            <div className={`w-14 h-14 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center mb-3 shadow-lg`}>
              <category.icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">{category.title}</h3>
            <p className="text-xs text-gray-500">{category.description}</p>
          </motion.button>
        ))}
      </div>

      {/* Google & YouTube Discovery Section */}
      <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-3xl p-5 border-2 border-orange-300 shadow-xl">
        <p className="text-xs font-bold text-gray-800 mb-3 text-center">
          🔍 Discover Real Travel Services
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onGoogleSearch('travel essentials india')}
            className="bg-white border-2 border-blue-400 text-blue-700 px-4 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors shadow-md"
          >
            <ExternalLink className="w-4 h-4" />
            Google Search
          </button>
          <button
            onClick={() => onYouTubeSearch('travel essentials india')}
            className="bg-red-600 text-white px-4 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-md"
          >
            <Youtube className="w-4 h-4" />
            YouTube Browse
          </button>
        </div>
      </div>

      {/* Info Card */}
      <div className="mt-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-4 border border-indigo-200">
        <p className="text-xs text-gray-700 text-center">
          ℹ️ All services are <strong>admin-managed placeholders</strong>. Use Google Search and YouTube to discover real providers.
        </p>
      </div>
    </motion.div>
  );
}

// ACCOMMODATION SCREEN
function AccommodationScreen({ 
  onBack, 
  onGoogleSearch, 
  onYouTubeSearch 
}: { 
  onBack: () => void; 
  onGoogleSearch: (query: string) => void;
  onYouTubeSearch: (query: string) => void;
}) {
  const accommodations = [
    {
      icon: Hotel,
      title: 'Admin-Added Hotel Reservations',
      description: 'Admin-verified hotels worldwide with instant confirmation',
      price: '$$ - $$$',
      period: 'Per Night',
      buttonText: 'Browse Options',
      buttonColor: 'bg-orange-500 hover:bg-orange-600',
      gradient: 'from-cyan-400 to-blue-500'
    },
    {
      icon: HomeIcon,
      title: 'Admin-Added Vacation Rentals',
      description: 'Admin-curated apartments and homes',
      price: '$$',
      period: 'Per Night',
      buttonText: 'Browse Options',
      buttonColor: 'bg-blue-500 hover:bg-blue-600',
      gradient: 'from-pink-400 to-rose-500'
    },
    {
      icon: Hotel,
      title: 'Admin-Added Serviced Apartments',
      description: 'Admin-selected hotels with hotel amenities included',
      price: '$$ - $$$',
      period: 'Per Night',
      buttonText: 'Browse Options',
      buttonColor: 'bg-orange-500 hover:bg-orange-600',
      gradient: 'from-teal-400 to-cyan-500'
    },
    {
      icon: Hotel,
      title: 'Admin-Added Budget & Backpacker Stays',
      description: 'Affordable hostels and budget accommodations',
      price: '$',
      period: 'Per Night',
      buttonText: 'Browse Options',
      buttonColor: 'bg-blue-500 hover:bg-blue-600',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Hotel,
      title: 'Admin-Added Luxury & Boutique Stays',
      description: 'Premium properties and exclusive boutique rooms',
      price: '$$$',
      period: 'Per Night',
      buttonText: 'Explore',
      buttonColor: 'bg-orange-500 hover:bg-orange-600',
      gradient: 'from-pink-400 to-purple-500'
    },
    {
      icon: Users,
      title: 'Admin-Added Special Requests',
      description: 'Pet-friendly, accessible, and customized stays',
      price: 'Varies',
      period: 'Per Stay',
      buttonText: 'Request',
      buttonColor: 'bg-purple-500 hover:bg-purple-600',
      gradient: 'from-purple-400 to-indigo-500'
    },
    {
      icon: Stethoscope,
      title: 'Admin-Added Senior-Friendly Stays',
      description: 'Stays with special care facilities',
      price: '$$ - $$$',
      period: 'Per Night',
      buttonText: 'Browse Options',
      buttonColor: 'bg-orange-500 hover:bg-orange-600',
      gradient: 'from-teal-400 to-cyan-500'
    },
    {
      icon: Clock,
      title: 'Admin-Added Early Check-in / Late Check-out',
      description: 'Flexible timing for your convenience',
      price: '$',
      period: 'Add-on',
      buttonText: 'Add Service',
      buttonColor: 'bg-blue-500 hover:bg-blue-600',
      gradient: 'from-cyan-400 to-blue-500'
    },
    {
      icon: Smartphone,
      title: 'Admin-Added NFC Digital Keys',
      description: 'Contactless room access with digital lock',
      price: 'Free',
      period: '',
      buttonText: 'Learn More',
      buttonColor: 'bg-blue-500 hover:bg-blue-600',
      gradient: 'from-purple-400 to-indigo-500'
    },
    {
      icon: MapPin,
      title: 'Admin-Added Price Watch',
      description: 'Get alerts when prices drop for your destination',
      price: 'Free',
      period: '',
      buttonText: 'Enable',
      buttonColor: 'bg-orange-500 hover:bg-orange-600',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Package,
      title: 'Admin-Added Baggage Forwarding',
      description: 'Send luggage directly to your accommodation',
      price: '$$ - $$$',
      period: 'Per Item',
      buttonText: 'Browse Options',
      buttonColor: 'bg-blue-500 hover:bg-blue-600',
      gradient: 'from-pink-400 to-rose-500'
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="pb-24 max-w-md mx-auto bg-gradient-to-b from-cyan-50 to-blue-100 min-h-screen"
    >
      {/* Header with Image Thumbnails */}
      <div className="relative bg-gradient-to-br from-cyan-400 to-blue-500 px-6 pt-4 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <span className="text-sm font-medium text-white">9:41</span>
        </div>

        {/* Thumbnail Preview */}
        <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-24 h-32 bg-white/20 backdrop-blur-sm rounded-xl flex-shrink-0 border border-white/30"></div>
          ))}
        </div>

        <h1 className="text-2xl font-bold text-white mb-4">Accommodation</h1>
      </div>

      {/* Services List */}
      <div className="px-6 py-4 space-y-4">
        {accommodations.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-3xl p-4 shadow-lg hover:shadow-xl transition-all border border-gray-100"
          >
            <div className="flex gap-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-sm text-gray-900">{item.title}</h3>
                  <div className="flex gap-2 flex-shrink-0">
                    <button className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                      <ExternalLink className="w-3 h-3 text-gray-600" />
                    </button>
                    <button className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                      <MapPin className="w-3 h-3 text-gray-600" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-3">{item.description}</p>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{item.price}</p>
                    {item.period && <p className="text-xs text-gray-500">{item.period}</p>}
                  </div>
                  <button className={`${item.buttonColor} text-white px-5 py-2 rounded-xl text-xs font-bold shadow-md transition-colors`}>
                    {item.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Discovery Section */}
        <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-3xl p-5 border-2 border-orange-300 shadow-xl mt-6">
          <p className="text-xs font-bold text-gray-800 mb-3 text-center">
            🔍 Discover Real Accommodation Options
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onGoogleSearch('accommodation hotels india')}
              className="bg-white border-2 border-blue-400 text-blue-700 px-4 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors shadow-md"
            >
              <ExternalLink className="w-4 h-4" />
              Google Search
            </button>
            <button
              onClick={() => onYouTubeSearch('hotel reviews india')}
              className="bg-red-600 text-white px-4 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-md"
            >
              <Youtube className="w-4 h-4" />
              YouTube Reviews
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl p-4 border border-cyan-200 mt-4">
          <p className="text-xs text-gray-700 text-center">
            ℹ️ <em>Private Vacation Homes, Villas, Cottages available with exclusive amenities</em>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// TRANSPORTATION SCREEN
function TransportationScreen({ 
  onBack, 
  onGoogleSearch, 
  onYouTubeSearch 
}: { 
  onBack: () => void; 
  onGoogleSearch: (query: string) => void;
  onYouTubeSearch: (query: string) => void;
}) {
  const transportOptions = [
    {
      icon: Plane,
      title: 'Admin-Added Airport Transfers',
      description: 'Safe & reliable pickups and drops to/from airport',
      price: '$$ - $$$',
      period: 'Per Trip',
      buttonText: 'Browse Options',
      buttonColor: 'bg-orange-500 hover:bg-orange-600',
      gradient: 'from-yellow-400 to-orange-500',
      badge: null
    },
    {
      icon: Car,
      title: 'Admin-Added Local Transport',
      description: 'Taxis and cabs for city travel',
      price: '$ - $$',
      period: 'Per Ride',
      buttonText: 'Browse Options',
      buttonColor: 'bg-blue-500 hover:bg-blue-600',
      gradient: 'from-cyan-400 to-blue-500',
      badge: null
    },
    {
      icon: Navigation,
      title: 'Admin-Added Intercity / Outstation',
      description: 'Long-distance travel between cities and states',
      price: '$$ - $$$',
      period: 'Per Trip',
      buttonText: 'Browse Options',
      buttonColor: 'bg-blue-500 hover:bg-blue-600',
      gradient: 'from-purple-400 to-indigo-500',
      badge: null
    },
    {
      icon: Accessibility,
      title: 'Admin-Added Specialized Travel',
      description: 'Wheelchair accessible and assistant travel services',
      price: '$$ - $$$',
      period: 'Per Trip',
      buttonText: 'Browse Options',
      buttonColor: 'bg-orange-500 hover:bg-orange-600',
      gradient: 'from-teal-400 to-cyan-500',
      badge: null
    },
    {
      icon: Zap,
      title: 'Admin-Added Eco-Rides (EV)',
      description: 'Electric vehicles for sustainable travel',
      price: '$ - $$',
      period: 'Per Trip',
      buttonText: 'Browse Options',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      gradient: 'from-green-400 to-emerald-500',
      badge: { text: 'Eco', color: 'bg-green-500' }
    },
    {
      icon: Users,
      title: 'Admin-Added Biometric Fast-Track',
      description: 'Skip queues with biometric verification at stations',
      price: '$',
      period: 'Per Use',
      buttonText: 'Activate',
      buttonColor: 'bg-blue-500 hover:bg-blue-600',
      gradient: 'from-purple-400 to-pink-500',
      badge: null
    },
    {
      icon: Package,
      title: 'Admin-Added Carbon Offset Credits',
      description: 'Neutralize your travel carbon footprint',
      price: '$ - $$',
      period: 'Per Trip',
      buttonText: 'Purchase',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      gradient: 'from-green-400 to-teal-500',
      badge: { text: 'Eco', color: 'bg-green-500' }
    },
    {
      icon: MapPinned,
      title: 'Admin-Added Multi-Modal Syncing',
      description: 'Seamlessly connect flights, trains, and local transport',
      price: 'Free',
      period: 'Service',
      buttonText: 'Connect',
      buttonColor: 'bg-blue-500 hover:bg-blue-600',
      gradient: 'from-blue-400 to-indigo-500',
      badge: null
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="pb-24 max-w-md mx-auto bg-gradient-to-b from-blue-50 via-green-50 to-cyan-50 min-h-screen"
    >
      {/* Header with Hero Image */}
      <div className="relative h-36 bg-gradient-to-br from-blue-500 to-cyan-600 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="relative px-6 pt-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="w-10 h-10 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex gap-2">
              <button className="w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Bell className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-white drop-shadow-lg">Transportation</h1>
          <p className="text-sm text-white/90 mt-1">Admin-managed travel options</p>
        </div>
      </div>

      {/* Services List */}
      <div className="px-6 py-4 space-y-4">
        {transportOptions.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-3xl p-4 shadow-lg hover:shadow-xl transition-all border border-gray-100"
          >
            <div className="flex gap-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-gray-900">{item.title}</h3>
                    {item.badge && (
                      <span className={`${item.badge.color} text-white text-[10px] px-2 py-0.5 rounded-full font-bold`}>
                        {item.badge.text}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                      <ExternalLink className="w-3 h-3 text-gray-600" />
                    </button>
                    <button className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                      <MapPin className="w-3 h-3 text-gray-600" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-3">{item.description}</p>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{item.price}</p>
                    {item.period && <p className="text-xs text-gray-500">{item.period}</p>}
                  </div>
                  <button className={`${item.buttonColor} text-white px-5 py-2 rounded-xl text-xs font-bold shadow-md transition-colors`}>
                    {item.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Discovery Section */}
        <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-3xl p-5 border-2 border-orange-300 shadow-xl mt-6">
          <p className="text-xs font-bold text-gray-800 mb-3 text-center">
            🔍 Discover Real Transportation Options
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onGoogleSearch('transportation services india')}
              className="bg-white border-2 border-blue-400 text-blue-700 px-4 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors shadow-md"
            >
              <ExternalLink className="w-4 h-4" />
              Google Maps
            </button>
            <button
              onClick={() => onYouTubeSearch('travel routes india')}
              className="bg-red-600 text-white px-4 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-md"
            >
              <Youtube className="w-4 h-4" />
              Route Videos
            </button>
          </div>
        </div>

        {/* Eco Footer */}
        <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-4 border border-green-200 mt-4">
          <p className="text-xs text-gray-700 text-center">
            🌱 <strong>Choose Eco-Rides and Carbon Offset to travel sustainably</strong>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// SELF-DRIVE VEHICLES SCREEN
function SelfDriveScreen({ 
  onBack, 
  onGoogleSearch, 
  onYouTubeSearch 
}: { 
  onBack: () => void; 
  onGoogleSearch: (query: string) => void;
  onYouTubeSearch: (query: string) => void;
}) {
  const vehicleCategories = [
    {
      category: 'Cars',
      icon: Car,
      iconBg: 'from-yellow-400 to-orange-500',
      viewAllColor: 'text-orange-600',
      items: [
        {
          title: 'Compact Cars',
          subtitle: 'Admin-Added Model A, Model B',
          tags: [{ text: '4 Seats', color: 'bg-orange-100 text-orange-700' }, { text: 'Manual', color: 'bg-gray-100 text-gray-700' }],
          price: '$$ - $$$',
          period: 'Per Day'
        },
        {
          title: 'Sedan',
          subtitle: 'Admin-Added Model C, Model D',
          tags: [{ text: 'AC', color: 'bg-blue-100 text-blue-700' }, { text: '5 Seats', color: 'bg-orange-100 text-orange-700' }],
          price: '$$ - $$$',
          period: 'Per Day'
        }
      ]
    },
    {
      category: 'Bikes',
      icon: Bike,
      iconBg: 'from-orange-400 to-red-500',
      viewAllColor: 'text-orange-600',
      items: [
        {
          title: 'Royal Enfield Models',
          subtitle: 'Admin-Added Classic, Himalayan, Meteor',
          tags: [{ text: 'Touring Ready', color: 'bg-orange-100 text-orange-700' }, { text: 'Insurance', color: 'bg-green-100 text-green-700' }],
          price: '$$ - $$$',
          period: 'Per Day'
        },
        {
          title: 'Touring Bikes',
          subtitle: 'Admin-Added Model X, Model Y',
          tags: [{ text: 'Long Range', color: 'bg-blue-100 text-blue-700' }, { text: 'Safety Gear', color: 'bg-green-100 text-green-700' }],
          price: '$$ - $$$',
          period: 'Per Day'
        }
      ]
    },
    {
      category: 'Scooters',
      icon: Bike,
      iconBg: 'from-green-400 to-emerald-500',
      viewAllColor: 'text-orange-600',
      items: [
        {
          title: 'Electric Scooters',
          subtitle: 'Admin-Added EV Model 1, EV Model 2',
          tags: [{ text: 'Eco-Friendly', color: 'bg-green-100 text-green-700' }, { text: 'Low Cost', color: 'bg-yellow-100 text-yellow-700' }],
          price: '$ - $$',
          period: 'Per Day'
        },
        {
          title: 'Petrol Scooters',
          subtitle: 'Admin-Added Model P, Model Q',
          tags: [{ text: 'Easy Ride', color: 'bg-blue-100 text-blue-700' }, { text: 'City Use', color: 'bg-gray-100 text-gray-700' }],
          price: '$ - $$',
          period: 'Per Day'
        }
      ]
    },
    {
      category: 'Camper Vans',
      icon: Car,
      iconBg: 'from-yellow-400 to-amber-600',
      viewAllColor: 'text-orange-600',
      items: [
        {
          title: 'Compact Campers',
          subtitle: 'Admin-Added Van Model 1, Van Model 2',
          tags: [{ text: 'Sleeps 2-4', color: 'bg-orange-100 text-orange-700' }, { text: 'Basic Amenities', color: 'bg-blue-100 text-blue-700' }],
          price: '$$$',
          period: 'Per Day'
        },
        {
          title: 'Luxury RVs',
          subtitle: 'Admin-Added Luxury Model 1, Luxury Model 2',
          tags: [{ text: 'Sleeps 4-6', color: 'bg-orange-100 text-orange-700' }, { text: 'Premium', color: 'bg-purple-100 text-purple-700' }],
          price: '$$$+',
          period: 'Per Day'
        }
      ]
    }
  ];

  const infoCards = [
    {
      icon: Shield,
      title: 'Admin-Added Insurance Included',
      description: 'All rentals include comprehensive insurance coverage',
      bgColor: 'from-orange-50 to-yellow-50',
      borderColor: 'border-orange-200'
    },
    {
      icon: Zap,
      title: 'Admin-Added Electric Options Available',
      description: 'Choose eco-friendly EVs for sustainable travel',
      bgColor: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200'
    },
    {
      icon: MapPinned,
      title: 'Admin-Added 24/7 Roadside Assistance',
      description: 'Support available anytime during your rental',
      bgColor: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="pb-24 max-w-md mx-auto bg-gradient-to-b from-orange-50 via-yellow-50 to-amber-50 min-h-screen"
    >
      {/* Header with Hero Image */}
      <div className="relative h-36 bg-gradient-to-br from-amber-600 to-orange-700 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMyIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>
        
        <div className="relative px-6 pt-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="w-10 h-10 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex gap-2">
              <button className="w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-white drop-shadow-lg">Self-Drive Vehicles</h1>
          
          {/* Search Field */}
          <div className="mt-3 relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search Google for vehicle locations..."
              className="w-full pl-10 pr-4 py-2 bg-white/90 backdrop-blur-sm border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => onGoogleSearch('vehicle rental locations india')}
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Vehicle Categories */}
      <div className="px-6 py-4 space-y-6">
        {vehicleCategories.map((category, catIndex) => (
          <motion.div
            key={catIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: catIndex * 0.1 }}
            className="bg-white rounded-3xl p-5 shadow-lg border border-gray-100"
          >
            {/* Category Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${category.iconBg} rounded-xl flex items-center justify-center shadow-md`}>
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">{category.category}</h2>
              </div>
              <button className={`${category.viewAllColor} text-sm font-bold flex items-center gap-1`}>
                View All
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Vehicle Items */}
            <div className="space-y-3">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 border border-gray-100">
                  <h3 className="font-bold text-sm text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-600 mb-2">{item.subtitle}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className={`${tag.color} text-[10px] px-2 py-1 rounded-lg font-semibold`}>
                        {tag.text}
                      </span>
                    ))}
                  </div>

                  {/* Price and Button */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{item.price}</p>
                      <p className="text-xs text-gray-500">{item.period}</p>
                    </div>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-md transition-colors">
                      View All
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Info Cards */}
        <div className="space-y-3">
          {infoCards.map((card, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${card.bgColor} rounded-2xl p-4 border ${card.borderColor}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <card.icon className="w-5 h-5 text-gray-700" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-gray-900 mb-1">{card.title}</h3>
                  <p className="text-xs text-gray-700">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Discovery Section */}
        <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-3xl p-5 border-2 border-orange-300 shadow-xl mt-6">
          <p className="text-xs font-bold text-gray-800 mb-3 text-center">
            🔍 Discover Real Vehicle Rental Options
          </p>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <button
              onClick={() => onGoogleSearch('vehicle rental india')}
              className="bg-white border-2 border-blue-400 text-blue-700 px-4 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors shadow-md"
            >
              <ExternalLink className="w-4 h-4" />
              Google Search
            </button>
            <button
              onClick={() => onYouTubeSearch('vehicle tours reviews india')}
              className="bg-red-600 text-white px-4 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-md"
            >
              <Youtube className="w-4 h-4" />
              Vehicle Reviews
            </button>
          </div>
          <p className="text-xs text-gray-600 text-center italic">
            All models shown are admin-added placeholders
          </p>
        </div>
      </div>
    </motion.div>
  );
}