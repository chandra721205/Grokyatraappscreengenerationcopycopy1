import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Search, Filter, Star, MapPin, Calendar, Users, 
  ChevronRight, TrendingUp, Sparkles, Globe, Youtube, 
  Heart, Mountain, Activity, Plane, Flame, Sunrise, Utensils, Gift, Bell, BellRing, Bookmark, BookmarkCheck, Waves, Castle, Flower2
} from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { ComboTourPlanner } from '@/app/components/planning/ComboTourPlanner';
import { BeachParadiseScreen, HeritagePalacesScreen, WellnessRetreatsScreen } from '@/app/components/honeymoon/AdminEditableScreensEnhanced';
import { PersonalizedDealsAlert } from '@/app/components/shared/PersonalizedDealsAlert';

type DestinationType = 'hub' | 'hill-station' | 'adventure' | 'international' | 'beach-paradise' | 'heritage-palaces' | 'wellness-retreats';

interface HoneymoonHubProps {
  onBack: () => void;
}

export function HoneymoonHub({ onBack }: HoneymoonHubProps) {
  const [currentScreen, setCurrentScreen] = useState<DestinationType>('hub');
  const [showPlanner, setShowPlanner] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [trackedInterests, setTrackedInterests] = useState<Set<string>>(new Set());
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleGoogleSearch = (customQuery?: string) => {
    const query = customQuery || searchQuery || 'romantic honeymoon destinations india';
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
  };

  const handleYouTubeSearch = (customQuery?: string) => {
    const query = customQuery || searchQuery || 'honeymoon travel destinations india';
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, '_blank');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      setIsSearching(true);
      setTimeout(() => setIsSearching(false), 500);
    }
  };

  const toggleInterestTracking = (packageId: string, packageName: string) => {
    setTrackedInterests(prev => {
      const newSet = new Set(prev);
      if (newSet.has(packageId)) {
        newSet.delete(packageId);
        setNotificationMessage(`Removed "${packageName}" from interest tracking`);
      } else {
        newSet.add(packageId);
        setNotificationMessage(`Added "${packageName}" to interest tracking! You'll receive deal notifications.`);
      }
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      return newSet;
    });
  };

  if (showPlanner) {
    return <ComboTourPlanner onBack={() => setShowPlanner(false)} />;
  }

  // Sub-screen renderers
  if (currentScreen === 'hill-station') {
    return <HillStationRetreats onBack={() => setCurrentScreen('hub')} onGoogleSearch={handleGoogleSearch} onYouTubeSearch={handleYouTubeSearch} />;
  }

  if (currentScreen === 'adventure') {
    return <AdventureRomance onBack={() => setCurrentScreen('hub')} onGoogleSearch={handleGoogleSearch} onYouTubeSearch={handleYouTubeSearch} />;
  }

  if (currentScreen === 'international') {
    return <InternationalEscapes onBack={() => setCurrentScreen('hub')} onGoogleSearch={handleGoogleSearch} onYouTubeSearch={handleYouTubeSearch} />;
  }

  if (currentScreen === 'beach-paradise') {
    return <BeachParadiseScreen onBack={() => setCurrentScreen('hub')} onGoogleSearch={handleGoogleSearch} onYouTubeSearch={handleYouTubeSearch} />;
  }

  if (currentScreen === 'heritage-palaces') {
    return <HeritagePalacesScreen onBack={() => setCurrentScreen('hub')} onGoogleSearch={handleGoogleSearch} onYouTubeSearch={handleYouTubeSearch} />;
  }

  if (currentScreen === 'wellness-retreats') {
    return <WellnessRetreatsScreen onBack={() => setCurrentScreen('hub')} onGoogleSearch={handleGoogleSearch} onYouTubeSearch={handleYouTubeSearch} />;
  }

  // Main Hub Screen
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 px-6 pt-12 pb-8 rounded-b-[2rem]">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-6"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Heart className="w-9 h-9 text-white" />
          </div>
          <div>
            <h1 className="text-white text-3xl font-bold">Honeymoon & Romance</h1>
            <p className="text-white/80 text-sm">Create unforgettable memories together</p>
          </div>
        </div>

        {/* Enhanced Search Bar */}
        <div className="relative mb-3">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search romantic destinations, activities..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-12 pr-12 h-12 rounded-full bg-white border-0 shadow-lg"
            aria-label="Search honeymoon destinations"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <Filter className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Google Search & YouTube Browse Buttons */}
        <div className="flex gap-3 mb-3">
          <Button
            onClick={() => handleGoogleSearch()}
            className="flex-1 bg-white text-blue-600 hover:bg-gray-100 rounded-full h-9 flex items-center justify-center gap-2 text-sm"
          >
            <Globe className="w-4 h-4" />
            Google Search
          </Button>
          <Button
            onClick={() => handleYouTubeSearch()}
            className="flex-1 bg-white text-red-600 hover:bg-gray-100 rounded-full h-9 flex items-center justify-center gap-2 text-sm"
          >
            <Youtube className="w-4 h-4" />
            YouTube
          </Button>
        </div>

        {/* Search hint */}
        <div className="flex items-center gap-2 text-white/70 text-xs">
          <Sparkles className="w-4 h-4" />
          <span>Search interests, then use Google/YouTube to find real destinations</span>
        </div>
      </div>

      <div className="px-6">
        {/* Search Results Indicator */}
        {searchQuery.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 rounded-2xl p-4 -mt-6 mb-6 shadow-md"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {isSearching ? 'Searching...' : `Results for "${searchQuery}"`}
                </p>
                <p className="text-xs text-gray-600">
                  Use Google/YouTube buttons to find real destinations matching your search
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================
            PERSONALIZED DEALS ALERT
            Location: Below category intro, above destinations
            ======================================== */}
        <div className="-mt-6 mb-6">
          <PersonalizedDealsAlert
            category="honeymoon"
            showAdminIndicators={false}
            onSavePreferences={(data) => {
              console.log('Honeymoon deal preferences saved:', data);
              // Backend sync would happen here in production
            }}
            content={{
              heading: '[Admin: Get Romantic Deal Alerts]',
              description: '[Admin: Set your budget for honeymoon packages]',
              budgetPlaceholder: '[Admin: e.g., ₹1,50,000 for 7 nights]',
              notificationText: '[Admin: Notify me of honeymoon & romance deals]',
              buttonLabel: '[Admin: Save Romance Preferences]'
            }}
          />
        </div>

        {/* ROMANTIC DESTINATIONS - New Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Romantic Destinations</h2>
          
          {/* Top 2 Cards */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentScreen('hill-station')}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all"
            >
              <div className="h-32 bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center">
                <Mountain className="w-12 h-12 text-pink-600" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-sm mb-1">Hill Station Retreats</h3>
                <p className="text-xs text-gray-600">Cozy mountain escapes</p>
              </div>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentScreen('adventure')}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all"
            >
              <div className="h-32 bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center">
                <Activity className="w-12 h-12 text-pink-600" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-sm mb-1">Adventure & Romance</h3>
                <p className="text-xs text-gray-600">Thrilling experiences</p>
              </div>
            </motion.button>
          </div>

          {/* Full Width Card */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentScreen('international')}
            className="w-full bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all mb-4"
          >
            <div className="flex items-center p-6 gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Plane className="w-10 h-10 text-pink-600" />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-bold text-lg mb-1">International Escapes</h3>
                <p className="text-sm text-gray-600">Exotic destinations worldwide</p>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400" />
            </div>
          </motion.button>

          {/* Beach Paradise Card */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentScreen('beach-paradise')}
            className="w-full bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all"
          >
            <div className="flex items-center p-6 gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Waves className="w-10 h-10 text-pink-600" />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-bold text-lg mb-1">Beach & Island Paradise</h3>
                <p className="text-sm text-gray-600">Sun, Sand & Romance</p>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400" />
            </div>
          </motion.button>

          {/* Heritage & Luxury Palaces Card */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentScreen('heritage-palaces')}
            className="w-full bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all mb-4"
          >
            <div className="flex items-center p-6 gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Castle className="w-10 h-10 text-pink-600" />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-bold text-lg mb-1">Heritage & Luxury Palaces</h3>
                <p className="text-sm text-gray-600">Royal Romance Experiences</p>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400" />
            </div>
          </motion.button>

          {/* Wellness & Spa Retreats Card */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentScreen('wellness-retreats')}
            className="w-full bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all"
          >
            <div className="flex items-center p-6 gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Flower2 className="w-10 h-10 text-pink-600" />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-bold text-lg mb-1">Wellness & Spa Retreats</h3>
                <p className="text-sm text-gray-600">Heal, Relax & Reconnect</p>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400" />
            </div>
          </motion.button>
        </div>

        {/* COUPLE ACTIVITIES - New Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Couple Activities</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { icon: Flame, label: 'Candlelight Dinner', query: 'candlelight dinner romantic restaurants' },
              { icon: Sparkles, label: 'Spa & Wellness', query: 'couple spa wellness packages' },
              { icon: Sunrise, label: 'Sunset Views', query: 'best sunset viewpoints romantic' },
              { icon: Utensils, label: 'Fine Dining', query: 'fine dining romantic restaurants' }
            ].map((activity, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                onClick={() => handleGoogleSearch(activity.query)}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white text-sm font-semibold hover:from-pink-600 hover:to-rose-700 transition-all flex items-center gap-2"
              >
                <activity.icon className="w-4 h-4" />
                {activity.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPlanner(true)}
            className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mb-3">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-sm mb-1">Custom Tour</h3>
            <p className="text-xs text-gray-600">Plan your way</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleGoogleSearch()}
            className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mb-3">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-sm mb-1">Search Online</h3>
            <p className="text-xs text-gray-600">Find destinations</p>
          </motion.button>
        </div>

        {/* Admin Notice */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-1">
                Admin-Managed Content
              </p>
              <p className="text-xs text-gray-600">
                Packages shown below are placeholder templates. Use Google Search or YouTube Browse 
                to discover actual romantic destinations for your honeymoon.
              </p>
            </div>
          </div>
        </div>

        {/* ROMANTIC PACKAGES - Enhanced Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">
              {searchQuery ? 'Matching Romantic Packages' : 'Romantic Packages'}
            </h2>
            <button className="text-pink-600 text-sm font-semibold">View All</button>
          </div>
          <div className="space-y-4">
            {romanticPackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Heart className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{pkg.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-pink-100 text-pink-700 border-pink-300">
                          💑 For Couples
                        </Badge>
                        <span className="text-xs text-gray-500">• {pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-semibold text-sm">{pkg.rating}</span>
                        <span className="text-gray-500 text-xs">({pkg.reviews} couples)</span>
                      </div>
                    </div>
                  </div>

                  {/* Romantic Inclusions */}
                  <div className="bg-pink-50 rounded-2xl p-3 mb-4">
                    <p className="text-xs font-semibold text-pink-700 mb-2 flex items-center gap-1">
                      <Gift className="w-4 h-4" /> What's Included:
                    </p>
                    <ul className="text-xs text-gray-700 space-y-1">
                      {pkg.inclusions.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span>{item.icon}</span>
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Destination Info */}
                  <div className="bg-blue-50 rounded-2xl p-3 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Destination: </span>
                        {pkg.destination}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      * Actual destinations will be selected by admin based on availability
                    </p>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-semibold">{pkg.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Per Couple</p>
                      <p className="font-bold text-2xl bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">
                        {pkg.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleGoogleSearch(pkg.searchQuery)}
                      className="flex-1 rounded-full bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 h-11 flex items-center justify-center gap-2"
                    >
                      <Globe className="w-4 h-4" />
                      Google Search
                    </Button>
                    <Button 
                      onClick={() => handleYouTubeSearch(pkg.searchQuery)}
                      className="flex-1 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 h-11 flex items-center justify-center gap-2"
                    >
                      <Youtube className="w-4 h-4" />
                      YouTube
                    </Button>
                  </div>

                  {/* Interest Tracking */}
                  <div className="flex items-center gap-2 mt-4">
                    <Button
                      onClick={() => toggleInterestTracking(pkg.id, pkg.name)}
                      className="rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white text-sm font-semibold hover:from-pink-600 hover:to-rose-700 transition-all flex items-center gap-2"
                    >
                      {trackedInterests.has(pkg.id) ? (
                        <BookmarkCheck className="w-4 h-4" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                      {trackedInterests.has(pkg.id) ? 'Tracked' : 'Track Interest'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Notification */}
      {showNotification && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 z-50"
        >
          <BellRing className="w-5 h-5" />
          <span className="text-sm font-semibold">{notificationMessage}</span>
        </motion.div>
      )}
    </div>
  );
}

