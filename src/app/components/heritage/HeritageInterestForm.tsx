import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronRight,
  ChevronDown,
  Check,
  Info,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { HeritageConcessions } from '@/app/components/heritage/HeritageConcessions';

// ========================================
// HERITAGE INTEREST CUSTOMIZATION FORM
// Modal with multi-section form
// Section A: Heritage Theme Selection
// Color Scheme: Cream (#FFF8E1), Gold/Beige, Dark Grey
// ========================================

interface HeritageTheme {
  id: string;
  icon: string;
  label: string;
  specificInterests: string[];
}

interface HeritageInterestFormData {
  primaryTheme: string;
  specificInterest: string;
  // Section B: Group Profile
  travelingAs: string;
  customGroupSize: number;
  ageGroups: string[];
  specialRequirements: string[];
  // Section C: Experience Customization
  experienceType: string;
  specialRequests: string;
  // Section D: Trip Integration
  tripLinkType: string;
  selectedExistingTrip: string;
  preferredStartDate: string;
  preferredEndDate: string;
  flexibleDates: string;
}

interface HeritageInterestFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: HeritageInterestFormData) => void;
}

export function HeritageInterestForm({
  isOpen,
  onClose,
  onSubmit,
}: HeritageInterestFormProps) {
  const [formData, setFormData] = useState<HeritageInterestFormData>({
    primaryTheme: '',
    specificInterest: '',
    travelingAs: '',
    customGroupSize: 1,
    ageGroups: [],
    specialRequirements: [],
    experienceType: '',
    specialRequests: '',
    tripLinkType: '',
    selectedExistingTrip: '',
    preferredStartDate: '',
    preferredEndDate: '',
    flexibleDates: '',
  });

  const [currentSection, setCurrentSection] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [showConcessions, setShowConcessions] = useState(false);

  // Heritage Themes with Dynamic Specific Interests
  const heritageThemes: HeritageTheme[] = [
    {
      id: 'unesco-sites',
      icon: '🏛️',
      label: 'UNESCO Sites',
      specificInterests: [
        'Taj Mahal, Agra',
        'Red Fort, Delhi',
        'Qutub Minar, Delhi',
        'Hampi, Karnataka',
        'Ajanta Caves, Maharashtra',
        'Ellora Caves, Maharashtra',
        'Khajuraho Temples, Madhya Pradesh',
        'Konark Sun Temple, Odisha',
        'Mahabodhi Temple, Bihar',
        'Sanchi Stupa, Madhya Pradesh',
        'Fatehpur Sikri, Uttar Pradesh',
        'Humayun\'s Tomb, Delhi',
        'Agra Fort, Uttar Pradesh',
        'Chhatrapati Shivaji Terminus, Mumbai',
        'Churches & Convents of Goa',
        'Group of Monuments at Pattadakal, Karnataka',
        'Rock Shelters of Bhimbetka, Madhya Pradesh',
        'Champaner-Pavagadh, Gujarat',
        'Rani Ki Vav, Gujarat',
        'Jaipur City, Rajasthan',
      ],
    },
    {
      id: 'archaeological',
      icon: '🏺',
      label: 'Archaeological',
      specificInterests: [
        'Mohenjo-daro Style Sites',
        'Harappan Civilization Sites',
        'Ancient Temple Ruins',
        'Fort Excavations',
        'Buddhist Archaeological Sites',
        'Jain Temple Complexes',
        'Megalithic Sites',
        'Rock-Cut Architecture',
        'Ancient Trade Route Sites',
        'Prehistoric Cave Paintings',
        'Ancient Universities (Nalanda, Takshashila)',
        'Maritime Archaeological Sites',
        'Ancient Port Cities',
        'Stone Inscriptions & Edicts',
        'Ancient Water Structures',
      ],
    },
    {
      id: 'festivals',
      icon: '🎭',
      label: 'Festivals',
      specificInterests: [
        'Diwali Celebrations (Various Cities)',
        'Pushkar Mela, Rajasthan',
        'Hornbill Festival, Nagaland',
        'Kumbh Mela (Prayagraj, Haridwar, Nashik, Ujjain)',
        'Durga Puja, West Bengal',
        'Ganesh Chaturthi, Maharashtra',
        'Onam Festival, Kerala',
        'Pongal, Tamil Nadu',
        'Rath Yatra, Puri',
        'Hemis Festival, Ladakh',
        'Thrissur Pooram, Kerala',
        'Holi Celebrations (Mathura, Vrindavan)',
        'Navratri & Garba, Gujarat',
        'Baisakhi, Punjab',
        'Losar Festival, Tibetan New Year',
        'Surajkund Crafts Mela, Haryana',
        'Marwar Festival, Jodhpur',
        'Desert Festival, Jaisalmer',
        'Bihu Festival, Assam',
        'Tarnetar Fair, Gujarat',
      ],
    },
    {
      id: 'craft-villages',
      icon: '🎨',
      label: 'Craft Villages',
      specificInterests: [
        'Raghurajpur (Pattachitra), Odisha',
        'Channapatna (Wooden Toys), Karnataka',
        'Pochampally (Ikat Weaving), Telangana',
        'Kalamkari Villages, Andhra Pradesh',
        'Blue Pottery Workshops, Jaipur',
        'Pashmina Weaving, Kashmir',
        'Madhubani Painting Villages, Bihar',
        'Warli Art Villages, Maharashtra',
        'Kanchipuram Silk Weavers, Tamil Nadu',
        'Banarasi Silk Weaving, Varanasi',
        'Kutch Embroidery Villages, Gujarat',
        'Terracotta Villages, West Bengal',
        'Metal Craft Villages, Moradabad',
        'Bidriware Artisans, Karnataka',
        'Phulkari Embroidery, Punjab',
        'Bamboo & Cane Craft Villages, Northeast',
        'Meenakari Workshops, Jaipur',
        'Dhokra Metal Casting Villages',
        'Handmade Paper Villages, Rajasthan',
        'Stone Carving Villages, Rajasthan',
      ],
    },
    {
      id: 'living-heritage',
      icon: '🕉️',
      label: 'Living Heritage',
      specificInterests: [
        'Temple Rituals & Aarti Ceremonies',
        'Classical Dance Forms (Bharatanatyam, Kathak, Odissi)',
        'Classical Music Traditions',
        'Vedic Chanting & Recitations',
        'Traditional Theatre (Kathakali, Yakshagana)',
        'Folk Music & Dance Traditions',
        'Sufi Music & Qawwali Traditions',
        'Martial Arts (Kalaripayattu, Thang-Ta)',
        'Traditional Healing Practices',
        'Ancient Meditation Traditions',
        'Traditional Cuisine & Cooking Methods',
        'Hand-Loom Weaving Demonstrations',
        'Traditional Architecture Styles',
        'Folk Storytelling Traditions',
        'Traditional Astronomy & Astrology',
        'Sacred Rituals & Ceremonies',
        'Traditional Festival Celebrations',
        'Indigenous Tribal Traditions',
        'Pastoral & Agricultural Traditions',
        'Traditional Market Systems',
      ],
    },
    {
      id: 'heritage-circuits',
      icon: '🗺️',
      label: 'Circuits',
      specificInterests: [
        'Golden Triangle (Delhi-Agra-Jaipur)',
        'Buddhist Circuit (Bihar, UP, Nepal)',
        'Rajasthan Heritage Circuit',
        'South Indian Temple Circuit',
        'Mughal Heritage Trail',
        'Deccan Heritage Circuit',
        'Northeast Tribal Heritage Trail',
        'Coastal Heritage Circuit (West Coast)',
        'Himalayan Heritage Trail',
        'Punjab Heritage Circuit (Sikh Heritage)',
        'Goa Heritage Circuit',
        'Kerala Backwater Heritage Trail',
        'Ajanta-Ellora-Daulatabad Circuit',
        'Khajuraho-Orchha-Gwalior Circuit',
        'Hampi-Badami-Aihole Circuit',
        'Konkan Heritage Trail',
        'Ladakh Buddhist Circuit',
        'Uttarakhand Temple Circuit',
        'Chhattisgarh Tribal Heritage Circuit',
        'Odisha Temple & Tribal Circuit',
      ],
    },
  ];

  const selectedThemeData = heritageThemes.find((t) => t.id === formData.primaryTheme);

  const handleThemeSelect = (themeId: string) => {
    setFormData({
      ...formData,
      primaryTheme: themeId,
      specificInterest: '', // Reset specific interest when theme changes
    });
  };

  const handleContinue = () => {
    if (currentSection === 'A') {
      setCurrentSection('B');
    } else if (currentSection === 'B') {
      setCurrentSection('C');
    } else if (currentSection === 'C') {
      setCurrentSection('D');
    } else {
      onSubmit(formData);
    }
  };

  const handleBack = () => {
    if (currentSection === 'B') {
      setCurrentSection('A');
    } else if (currentSection === 'C') {
      setCurrentSection('B');
    } else if (currentSection === 'D') {
      setCurrentSection('C');
    }
  };

  const toggleAgeGroup = (ageGroup: string) => {
    setFormData({
      ...formData,
      ageGroups: formData.ageGroups.includes(ageGroup)
        ? formData.ageGroups.filter((ag) => ag !== ageGroup)
        : [...formData.ageGroups, ageGroup],
    });
  };

  const toggleSpecialRequirement = (req: string) => {
    setFormData({
      ...formData,
      specialRequirements: formData.specialRequirements.includes(req)
        ? formData.specialRequirements.filter((r) => r !== req)
        : [...formData.specialRequirements, req],
    });
  };

  const canContinueA = formData.primaryTheme !== '' && formData.specificInterest !== '';
  const canContinueB = formData.travelingAs !== '' && formData.ageGroups.length > 0;
  const canContinueC = formData.experienceType !== '';
  const canContinueD = formData.tripLinkType !== '' && formData.preferredStartDate !== '' && formData.preferredEndDate !== '' && formData.flexibleDates !== '';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-[#FFF8E1] via-[#FFF3D0] to-[#FFE8B8] rounded-3xl shadow-2xl w-full max-w-4xl my-8 border-4 border-amber-500"
          >
            {/* ========================================
                HEADER
            ======================================== */}
            <div className="sticky top-0 bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white p-8 rounded-t-3xl z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                      <span className="text-4xl">🎯</span>
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold">
                        Heritage Interest Customization
                      </h1>
                      <p className="text-lg text-purple-200">
                        Tell us your interests for a personalized heritage itinerary
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors flex-shrink-0 ml-4"
                >
                  <X className="h-7 w-7" />
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1 ${currentSection !== 'A' && 'opacity-50'}`}>
                  <div className={`w-9 h-9 ${currentSection === 'A' ? 'bg-white text-purple-700' : 'bg-white/20 text-white'} rounded-full flex items-center justify-center font-bold text-base`}>
                    A
                  </div>
                  <span className="text-sm font-semibold hidden md:inline">Theme</span>
                </div>
                <ChevronRight className="h-4 w-4 text-purple-300" />
                <div className={`flex items-center gap-1 ${currentSection !== 'B' && 'opacity-50'}`}>
                  <div className={`w-9 h-9 ${currentSection === 'B' ? 'bg-white text-purple-700' : 'bg-white/20 text-white'} rounded-full flex items-center justify-center font-bold text-base`}>
                    B
                  </div>
                  <span className="text-sm font-semibold hidden md:inline">Group</span>
                </div>
                <ChevronRight className="h-4 w-4 text-purple-300" />
                <div className={`flex items-center gap-1 ${currentSection !== 'C' && 'opacity-50'}`}>
                  <div className={`w-9 h-9 ${currentSection === 'C' ? 'bg-white text-purple-700' : 'bg-white/20 text-white'} rounded-full flex items-center justify-center font-bold text-base`}>
                    C
                  </div>
                  <span className="text-sm font-semibold hidden md:inline">Experience</span>
                </div>
                <ChevronRight className="h-4 w-4 text-purple-300" />
                <div className={`flex items-center gap-1 ${currentSection !== 'D' && 'opacity-50'}`}>
                  <div className={`w-9 h-9 ${currentSection === 'D' ? 'bg-white text-purple-700' : 'bg-white/20 text-white'} rounded-full flex items-center justify-center font-bold text-base`}>
                    D
                  </div>
                  <span className="text-sm font-semibold hidden md:inline">Trip</span>
                </div>
              </div>
            </div>

            {/* ========================================
                SECTION A: HERITAGE THEME SELECTION
            ======================================== */}
            {currentSection === 'A' && (
              <div className="p-8 space-y-8">
                {/* Info Banner */}
                <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-6 flex items-start gap-4">
                  <Info className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      📍 Step 1: Choose Your Heritage Interest
                    </h3>
                    <p className="text-base text-gray-700">
                      Select a primary theme and then pick specific destinations or experiences you're interested in.
                    </p>
                  </div>
                </div>

                {/* Primary Theme Selection */}
                <div className="bg-white rounded-2xl shadow-lg border-3 border-purple-300 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="h-7 w-7 text-purple-600" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Select Your Primary Interest
                    </h3>
                  </div>

                  {/* Icon Grid Selection */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {heritageThemes.map((theme) => (
                      <motion.button
                        key={theme.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleThemeSelect(theme.id)}
                        className={`
                          relative p-6 rounded-2xl border-3 transition-all
                          ${
                            formData.primaryTheme === theme.id
                              ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-500 shadow-lg'
                              : 'bg-white border-gray-300 hover:border-purple-400 shadow-md'
                          }
                        `}
                      >
                        {/* Selection Check */}
                        {formData.primaryTheme === theme.id && (
                          <div className="absolute top-3 right-3 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                            <Check className="h-5 w-5 text-white" strokeWidth={3} />
                          </div>
                        )}

                        {/* Icon */}
                        <div className="text-6xl mb-4">{theme.icon}</div>

                        {/* Label */}
                        <p className="text-base font-bold text-gray-900">
                          {theme.label}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Specific Interest Dropdown (Dynamic) */}
                {formData.primaryTheme && selectedThemeData && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg border-3 border-indigo-300 p-8"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                        <span className="text-3xl">{selectedThemeData.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          Select Specific Interest
                        </h3>
                        <p className="text-base text-gray-600">
                          Choose from {selectedThemeData.specificInterests.length} options in {selectedThemeData.label}
                        </p>
                      </div>
                    </div>

                    {/* Dropdown */}
                    <div className="relative">
                      <select
                        value={formData.specificInterest}
                        onChange={(e) =>
                          setFormData({ ...formData, specificInterest: e.target.value })
                        }
                        className="w-full px-6 py-5 border-3 border-indigo-300 rounded-xl text-lg font-semibold text-gray-900 appearance-none cursor-pointer bg-white hover:border-indigo-500 transition-colors"
                      >
                        <option value="">
                          -- Select a specific destination or experience --
                        </option>
                        {selectedThemeData.specificInterests.map((interest, idx) => (
                          <option key={idx} value={interest}>
                            {interest}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 h-6 w-6 text-indigo-600 pointer-events-none" />
                    </div>

                    {/* Selected Preview */}
                    {formData.specificInterest && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 bg-green-50 border-2 border-green-300 rounded-xl p-5 flex items-center gap-4"
                      >
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="h-7 w-7 text-white" strokeWidth={3} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-600 mb-1">
                            Your Selection:
                          </p>
                          <p className="text-lg font-bold text-gray-900">
                            {formData.specificInterest}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Summary Card */}
                {canContinueA && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl border-3 border-amber-400 p-8"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                      <span className="text-3xl">✅</span>
                      Ready to Continue!
                    </h3>
                    <div className="bg-white rounded-xl p-5 border-2 border-amber-300 mb-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-bold text-gray-600 mb-2">Primary Theme:</p>
                          <p className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <span className="text-2xl">{selectedThemeData?.icon}</span>
                            {selectedThemeData?.label}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 mb-2">Specific Interest:</p>
                          <p className="text-base font-semibold text-gray-900">
                            {formData.specificInterest}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-base text-gray-700">
                      Great choice! Next, we'll ask about your travel dates, group size, and preferences.
                    </p>
                  </motion.div>
                )}
              </div>
            )}

            {/* ========================================
                SECTION B: GROUP PROFILE
            ======================================== */}
            {currentSection === 'B' && (
              <div className="p-8 space-y-8">
                {/* Info Banner */}
                <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-6 flex items-start gap-4">
                  <Info className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      📍 Step 2: Provide Group Details
                    </h3>
                    <p className="text-base text-gray-700">
                      Tell us about your group size, age groups, and any special requirements.
                    </p>
                  </div>
                </div>

                {/* Traveling As */}
                <div className="bg-white rounded-2xl shadow-lg border-3 border-purple-300 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="h-7 w-7 text-purple-600" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Traveling As
                    </h3>
                  </div>

                  {/* Radio Buttons */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFormData({ ...formData, travelingAs: 'Family' })}
                      className={`
                        relative p-6 rounded-2xl border-3 transition-all
                        ${
                          formData.travelingAs === 'Family'
                            ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-500 shadow-lg'
                            : 'bg-white border-gray-300 hover:border-purple-400 shadow-md'
                        }
                      `}
                    >
                      {/* Selection Check */}
                      {formData.travelingAs === 'Family' && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <Check className="h-5 w-5 text-white" strokeWidth={3} />
                        </div>
                      )}

                      {/* Icon */}
                      <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>

                      {/* Label */}
                      <p className="text-base font-bold text-gray-900">
                        Family
                      </p>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFormData({ ...formData, travelingAs: 'Friends' })}
                      className={`
                        relative p-6 rounded-2xl border-3 transition-all
                        ${
                          formData.travelingAs === 'Friends'
                            ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-500 shadow-lg'
                            : 'bg-white border-gray-300 hover:border-purple-400 shadow-md'
                        }
                      `}
                    >
                      {/* Selection Check */}
                      {formData.travelingAs === 'Friends' && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <Check className="h-5 w-5 text-white" strokeWidth={3} />
                        </div>
                      )}

                      {/* Icon */}
                      <div className="text-6xl mb-4">👥</div>

                      {/* Label */}
                      <p className="text-base font-bold text-gray-900">
                        Friends
                      </p>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFormData({ ...formData, travelingAs: 'Solo' })}
                      className={`
                        relative p-6 rounded-2xl border-3 transition-all
                        ${
                          formData.travelingAs === 'Solo'
                            ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-500 shadow-lg'
                            : 'bg-white border-gray-300 hover:border-purple-400 shadow-md'
                        }
                      `}
                    >
                      {/* Selection Check */}
                      {formData.travelingAs === 'Solo' && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <Check className="h-5 w-5 text-white" strokeWidth={3} />
                        </div>
                      )}

                      {/* Icon */}
                      <div className="text-6xl mb-4">🚶‍♂️</div>

                      {/* Label */}
                      <p className="text-base font-bold text-gray-900">
                        Solo
                      </p>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFormData({ ...formData, travelingAs: 'Corporate' })}
                      className={`
                        relative p-6 rounded-2xl border-3 transition-all
                        ${
                          formData.travelingAs === 'Corporate'
                            ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-500 shadow-lg'
                            : 'bg-white border-gray-300 hover:border-purple-400 shadow-md'
                        }
                      `}
                    >
                      {/* Selection Check */}
                      {formData.travelingAs === 'Corporate' && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <Check className="h-5 w-5 text-white" strokeWidth={3} />
                        </div>
                      )}

                      {/* Icon */}
                      <div className="text-6xl mb-4">💼</div>

                      {/* Label */}
                      <p className="text-base font-bold text-gray-900">
                        Corporate
                      </p>
                    </motion.button>
                  </div>
                </div>

                {/* Group Size */}
                <div className="bg-white rounded-2xl shadow-lg border-3 border-purple-300 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="h-7 w-7 text-purple-600" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Group Size
                    </h3>
                  </div>

                  {/* Input Field */}
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.customGroupSize}
                      onChange={(e) =>
                        setFormData({ ...formData, customGroupSize: parseInt(e.target.value) })
                      }
                      className="w-full px-6 py-5 border-3 border-indigo-300 rounded-xl text-lg font-semibold text-gray-900 appearance-none cursor-pointer bg-white hover:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Age Groups */}
                <div className="bg-white rounded-2xl shadow-lg border-3 border-purple-300 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="h-7 w-7 text-purple-600" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Age Groups
                    </h3>
                  </div>

                  {/* Checkbox Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleAgeGroup('Children')}
                      className={`
                        relative p-6 rounded-2xl border-3 transition-all
                        ${
                          formData.ageGroups.includes('Children')
                            ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-500 shadow-lg'
                            : 'bg-white border-gray-300 hover:border-purple-400 shadow-md'
                        }
                      `}
                    >
                      {/* Selection Check */}
                      {formData.ageGroups.includes('Children') && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <Check className="h-5 w-5 text-white" strokeWidth={3} />
                        </div>
                      )}

                      {/* Icon */}
                      <div className="text-6xl mb-4">👶</div>

                      {/* Label */}
                      <p className="text-base font-bold text-gray-900">
                        Children
                      </p>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleAgeGroup('Teenagers')}
                      className={`
                        relative p-6 rounded-2xl border-3 transition-all
                        ${
                          formData.ageGroups.includes('Teenagers')
                            ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-500 shadow-lg'
                            : 'bg-white border-gray-300 hover:border-purple-400 shadow-md'
                        }
                      `}
                    >
                      {/* Selection Check */}
                      {formData.ageGroups.includes('Teenagers') && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <Check className="h-5 w-5 text-white" strokeWidth={3} />
                        </div>
                      )}

                      {/* Icon */}
                      <div className="text-6xl mb-4">👦</div>

                      {/* Label */}
                      <p className="text-base font-bold text-gray-900">
                        Teenagers
                      </p>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleAgeGroup('Adults')}
                      className={`
                        relative p-6 rounded-2xl border-3 transition-all
                        ${
                          formData.ageGroups.includes('Adults')
                            ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-500 shadow-lg'
                            : 'bg-white border-gray-300 hover:border-purple-400 shadow-md'
                        }
                      `}
                    >
                      {/* Selection Check */}
                      {formData.ageGroups.includes('Adults') && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <Check className="h-5 w-5 text-white" strokeWidth={3} />
                        </div>
                      )}

                      {/* Icon */}
                      <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>

                      {/* Label */}
                      <p className="text-base font-bold text-gray-900">
                        Adults
                      </p>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleAgeGroup('Seniors')}
                      className={`
                        relative p-6 rounded-2xl border-3 transition-all
                        ${
                          formData.ageGroups.includes('Seniors')
                            ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-500 shadow-lg'
                            : 'bg-white border-gray-300 hover:border-purple-400 shadow-md'
                        }
                      `}
                    >
                      {/* Selection Check */}
                      {formData.ageGroups.includes('Seniors') && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <Check className="h-5 w-5 text-white" strokeWidth={3} />
                        </div>
                      )}

                      {/* Icon */}
                      <div className="text-6xl mb-4">👵</div>

                      {/* Label */}
                      <p className="text-base font-bold text-gray-900">
                        Seniors
                      </p>
                    </motion.button>
                  </div>
                </div>

                {/* Special Requirements */}
                <div className="bg-white rounded-2xl shadow-lg border-3 border-purple-300 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="h-7 w-7 text-purple-600" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Special Requirements
                    </h3>
                  </div>

                  {/* Checkbox Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleSpecialRequirement('Wheelchair Access')}
                      className={`
                        relative p-6 rounded-2xl border-3 transition-all
                        ${
                          formData.specialRequirements.includes('Wheelchair Access')
                            ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-500 shadow-lg'
                            : 'bg-white border-gray-300 hover:border-purple-400 shadow-md'
                        }
                      `}
                    >
                      {/* Selection Check */}
                      {formData.specialRequirements.includes('Wheelchair Access') && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <Check className="h-5 w-5 text-white" strokeWidth={3} />
                        </div>
                      )}

                      {/* Icon */}
                      <div className="text-6xl mb-4">♿</div>

                      {/* Label */}
                      <p className="text-base font-bold text-gray-900">
                        Wheelchair Access
                      </p>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleSpecialRequirement('Vegetarian Meals')}
                      className={`
                        relative p-6 rounded-2xl border-3 transition-all
                        ${
                          formData.specialRequirements.includes('Vegetarian Meals')
                            ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-500 shadow-lg'
                            : 'bg-white border-gray-300 hover:border-purple-400 shadow-md'
                        }
                      `}
                    >
                      {/* Selection Check */}
                      {formData.specialRequirements.includes('Vegetarian Meals') && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <Check className="h-5 w-5 text-white" strokeWidth={3} />
                        </div>
                      )}

                      {/* Icon */}
                      <div className="text-6xl mb-4">🥗</div>

                      {/* Label */}
                      <p className="text-base font-bold text-gray-900">
                        Vegetarian Meals
                      </p>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleSpecialRequirement('Halal Meals')}
                      className={`
                        relative p-6 rounded-2xl border-3 transition-all
                        ${
                          formData.specialRequirements.includes('Halal Meals')
                            ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-500 shadow-lg'
                            : 'bg-white border-gray-300 hover:border-purple-400 shadow-md'
                        }
                      `}
                    >
                      {/* Selection Check */}
                      {formData.specialRequirements.includes('Halal Meals') && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <Check className="h-5 w-5 text-white" strokeWidth={3} />
                        </div>
                      )}

                      {/* Icon */}
                      <div className="text-6xl mb-4">🕌</div>

                      {/* Label */}
                      <p className="text-base font-bold text-gray-900">
                        Halal Meals
                      </p>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleSpecialRequirement('Kosher Meals')}
                      className={`
                        relative p-6 rounded-2xl border-3 transition-all
                        ${
                          formData.specialRequirements.includes('Kosher Meals')
                            ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-500 shadow-lg'
                            : 'bg-white border-gray-300 hover:border-purple-400 shadow-md'
                        }
                      `}
                    >
                      {/* Selection Check */}
                      {formData.specialRequirements.includes('Kosher Meals') && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <Check className="h-5 w-5 text-white" strokeWidth={3} />
                        </div>
                      )}

                      {/* Icon */}
                      <div className="text-6xl mb-4">✡️</div>

                      {/* Label */}
                      <p className="text-base font-bold text-gray-900">
                        Kosher Meals
                      </p>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleSpecialRequirement('Language Interpreter')}
                      className={`
                        relative p-6 rounded-2xl border-3 transition-all
                        ${
                          formData.specialRequirements.includes('Language Interpreter')
                            ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-500 shadow-lg'
                            : 'bg-white border-gray-300 hover:border-purple-400 shadow-md'
                        }
                      `}
                    >
                      {/* Selection Check */}
                      {formData.specialRequirements.includes('Language Interpreter') && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <Check className="h-5 w-5 text-white" strokeWidth={3} />
                        </div>
                      )}

                      {/* Icon */}
                      <div className="text-6xl mb-4">🗣️</div>

                      {/* Label */}
                      <p className="text-base font-bold text-gray-900">
                        Language Interpreter
                      </p>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleSpecialRequirement('Special Dietary Needs')}
                      className={`
                        relative p-6 rounded-2xl border-3 transition-all
                        ${
                          formData.specialRequirements.includes('Special Dietary Needs')
                            ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-500 shadow-lg'
                            : 'bg-white border-gray-300 hover:border-purple-400 shadow-md'
                        }
                      `}
                    >
                      {/* Selection Check */}
                      {formData.specialRequirements.includes('Special Dietary Needs') && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <Check className="h-5 w-5 text-white" strokeWidth={3} />
                        </div>
                      )}

                      {/* Icon */}
                      <div className="text-6xl mb-4">🍽️</div>

                      {/* Label */}
                      <p className="text-base font-bold text-gray-900">
                        Special Dietary Needs
                      </p>
                    </motion.button>
                  </div>
                </div>

                {/* Summary Card */}
                {canContinueB && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl border-3 border-amber-400 p-8"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                      <span className="text-3xl">✅</span>
                      Ready to Continue!
                    </h3>
                    <div className="bg-white rounded-xl p-5 border-2 border-amber-300 mb-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-bold text-gray-600 mb-2">Primary Theme:</p>
                          <p className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <span className="text-2xl">{selectedThemeData?.icon}</span>
                            {selectedThemeData?.label}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 mb-2">Specific Interest:</p>
                          <p className="text-base font-semibold text-gray-900">
                            {formData.specificInterest}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 mb-2">Traveling As:</p>
                          <p className="text-base font-semibold text-gray-900">
                            {formData.travelingAs}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 mb-2">Group Size:</p>
                          <p className="text-base font-semibold text-gray-900">
                            {formData.customGroupSize}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 mb-2">Age Groups:</p>
                          <p className="text-base font-semibold text-gray-900">
                            {formData.ageGroups.join(', ')}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 mb-2">Special Requirements:</p>
                          <p className="text-base font-semibold text-gray-900">
                            {formData.specialRequirements.join(', ')}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-base text-gray-700">
                      Great choice! We have all the information we need to create your personalized heritage itinerary.
                    </p>
                  </motion.div>
                )}
              </div>
            )}

            {/* ========================================
                SECTION C: EXPERIENCE CUSTOMIZATION
            ======================================== */}
            {currentSection === 'C' && (
              <div className="p-8 space-y-8">
                {/* Info Banner */}
                <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-6 flex items-start gap-4">
                  <Info className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      📍 Step 3: Customize Your Experience
                    </h3>
                    <p className="text-base text-gray-700">
                      Tell us about the type of experience you're looking for and any special requests.
                    </p>
                  </div>
                </div>

                {/* Experience Type */}
                <div className="bg-white rounded-2xl shadow-lg border-3 border-purple-300 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="h-7 w-7 text-purple-600" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Experience Type
                    </h3>
                  </div>

                  {/* Radio Buttons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFormData({ ...formData, experienceType: 'Standard Guided Tour' })}
                      className={`
                        relative p-6 rounded-2xl border-3 transition-all
                        ${
                          formData.experienceType === 'Standard Guided Tour'
                            ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-500 shadow-lg'
                            : 'bg-white border-gray-300 hover:border-purple-400 shadow-md'
                        }
                      `}
                    >
                      {/* Selection Check */}
                      {formData.experienceType === 'Standard Guided Tour' && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <Check className="h-5 w-5 text-white" strokeWidth={3} />
                        </div>
                      )}

                      {/* Icon */}
                      <div className="text-6xl mb-4">🚶‍♂️</div>

                      {/* Label */}
                      <p className="text-base font-bold text-gray-900">
                        Standard Guided Tour
                      </p>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFormData({ ...formData, experienceType: 'Premium (Expert Historian + Photo Session)' })}
                      className={`
                        relative p-6 rounded-2xl border-3 transition-all
                        ${
                          formData.experienceType === 'Premium (Expert Historian + Photo Session)'
                            ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-500 shadow-lg'
                            : 'bg-white border-gray-300 hover:border-purple-400 shadow-md'
                        }
                      `}
                    >
                      {/* Selection Check */}
                      {formData.experienceType === 'Premium (Expert Historian + Photo Session)' && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <Check className="h-5 w-5 text-white" strokeWidth={3} />
                        </div>
                      )}

                      {/* Icon */}
                      <div className="text-6xl mb-4">⭐</div>

                      {/* Label */}
                      <p className="text-base font-bold text-gray-900">
                        Premium
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Expert Historian + Photo Session
                      </p>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFormData({ ...formData, experienceType: 'Budget (Audio Guide + Self-Explore)' })}
                      className={`
                        relative p-6 rounded-2xl border-3 transition-all
                        ${
                          formData.experienceType === 'Budget (Audio Guide + Self-Explore)'
                            ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-500 shadow-lg'
                            : 'bg-white border-gray-300 hover:border-purple-400 shadow-md'
                        }
                      `}
                    >
                      {/* Selection Check */}
                      {formData.experienceType === 'Budget (Audio Guide + Self-Explore)' && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <Check className="h-5 w-5 text-white" strokeWidth={3} />
                        </div>
                      )}

                      {/* Icon */}
                      <div className="text-6xl mb-4">💰</div>

                      {/* Label */}
                      <p className="text-base font-bold text-gray-900">
                        Budget
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Audio Guide + Self-Explore
                      </p>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFormData({ ...formData, experienceType: 'Custom (Tell us what you want)' })}
                      className={`
                        relative p-6 rounded-2xl border-3 transition-all
                        ${
                          formData.experienceType === 'Custom (Tell us what you want)'
                            ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-500 shadow-lg'
                            : 'bg-white border-gray-300 hover:border-purple-400 shadow-md'
                        }
                      `}
                    >
                      {/* Selection Check */}
                      {formData.experienceType === 'Custom (Tell us what you want)' && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <Check className="h-5 w-5 text-white" strokeWidth={3} />
                        </div>
                      )}

                      {/* Icon */}
                      <div className="text-6xl mb-4">✨</div>

                      {/* Label */}
                      <p className="text-base font-bold text-gray-900">
                        Custom
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Tell us what you want
                      </p>
                    </motion.button>
                  </div>
                </div>

                {/* Special Requests */}
                <div className="bg-white rounded-2xl shadow-lg border-3 border-purple-300 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="h-7 w-7 text-purple-600" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Special Requests
                    </h3>
                  </div>

                  {/* Text Area */}
                  <div className="relative">
                    <textarea
                      value={formData.specialRequests}
                      onChange={(e) =>
                        setFormData({ ...formData, specialRequests: e.target.value })
                      }
                      rows={6}
                      className="w-full px-6 py-5 border-3 border-indigo-300 rounded-xl text-lg font-semibold text-gray-900 bg-white hover:border-indigo-500 transition-colors resize-none"
                      placeholder="Examples:
• Want to meet local artisans in craft villages
• Include classical dance performance booking
• Need vegetarian meals at all locations
• Require English-speaking guide for seniors"
                    />
                  </div>
                </div>

                {/* Summary Card */}
                {canContinueC && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl border-3 border-amber-400 p-8"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                      <span className="text-3xl">✅</span>
                      Ready to Submit!
                    </h3>
                    <div className="bg-white rounded-xl p-5 border-2 border-amber-300 mb-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-bold text-gray-600 mb-2">Primary Theme:</p>
                          <p className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <span className="text-2xl">{selectedThemeData?.icon}</span>
                            {selectedThemeData?.label}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 mb-2">Specific Interest:</p>
                          <p className="text-base font-semibold text-gray-900">
                            {formData.specificInterest}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 mb-2">Traveling As:</p>
                          <p className="text-base font-semibold text-gray-900">
                            {formData.travelingAs}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 mb-2">Group Size:</p>
                          <p className="text-base font-semibold text-gray-900">
                            {formData.customGroupSize}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 mb-2">Age Groups:</p>
                          <p className="text-base font-semibold text-gray-900">
                            {formData.ageGroups.join(', ')}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 mb-2">Special Requirements:</p>
                          <p className="text-base font-semibold text-gray-900">
                            {formData.specialRequirements.join(', ')}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 mb-2">Experience Type:</p>
                          <p className="text-base font-semibold text-gray-900">
                            {formData.experienceType}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 mb-2">Special Requests:</p>
                          <p className="text-base font-semibold text-gray-900">
                            {formData.specialRequests}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-base text-gray-700">
                      Great choice! We have all the information we need to create your personalized heritage itinerary.
                    </p>
                  </motion.div>
                )}
              </div>
            )}

            {/* ========================================
                SECTION D: TRIP INTEGRATION
            ======================================== */}
            {currentSection === 'D' && (
              <div className="p-8 space-y-8">
                {/* Info Banner */}
                <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-6 flex items-start gap-4">
                  <Info className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      📍 Step 4: Link to Your Trip
                    </h3>
                    <p className="text-base text-gray-700">
                      Create a new trip or add this experience to an existing one, and select your preferred dates.
                    </p>
                  </div>
                </div>

                {/* Link to Your Trip */}
                <div className="bg-white rounded-2xl shadow-lg border-3 border-purple-300 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="h-7 w-7 text-purple-600" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Link to Your Trip
                    </h3>
                  </div>

                  {/* Radio Buttons */}
                  <div className="space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData({ ...formData, tripLinkType: 'Create New Heritage Trip' })}
                      className={`
                        relative w-full p-6 rounded-2xl border-3 transition-all text-left
                        ${
                          formData.tripLinkType === 'Create New Heritage Trip'
                            ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-500 shadow-lg'
                            : 'bg-white border-gray-300 hover:border-purple-400 shadow-md'
                        }
                      `}
                    >
                      {/* Selection Check */}
                      {formData.tripLinkType === 'Create New Heritage Trip' && (
                        <div className="absolute top-6 right-6 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <Check className="h-5 w-5 text-white" strokeWidth={3} />
                        </div>
                      )}

                      <div className="flex items-center gap-4">
                        <div className="text-5xl">🆕</div>
                        <div>
                          <p className="text-lg font-bold text-gray-900">
                            Create New Heritage Trip
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            Start a fresh trip with this heritage experience
                          </p>
                        </div>
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData({ ...formData, tripLinkType: 'Add to Existing Trip' })}
                      className={`
                        relative w-full p-6 rounded-2xl border-3 transition-all text-left
                        ${
                          formData.tripLinkType === 'Add to Existing Trip'
                            ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-500 shadow-lg'
                            : 'bg-white border-gray-300 hover:border-purple-400 shadow-md'
                        }
                      `}
                    >
                      {/* Selection Check */}
                      {formData.tripLinkType === 'Add to Existing Trip' && (
                        <div className="absolute top-6 right-6 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <Check className="h-5 w-5 text-white" strokeWidth={3} />
                        </div>
                      )}

                      <div className="flex items-center gap-4">
                        <div className="text-5xl">📂</div>
                        <div className="flex-1">
                          <p className="text-lg font-bold text-gray-900">
                            Add to Existing Trip
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            Include this in a trip you're already planning
                          </p>
                        </div>
                      </div>
                    </motion.button>

                    {/* Existing Trip Dropdown (Conditional) */}
                    {formData.tripLinkType === 'Add to Existing Trip' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="ml-6 mt-4"
                      >
                        <label className="block text-base font-bold text-gray-900 mb-3">
                          Select Existing Trip:
                        </label>
                        <div className="relative">
                          <select
                            value={formData.selectedExistingTrip}
                            onChange={(e) =>
                              setFormData({ ...formData, selectedExistingTrip: e.target.value })
                            }
                            className="w-full px-6 py-5 border-3 border-indigo-300 rounded-xl text-lg font-semibold text-gray-900 appearance-none cursor-pointer bg-white hover:border-indigo-500 transition-colors"
                          >
                            <option value="">-- Select a trip --</option>
                            <option value="trip-1">My Rajasthan Adventure (Dec 2024)</option>
                            <option value="trip-2">Golden Triangle Tour (Jan 2025)</option>
                            <option value="trip-3">South India Temple Circuit (Feb 2025)</option>
                            <option value="trip-4">Kerala Backwaters & Heritage (Mar 2025)</option>
                          </select>
                          <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 h-6 w-6 text-indigo-600 pointer-events-none" />
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Preferred Dates */}
                <div className="bg-white rounded-2xl shadow-lg border-3 border-purple-300 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="h-7 w-7 text-purple-600" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Preferred Dates
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-base font-bold text-gray-900 mb-3">
                        Start Date:
                      </label>
                      <input
                        type="date"
                        value={formData.preferredStartDate}
                        onChange={(e) =>
                          setFormData({ ...formData, preferredStartDate: e.target.value })
                        }
                        className="w-full px-6 py-5 border-3 border-indigo-300 rounded-xl text-lg font-semibold text-gray-900 bg-white hover:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-base font-bold text-gray-900 mb-3">
                        End Date:
                      </label>
                      <input
                        type="date"
                        value={formData.preferredEndDate}
                        onChange={(e) =>
                          setFormData({ ...formData, preferredEndDate: e.target.value })
                        }
                        className="w-full px-6 py-5 border-3 border-indigo-300 rounded-xl text-lg font-semibold text-gray-900 bg-white hover:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Flexible Dates */}
                <div className="bg-white rounded-2xl shadow-lg border-3 border-purple-300 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="h-7 w-7 text-purple-600" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Flexible Dates
                    </h3>
                  </div>

                  {/* Radio Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFormData({ ...formData, flexibleDates: 'Yes' })}
                      className={`
                        relative p-6 rounded-2xl border-3 transition-all
                        ${
                          formData.flexibleDates === 'Yes'
                            ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-500 shadow-lg'
                            : 'bg-white border-gray-300 hover:border-purple-400 shadow-md'
                        }
                      `}
                    >
                      {/* Selection Check */}
                      {formData.flexibleDates === 'Yes' && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <Check className="h-5 w-5 text-white" strokeWidth={3} />
                        </div>
                      )}

                      {/* Icon */}
                      <div className="text-6xl mb-4">✅</div>

                      {/* Label */}
                      <p className="text-base font-bold text-gray-900">
                        Yes
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        I'm flexible with dates
                      </p>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFormData({ ...formData, flexibleDates: 'No' })}
                      className={`
                        relative p-6 rounded-2xl border-3 transition-all
                        ${
                          formData.flexibleDates === 'No'
                            ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-500 shadow-lg'
                            : 'bg-white border-gray-300 hover:border-purple-400 shadow-md'
                        }
                      `}
                    >
                      {/* Selection Check */}
                      {formData.flexibleDates === 'No' && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <Check className="h-5 w-5 text-white" strokeWidth={3} />
                        </div>
                      )}

                      {/* Icon */}
                      <div className="text-6xl mb-4">📅</div>

                      {/* Label */}
                      <p className="text-base font-bold text-gray-900">
                        No
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        I need these exact dates
                      </p>
                    </motion.button>
                  </div>
                </div>

                {/* Summary Card */}
                {canContinueD && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl border-3 border-amber-400 p-8"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                      <span className="text-3xl">✅</span>
                      Ready to Submit!
                    </h3>
                    <div className="bg-white rounded-xl p-5 border-2 border-amber-300 mb-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-bold text-gray-600 mb-2">Trip Link:</p>
                          <p className="text-base font-semibold text-gray-900">
                            {formData.tripLinkType}
                          </p>
                        </div>
                        {formData.selectedExistingTrip && (
                          <div>
                            <p className="text-sm font-bold text-gray-600 mb-2">Selected Trip:</p>
                            <p className="text-base font-semibold text-gray-900">
                              {formData.selectedExistingTrip}
                            </p>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-bold text-gray-600 mb-2">Start Date:</p>
                          <p className="text-base font-semibold text-gray-900">
                            {formData.preferredStartDate}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 mb-2">End Date:</p>
                          <p className="text-base font-semibold text-gray-900">
                            {formData.preferredEndDate}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 mb-2">Flexible Dates:</p>
                          <p className="text-base font-semibold text-gray-900">
                            {formData.flexibleDates}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-base text-gray-700">
                      Perfect! Your heritage experience request is complete and ready to submit.
                    </p>
                  </motion.div>
                )}
              </div>
            )}

            {/* ========================================
                FOOTER - CONTINUE BUTTON
            ======================================== */}
            <div className="sticky bottom-0 bg-gradient-to-r from-purple-50 to-indigo-50 border-t-3 border-purple-300 p-8 rounded-b-3xl">
              <div className={`${currentSection === 'D' ? 'space-y-4' : 'flex items-center justify-between gap-6'}`}>
                {currentSection === 'A' ? (
                  <>
                    <div>
                      <p className="text-lg font-bold text-gray-900 mb-1">
                        Section A: Theme Selection
                      </p>
                      <p className="text-base text-gray-600">
                        {canContinueA
                          ? '✅ Selection complete - Ready to continue'
                          : '⏳ Please select a theme and specific interest'}
                      </p>
                    </div>
                    <Button
                      onClick={handleContinue}
                      disabled={!canContinueA}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-10 py-6 rounded-2xl text-xl font-bold shadow-2xl"
                    >
                      Continue to Group Profile
                      <ChevronRight className="ml-3 h-7 w-7" />
                    </Button>
                  </>
                ) : currentSection === 'B' ? (
                  <>
                    <Button
                      onClick={handleBack}
                      variant="outline"
                      className="border-3 border-purple-600 text-purple-700 hover:bg-purple-50 px-8 py-6 rounded-2xl text-xl font-bold"
                    >
                      ← Back
                    </Button>
                    <div className="flex-1">
                      <p className="text-lg font-bold text-gray-900 mb-1">
                        Section B: Group Profile
                      </p>
                      <p className="text-base text-gray-600">
                        {canContinueB
                          ? '✅ Profile complete - Ready to continue'
                          : '⏳ Please complete group details'}
                      </p>
                    </div>
                    <Button
                      onClick={handleContinue}
                      disabled={!canContinueB}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-10 py-6 rounded-2xl text-xl font-bold shadow-2xl"
                    >
                      Continue to Experience Customization
                      <ChevronRight className="ml-3 h-7 w-7" />
                    </Button>
                  </>
                ) : currentSection === 'C' ? (
                  <>
                    <Button
                      onClick={handleBack}
                      variant="outline"
                      className="border-3 border-purple-600 text-purple-700 hover:bg-purple-50 px-8 py-6 rounded-2xl text-xl font-bold"
                    >
                      ← Back
                    </Button>
                    <div className="flex-1">
                      <p className="text-lg font-bold text-gray-900 mb-1">
                        Section C: Experience Customization
                      </p>
                      <p className="text-base text-gray-600">
                        {canContinueC
                          ? '✅ Customization complete - Ready to continue'
                          : '⏳ Please complete experience details'}
                      </p>
                    </div>
                    <Button
                      onClick={handleContinue}
                      disabled={!canContinueC}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-10 py-6 rounded-2xl text-xl font-bold shadow-2xl"
                    >
                      Continue to Trip Integration
                      <ChevronRight className="ml-3 h-7 w-7" />
                    </Button>
                  </>
                ) : (
                  <>
                    {/* Back Button and Status */}
                    <div className="flex items-center justify-between gap-6">
                      <Button
                        onClick={handleBack}
                        variant="outline"
                        className="border-3 border-purple-600 text-purple-700 hover:bg-purple-50 px-8 py-6 rounded-2xl text-xl font-bold"
                      >
                        ← Back
                      </Button>
                      <div className="flex-1">
                        <p className="text-lg font-bold text-gray-900 mb-1">
                          Section D: Trip Integration
                        </p>
                        <p className="text-base text-gray-600">
                          {canContinueD
                            ? '✅ Trip details complete - Choose your next step'
                            : '⏳ Please complete trip and date details'}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons - Only show when form is complete */}
                    {canContinueD && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        {/* Primary Button */}
                        <Button
                          onClick={handleContinue}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-6 rounded-2xl text-base font-bold shadow-2xl flex items-center justify-center gap-3"
                        >
                          <Check className="h-6 w-6" />
                          Submit for Custom Itinerary
                        </Button>

                        {/* Secondary Button */}
                        <Button
                          onClick={() => {
                            console.log('Browse Standard Packages clicked');
                          }}
                          variant="outline"
                          className="border-3 border-amber-500 bg-amber-50 text-amber-700 hover:bg-amber-100 px-6 py-6 rounded-2xl text-base font-bold flex items-center justify-center gap-3"
                        >
                          <span className="text-xl">⚡</span>
                          Browse Standard Packages
                        </Button>

                        {/* Link Button */}
                        <Button
                          onClick={() => setShowConcessions(true)}
                          variant="outline"
                          className="border-3 border-indigo-400 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-6 py-6 rounded-2xl text-base font-bold flex items-center justify-center gap-3"
                        >
                          <span className="text-xl">🔍</span>
                          Check Available Concessions
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Heritage Concessions Modal */}
      <HeritageConcessions isOpen={showConcessions} onClose={() => setShowConcessions(false)} />
    </AnimatePresence>
  );
}