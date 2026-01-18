import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Search, Hotel, Car, Plane, Train, UtensilsCrossed, Map, Shield, Stethoscope, Heart, Phone, Users, Accessibility, Baby, PawPrint, Briefcase, Globe, CreditCard, FileText, ChevronRight, Filter, Sparkles, Youtube } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { PersonalizedDealsAlert } from '@/app/components/shared/PersonalizedDealsAlert';

interface TravelEssentialsHubProps {
  onBack: () => void;
  userLocation?: string;
  onNavigateToSelfDrive?: () => void;
}

export function TravelEssentialsHub({ onBack, userLocation = 'Current Location', onNavigateToSelfDrive }: TravelEssentialsHubProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Main Service Categories (9 sections as per spec)
  const serviceCategories = [
    {
      id: 'accommodation',
      icon: Hotel,
      title: 'Accommodation',
      gradient: 'from-blue-500 to-cyan-600',
      services: [
        { name: 'Admin-Added Hotels & Resorts', icon: Hotel },
        { name: 'Admin-Added Villas & Homes', icon: Hotel },
        { name: 'Admin-Added Budget Stays', icon: Hotel },
        { name: 'Admin-Added Luxury Suites', icon: Hotel },
      ]
    },
    {
      id: 'transportation',
      icon: Car,
      title: 'Transportation',
      gradient: 'from-orange-500 to-red-600',
      specialLink: true, // NEW: Flag to show special Self-Drive link
      services: [
        { name: 'Admin-Added Airport Transfers', icon: Plane },
        { name: 'Admin-Added Car Rentals', icon: Car },
        { name: 'Admin-Added Train Booking', icon: Train },
        { name: 'Admin-Added Bus Services', icon: Car },
      ]
    },
    {
      id: 'hospitality',
      icon: UtensilsCrossed,
      title: 'Hospitality & Dining',
      gradient: 'from-green-500 to-emerald-600',
      services: [
        { name: 'Admin-Added Restaurants', icon: UtensilsCrossed },
        { name: 'Admin-Added Food Tours', icon: Map },
        { name: 'Admin-Added Catering Services', icon: UtensilsCrossed },
        { name: 'Admin-Added Local Cuisine', icon: UtensilsCrossed },
      ]
    },
    {
      id: 'personal-assistance',
      icon: Users,
      title: 'Personal Assistance',
      gradient: 'from-purple-500 to-indigo-600',
      services: [
        { name: 'Admin-Added Travel Companion', icon: Users },
        { name: 'Admin-Added Language Support', icon: Globe },
        { name: 'Admin-Added Concierge Service', icon: Briefcase },
        { name: 'Admin-Added Shopping Assistant', icon: Map },
      ]
    },
    {
      id: 'senior-care',
      icon: Heart,
      title: 'Senior Care',
      gradient: 'from-pink-500 to-rose-600',
      services: [
        { name: 'Admin-Added Doctor on Tour', icon: Stethoscope, featured: true },
        { name: 'Admin-Added Nursing Care', icon: Heart, featured: true },
        { name: 'Admin-Added Personal Assistant', icon: Users, featured: true },
        { name: 'Admin-Added Health Monitoring', icon: Heart },
        { name: 'Admin-Added Medication Support', icon: Stethoscope },
        { name: 'Admin-Added Mobility Assistance', icon: Accessibility },
      ]
    },
    {
      id: 'accessibility',
      icon: Accessibility,
      title: 'Accessibility Services',
      gradient: 'from-blue-600 to-indigo-600',
      services: [
        { name: 'Admin-Added Wheelchair Vans', icon: Accessibility },
        { name: 'Admin-Added Accessible Hotels', icon: Hotel },
        { name: 'Admin-Added Sign Language Guide', icon: Users },
        { name: 'Admin-Added Special Equipment', icon: Accessibility },
      ]
    },
    {
      id: 'family-services',
      icon: Baby,
      title: 'Family Services',
      gradient: 'from-yellow-500 to-orange-600',
      services: [
        { name: 'Admin-Added Child Care', icon: Baby },
        { name: 'Admin-Added Family Activities', icon: Users },
        { name: 'Admin-Added Kids Meals', icon: UtensilsCrossed },
        { name: 'Admin-Added Play Areas', icon: Map },
      ]
    },
    {
      id: 'pet-travel',
      icon: PawPrint,
      title: 'Pet Travel',
      gradient: 'from-teal-500 to-cyan-600',
      services: [
        { name: 'Admin-Added Pet-Friendly Hotels', icon: Hotel },
        { name: 'Admin-Added Pet Transport', icon: Car },
        { name: 'Admin-Added Pet Care', icon: Heart },
        { name: 'Admin-Added Vet Services', icon: Stethoscope },
      ]
    },
    {
      id: 'digital-tools',
      icon: Globe,
      title: 'Digital Tools',
      gradient: 'from-indigo-500 to-purple-600',
      services: [
        { name: 'Admin-Added Travel Insurance', icon: Shield },
        { name: 'Admin-Added eSIM & Data', icon: Phone },
        { name: 'Admin-Added Digital Guides', icon: Map },
        { name: 'Admin-Added Payment Solutions', icon: CreditCard },
        { name: 'Admin-Added Visa Assistance', icon: FileText },
      ]
    },
  ];

  const handleGoogleSearch = (category: string) => {
    const query = `india ${category.toLowerCase()} travel services`;
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
  };

  const handleYouTubeSearch = (category: string) => {
    const query = `india ${category.toLowerCase()} travel guide`;
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, '_blank');
  };

  const filteredCategories = selectedCategory
    ? serviceCategories.filter(cat => cat.id === selectedCategory)
    : serviceCategories;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 pt-12 pb-8 rounded-b-[2rem]">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-6"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Sparkles className="w-9 h-9 text-white" />
          </div>
          <div>
            <h1 className="text-white text-3xl font-bold">Travel Essentials</h1>
            <p className="text-white/80 text-sm">Complete concierge services</p>
          </div>
        </div>

        {/* Universal Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search services, locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 h-12 rounded-full bg-white border-0 shadow-lg"
          />
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center"
          >
            <Filter className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Location Badge */}
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 w-fit">
          <Map className="w-4 h-4 text-white" />
          <span className="text-white text-sm font-medium">{userLocation}</span>
        </div>
      </div>

      <div className="px-6 -mt-6 pb-8">
        {/* Quick Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <Card className="bg-white rounded-3xl p-4 shadow-lg">
              <div className="flex flex-wrap gap-2">
                <Badge 
                  variant={selectedCategory === null ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(null)}
                >
                  All Services
                </Badge>
                {serviceCategories.map(cat => (
                  <Badge 
                    key={cat.id}
                    variant={selectedCategory === cat.id ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.title}
                  </Badge>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* ========================================
            PERSONALIZED DEALS ALERT
            Location: Below header, above service categories
            ======================================== */}
        <div className="mb-6">
          <PersonalizedDealsAlert
            category="travel-essentials"
            showAdminIndicators={false}
            onSavePreferences={(data) => {
              console.log('Travel essentials deal preferences saved:', data);
              // Backend sync would happen here in production
            }}
            content={{
              heading: '[Admin: Get Travel Essentials Deal Alerts]',
              description: '[Admin: Set your budget for complete travel packages]',
              budgetPlaceholder: '[Admin: e.g., ₹35,000 for services]',
              notificationText: '[Admin: Notify me of travel essentials deals]',
              buttonLabel: '[Admin: Save Essentials Preferences]'
            }}
          />
        </div>

        {/* Service Categories Grid */}
        <div className="space-y-6">
          {filteredCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <Card className="bg-white rounded-3xl p-6 shadow-xl">
                {/* Category Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">{category.title}</h2>
                      <p className="text-xs text-gray-500">
                        {category.services.reduce((sum, s) => sum + 1, 0)} services available
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {category.services.map((service, serviceIndex) => (
                    <motion.button
                      key={serviceIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: categoryIndex * 0.1 + serviceIndex * 0.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative p-4 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 rounded-2xl transition-all text-left"
                    >
                      {service.featured && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-xs px-2 py-0.5">
                            Featured
                          </Badge>
                        </div>
                      )}
                      <div className={`w-10 h-10 bg-gradient-to-br ${category.gradient} rounded-xl flex items-center justify-center mb-3`}>
                        <service.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-sm mb-1">{service.name}</h3>
                      <p className="text-xs text-gray-600">Available</p>
                    </motion.button>
                  ))}
                </div>

                {/* Special Self-Drive Link for Transportation Category */}
                {category.specialLink && onNavigateToSelfDrive && (
                  <motion.button
                    onClick={onNavigateToSelfDrive}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl p-4 text-white shadow-xl hover:shadow-2xl transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                          <Car className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-bold text-base mb-0.5">🚗 Self-Drive Vehicles</h3>
                          <p className="text-white/90 text-xs">Explore at your own pace</p>
                        </div>
                      </div>
                      <ChevronRight className="w-6 h-6 text-white" />
                    </div>
                  </motion.button>
                )}

                {/* Discovery Buttons */}
                <div className="mt-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-4 border-2 border-orange-200">
                  <p className="text-xs font-semibold text-gray-700 mb-3 text-center">
                    🔍 Discover {category.title} Services
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleGoogleSearch(category.title)}
                      className="flex-1 bg-white border-2 border-blue-300 text-blue-700 px-3 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors shadow-sm"
                    >
                      <Map className="w-3 h-3" />
                      Google Search
                    </button>
                    <button
                      onClick={() => handleYouTubeSearch(category.title)}
                      className="flex-1 bg-red-600 text-white px-3 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-sm"
                    >
                      <Youtube className="w-3 h-3" />
                      YouTube Browse
                    </button>
                  </div>
                </div>

                {/* View All Button - Changed to Save Preferences */}
                <Button 
                  variant="outline" 
                  className={`w-full mt-3 rounded-full border-2 hover:bg-gradient-to-r ${category.gradient} hover:text-white hover:border-transparent transition-all`}
                >
                  Save {category.title} Preferences
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Grok AI Assistant Prompt */}
        <Card className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-6 text-white mt-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">Admin-Managed Services</h3>
              <p className="text-white/90 text-sm mb-4">
                All services shown are admin-curated placeholders. Use Google Search and YouTube Browse buttons to discover real service providers for your needs.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleGoogleSearch('travel essentials')}
                  className="flex-1 bg-white border-2 border-blue-300 text-blue-700 px-4 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors shadow-sm"
                >
                  <Map className="w-4 h-4" />
                  Google Search
                </button>
                <button
                  onClick={() => handleYouTubeSearch('travel essentials')}
                  className="flex-1 bg-red-600 text-white px-4 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-sm"
                >
                  <Youtube className="w-4 h-4" />
                  YouTube Browse
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}