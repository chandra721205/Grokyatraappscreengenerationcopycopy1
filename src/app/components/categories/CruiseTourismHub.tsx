import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import {
  ArrowLeft,
  Ship,
  Users,
  Clock,
  CheckCircle,
  Sparkles,
  Baby,
  Shield,
  Utensils,
  HeartPulse,
  Globe,
  Youtube,
  AlertCircle,
  Anchor,
  Plus,
  Minus,
  Phone,
  X,
  DollarSign,
  Calendar,
  Stethoscope,
  Package,
  Star,
  Waves,
  ChevronDown,
  ChevronUp,
  Info,
  MapPin,
  Thermometer,
  Droplet,
  Sun,
  Wind,
  CircleCheck,
  CircleX,
  Plane,
  Home,
  Coffee,
  Music,
  Camera,
  TrendingUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

// ========================================
// CRUISE & FAMILY FUN – COMPLETE ENHANCEMENT
// ========================================

// 9 SUBCATEGORIES WITH 5 CORE MODULES EACH
// 4-STEP FAMILY DAY PLANNER INTEGRATED

// ========================================
// AGE FILTERS
// ========================================
const ageFilters = [
  { id: 'infants', label: 'Infants (0-3)', color: 'bg-pink-100 text-pink-700' },
  { id: 'kids', label: 'Kids (4-12)', color: 'bg-blue-100 text-blue-700' },
  { id: 'teens', label: 'Teens (13-17)', color: 'bg-purple-100 text-purple-700' },
  { id: 'all', label: 'All Ages', color: 'bg-green-100 text-green-700' },
];

// ========================================
// SUB-CATEGORIES DATA (9 COMPLETE)
// ========================================
const subCategories = [
  {
    id: 1,
    emoji: '🚢',
    title: 'Ocean Cruises',
    tagline: 'The Floating Resort – Hotel + Shows + Travel',
    description: 'Multi-day luxury with entertainment',
    duration: '3-7 days',
    ageRange: 'All ages',
    startingPrice: 25000,
    familyScore: 4.8,
    ageGroups: ['kids', 'teens', 'all'],
    gradient: 'from-blue-500 to-cyan-600',
    routes: 'Mumbai-Goa, Chennai-Andaman, {Popular Routes}',
    bestFor: 'Families wanting everything in one place',
    
    // MODULE 2: Safety
    safety: {
      onboardSafety: [
        'Life jackets for all passengers',
        'Mandatory safety drills',
        '24/7 security personnel',
        'Emergency response team',
      ],
      childSafety: [
        'Childproofed cabins available',
        'Supervised kids clubs (3-12 years)',
        'Lost child protocol with wristbands',
        'Dedicated family zones',
      ],
      waterSafety: [
        'Certified lifeguards on all decks',
        'Age restrictions for pools (supervised 0-3)',
        'Life vests mandatory for water activities',
        'Swimming lessons available',
      ],
      medicalSupport: [
        'Doctor on call 24/7',
        'Medical bay with emergency equipment',
        'Travel insurance partnerships',
        'Medication storage facilities',
      ],
    },
    
    // MODULE 3: What's Included
    included: {
      meals: ['Buffet breakfast, lunch & dinner', 'Kids\' menu available', 'Special diets accommodated', 'Snacks throughout day'],
      entertainment: ['Live shows & performances', 'Kids\' clubs (3-12 yrs)', 'Teen zone activities', 'Poolside movies'],
      accommodation: ['Standard cabin', 'Family suite options', 'Cribs available', 'Connecting rooms'],
    },
    
    // MODULE 4: Grok AI Tips
    grokTips: [
      '⏰ Best season: Oct-Mar for calm seas',
      '💊 Pack motion-sickness pills (especially for kids)',
      '🎟️ Book excursions in advance for 15% discount',
      '👔 Pack one formal outfit for Captain\'s dinner',
    ],
    
    // MODULE 5: Booking
    packagePrice: 25000,
    
    // Additional: Deck Plan
    hasDeckPlan: true,
    hasPortExcursions: true,
    hasMealCustomizer: true,
  },
  {
    id: 2,
    emoji: '⛵',
    title: 'River & Backwater Cruises',
    tagline: 'The Calm Relaxer – No Waves, Pure Peace',
    description: 'Houseboats & scenic journeys',
    duration: '1-3 days',
    ageRange: 'All ages',
    startingPrice: 15000,
    familyScore: 4.9,
    ageGroups: ['infants', 'kids', 'teens', 'all'],
    gradient: 'from-teal-500 to-emerald-600',
    routes: 'Kerala, Ganga, Brahmaputra, {River Routes}',
    bestFor: 'Seniors & Infants',
    
    safety: {
      onboardSafety: [
        'Low-deck design (easy boarding)',
        'Non-slip flooring',
        'Railings throughout',
        'Stable houseboat construction',
      ],
      childSafety: [
        'Baby gates at deck entrances',
        'Soft furnishings (no sharp edges)',
        'Infant-safe life jackets',
        'Supervised viewing areas',
      ],
      waterSafety: [
        'Calm waters only',
        'Life jackets for all',
        'No swimming in rivers',
        'Emergency boat nearby',
      ],
      medicalSupport: [
        'First-aid kit onboard',
        'Nearest hospital contacts',
        'Medication reminders',
        'Infant care support',
      ],
    },
    
    included: {
      meals: ['Traditional home-cooked meals', 'Baby food available', 'Fresh local catch', 'Special diets on request'],
      entertainment: ['Scenic views', 'Cultural performances onshore', 'Fishing activities', 'Bird watching'],
      accommodation: ['Private houseboat cabins', 'Family rooms', 'AC/Non-AC options', 'Baby cribs'],
    },
    
    grokTips: [
      '🌧️ Monsoon season (Jun-Sep) offers lush scenery',
      '🦟 Bring mosquito repellent',
      '📸 Best photo ops at sunrise/sunset',
      '🍲 Try local Kerala cuisine onboard',
    ],
    
    packagePrice: 15000,
    hasDeckPlan: false,
    hasPortExcursions: true,
    hasMealCustomizer: true,
  },
  {
    id: 3,
    emoji: '🏝️',
    title: 'Island Hopping & Coastal Cruises',
    tagline: 'The Active Explorer – Beach to Beach',
    description: 'Multi-stop adventures',
    duration: '2-5 days',
    ageRange: 'Teens & Adults',
    startingPrice: 30000,
    familyScore: 4.5,
    ageGroups: ['teens', 'all'],
    gradient: 'from-cyan-500 to-blue-600',
    routes: '{Island Routes}',
    bestFor: 'Active teens & swimmers',
    
    safety: {
      onboardSafety: [
        'Speed boat safety briefings',
        'Weather monitoring systems',
        'Emergency flares',
        'Communication devices',
      ],
      childSafety: [
        'Age restriction: 8+ recommended',
        'Swim test required',
        'Buddy system enforced',
        'Teen supervision available',
      ],
      waterSafety: [
        'Snorkeling safety gear',
        'Lifeguards at all stops',
        'Swimming ability required',
        'Reef safety briefings',
      ],
      medicalSupport: [
        'Portable medical kit',
        'Emergency evacuation plan',
        'Insurance mandatory',
        'Nearest hospital at each stop',
      ],
    },
    
    included: {
      meals: ['Picnic-style lunches', 'BBQ beach dinners', 'Fresh seafood', 'Hydration packs'],
      entertainment: ['Snorkeling gear', 'Beach games', 'Photography tours', 'Sunset cruises'],
      accommodation: ['Beach resort stays', 'Camping options', 'Boat cabins', 'Hammocks'],
    },
    
    grokTips: [
      '🏊 Mandatory swim test before booking',
      '☀️ Pack reef-safe sunscreen SPF50+',
      '📱 Waterproof phone cases recommended',
      '🐠 Best snorkeling: Early morning',
    ],
    
    packagePrice: 30000,
    hasDeckPlan: false,
    hasPortExcursions: true,
    hasMealCustomizer: false,
  },
  {
    id: 4,
    emoji: '🏄',
    title: 'Water Sports & Adventure Activities',
    tagline: 'High-Energy Aquatic Thrills',
    description: 'Scuba, Jet Ski, Parasailing',
    duration: '2-4 hours',
    ageRange: '12+ years',
    startingPrice: 5000,
    familyScore: 4.3,
    ageGroups: ['teens'],
    gradient: 'from-orange-500 to-amber-600',
    routes: '{Adventure Locations}',
    bestFor: 'Teens & adventure seekers',
    
    safety: {
      onboardSafety: [
        'Safety harnesses mandatory',
        'Equipment inspection before each use',
        'Certified instructors',
        'Emergency stop protocols',
      ],
      childSafety: [
        'Age restriction: 12+ for most activities',
        'Parental consent forms',
        'Height/weight requirements',
        'Swim test mandatory',
      ],
      waterSafety: [
        'Life jackets at all times',
        'Buddy system enforced',
        'Weather checks before activities',
        'Rescue boats on standby',
      ],
      medicalSupport: [
        'Paramedics on-site',
        'First-aid stations',
        'Insurance coverage included',
        'Medical clearance for scuba',
      ],
    },
    
    included: {
      activities: [
        '🤿 Scuba Diving (PADI certified)',
        '🚤 Jet Ski (15 min sessions)',
        '🪂 Parasailing (10 min flights)',
        '🍌 Banana Boat Rides',
        '🏄 Surfing Lessons',
      ],
    },
    
    grokTips: [
      '⚠️ Swimming proficiency required',
      '🏥 Medical certificate needed for scuba',
      '📅 Book weekdays for shorter queues',
      '🌊 Check wave conditions before booking',
    ],
    
    packagePrice: 5000,
    hasSkillFilter: true,
    hasCertificationChecker: true,
    hasWeatherAdvisory: true,
  },
  {
    id: 5,
    emoji: '🌊',
    title: 'Water Parks & Splash Zones',
    tagline: 'Slides, Waves & Splash Pads',
    description: 'Full-day aquatic fun',
    duration: 'Full day',
    ageRange: '0+ years',
    startingPrice: 2000,
    familyScore: 4.7,
    ageGroups: ['infants', 'kids', 'teens', 'all'],
    gradient: 'from-blue-500 to-indigo-600',
    routes: '{Water Park Locations}',
    bestFor: 'All ages (toddler zones available)',
    
    safety: {
      onboardSafety: [
        'Height restrictions on slides',
        'Lifeguards at all pools',
        'Non-slip surfaces',
        'Shallow pools for toddlers',
      ],
      childSafety: [
        'Splash Pads (0-3 years safe)',
        'Baby changing facilities',
        'Lost child wristbands',
        'Supervised kids areas',
      ],
      waterSafety: [
        'Lifeguards every 50 meters',
        'Life jackets for non-swimmers',
        'Wave pool safety instructions',
        'Tube rental included',
      ],
      medicalSupport: [
        'Medical room on-site',
        'Nurse available',
        'Emergency ambulance access',
        'First-aid stations',
      ],
    },
    
    included: {
      activities: [
        '🛝 Water Slides (5+ years)',
        '🌊 Wave Pool',
        '💦 Splash Pads (0-3 years)',
        '🏊 Lazy River',
        '🌈 Kids Play Area',
        '🏐 Pool Volleyball',
      ],
    },
    
    grokTips: [
      '🗓️ Visit Tue-Thu to avoid weekend crowds',
      '☀️ Bring SPF50+ sunscreen (reef-safe)',
      '👟 Water shoes recommended',
      '🍔 Outside food allowed (check rules)',
    ],
    
    packagePrice: 2000,
    hasSkillFilter: false,
    hasCertificationChecker: false,
    hasWeatherAdvisory: true,
  },
  {
    id: 6,
    emoji: '🎢',
    title: 'Theme Parks & Amusement Rides',
    tagline: 'Rollercoasters, Shows & Magic',
    description: 'Full-day family fun',
    duration: 'Full day',
    ageRange: '3+ years',
    startingPrice: 2500,
    familyScore: 4.6,
    ageGroups: ['kids', 'teens', 'all'],
    gradient: 'from-purple-500 to-pink-600',
    routes: '{Theme Park Locations}',
    bestFor: 'Kids & teens',
    
    safety: {
      onboardSafety: [
        'Height/weight restrictions',
        'Safety harnesses inspected',
        'Ride operators certified',
        'Emergency stop buttons',
      ],
      childSafety: [
        'Kiddie rides (3-7 years)',
        'Height checker stations',
        'Lost parent meeting points',
        'Child wristbands',
      ],
      waterSafety: [
        'N/A (dry park)',
      ],
      medicalSupport: [
        'Medical center on-site',
        'Wheelchair accessible',
        'Sensory-friendly hours',
        'Allergy-aware dining',
      ],
    },
    
    included: {
      activities: [
        '🎢 Rollercoasters (height restrictions)',
        '🎠 Family Rides',
        '🎪 Character Meet & Greets',
        '🎭 Live Shows',
        '🎮 Arcade Zone',
        '🍿 Food Court',
      ],
    },
    
    grokTips: [
      '📱 Download park app for queue times',
      '🎟️ Fast Pass available (₹500 extra)',
      '🌧️ Indoor attractions available',
      '📸 Character photo times posted online',
    ],
    
    packagePrice: 2500,
    hasShowSchedule: true,
    hasHeightChecker: true,
    hasQueueTimes: true,
  },
  {
    id: 7,
    emoji: '👨‍👩‍👧‍👦',
    title: 'Onboard & Resort Family Entertainment',
    tagline: 'VR, Arcades & Weather-Proof Fun',
    description: 'Indoor entertainment for all',
    duration: '2-4 hours',
    ageRange: '3+ years',
    startingPrice: 1500,
    familyScore: 4.8,
    ageGroups: ['kids', 'teens', 'all'],
    gradient: 'from-indigo-500 to-purple-600',
    routes: '{Entertainment Venues}',
    bestFor: 'All ages (perfect for rain)',
    mergedFrom: 'Indoor Fun, Kids Clubs absorbed here',
    
    safety: {
      onboardSafety: [
        'Supervised play areas',
        'Soft play zones',
        'Emergency exits marked',
        'Age-appropriate zones',
      ],
      childSafety: [
        'Kids Club (3-12 yrs supervised)',
        'Teen Zone (13-17 yrs)',
        'Child ID check-in/out',
        'Trained staff',
      ],
      waterSafety: [
        'N/A (indoor)',
      ],
      medicalSupport: [
        'First-aid available',
        'Quiet room for sensory needs',
        'Allergy information required',
        'Parent contact always available',
      ],
    },
    
    included: {
      activities: [
        '🥽 VR Experiences',
        '🎮 Arcade Games',
        '🎩 Magic Shows',
        '👶 Kids Club (3-12)',
        '🧑‍🎤 Teen Zone',
        '🎬 Poolside Movies',
        '🎨 Arts & Crafts',
      ],
    },
    
    grokTips: [
      '☔ Perfect backup plan for rainy days',
      '🎫 Book Kids Club in advance (limited spots)',
      '🕒 Teen Zone opens at 3pm',
      '🍕 Food packages available',
    ],
    
    packagePrice: 1500,
    hasShowSchedule: true,
    hasHeightChecker: false,
    hasQueueTimes: false,
  },
  {
    id: 8,
    emoji: '🍽️',
    title: 'Family Dining & Food Experiences',
    tagline: 'Street Food, Cooking Classes & More',
    description: 'Culinary adventures',
    duration: '2-3 hours',
    ageRange: 'All ages',
    startingPrice: 3000,
    familyScore: 4.7,
    ageGroups: ['kids', 'teens', 'all'],
    gradient: 'from-amber-500 to-orange-600',
    routes: '{Dining Locations}',
    bestFor: 'Food lovers & cultural explorers',
    
    safety: {
      onboardSafety: [
        'Food safety certifications',
        'Hygiene ratings displayed',
        'Allergen information available',
        'Temperature-controlled storage',
      ],
      childSafety: [
        'Kids\' cooking classes (supervised)',
        'Plastic utensils for young kids',
        'Child-friendly portions',
        'No-spice options',
      ],
      waterSafety: [
        'N/A',
      ],
      medicalSupport: [
        'Allergy alert system',
        'Dietary restrictions accommodated',
        'Medical-grade kitchens',
        'Emergency contact available',
      ],
    },
    
    included: {
      activities: [
        '🍜 Street Food Tours (Mumbai Chaat, Goa Seafood)',
        '👨‍🍳 Kids Cooking Classes',
        '🍷 Cultural Food Trails',
        '🥗 Dietary Menus (Veg/Jain/Vegan/Gluten-free)',
        '🍰 Dessert Making',
      ],
    },
    
    grokTips: [
      '🌶️ Request spice level adjustments',
      '👶 Baby food available on request',
      '📋 Inform allergies 24hrs in advance',
      '📸 Photography allowed (no flash)',
    ],
    
    packagePrice: 3000,
    hasDietaryFilter: true,
    hasAllergyChecker: true,
  },
  {
    id: 9,
    emoji: '🐚',
    title: 'Beach Leisure & Marine Discovery',
    tagline: 'Glass-Bottom Boats & Dolphin Watching',
    description: 'Relaxed coastal exploration',
    duration: '3-5 hours',
    ageRange: 'All ages',
    startingPrice: 4000,
    familyScore: 4.9,
    ageGroups: ['infants', 'kids', 'teens', 'all'],
    gradient: 'from-teal-500 to-cyan-600',
    routes: '{Coastal Locations}',
    bestFor: 'Non-swimmers & nature lovers',
    
    safety: {
      onboardSafety: [
        'Glass-bottom boats inspected',
        'Life jackets for all',
        'Stable boats only',
        'Weather monitoring',
      ],
      childSafety: [
        'Non-swimmer friendly',
        'Baby carriers allowed',
        'Shaded seating areas',
        'Infant life vests',
      ],
      waterSafety: [
        'No swimming required',
        'Boats stay in calm areas',
        'Dolphin watching from boat',
        'Beach amenities: lifeguards',
      ],
      medicalSupport: [
        'Motion sickness bags',
        'First-aid on boat',
        'Nearest hospital info',
        'Sunburn treatment',
      ],
    },
    
    included: {
      activities: [
        '🚤 Glass-Bottom Boat Rides',
        '🐬 Dolphin Watching',
        '🏖️ Beach Club Access',
        '🏰 Sandcastle Building',
        '🐠 Aquarium Visits',
        '📸 Marine Photography',
      ],
    },
    
    grokTips: [
      '🐬 Dolphin sightings: 7-9am best',
      '🌊 Check tide charts online',
      '☂️ Beach umbrellas, changing rooms available',
      '👶 Infant-safe life vests provided',
    ],
    
    packagePrice: 4000,
    hasBeachAmenities: true,
    hasTideChart: true,
  },
];

// ========================================
// MAIN COMPONENT
// ========================================
interface CruiseTourismHubProps {
  onBack: () => void;
}

export function CruiseTourismHub({ onBack }: CruiseTourismHubProps) {
  const [view, setView] = useState<'home' | 'detail' | 'planner'>('home');
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);
  const [selectedAgeFilters, setSelectedAgeFilters] = useState<string[]>(['all']);
  const [expandedSafety, setExpandedSafety] = useState<string | null>(null);
  const [grokQuestion, setGrokQuestion] = useState('');
  const [ageCheckAge, setAgeCheckAge] = useState<number>(0);
  
  // Family Day Planner States
  const [plannerStep, setPlannerStep] = useState(1);
  const [selectedActivities, setSelectedActivities] = useState<number[]>([]);
  const [familyMembers, setFamilyMembers] = useState<Array<{ name: string; age: number; needs: string }>>([]);
  const [duration, setDuration] = useState(1);
  const [budget, setBudget] = useState(25000);

  const toggleAgeFilter = (filterId: string) => {
    if (filterId === 'all') {
      setSelectedAgeFilters(['all']);
    } else {
      const newFilters = selectedAgeFilters.filter(f => f !== 'all');
      if (newFilters.includes(filterId)) {
        const updated = newFilters.filter(f => f !== filterId);
        setSelectedAgeFilters(updated.length > 0 ? updated : ['all']);
      } else {
        setSelectedAgeFilters([...newFilters, filterId]);
      }
    }
  };

  const filteredSubCategories = subCategories.filter(subCat => {
    if (selectedAgeFilters.includes('all')) return true;
    return selectedAgeFilters.some(filter => subCat.ageGroups.includes(filter));
  });

  const getActivitySuitability = (age: number, subCatId: number) => {
    const subCat = subCategories.find(s => s.id === subCatId);
    if (!subCat) return 'unknown';
    
    if (age === 0) return 'unknown';
    if (age <= 3 && subCat.ageGroups.includes('infants')) return 'suitable';
    if (age >= 4 && age <= 12 && subCat.ageGroups.includes('kids')) return 'suitable';
    if (age >= 13 && age <= 17 && subCat.ageGroups.includes('teens')) return 'suitable';
    if (subCat.ageGroups.includes('all')) return 'suitable';
    return 'not-suitable';
  };

  // FAMILY DAY PLANNER VIEW
  if (view === 'planner') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 pt-12 pb-8 rounded-b-[2rem]">
          <button
            onClick={() => setView('home')}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-6"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Calendar className="w-9 h-9 text-white" />
            </div>
            <div>
              <h1 className="text-white text-3xl font-bold">Build Family Day Planner</h1>
              <p className="text-white/90 text-sm">
                Step {plannerStep} of 4 – Let's plan your perfect day
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`h-2 flex-1 rounded-full ${
                  step <= plannerStep ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 -mt-4 pb-8">
          {/* STEP 1: PICK ACTIVITIES */}
          {plannerStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-white rounded-3xl p-5 shadow-md mb-6">
                <h2 className="text-xl font-bold text-blue-900 mb-2">Step 1: Pick Activities</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Select all activities you'd like to include
                </p>

                <div className="grid grid-cols-1 gap-4">
                  {subCategories.map((subCat) => (
                    <div
                      key={subCat.id}
                      className={`border-2 rounded-2xl p-4 transition-all ${
                        selectedActivities.includes(subCat.id)
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{subCat.emoji}</span>
                        <div className="flex-1">
                          <h3 className="font-bold text-base">{subCat.title}</h3>
                          <p className="text-xs text-gray-600">
                            {subCat.duration} • ₹{subCat.startingPrice.toLocaleString()}
                          </p>
                        </div>
                        <Button
                          onClick={() => {
                            if (selectedActivities.includes(subCat.id)) {
                              setSelectedActivities(selectedActivities.filter(id => id !== subCat.id));
                            } else {
                              setSelectedActivities([...selectedActivities, subCat.id]);
                            }
                          }}
                          className={`h-9 rounded-full text-xs ${
                            selectedActivities.includes(subCat.id)
                              ? 'bg-red-600 hover:bg-red-700'
                              : 'bg-blue-600 hover:bg-blue-700'
                          }`}
                        >
                          {selectedActivities.includes(subCat.id) ? 'Remove' : 'Add to Plan'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedActivities.length > 0 && (
                  <div className="mt-4 p-4 bg-green-50 rounded-2xl">
                    <p className="text-sm font-semibold text-green-700">
                      {selectedActivities.length} activities selected
                    </p>
                    <p className="text-xs text-green-600">
                      Est. Total: ₹
                      {selectedActivities
                        .reduce((sum, id) => {
                          const subCat = subCategories.find(s => s.id === id);
                          return sum + (subCat?.startingPrice || 0);
                        }, 0)
                        .toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              <Button
                onClick={() => setPlannerStep(2)}
                disabled={selectedActivities.length === 0}
                className="w-full h-12 rounded-full font-bold bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
              >
                Next: Add Your Family
              </Button>
            </motion.div>
          )}

          {/* STEP 2: ADD YOUR FAMILY */}
          {plannerStep === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-white rounded-3xl p-5 shadow-md mb-6">
                <h2 className="text-xl font-bold text-blue-900 mb-2">Step 2: Add Your Family</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Help us personalize your experience
                </p>

                <div className="space-y-4 mb-4">
                  {familyMembers.map((member, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{member.name}</p>
                        <p className="text-xs text-gray-600">Age: {member.age} • {member.needs || 'No special needs'}</p>
                      </div>
                      <button
                        onClick={() => setFamilyMembers(familyMembers.filter((_, i) => i !== idx))}
                        className="text-red-600"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => {
                    const name = prompt('Name:');
                    const age = prompt('Age:');
                    const needs = prompt('Special needs (dietary/accessibility):');
                    if (name && age) {
                      setFamilyMembers([...familyMembers, { name, age: parseInt(age), needs: needs || '' }]);
                    }
                  }}
                  variant="outline"
                  className="w-full h-11 rounded-full mb-4"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Family Member
                </Button>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setPlannerStep(1)}
                  variant="outline"
                  className="flex-1 h-12 rounded-full font-bold"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setPlannerStep(3)}
                  disabled={familyMembers.length === 0}
                  className="flex-1 h-12 rounded-full font-bold bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
                >
                  Next: Duration & Budget
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: DURATION & BUDGET */}
          {plannerStep === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-white rounded-3xl p-5 shadow-md mb-6">
                <h2 className="text-xl font-bold text-blue-900 mb-2">Step 3: Duration & Budget</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Customize your trip length and budget
                </p>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Trip Duration: {duration} day{duration > 1 ? 's' : ''}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="7"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 day</span>
                    <span>7 days</span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Budget per person: ₹{budget.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min="5000"
                    max="50000"
                    step="5000"
                    value={budget}
                    onChange={(e) => setBudget(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>₹5,000</span>
                    <span>₹50,000+</span>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-2xl">
                  <p className="text-sm font-semibold text-blue-900 mb-2">Filtered Activities:</p>
                  <p className="text-xs text-blue-700">
                    {selectedActivities.filter(id => {
                      const subCat = subCategories.find(s => s.id === id);
                      return subCat && subCat.startingPrice <= budget;
                    }).length} / {selectedActivities.length} activities within budget
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setPlannerStep(2)}
                  variant="outline"
                  className="flex-1 h-12 rounded-full font-bold"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setPlannerStep(4)}
                  className="flex-1 h-12 rounded-full font-bold bg-blue-600 hover:bg-blue-700"
                >
                  Next: Review & Book
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: REVIEW & BOOK */}
          {plannerStep === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-white rounded-3xl p-5 shadow-md mb-6">
                <h2 className="text-xl font-bold text-blue-900 mb-2">Step 4: Review & Book</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Final itinerary overview
                </p>

                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="font-semibold text-sm mb-2">👨‍👩‍👧 Family Members ({familyMembers.length})</p>
                    {familyMembers.map((m, i) => (
                      <p key={i} className="text-xs text-gray-600">• {m.name} ({m.age} yrs)</p>
                    ))}
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="font-semibold text-sm mb-2">📅 Itinerary</p>
                    <p className="text-xs text-gray-600">Duration: {duration} day(s)</p>
                    <p className="text-xs text-gray-600">Activities: {selectedActivities.length}</p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-xl">
                    <p className="font-semibold text-sm mb-2">💰 Price Breakdown</p>
                    <p className="text-xs text-gray-600 mb-1">
                      Total activities cost: ₹
                      {selectedActivities
                        .reduce((sum, id) => {
                          const subCat = subCategories.find(s => s.id === id);
                          return sum + (subCat?.startingPrice || 0);
                        }, 0)
                        .toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-600">
                      × {familyMembers.length} people = ₹
                      {(selectedActivities.reduce((sum, id) => {
                        const subCat = subCategories.find(s => s.id === id);
                        return sum + (subCat?.startingPrice || 0);
                      }, 0) * familyMembers.length).toLocaleString()}
                    </p>
                  </div>

                  <div className="p-4 border-2 border-blue-200 rounded-xl">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" className="mt-1 w-5 h-5" />
                      <div>
                        <p className="font-semibold text-sm">✅ Safety Checklist Acknowledged</p>
                        <p className="text-xs text-gray-600">
                          I confirm all safety requirements and age restrictions have been reviewed
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setPlannerStep(3)}
                  variant="outline"
                  className="flex-1 h-12 rounded-full font-bold"
                >
                  Back
                </Button>
                <Button
                  onClick={() => {
                    toast.success('Booking confirmed! Check your email for details.');
                    setPlannerStep(1);
                    setView('home');
                  }}
                  className="flex-1 h-12 rounded-full font-bold bg-green-600 hover:bg-green-700"
                >
                  Confirm & Book
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // DETAIL VIEW (5 MODULES PER SUBCATEGORY)
  if (view === 'detail' && selectedSubCategory !== null) {
    const subCat = subCategories.find(s => s.id === selectedSubCategory);
    if (!subCat) return null;

    return (
      <div className="min-h-screen bg-blue-50">
        {/* MODULE 1: HERO WITH KEY METRICS */}
        <div className={`bg-gradient-to-r ${subCat.gradient} px-6 pt-12 pb-8 rounded-b-[2rem]`}>
          <button
            onClick={() => setView('home')}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-6"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-5xl">{subCat.emoji}</span>
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold">{subCat.title}</h1>
              <p className="text-white/90 text-sm italic">{subCat.tagline}</p>
            </div>
          </div>

          {/* Key Metrics Card */}
          <div className="bg-white/95 backdrop-blur rounded-3xl p-5 shadow-xl">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <p className="text-xs text-gray-600 font-semibold">Duration</p>
                </div>
                <p className="text-base font-bold text-blue-900">{subCat.duration}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-green-600" />
                  <p className="text-xs text-gray-600 font-semibold">Age Range</p>
                </div>
                <p className="text-base font-bold text-green-700">{subCat.ageRange}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4 text-amber-600" />
                  <p className="text-xs text-gray-600 font-semibold">Starting Price</p>
                </div>
                <p className="text-base font-bold text-amber-600">₹{subCat.startingPrice.toLocaleString()}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <p className="text-xs text-gray-600 font-semibold">Family Score</p>
                </div>
                <p className="text-base font-bold text-yellow-600">{subCat.familyScore} / 5.0</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-1">
                <strong>Routes:</strong> {subCat.routes}
              </p>
              <p className="text-xs text-green-600 font-semibold">
                ✓ Best for: {subCat.bestFor}
              </p>
            </div>
          </div>
        </div>

        {/* Content Modules */}
        <div className="px-6 -mt-4 pb-8">
          {/* MODULE 2: SAFETY & AGE SUITABILITY SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-5 shadow-md mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-red-600" />
              <h2 className="text-xl font-bold text-blue-900">Safety First – Your Family's Protection</h2>
            </div>

            {/* 4 Safety Sections (Accordion) */}
            <div className="space-y-3">
              {[
                { id: 'onboard', title: '🛡️ Onboard Safety', items: subCat.safety.onboardSafety },
                { id: 'child', title: '👶 Child Safety', items: subCat.safety.childSafety },
                { id: 'water', title: '🌊 Water Safety', items: subCat.safety.waterSafety },
                { id: 'medical', title: '🏥 Medical Support', items: subCat.safety.medicalSupport },
              ].map((section) => (
                <div key={section.id} className="border-2 border-gray-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setExpandedSafety(expandedSafety === section.id ? null : section.id)}
                    className="w-full p-4 flex items-center justify-between bg-gray-50"
                  >
                    <span className="font-semibold text-sm">{section.title}</span>
                    {expandedSafety === section.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </button>

                  <AnimatePresence>
                    {expandedSafety === section.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="p-4 bg-white"
                      >
                        <ul className="space-y-2">
                          {section.items.map((item, idx) => (
                            <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Age Suitability Checker */}
            <div className="mt-6 p-4 bg-blue-50 rounded-2xl">
              <p className="font-semibold text-sm mb-3">🔍 Age Suitability Checker</p>
              <div className="flex gap-3 items-center">
                <input
                  type="number"
                  placeholder="Enter child's age"
                  value={ageCheckAge || ''}
                  onChange={(e) => setAgeCheckAge(parseInt(e.target.value) || 0)}
                  className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-full text-sm"
                />
                <div className="flex items-center gap-2">
                  {getActivitySuitability(ageCheckAge, subCat.id) === 'suitable' && (
                    <>
                      <CircleCheck className="w-6 h-6 text-green-600" />
                      <span className="text-xs font-semibold text-green-700">Suitable</span>
                    </>
                  )}
                  {getActivitySuitability(ageCheckAge, subCat.id) === 'not-suitable' && (
                    <>
                      <CircleX className="w-6 h-6 text-red-600" />
                      <span className="text-xs font-semibold text-red-700">Not Suitable</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* MODULE 3: WHAT'S INCLUDED & ACTIVITIES */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-5 shadow-md mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-blue-900">What's Included in Your Package</h2>
            </div>

            {subCat.included.meals && (
              <div className="mb-6">
                <p className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-amber-600" />
                  Meals
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {subCat.included.meals.map((meal, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{meal}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {subCat.included.entertainment && (
              <div className="mb-6">
                <p className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <Music className="w-4 h-4 text-purple-600" />
                  Entertainment
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {subCat.included.entertainment.map((ent, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{ent}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {subCat.included.accommodation && (
              <div className="mb-6">
                <p className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <Home className="w-4 h-4 text-blue-600" />
                  Accommodation
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {subCat.included.accommodation.map((acc, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{acc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {subCat.included.activities && (
              <div>
                <p className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <Waves className="w-4 h-4 text-cyan-600" />
                  Activities
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {subCat.included.activities.map((act, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* MODULE 4: GROK AI SMART PLANNING PANEL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-5 shadow-xl mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-white" />
              <h2 className="text-xl font-bold text-white">Smart Family Travel Tips</h2>
            </div>

            <div className="space-y-2 mb-4">
              {subCat.grokTips.map((tip, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                  <p className="text-sm text-white/95">{tip}</p>
                </div>
              ))}
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
              <p className="text-xs text-white/90 mb-2 font-semibold">💬 Ask Grok AI a question about your trip</p>
              <input
                type="text"
                placeholder="E.g., What should I pack for ocean cruise?"
                value={grokQuestion}
                onChange={(e) => setGrokQuestion(e.target.value)}
                className="w-full px-4 py-2 rounded-full text-sm bg-white/90 text-gray-900"
              />
              <Button
                onClick={() => {
                  if (grokQuestion) {
                    toast.success('Grok AI is analyzing your question...');
                    setGrokQuestion('');
                  }
                }}
                className="w-full mt-2 h-9 rounded-full bg-white text-purple-600 hover:bg-gray-100 text-xs font-bold"
              >
                Ask Grok AI
              </Button>
            </div>
          </motion.div>

          {/* MODULE 5: BOOKING & PLANNER INTEGRATION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-5 shadow-xl mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-6 h-6 text-white" />
              <h2 className="text-xl font-bold text-white">Ready for Family Fun?</h2>
            </div>

            <div className="mb-4 p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
              <p className="text-sm text-white/90 mb-1">Packages from</p>
              <p className="text-3xl font-bold text-white">₹{subCat.packagePrice.toLocaleString()}</p>
              <p className="text-xs text-white/80">per person (dynamic pricing)</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <Button
                onClick={() => toast.success('Checking availability...')}
                className="w-full h-12 rounded-full font-bold bg-white text-green-600 hover:bg-gray-100"
              >
                Check Availability & Book
              </Button>

              <Button
                onClick={() => {
                  if (!selectedActivities.includes(subCat.id)) {
                    setSelectedActivities([...selectedActivities, subCat.id]);
                  }
                  setView('planner');
                }}
                variant="outline"
                className="w-full h-11 rounded-full font-semibold border-2 border-white text-white hover:bg-white/20"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Add to Family Day Planner
              </Button>

              <Button
                onClick={() => toast.success('Connecting you to an expert...')}
                variant="outline"
                className="w-full h-11 rounded-full font-semibold border-2 border-white text-white hover:bg-white/20"
              >
                <Phone className="w-4 h-4 mr-2" />
                Schedule Call with Expert
              </Button>
            </div>
          </motion.div>

          {/* Additional Enhancements (Subcategory-Specific) */}
          {(subCat.hasDeckPlan || subCat.hasPortExcursions || subCat.hasMealCustomizer) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-3xl p-5 shadow-md mb-6"
            >
              <h3 className="font-bold text-lg text-blue-900 mb-4">🔧 Enhanced Features</h3>
              
              {subCat.hasDeckPlan && (
                <Button
                  onClick={() => toast.info('Deck Plan Visualizer opening...')}
                  variant="outline"
                  className="w-full h-11 rounded-full mb-3"
                >
                  <Ship className="w-4 h-4 mr-2" />
                  View Interactive Deck Plan
                </Button>
              )}

              {subCat.hasPortExcursions && (
                <Button
                  onClick={() => toast.info('Port Excursion Planner opening...')}
                  variant="outline"
                  className="w-full h-11 rounded-full mb-3"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Plan Port Excursions
                </Button>
              )}

              {subCat.hasMealCustomizer && (
                <Button
                  onClick={() => toast.info('Meal Plan Customizer opening...')}
                  variant="outline"
                  className="w-full h-11 rounded-full mb-3"
                >
                  <Utensils className="w-4 h-4 mr-2" />
                  Customize Meal Plan
                </Button>
              )}

              {(subCat.hasSkillFilter || subCat.hasCertificationChecker || subCat.hasWeatherAdvisory) && (
                <>
                  {subCat.hasSkillFilter && (
                    <div className="mb-3 p-3 bg-orange-50 rounded-xl">
                      <p className="text-xs font-semibold text-orange-900 mb-2">Skill Level Filter</p>
                      <div className="flex gap-2">
                        <Badge className="bg-green-100 text-green-700 text-[10px]">Beginner</Badge>
                        <Badge className="bg-blue-100 text-blue-700 text-[10px]">Intermediate</Badge>
                        <Badge className="bg-red-100 text-red-700 text-[10px]">Expert</Badge>
                      </div>
                    </div>
                  )}

                  {subCat.hasCertificationChecker && (
                    <div className="mb-3 p-3 bg-blue-50 rounded-xl">
                      <p className="text-xs font-semibold text-blue-900 mb-1">📜 Certification Required</p>
                      <p className="text-xs text-blue-700">PADI certificate needed for scuba diving</p>
                    </div>
                  )}

                  {subCat.hasWeatherAdvisory && (
                    <div className="p-3 bg-yellow-50 rounded-xl">
                      <p className="text-xs font-semibold text-yellow-900 mb-1">🌤️ Weather Advisory</p>
                      <p className="text-xs text-yellow-700">Activities subject to weather conditions</p>
                    </div>
                  )}
                </>
              )}

              {(subCat.hasShowSchedule || subCat.hasHeightChecker || subCat.hasQueueTimes) && (
                <>
                  {subCat.hasShowSchedule && (
                    <Button
                      onClick={() => toast.info('Show schedule loading...')}
                      variant="outline"
                      className="w-full h-11 rounded-full mb-3"
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      View Show Schedule
                    </Button>
                  )}

                  {subCat.hasHeightChecker && (
                    <div className="mb-3 p-3 bg-purple-50 rounded-xl">
                      <p className="text-xs font-semibold text-purple-900 mb-1">📏 Height Requirement Checker</p>
                      <p className="text-xs text-purple-700">Check ride height restrictions before visiting</p>
                    </div>
                  )}

                  {subCat.hasQueueTimes && (
                    <div className="p-3 bg-cyan-50 rounded-xl">
                      <p className="text-xs font-semibold text-cyan-900 mb-1">⏱️ Real-Time Queue Times</p>
                      <p className="text-xs text-cyan-700">Download park app for live wait times</p>
                    </div>
                  )}
                </>
              )}

              {(subCat.hasDietaryFilter || subCat.hasAllergyChecker) && (
                <>
                  {subCat.hasDietaryFilter && (
                    <div className="mb-3 p-3 bg-green-50 rounded-xl">
                      <p className="text-xs font-semibold text-green-900 mb-2">🥗 Dietary Filters</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-green-100 text-green-700 text-[10px]">Vegan</Badge>
                        <Badge className="bg-amber-100 text-amber-700 text-[10px]">Jain</Badge>
                        <Badge className="bg-yellow-100 text-yellow-700 text-[10px]">Gluten-free</Badge>
                        <Badge className="bg-blue-100 text-blue-700 text-[10px]">Kids Menu</Badge>
                      </div>
                    </div>
                  )}

                  {subCat.hasAllergyChecker && (
                    <div className="p-3 bg-red-50 rounded-xl">
                      <p className="text-xs font-semibold text-red-900 mb-1">⚠️ Allergy Alert System</p>
                      <p className="text-xs text-red-700">Inform allergies 24hrs in advance</p>
                    </div>
                  )}
                </>
              )}

              {(subCat.hasBeachAmenities || subCat.hasTideChart) && (
                <>
                  {subCat.hasBeachAmenities && (
                    <div className="mb-3 p-3 bg-cyan-50 rounded-xl">
                      <p className="text-xs font-semibold text-cyan-900 mb-1">🏖️ Beach Amenities</p>
                      <p className="text-xs text-cyan-700">Umbrellas • Lifeguards • Changing rooms</p>
                    </div>
                  )}

                  {subCat.hasTideChart && (
                    <Button
                      onClick={() => toast.info('Tide chart opening...')}
                      variant="outline"
                      className="w-full h-11 rounded-full"
                    >
                      <Waves className="w-4 h-4 mr-2" />
                      Check Tide Times
                    </Button>
                  )}
                </>
              )}
            </motion.div>
          )}

          {/* Back Button */}
          <div className="text-center">
            <button
              onClick={() => setView('home')}
              className="inline-flex items-center gap-2 text-blue-600 text-sm font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Categories
            </button>
          </div>
        </div>
      </div>
    );
  }

  // HOME SCREEN (71A. Cruise & Family Fun Enhanced)
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 pt-12 pb-8 rounded-b-[2rem]">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-6"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Ship className="w-9 h-9 text-white" />
          </div>
          <div>
            <h1 className="text-white text-3xl font-bold">Cruise & Family Fun</h1>
            <p className="text-white/90 text-sm">
              Ocean adventures, theme parks & water fun for all ages
            </p>
          </div>
        </div>

        {/* Search Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={() => window.open('https://www.google.com/search?q=cruise+tourism+India', '_blank')}
            className="flex-1 bg-white text-cyan-600 hover:bg-gray-100 rounded-full h-9 flex items-center justify-center gap-2 text-sm"
          >
            <Globe className="w-4 h-4" />
            Google Search
          </Button>
          <Button
            onClick={() => window.open('https://www.youtube.com/results?search_query=cruise+vacation+India', '_blank')}
            className="flex-1 bg-white text-red-600 hover:bg-gray-100 rounded-full h-9 flex items-center justify-center gap-2 text-sm"
          >
            <Youtube className="w-4 h-4" />
            YouTube
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-4 pb-8">
        {/* Grok AI Tips Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-5 shadow-xl mb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-white" />
            <h3 className="text-white font-bold text-base">💡 Smart Tip from Grok AI</h3>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3">
            <p className="text-sm text-white/95">
              <strong>Book 3 months early for 20% discount!</strong> Peak season (Oct-Mar) fills up fast. Consider weekdays for theme parks to avoid crowds.
            </p>
          </div>
        </motion.div>

        {/* Age Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-4 shadow-md mb-6"
        >
          <p className="text-sm font-semibold text-gray-700 mb-3">🔍 Filter by Age Group:</p>
          <div className="flex flex-wrap gap-2">
            {ageFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => toggleAgeFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedAgeFilters.includes(filter.id)
                    ? filter.color + ' ring-2 ring-offset-2 ring-blue-500'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 4-Step Planner CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-5 shadow-xl mb-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="w-8 h-8 text-white" />
            <div>
              <h3 className="text-white font-bold text-base">📅 Build Your Perfect Day</h3>
              <p className="text-white/90 text-sm">4-step intelligent planner</p>
            </div>
          </div>

          <Button
            onClick={() => {
              setPlannerStep(1);
              setView('planner');
            }}
            className="w-full bg-white text-green-600 hover:bg-gray-100 rounded-full h-11 font-bold text-sm"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Build Family Day Planner
          </Button>
        </motion.div>

        {/* Header: Choose Your Family Adventure */}
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-blue-900 mb-2">Choose Your Family Adventure</h2>
          <p className="text-sm text-gray-600">
            {filteredSubCategories.length} experiences available
            {selectedAgeFilters.includes('all') ? '' : ` for ${selectedAgeFilters.map(f => ageFilters.find(af => af.id === f)?.label).join(', ')}`}
          </p>
        </div>

        {/* 9 Subcategories Grid */}
        <div className="grid grid-cols-1 gap-5">
          {filteredSubCategories.map((subCat, index) => (
            <motion.div
              key={subCat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="bg-white rounded-3xl p-5 shadow-md hover:shadow-xl transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${subCat.gradient} flex-shrink-0`}>
                  <span className="text-4xl">{subCat.emoji}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1 text-blue-900">{subCat.title}</h3>
                  <p className="text-xs text-gray-600 mb-2">{subCat.description}</p>
                  
                  {/* Key Metrics */}
                  <div className="flex gap-4 mb-2">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-600">{subCat.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-600">{subCat.ageRange}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-bold text-gray-700">{subCat.familyScore}</span>
                    </div>
                    <span className="text-sm font-bold text-blue-600">₹{subCat.startingPrice.toLocaleString()}+</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => {
                  setSelectedSubCategory(subCat.id);
                  setView('detail');
                }}
                className="w-full h-11 rounded-full font-semibold text-sm bg-blue-600 hover:bg-blue-700"
              >
                View Details
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 p-4 bg-white rounded-2xl text-center shadow-md">
          <p className="text-xs text-gray-700">
            <strong>All content is admin-managed.</strong> Destinations, routes, and pricing are dynamic placeholders published by the admin panel.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CruiseTourismHub;
