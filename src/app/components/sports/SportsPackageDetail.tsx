import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Share2,
  Heart,
  MapPin,
  Calendar,
  Clock,
  Users,
  Star,
  CheckCircle,
  Shield,
  Trophy,
  Utensils,
  Bed,
  Bus,
  Camera,
  Activity,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { SportsPackage } from './SportsPackageListing';

interface SportsPackageDetailProps {
  package: SportsPackage;
  onBack: () => void;
  onBookNow: (pkg: SportsPackage) => void;
}

export function SportsPackageDetail({ 
  package: pkg, 
  onBack, 
  onBookNow 
}: SportsPackageDetailProps) {
  const [expandedSection, setExpandedSection] = useState<string>('itinerary');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [travelers, setTravelers] = useState(1);

  // Sample itinerary - admin manages this
  const itinerary = [
    {
      day: 1,
      title: 'Arrival & Orientation',
      activities: [
        'Check-in at [Admin: Accommodation Name]',
        'Welcome briefing & safety orientation',
        'Equipment distribution & fitting',
        'Evening team building activities',
      ],
      meals: ['Dinner'],
    },
    {
      day: 2,
      title: 'Training & Practice',
      activities: [
        'Morning warm-up & fitness assessment',
        'Skill development session with expert coaches',
        'Lunch break & rest',
        'Afternoon practice drills',
        'Video analysis & feedback session',
      ],
      meals: ['Breakfast', 'Lunch', 'Dinner'],
    },
    {
      day: 3,
      title: 'Advanced Training & Departure',
      activities: [
        'Final training session',
        'Performance evaluation',
        'Certificate distribution',
        'Check-out & departure',
      ],
      meals: ['Breakfast'],
    },
  ];

  const inclusions = [
    { icon: Bed, text: 'Accommodation for 2 nights', category: 'Stay' },
    { icon: Utensils, text: 'All meals as per itinerary', category: 'Meals' },
    { icon: Activity, text: 'Expert coaching & training sessions', category: 'Training' },
    { icon: Shield, text: 'Sports insurance & safety equipment', category: 'Safety' },
    { icon: Bus, text: 'Local transportation', category: 'Transport' },
    { icon: Trophy, text: 'Participation certificate', category: 'Certificate' },
  ];

  const exclusions = [
    'Personal sports gear (available for rent)',
    'Travel insurance',
    'Additional coaching beyond package',
    'Personal expenses',
  ];

  const fitnessRequirements = [
    'Basic cardiovascular fitness',
    'No major medical conditions',
    'Ability to participate in moderate physical activity',
    'Prior experience recommended but not mandatory',
  ];

  const addOns = [
    { id: 'coaching', name: 'Personal 1-on-1 Coaching', price: 3500, icon: Trophy },
    { id: 'gear', name: 'Premium Gear Package', price: 2500, icon: Shield },
    { id: 'photo', name: 'Professional Photography', price: 2000, icon: Camera },
    { id: 'extended', name: 'Extended Stay (+1 Night)', price: 4000, icon: Bed },
  ];

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? '' : section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24">
      {/* Hero Image Header */}
      <div className="relative h-80 bg-gray-200">
        <img 
          src={pkg.image} 
          alt={pkg.name}
          className="w-full h-full object-cover"
        />
        
        {/* Header Controls */}
        <div className="absolute top-0 left-0 right-0 px-6 pt-12 pb-6 bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-center justify-between">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-white bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Back</span>
            </button>
            <div className="flex items-center gap-3">
              <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full">
                <Share2 className="w-5 h-5 text-gray-700" />
              </button>
              <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full">
                <Heart className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Package Badge */}
        {pkg.badge && (
          <div className="absolute top-24 left-6 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            {pkg.badge}
          </div>
        )}
      </div>

      <div className="px-6 -mt-12 relative z-10">
        {/* Main Info Card */}
        <Card className="bg-white rounded-3xl p-6 shadow-2xl mb-6">
          {/* Title & Rating */}
          <div className="flex items-start justify-between mb-3">
            <h1 className="text-2xl font-bold text-gray-900 flex-1 pr-3">{pkg.name}</h1>
            <div className="flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-lg flex-shrink-0">
              <Star className="w-5 h-5 fill-orange-500 text-orange-500" />
              <span className="font-bold text-base">{pkg.rating}</span>
              <span className="text-sm text-gray-500">({pkg.reviewCount})</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <MapPin className="w-5 h-5 text-orange-500" />
            <span className="text-base font-medium">{pkg.location}</span>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-blue-50 rounded-2xl">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-xs text-gray-600">Duration</p>
                <p className="font-semibold text-gray-900">{pkg.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-xs text-gray-600">Group Size</p>
                <p className="font-semibold text-gray-900">{pkg.groupSize}</p>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap gap-2">
            {pkg.highlights.map((highlight, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium flex items-center gap-1.5"
              >
                <CheckCircle className="w-4 h-4" />
                {highlight}
              </span>
            ))}
          </div>
        </Card>

        {/* Collapsible Sections */}
        
        {/* Itinerary Section */}
        <Card className="bg-white rounded-3xl mb-4 overflow-hidden shadow-lg">
          <button
            onClick={() => toggleSection('itinerary')}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-orange-500" />
              <h2 className="text-xl font-bold">Day-by-Day Itinerary</h2>
            </div>
            <ChevronDown className={`w-6 h-6 transition-transform ${expandedSection === 'itinerary' ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {expandedSection === 'itinerary' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 space-y-6">
                  {itinerary.map((day) => (
                    <div key={day.day} className="border-l-4 border-orange-500 pl-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          Day {day.day}
                        </span>
                        <h3 className="font-bold text-lg">{day.title}</h3>
                      </div>
                      <ul className="space-y-2 mb-3">
                        {day.activities.map((activity, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700">
                            <ChevronRight className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{activity}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center gap-2">
                        <Utensils className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Meals: {day.meals.join(', ')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Inclusions Section */}
        <Card className="bg-white rounded-3xl mb-4 overflow-hidden shadow-lg">
          <button
            onClick={() => toggleSection('inclusions')}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <h2 className="text-xl font-bold">What's Included</h2>
            </div>
            <ChevronDown className={`w-6 h-6 transition-transform ${expandedSection === 'inclusions' ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {expandedSection === 'inclusions' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {inclusions.map((item, idx) => {
                      const IconComponent = item.icon;
                      return (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                          <IconComponent className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold text-green-700 uppercase">{item.category}</p>
                            <p className="text-sm text-gray-900">{item.text}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-bold text-sm text-gray-700 mb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Not Included
                    </h3>
                    <ul className="space-y-1">
                      {exclusions.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Fitness Requirements */}
        <Card className="bg-white rounded-3xl mb-4 overflow-hidden shadow-lg">
          <button
            onClick={() => toggleSection('fitness')}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-bold">Fitness & Requirements</h2>
            </div>
            <ChevronDown className={`w-6 h-6 transition-transform ${expandedSection === 'fitness' ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {expandedSection === 'fitness' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <div className={`inline-block px-4 py-2 rounded-full font-semibold mb-4 ${
                    pkg.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    pkg.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    Difficulty: {pkg.difficulty}
                  </div>
                  <ul className="space-y-2">
                    {fitnessRequirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Add-ons Section */}
        <Card className="bg-white rounded-3xl mb-4 overflow-hidden shadow-lg">
          <button
            onClick={() => toggleSection('addons')}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-purple-500" />
              <h2 className="text-xl font-bold">Enhance Your Experience</h2>
            </div>
            <ChevronDown className={`w-6 h-6 transition-transform ${expandedSection === 'addons' ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {expandedSection === 'addons' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 space-y-3">
                  {addOns.map((addon) => {
                    const IconComponent = addon.icon;
                    return (
                      <div key={addon.id} className="flex items-center justify-between p-4 bg-purple-50 rounded-2xl">
                        <div className="flex items-center gap-3">
                          <div className="bg-white p-2 rounded-lg">
                            <IconComponent className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{addon.name}</p>
                            <p className="text-sm text-purple-600 font-bold">+₹{addon.price.toLocaleString()}</p>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-semibold hover:bg-purple-700 transition-all">
                          Add
                        </button>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Contact Card */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-6 text-white shadow-lg mb-6">
          <h3 className="text-lg font-bold mb-3">Have Questions?</h3>
          <p className="text-white/90 text-sm mb-4">Our sports travel experts are here to help!</p>
          <div className="flex gap-3">
            <button className="flex-1 bg-white text-blue-600 rounded-full py-3 font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 transition-all">
              <Phone className="w-4 h-4" />
              Call Now
            </button>
            <button className="flex-1 bg-white/20 backdrop-blur-sm text-white rounded-full py-3 font-semibold flex items-center justify-center gap-2 hover:bg-white/30 transition-all">
              <MessageCircle className="w-4 h-4" />
              Chat
            </button>
          </div>
        </Card>
      </div>

      {/* Fixed Bottom Booking Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 shadow-2xl z-50">
        <div className="flex items-center justify-between gap-4">
          <div>
            {pkg.originalPrice && (
              <span className="text-sm text-gray-400 line-through block">
                ₹{pkg.originalPrice.toLocaleString()}
              </span>
            )}
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-orange-600">
                ₹{pkg.price.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500">per person</span>
            </div>
          </div>
          <Button
            onClick={() => onBookNow(pkg)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 rounded-full font-bold text-lg shadow-lg flex items-center gap-2"
          >
            Book Now
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