// Romantic Packages Data
const romanticPackages = [
  {
    id: '1',
    name: 'Romantic Escape Package',
    description: 'Perfect for newlyweds seeking intimacy',
    price: '₹30,000',
    duration: '3N/4D',
    rating: 4.8,
    reviews: 234,
    destination: 'Admin-Selected Romantic Destination',
    searchQuery: 'romantic honeymoon package destinations',
    inclusions: [
      { icon: '🕯️', text: 'Candlelight dinner' },
      { icon: '💆', text: 'Couple spa session' },
      { icon: '❤️', text: 'Romantic room décor' },
      { icon: '🌹', text: 'Welcome bouquet' }
    ]
  },
  {
    id: '2',
    name: 'Luxury Honeymoon Suite',
    description: 'Premium experience with exclusive amenities',
    price: '₹50,000',
    duration: '5N/6D',
    rating: 4.9,
    reviews: 456,
    destination: 'Premium Location TBD',
    searchQuery: 'luxury honeymoon suite packages',
    inclusions: [
      { icon: '🍾', text: 'Champagne welcome' },
      { icon: '🎁', text: 'Honeymoon gift basket' },
      { icon: '🌅', text: 'Sunset dinner cruise' },
      { icon: '💆', text: 'Daily couple spa' }
    ]
  },
  {
    id: '3',
    name: 'Intimate Getaway',
    description: 'Cozy retreat for quality time together',
    price: '₹25,000',
    duration: '4N/5D',
    rating: 4.7,
    reviews: 189,
    destination: 'Secluded Spot (Admin)',
    searchQuery: 'intimate honeymoon getaway destinations',
    inclusions: [
      { icon: '🔥', text: 'Private bonfire' },
      { icon: '🍽️', text: 'In-room dining' },
      { icon: '🎵', text: 'Romantic music setup' },
      { icon: '📸', text: 'Couple photoshoot' }
    ]
  }
];

// Hill Station Retreats Sub-Screen
function HillStationRetreats({ onBack, onGoogleSearch, onYouTubeSearch }: { onBack: () => void; onGoogleSearch: (query: string) => void; onYouTubeSearch: (query: string) => void }) {
  const [searchQuery, setSearchQuery] = useState('');

  const packages = [
    {
      name: 'Cozy Mountain Retreat',
      price: '₹28,000',
      duration: '3N/4D',
      rating: 4.8,
      reviews: 156,
      features: ['Fireplace in room', 'Hot chocolate service', 'Mountain views', 'Bonfire nights'],
      searchQuery: 'cozy mountain honeymoon retreat'
    },
    {
      name: 'Scenic Hill Station Escape',
      price: '₹32,000',
      duration: '4N/5D',
      rating: 4.9,
      reviews: 203,
      features: ['Scenic balcony', 'Couple trekking', 'Sunset viewpoints', 'Local cuisine'],
      searchQuery: 'scenic hill station honeymoon destinations'
    },
    {
      name: 'Romantic Mountain Lodge',
      price: '₹35,000',
      duration: '5N/6D',
      rating: 4.7,
      reviews: 178,
      features: ['Private cottage', 'Wood-fired heater', 'Valley views', 'Nature walks'],
      searchQuery: 'romantic mountain lodge honeymoon'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 px-6 pt-12 pb-8 rounded-b-[2rem]">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-6"
          aria-label="Go back to honeymoon hub"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Mountain className="w-9 h-9 text-white" />
          </div>
          <div>
            <h1 className="text-white text-3xl font-bold">Hill Station Retreats</h1>
            <p className="text-white/80 text-sm">Cozy mountain escapes with scenic views</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search mountain destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 h-12 rounded-full bg-white border-0 shadow-lg"
          />
        </div>

        {/* Google/YouTube Buttons */}
        <div className="flex gap-3 mb-3">
          <Button
            onClick={() => onGoogleSearch('romantic hill station honeymoon destinations')}
            className="flex-1 bg-white text-blue-600 hover:bg-gray-100 rounded-full h-9"
          >
            <Globe className="w-4 h-4 mr-2" />
            Google Search
          </Button>
          <Button
            onClick={() => onYouTubeSearch('best hill stations for honeymoon')}
            className="flex-1 bg-white text-red-600 hover:bg-gray-100 rounded-full h-9"
          >
            <Youtube className="w-4 h-4 mr-2" />
            YouTube
          </Button>
        </div>
      </div>

      <div className="px-6">
        {/* Packages */}
        <div className="mb-6 -mt-6">
          <h2 className="text-xl font-bold mb-4">Mountain Retreat Packages</h2>
          <div className="space-y-4">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center">
                    <Mountain className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{pkg.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold">{pkg.rating}</span>
                      <span className="text-xs text-gray-500">({pkg.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-pink-50 rounded-2xl p-3 mb-4">
                  <p className="text-xs font-semibold text-pink-700 mb-2">Features:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {pkg.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-1 text-xs text-gray-700">
                        <span>❄️</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <p className="font-semibold">{pkg.duration}</p>
                  <p className="text-2xl font-bold text-pink-600">{pkg.price}/couple</p>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={() => onGoogleSearch(pkg.searchQuery)}
                    className="flex-1 rounded-full bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 h-11"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Google
                  </Button>
                  <Button 
                    onClick={() => onYouTubeSearch(pkg.searchQuery)}
                    className="flex-1 rounded-full bg-red-600 text-white hover:bg-red-700 h-11"
                  >
                    <Youtube className="w-4 h-4 mr-2" />
                    YouTube
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Adventure & Romance Sub-Screen
function AdventureRomance({ onBack, onGoogleSearch, onYouTubeSearch }: { onBack: () => void; onGoogleSearch: (query: string) => void; onYouTubeSearch: (query: string) => void }) {
  const packages = [
    {
      name: 'Adventure Honeymoon',
      price: '₹40,000',
      duration: '4N/5D',
      rating: 4.9,
      reviews: 142,
      activities: ['Skiing & Snowboarding', 'Couple trekking', 'River rafting', 'Paragliding'],
      searchQuery: 'adventure honeymoon destinations'
    },
    {
      name: 'Thrill Seekers Package',
      price: '₹45,000',
      duration: '5N/6D',
      rating: 4.8,
      reviews: 198,
      activities: ['Scuba diving', 'Kayaking', 'Rock climbing', 'Zip-lining'],
      searchQuery: 'thrill adventure honeymoon packages'
    },
    {
      name: 'Extreme Romance',
      price: '₹50,000',
      duration: '6N/7D',
      rating: 4.7,
      reviews: 165,
      activities: ['Skydiving', 'Bungee jumping', 'Hiking expeditions', 'Water sports'],
      searchQuery: 'extreme adventure romantic honeymoon'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 px-6 pt-12 pb-8 rounded-b-[2rem]">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-6"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Activity className="w-9 h-9 text-white" />
          </div>
          <div>
            <h1 className="text-white text-3xl font-bold">Adventure & Romance</h1>
            <p className="text-white/80 text-sm">Thrilling experiences for adventurous couples</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => onGoogleSearch('adventure honeymoon activities india')}
            className="flex-1 bg-white text-blue-600 hover:bg-gray-100 rounded-full h-9"
          >
            <Globe className="w-4 h-4 mr-2" />
            Google Search
          </Button>
          <Button
            onClick={() => onYouTubeSearch('adventure honeymoon destinations')}
            className="flex-1 bg-white text-red-600 hover:bg-gray-100 rounded-full h-9"
          >
            <Youtube className="w-4 h-4 mr-2" />
            YouTube
          </Button>
        </div>
      </div>

      <div className="px-6 -mt-6">
        <div className="space-y-4 mb-6">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-md"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{pkg.name}</h3>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold">{pkg.rating}</span>
                    <span className="text-xs text-gray-500">({pkg.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 rounded-2xl p-3 mb-4">
                <p className="text-xs font-semibold text-orange-700 mb-2">Activities:</p>
                <div className="grid grid-cols-2 gap-2">
                  {pkg.activities.map((activity, i) => (
                    <div key={i} className="flex items-center gap-1 text-xs text-gray-700">
                      <span>⚡</span>
                      <span>{activity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <p className="font-semibold">{pkg.duration}</p>
                <p className="text-2xl font-bold text-pink-600">{pkg.price}/couple</p>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={() => onGoogleSearch(pkg.searchQuery)}
                  className="flex-1 rounded-full bg-white border-2 border-blue-600 text-blue-600 h-11"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Google
                </Button>
                <Button 
                  onClick={() => onYouTubeSearch(pkg.searchQuery)}
                  className="flex-1 rounded-full bg-red-600 text-white h-11"
                >
                  <Youtube className="w-4 h-4 mr-2" />
                  YouTube
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// International Escapes Sub-Screen
function InternationalEscapes({ onBack, onGoogleSearch, onYouTubeSearch }: { onBack: () => void; onGoogleSearch: (query: string) => void; onYouTubeSearch: (query: string) => void }) {
  const packages = [
    {
      name: 'European Romance',
      price: '₹1,50,000',
      duration: '7N/8D',
      rating: 4.9,
      reviews: 287,
      destinations: ['Paris', 'Venice', 'Swiss Alps', 'Santorini'],
      searchQuery: 'european honeymoon destinations packages'
    },
    {
      name: 'Tropical Paradise',
      price: '₹1,20,000',
      duration: '6N/7D',
      rating: 4.8,
      reviews: 324,
      destinations: ['Maldives', 'Mauritius', 'Seychelles', 'Fiji'],
      searchQuery: 'tropical beach honeymoon destinations'
    },
    {
      name: 'Asian Adventure',
      price: '₹90,000',
      duration: '5N/6D',
      rating: 4.7,
      reviews: 256,
      destinations: ['Bali', 'Thailand', 'Singapore', 'Malaysia'],
      searchQuery: 'asian honeymoon destinations'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 px-6 pt-12 pb-8 rounded-b-[2rem]">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-6"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Plane className="w-9 h-9 text-white" />
          </div>
          <div>
            <h1 className="text-white text-3xl font-bold">International Escapes</h1>
            <p className="text-white/80 text-sm">Exotic destinations worldwide</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => onGoogleSearch('best international honeymoon destinations')}
            className="flex-1 bg-white text-blue-600 hover:bg-gray-100 rounded-full h-9"
          >
            <Globe className="w-4 h-4 mr-2" />
            Google Search
          </Button>
          <Button
            onClick={() => onYouTubeSearch('exotic honeymoon destinations abroad')}
            className="flex-1 bg-white text-red-600 hover:bg-gray-100 rounded-full h-9"
          >
            <Youtube className="w-4 h-4 mr-2" />
            YouTube
          </Button>
        </div>
      </div>

      <div className="px-6 -mt-6">
        <div className="space-y-4 mb-6">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-md"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center">
                  <Plane className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{pkg.name}</h3>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold">{pkg.rating}</span>
                    <span className="text-xs text-gray-500">({pkg.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-2xl p-3 mb-4">
                <p className="text-xs font-semibold text-blue-700 mb-2">Popular Destinations:</p>
                <div className="flex flex-wrap gap-2">
                  {pkg.destinations.map((dest, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {dest}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  * Subject to visa availability and travel restrictions
                </p>
              </div>

              <div className="flex items-center justify-between mb-4">
                <p className="font-semibold">{pkg.duration}</p>
                <p className="text-2xl font-bold text-pink-600">{pkg.price}/couple</p>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={() => onGoogleSearch(pkg.searchQuery)}
                  className="flex-1 rounded-full bg-white border-2 border-blue-600 text-blue-600 h-11"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Google
                </Button>
                <Button 
                  onClick={() => onYouTubeSearch(pkg.searchQuery)}
                  className="flex-1 rounded-full bg-red-600 text-white h-11"
                >
                  <Youtube className="w-4 h-4 mr-2" />
                  YouTube
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Beach Paradise Sub-Screen
function BeachParadise({ onBack, onGoogleSearch, onYouTubeSearch }: { onBack: () => void; onGoogleSearch: (query: string) => void; onYouTubeSearch: (query: string) => void }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filterChips = [
    { label: '[Filter 1]', query: 'beach filter 1' },
    { label: '[Filter 2]', query: 'beach filter 2' },
    { label: '[Filter 3]', query: 'beach filter 3' },
    { label: '[Filter 4]', query: 'beach filter 4' },
    { label: '[Filter 5]', query: 'beach filter 5' }
  ];

  const destinations = [
    {
      id: '1',
      name: '[Destination Name 1]',
      priceRange: '[Price Range 1]',
      perfectFor: ['[Tag 1]', '[Tag 2]', '[Tag 3]', '[Tag 4]'],
      stayOptions: ['[Option A]', '[Option B]'],
      specialRequest: '[Special Request Description]'
    },
    {
      id: '2',
      name: '[Destination Name 2]',
      priceRange: '[Price Range 2]',
      perfectFor: ['[Tag 1]', '[Tag 2]', '[Tag 3]', '[Tag 4]'],
      stayOptions: ['[Option A]', '[Option B]'],
      specialRequest: '[Special Request Description]'
    },
    {
      id: '3',
      name: '[Destination Name 3]',
      priceRange: '[Price Range 3]',
      perfectFor: ['[Tag 1]', '[Tag 2]', '[Tag 3]', '[Tag 4]'],
      stayOptions: ['[Option A]', '[Option B]'],
      specialRequest: '[Special Request Description]'
    },
    {
      id: '4',
      name: '[Destination Name 4]',
      priceRange: '[Price Range 4]',
      perfectFor: ['[Tag 1]', '[Tag 2]', '[Tag 3]', '[Tag 4]'],
      stayOptions: ['[Option A]', '[Option B]'],
      specialRequest: '[Special Request Description]'
    },
    {
      id: '5',
      name: '[Destination Name 5]',
      priceRange: '[Price Range 5]',
      perfectFor: ['[Tag 1]', '[Tag 2]', '[Tag 3]', '[Tag 4]'],
      stayOptions: ['[Option A]', '[Option B]'],
      specialRequest: '[Special Request Description]'
    },
    {
      id: '6',
      name: '[Destination Name 6]',
      priceRange: '[Price Range 6]',
      perfectFor: ['[Tag 1]', '[Tag 2]', '[Tag 3]', '[Tag 4]'],
      stayOptions: ['[Option A]', '[Option B]'],
      specialRequest: '[Special Request Description]'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 px-6 pt-12 pb-8 rounded-b-[2rem]">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-6"
          aria-label="Go back to honeymoon hub"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Waves className="w-9 h-9 text-white" />
          </div>
          <div>
            <h1 className="text-white text-3xl font-bold">Beach & Island Paradise</h1>
            <p className="text-white/80 text-sm">Sun, Sand & Romance</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by beach name, activity or state..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 h-12 rounded-full bg-white border-0 shadow-lg"
          />
        </div>

        {/* Google/YouTube Buttons */}
        <div className="flex gap-3 mb-3">
          <Button
            onClick={() => onGoogleSearch('beach island honeymoon destinations')}
            className="flex-1 bg-white text-blue-600 hover:bg-gray-100 rounded-full h-9"
          >
            <Globe className="w-4 h-4 mr-2" />
            Google Search
          </Button>
          <Button
            onClick={() => onYouTubeSearch('beach island honeymoon paradise')}
            className="flex-1 bg-white text-red-600 hover:bg-gray-100 rounded-full h-9"
          >
            <Youtube className="w-4 h-4 mr-2" />
            YouTube
          </Button>
        </div>
      </div>

      <div className="px-6">
        {/* Filter Chips */}
        <div className="mb-6 -mt-6">
          <div className="flex flex-wrap gap-2">
            {filterChips.map((filter, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                onClick={() => onGoogleSearch(filter.query)}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white text-sm font-semibold hover:from-pink-600 hover:to-rose-700 transition-all flex items-center gap-2"
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Popular Beach Destinations Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Popular Beach Destinations</h2>
          
          <div className="space-y-4">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Waves className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{destination.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-semibold">Price Range:</span> {destination.priceRange}
                    </p>
                  </div>
                </div>

                {/* Perfect For Tags */}
                <div className="bg-pink-50 rounded-2xl p-3 mb-4">
                  <p className="text-xs font-semibold text-pink-700 mb-2">Perfect For:</p>
                  <div className="flex flex-wrap gap-2">
                    {destination.perfectFor.map((tag, i) => (
                      <Badge key={i} className="bg-pink-100 text-pink-700 border-pink-300 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stay Options */}
                <div className="bg-blue-50 rounded-2xl p-3 mb-4">
                  <p className="text-xs font-semibold text-blue-700 mb-2">Stay Options:</p>
                  <div className="flex gap-2">
                    {destination.stayOptions.map((option, i) => (
                      <span key={i} className="text-xs text-gray-700">
                        {option}
                        {i < destination.stayOptions.length - 1 && ' | '}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Special Request */}
                <div className="bg-purple-50 rounded-2xl p-3 mb-4">
                  <p className="text-xs font-semibold text-purple-700 mb-1">Special Request:</p>
                  <p className="text-xs text-gray-700">{destination.specialRequest}</p>
                </div>

                {/* Explore Button */}
                <Button 
                  onClick={() => onGoogleSearch(`${destination.name} beach honeymoon`)}
                  className="w-full rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:from-pink-600 hover:to-rose-700 h-11 flex items-center justify-center gap-2"
                >
                  Explore
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <div className="mb-6">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            onClick={onBack}
            className="w-full bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3"
          >
            <span className="font-bold text-lg text-gray-900">Continue</span>
            <ChevronRight className="w-6 h-6 text-pink-600" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// Heritage Palaces Sub-Screen
function HeritagePalaces({ onBack, onGoogleSearch, onYouTubeSearch }: { onBack: () => void; onGoogleSearch: (query: string) => void; onYouTubeSearch: (query: string) => void }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filterChips = [
    { label: '[Filter 1]', query: 'heritage filter 1' },
    { label: '[Filter 2]', query: 'heritage filter 2' },
    { label: '[Filter 3]', query: 'heritage filter 3' },
    { label: '[Filter 4]', query: 'heritage filter 4' },
    { label: '[Filter 5]', query: 'heritage filter 5' }
  ];

  const destinations = [
    {
      id: '1',
      name: '[Heritage Destination 1]',
      priceRange: '[Price Range 1]',
      perfectFor: ['[Experience 1]', '[Experience 2]', '[Experience 3]'],
      stayOptions: ['[Accommodation Type 1]', '[Accommodation Type 2]'],
      specialRequest: '[Royal Experience Description]'
    },
    {
      id: '2',
      name: '[Heritage Destination 2]',
      priceRange: '[Price Range 2]',
      perfectFor: ['[Experience 1]', '[Experience 2]', '[Experience 3]'],
      stayOptions: ['[Accommodation Type 1]', '[Accommodation Type 2]'],
      specialRequest: '[Royal Experience Description]'
    },
    {
      id: '3',
      name: '[Heritage Destination 3]',
      priceRange: '[Price Range 3]',
      perfectFor: ['[Experience 1]', '[Experience 2]', '[Experience 3]'],
      stayOptions: ['[Accommodation Type 1]', '[Accommodation Type 2]'],
      specialRequest: '[Royal Experience Description]'
    },
    {
      id: '4',
      name: '[Heritage Destination 4]',
      priceRange: '[Price Range 4]',
      perfectFor: ['[Experience 1]', '[Experience 2]', '[Experience 3]'],
      stayOptions: ['[Accommodation Type 1]', '[Accommodation Type 2]'],
      specialRequest: '[Royal Experience Description]'
    },
    {
      id: '5',
      name: '[Heritage Destination 5]',
      priceRange: '[Price Range 5]',
      perfectFor: ['[Experience 1]', '[Experience 2]', '[Experience 3]'],
      stayOptions: ['[Accommodation Type 1]', '[Accommodation Type 2]'],
      specialRequest: '[Royal Experience Description]'
    },
    {
      id: '6',
      name: '[Heritage Destination 6]',
      priceRange: '[Price Range 6]',
      perfectFor: ['[Experience 1]', '[Experience 2]', '[Experience 3]'],
      stayOptions: ['[Accommodation Type 1]', '[Accommodation Type 2]'],
      specialRequest: '[Royal Experience Description]'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 px-6 pt-12 pb-8 rounded-b-[2rem]">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-6"
          aria-label="Go back to honeymoon hub"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Castle className="w-9 h-9 text-white" />
          </div>
          <div>
            <h1 className="text-white text-3xl font-bold">Heritage & Luxury Palaces</h1>
            <p className="text-white/80 text-sm">Royal Romance Experiences</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by city, palace or heritage site..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 h-12 rounded-full bg-white border-0 shadow-lg"
          />
        </div>

        {/* Google/YouTube Buttons */}
        <div className="flex gap-3 mb-3">
          <Button
            onClick={() => onGoogleSearch('heritage palace honeymoon destinations')}
            className="flex-1 bg-white text-blue-600 hover:bg-gray-100 rounded-full h-9"
          >
            <Globe className="w-4 h-4 mr-2" />
            Google Search
          </Button>
          <Button
            onClick={() => onYouTubeSearch('heritage palace honeymoon paradise')}
            className="flex-1 bg-white text-red-600 hover:bg-gray-100 rounded-full h-9"
          >
            <Youtube className="w-4 h-4 mr-2" />
            YouTube
          </Button>
        </div>
      </div>

      <div className="px-6">
        {/* Filter Chips */}
        <div className="mb-6 -mt-6">
          <div className="flex flex-wrap gap-2">
            {filterChips.map((filter, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                onClick={() => onGoogleSearch(filter.query)}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white text-sm font-semibold hover:from-pink-600 hover:to-rose-700 transition-all flex items-center gap-2"
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Luxury Heritage Experiences Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Luxury Heritage Experiences</h2>
          
          <div className="space-y-4">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Castle className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{destination.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-semibold">Price Range:</span> {destination.priceRange}
                    </p>
                  </div>
                </div>

                {/* Perfect For Tags */}
                <div className="bg-pink-50 rounded-2xl p-3 mb-4">
                  <p className="text-xs font-semibold text-pink-700 mb-2">Perfect For:</p>
                  <div className="flex flex-wrap gap-2">
                    {destination.perfectFor.map((tag, i) => (
                      <Badge key={i} className="bg-pink-100 text-pink-700 border-pink-300 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stay Options */}
                <div className="bg-blue-50 rounded-2xl p-3 mb-4">
                  <p className="text-xs font-semibold text-blue-700 mb-2">Stay Options:</p>
                  <div className="flex gap-2">
                    {destination.stayOptions.map((option, i) => (
                      <span key={i} className="text-xs text-gray-700">
                        {option}
                        {i < destination.stayOptions.length - 1 && ' | '}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Special Request */}
                <div className="bg-purple-50 rounded-2xl p-3 mb-4">
                  <p className="text-xs font-semibold text-purple-700 mb-1">Special Request:</p>
                  <p className="text-xs text-gray-700">{destination.specialRequest}</p>
                </div>

                {/* Explore Button */}
                <Button 
                  onClick={() => onGoogleSearch(`${destination.name} palace honeymoon`)}
                  className="w-full rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:from-pink-600 hover:to-rose-700 h-11 flex items-center justify-center gap-2"
                >
                  Explore
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <div className="mb-6">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            onClick={onBack}
            className="w-full bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3"
          >
            <span className="font-bold text-lg text-gray-900">Continue</span>
            <ChevronRight className="w-6 h-6 text-pink-600" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// Wellness & Spa Retreats Sub-Screen
function WellnessRetreats({ onBack, onGoogleSearch, onYouTubeSearch }: { onBack: () => void; onGoogleSearch: (query: string) => void; onYouTubeSearch: (query: string) => void }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filterChips = [
    { label: '[Wellness Filter 1]', query: 'wellness filter 1' },
    { label: '[Wellness Filter 2]', query: 'wellness filter 2' },
    { label: '[Wellness Filter 3]', query: 'wellness filter 3' },
    { label: '[Wellness Filter 4]', query: 'wellness filter 4' },
    { label: '[Wellness Filter 5]', query: 'wellness filter 5' }
  ];

  const destinations = [
    {
      id: '1',
      name: '[Wellness Destination 1]',
      priceRange: '[Price Range 1]',
      perfectFor: ['[Treatment 1]', '[Treatment 2]', '[Wellness Focus]'],
      stayOptions: ['[Retreat Type 1]', '[Retreat Type 2]'],
      specialRequest: '[Wellness Service Description]'
    },
    {
      id: '2',
      name: '[Wellness Destination 2]',
      priceRange: '[Price Range 2]',
      perfectFor: ['[Treatment 1]', '[Treatment 2]', '[Wellness Focus]'],
      stayOptions: ['[Retreat Type 1]', '[Retreat Type 2]'],
      specialRequest: '[Wellness Service Description]'
    },
    {
      id: '3',
      name: '[Wellness Destination 3]',
      priceRange: '[Price Range 3]',
      perfectFor: ['[Treatment 1]', '[Treatment 2]', '[Wellness Focus]'],
      stayOptions: ['[Retreat Type 1]', '[Retreat Type 2]'],
      specialRequest: '[Wellness Service Description]'
    },
    {
      id: '4',
      name: '[Wellness Destination 4]',
      priceRange: '[Price Range 4]',
      perfectFor: ['[Treatment 1]', '[Treatment 2]', '[Wellness Focus]'],
      stayOptions: ['[Retreat Type 1]', '[Retreat Type 2]'],
      specialRequest: '[Wellness Service Description]'
    },
    {
      id: '5',
      name: '[Wellness Destination 5]',
      priceRange: '[Price Range 5]',
      perfectFor: ['[Treatment 1]', '[Treatment 2]', '[Wellness Focus]'],
      stayOptions: ['[Retreat Type 1]', '[Retreat Type 2]'],
      specialRequest: '[Wellness Service Description]'
    },
    {
      id: '6',
      name: '[Wellness Destination 6]',
      priceRange: '[Price Range 6]',
      perfectFor: ['[Treatment 1]', '[Treatment 2]', '[Wellness Focus]'],
      stayOptions: ['[Retreat Type 1]', '[Retreat Type 2]'],
      specialRequest: '[Wellness Service Description]'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 px-6 pt-12 pb-8 rounded-b-[2rem]">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-6"
          aria-label="Go back to honeymoon hub"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Flower2 className="w-9 h-9 text-white" />
          </div>
          <div>
            <h1 className="text-white text-3xl font-bold">Wellness & Spa Retreats</h1>
            <p className="text-white/80 text-sm">Heal, Relax & Reconnect</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by treatment, therapy or destination..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 h-12 rounded-full bg-white border-0 shadow-lg"
          />
        </div>

        {/* Google/YouTube Buttons */}
        <div className="flex gap-3 mb-3">
          <Button
            onClick={() => onGoogleSearch('wellness spa retreat honeymoon destinations')}
            className="flex-1 bg-white text-blue-600 hover:bg-gray-100 rounded-full h-9"
          >
            <Globe className="w-4 h-4 mr-2" />
            Google Search
          </Button>
          <Button
            onClick={() => onYouTubeSearch('wellness spa retreat paradise')}
            className="flex-1 bg-white text-red-600 hover:bg-gray-100 rounded-full h-9"
          >
            <Youtube className="w-4 h-4 mr-2" />
            YouTube
          </Button>
        </div>
      </div>

      <div className="px-6">
        {/* Filter Chips */}
        <div className="mb-6 -mt-6">
          <div className="flex flex-wrap gap-2">
            {filterChips.map((filter, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                onClick={() => onGoogleSearch(filter.query)}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white text-sm font-semibold hover:from-pink-600 hover:to-rose-700 transition-all flex items-center gap-2"
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Premium Wellness Retreats Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Premium Wellness Retreats</h2>
          
          <div className="space-y-4">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Flower2 className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{destination.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-semibold">Price Range:</span> {destination.priceRange}
                    </p>
                  </div>
                </div>

                {/* Perfect For Tags */}
                <div className="bg-pink-50 rounded-2xl p-3 mb-4">
                  <p className="text-xs font-semibold text-pink-700 mb-2">Perfect For:</p>
                  <div className="flex flex-wrap gap-2">
                    {destination.perfectFor.map((tag, i) => (
                      <Badge key={i} className="bg-pink-100 text-pink-700 border-pink-300 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stay Options */}
                <div className="bg-blue-50 rounded-2xl p-3 mb-4">
                  <p className="text-xs font-semibold text-blue-700 mb-2">Stay Options:</p>
                  <div className="flex gap-2">
                    {destination.stayOptions.map((option, i) => (
                      <span key={i} className="text-xs text-gray-700">
                        {option}
                        {i < destination.stayOptions.length - 1 && ' | '}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Special Request */}
                <div className="bg-purple-50 rounded-2xl p-3 mb-4">
                  <p className="text-xs font-semibold text-purple-700 mb-1">Special Request:</p>
                  <p className="text-xs text-gray-700">{destination.specialRequest}</p>
                </div>

                {/* Explore Button */}
                <Button 
                  onClick={() => onGoogleSearch(`${destination.name} wellness retreat honeymoon`)}
                  className="w-full rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:from-pink-600 hover:to-rose-700 h-11 flex items-center justify-center gap-2"
                >
                  Explore
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <div className="mb-6">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            onClick={onBack}
            className="w-full bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3"
          >
            <span className="font-bold text-lg text-gray-900">Continue</span>
            <ChevronRight className="w-6 h-6 text-pink-600" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}