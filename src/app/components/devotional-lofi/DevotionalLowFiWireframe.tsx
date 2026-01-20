import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Globe,
  Youtube,
  Heart,
  Bell,
  ChevronDown,
  ChevronRight,
  Plus,
  Calendar,
  BookOpen,
  Users,
  Info,
  Sparkles,
  Search,
  Check,
  X,
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Switch } from '@/app/components/ui/switch';
import { Badge } from '@/app/components/ui/badge';
import { toast } from 'sonner';

// ========================================
// LOW-FIDELITY DEVOTIONAL WIREFRAME
// Admin-Editable | Placeholder-Driven
// 9 Religions | Complete Flow
// ========================================

type Religion = 
  | 'sikh'
  | 'christian'
  | 'muslim'
  | 'buddhist'
  | 'jain'
  | 'jewish'
  | 'bahai'
  | 'indigenous'
  | 'parsi';

type Screen =
  | 'faith-selector'
  | 'religion-home'
  | 'destinations'
  | 'group-details'
  | 'package-choice'
  | 'pricing'
  | 'confirmation';

interface ReligionData {
  name: string;
  emoji: string;
  color: string;
  procedures: string[];
  specialDays: SpecialDay[];
  sacredTexts: SacredText[];
}

interface SpecialDay {
  id: string;
  name: string;
  dateRule: string;
  occasionType: string;
  ritualSteps: string[];
  adminDestinationLink: string;
}

interface SacredText {
  id: string;
  name: string;
  excerpt: string;
  useInItinerary: boolean;
}

const religionDatabase: Record<Religion, ReligionData> = {
  sikh: {
    name: 'Sikh Devotees',
    emoji: '☬',
    color: '#FFA726',
    procedures: [
      '[Admin Edit] Cover head with turban/scarf before entry',
      '[Admin Edit] Remove shoes at designated area',
      '[Admin Edit] Langar (community meal) participation etiquette',
      '[Admin Edit] Accessibility: Wheelchair ramps available at most locations',
    ],
    specialDays: [
      {
        id: 'sikh-1',
        name: '[Admin Edit] Vaisakhi',
        dateRule: '[Admin: April 13-14 annually]',
        occasionType: 'Festival',
        ritualSteps: [
          '[Admin Edit] Nagar Kirtan procession',
          '[Admin Edit] Amrit Sanchar ceremony',
          '[Admin Edit] Community seva',
        ],
        adminDestinationLink: '[Admin-Added Destination 1]',
      },
      {
        id: 'sikh-2',
        name: '[Admin Edit] Guru Nanak Gurpurab',
        dateRule: '[Admin: Kartik Purnima - Variable lunar]',
        occasionType: 'Festival',
        ritualSteps: [
          '[Admin Edit] Akhand Path reading',
          '[Admin Edit] Prabhat Pheri early morning procession',
          '[Admin Edit] Langar seva',
        ],
        adminDestinationLink: '[Admin-Added Sacred Site A]',
      },
      {
        id: 'sikh-3',
        name: '[Admin Edit] Hola Mohalla',
        dateRule: '[Admin: Day after Holi - Variable]',
        occasionType: 'Pilgrimage',
        ritualSteps: [
          '[Admin Edit] Martial arts demonstrations',
          '[Admin Edit] Gatka displays',
        ],
        adminDestinationLink: '[Location X]',
      },
    ],
    sacredTexts: [
      {
        id: 'sikh-text-1',
        name: '[Admin Edit] Guru Granth Sahib',
        excerpt: '[Admin Edit] Central holy scripture - 1,430 pages of hymns and teachings',
        useInItinerary: true,
      },
      {
        id: 'sikh-text-2',
        name: '[Admin Edit] Dasam Granth',
        excerpt: '[Admin Edit] Compilation attributed to Guru Gobind Singh',
        useInItinerary: false,
      },
    ],
  },
  
  christian: {
    name: 'Christian Pilgrims',
    emoji: '✝️',
    color: '#64B5F6',
    procedures: [
      '[Admin Edit] Modest dress required (shoulders/knees covered)',
      '[Admin Edit] Silence during Mass/services',
      '[Admin Edit] Candle lighting procedures at shrines',
      '[Admin Edit] Accessibility: Most churches have ramps; contact in advance',
    ],
    specialDays: [
      {
        id: 'christian-1',
        name: '[Admin Edit] Velankanni Festival',
        dateRule: '[Admin: August 29 - September 8 annually]',
        occasionType: 'Festival',
        ritualSteps: [
          '[Admin Edit] 10-day novena prayers',
          '[Admin Edit] Procession with statue',
          '[Admin Edit] Special healing Mass',
        ],
        adminDestinationLink: '[Admin-Added Destination 1]',
      },
      {
        id: 'christian-2',
        name: '[Admin Edit] Feast of St. Thomas',
        dateRule: '[Admin: July 3 annually]',
        occasionType: 'Festival',
        ritualSteps: [
          '[Admin Edit] Special Mass',
          '[Admin Edit] Tomb veneration',
        ],
        adminDestinationLink: '[Admin-Published Sacred Site A]',
      },
    ],
    sacredTexts: [
      {
        id: 'christian-text-1',
        name: '[Admin Edit] The Holy Bible',
        excerpt: '[Admin Edit] Old and New Testament - foundational scripture',
        useInItinerary: true,
      },
    ],
  },

  muslim: {
    name: 'Muslim Travelers',
    emoji: '☪️',
    color: '#66BB6A',
    procedures: [
      '[Admin Edit] Wudu (ablution) before entering prayer area',
      '[Admin Edit] Head covering for women recommended',
      '[Admin Edit] Offer chadar/flowers at dargahs',
      '[Admin Edit] Recite Fatiha and duas',
      '[Admin Edit] Accessibility: Wheelchair access varies; confirm ahead',
    ],
    specialDays: [
      {
        id: 'muslim-1',
        name: '[Admin Edit] Urs Celebration',
        dateRule: '[Admin: Variable Islamic calendar]',
        occasionType: 'Pilgrimage',
        ritualSteps: [
          '[Admin Edit] Ziyarat (shrine visitation)',
          '[Admin Edit] Qawwali devotional music',
          '[Admin Edit] Chadar offering ceremony',
        ],
        adminDestinationLink: '[Admin-Added Destination 1]',
      },
      {
        id: 'muslim-2',
        name: '[Admin Edit] Ramadan Observances',
        dateRule: '[Admin: 9th month Islamic calendar]',
        occasionType: 'Fast',
        ritualSteps: [
          '[Admin Edit] Iftar timing at dargahs',
          '[Admin Edit] Taraweeh prayers',
        ],
        adminDestinationLink: '[Location X]',
      },
    ],
    sacredTexts: [
      {
        id: 'muslim-text-1',
        name: '[Admin Edit] The Holy Quran',
        excerpt: '[Admin Edit] Primary religious text revealed to Prophet Muhammad',
        useInItinerary: true,
      },
    ],
  },

  buddhist: {
    name: 'Buddhist Followers',
    emoji: '☸️',
    color: '#FFA726',
    procedures: [
      '[Admin Edit] Remove shoes before entering temples',
      '[Admin Edit] Clockwise circumambulation of stupas',
      '[Admin Edit] Silence during meditation sessions',
      '[Admin Edit] No photography inside meditation halls',
      '[Admin Edit] Accessibility: Most sites have basic wheelchair access',
    ],
    specialDays: [
      {
        id: 'buddhist-1',
        name: '[Admin Edit] Vesak / Buddha Purnima',
        dateRule: '[Admin: Vaishakha Purnima - Variable lunar]',
        occasionType: 'Festival',
        ritualSteps: [
          '[Admin Edit] Meditation under Bodhi tree',
          '[Admin Edit] Circumambulation rituals',
          '[Admin Edit] Offering of flowers and incense',
        ],
        adminDestinationLink: '[Admin-Added Enlightenment Site 1]',
      },
    ],
    sacredTexts: [
      {
        id: 'buddhist-text-1',
        name: '[Admin Edit] Tripitaka (Pali Canon)',
        excerpt: '[Admin Edit] Complete canonical collection of Buddhist teachings',
        useInItinerary: true,
      },
      {
        id: 'buddhist-text-2',
        name: '[Admin Edit] Dhammapada',
        excerpt: '[Admin Edit] Sayings of the Buddha',
        useInItinerary: true,
      },
    ],
  },

  jain: {
    name: 'Jain Pilgrims',
    emoji: '卐',
    color: '#AB47BC',
    procedures: [
      '[Admin Edit] Remove all leather items (belts, wallets, shoes)',
      '[Admin Edit] Fasting etiquette during pilgrimages',
      '[Admin Edit] No food/water allowed up temple hills',
      '[Admin Edit] Barefoot climb mandatory',
      '[Admin Edit] Accessibility: Doli/palanquin service for seniors - book in advance',
    ],
    specialDays: [
      {
        id: 'jain-1',
        name: '[Admin Edit] Paryushana',
        dateRule: '[Admin: August-September - 8 days for Svetambara]',
        occasionType: 'Fast',
        ritualSteps: [
          '[Admin Edit] Daily fasting and prayer',
          '[Admin Edit] Pratikramana rituals',
          '[Admin Edit] Samvatsari forgiveness ceremony',
        ],
        adminDestinationLink: '[Admin-Added Temple Complex A]',
      },
      {
        id: 'jain-2',
        name: '[Admin Edit] Mahavira Jayanti',
        dateRule: '[Admin: Chaitra Sud 13 - Variable]',
        occasionType: 'Festival',
        ritualSteps: [
          '[Admin Edit] Abhishek ceremony',
          '[Admin Edit] Temple processions',
        ],
        adminDestinationLink: '[Location X]',
      },
    ],
    sacredTexts: [
      {
        id: 'jain-text-1',
        name: '[Admin Edit] Jain Agamas',
        excerpt: '[Admin Edit] Canonical scriptures of Jainism',
        useInItinerary: true,
      },
      {
        id: 'jain-text-2',
        name: '[Admin Edit] Kalpa Sutra',
        excerpt: '[Admin Edit] Lives of Tirthankaras and monastic rules',
        useInItinerary: false,
      },
    ],
  },

  jewish: {
    name: 'Jewish Heritage Travelers',
    emoji: '✡',
    color: '#42A5F5',
    procedures: [
      '[Admin Edit] Men must cover heads (kippah provided)',
      '[Admin Edit] Modest dress required',
      '[Admin Edit] Shabbat restrictions: no travel/photography Friday sunset to Saturday sunset',
      '[Admin Edit] Kosher food options limited - plan ahead',
      '[Admin Edit] Accessibility: Contact synagogues in advance for wheelchair access',
    ],
    specialDays: [
      {
        id: 'jewish-1',
        name: '[Admin Edit] Rosh Hashanah',
        dateRule: '[Admin: 1-2 Tishrei - Variable lunar]',
        occasionType: 'Festival',
        ritualSteps: [
          '[Admin Edit] Shofar blowing',
          '[Admin Edit] Special prayers',
          '[Admin Edit] Tashlich ceremony',
        ],
        adminDestinationLink: '[Admin-Added Heritage Site 1]',
      },
      {
        id: 'jewish-2',
        name: '[Admin Edit] Yom Kippur',
        dateRule: '[Admin: 10 Tishrei - Variable]',
        occasionType: 'Fast',
        ritualSteps: [
          '[Admin Edit] 25-hour fast',
          '[Admin Edit] Kol Nidre service',
        ],
        adminDestinationLink: '[Location X]',
      },
      {
        id: 'jewish-3',
        name: '[Admin Edit] Hanukkah',
        dateRule: '[Admin: 25 Kislev - 8 days]',
        occasionType: 'Festival',
        ritualSteps: [
          '[Admin Edit] Menorah lighting',
          '[Admin Edit] Dreidel games',
        ],
        adminDestinationLink: '[Admin-Published Sacred Site A]',
      },
    ],
    sacredTexts: [
      {
        id: 'jewish-text-1',
        name: '[Admin Edit] Torah',
        excerpt: '[Admin Edit] Five Books of Moses - foundational writings',
        useInItinerary: true,
      },
      {
        id: 'jewish-text-2',
        name: '[Admin Edit] Talmud',
        excerpt: '[Admin Edit] Rabbinic discussions on Jewish law',
        useInItinerary: false,
      },
    ],
  },

  bahai: {
    name: "Bahá'í Visitors",
    emoji: '★',
    color: '#26A69A',
    procedures: [
      '[Admin Edit] STRICT SILENCE in prayer halls',
      '[Admin Edit] No photography inside prayer hall',
      '[Admin Edit] Remove shoes before entering',
      '[Admin Edit] Modest dress required',
      '[Admin Edit] Accessibility: Full wheelchair access available',
    ],
    specialDays: [
      {
        id: 'bahai-1',
        name: "[Admin Edit] Ridván",
        dateRule: '[Admin: April 21 - May 2 - 12 days]',
        occasionType: 'Festival',
        ritualSteps: [
          '[Admin Edit] Prayer and reflection',
          '[Admin Edit] Community gatherings',
        ],
        adminDestinationLink: '[Admin-Added House of Worship 1]',
      },
      {
        id: 'bahai-2',
        name: '[Admin Edit] Naw-Rúz',
        dateRule: '[Admin: March 21 - Vernal Equinox]',
        occasionType: 'Festival',
        ritualSteps: [
          "[Admin Edit] Bahá'í New Year celebration",
          '[Admin Edit] Community feast',
        ],
        adminDestinationLink: '[Location X]',
      },
    ],
    sacredTexts: [
      {
        id: 'bahai-text-1',
        name: '[Admin Edit] Kitáb-i-Aqdas',
        excerpt: "[Admin Edit] Central book of Bahá'í laws and principles",
        useInItinerary: true,
      },
    ],
  },

  indigenous: {
    name: 'Indigenous & Tribal Traditions',
    emoji: '🌿',
    color: '#8BC34A',
    procedures: [
      '[Admin Edit] ETHICAL TOURISM ONLY - book through responsible operators',
      '[Admin Edit] ALWAYS ask permission before photographing people/rituals',
      '[Admin Edit] Respect sacred groves - no plucking plants',
      '[Admin Edit] Entry permissions required for tribal areas',
      '[Admin Edit] Accessibility: Remote locations - limited facilities',
    ],
    specialDays: [
      {
        id: 'indigenous-1',
        name: '[Admin Edit] Sarhul Festival',
        dateRule: '[Admin: Chaitra month - Spring]',
        occasionType: 'Festival',
        ritualSteps: [
          '[Admin Edit] Sal tree worship',
          '[Admin Edit] Traditional dance and music',
          '[Admin Edit] Community gathering',
        ],
        adminDestinationLink: '[Admin-Added Sacred Grove 1]',
      },
      {
        id: 'indigenous-2',
        name: '[Admin Edit] Karam Festival',
        dateRule: '[Admin: August-September]',
        occasionType: 'Festival',
        ritualSteps: [
          '[Admin Edit] Karam tree branch worship',
          '[Admin Edit] Oral storytelling',
        ],
        adminDestinationLink: '[Location X]',
      },
    ],
    sacredTexts: [
      {
        id: 'indigenous-text-1',
        name: '[Admin Note] Oral Traditions',
        excerpt: '[Admin Edit] No written texts - knowledge passed through stories, songs, and rituals',
        useInItinerary: true,
      },
    ],
  },

  parsi: {
    name: 'Parsi Heritage Travelers',
    emoji: '🔥',
    color: '#FF7043',
    procedures: [
      '[Admin Edit] Fire Temple sanctum ONLY for Zoroastrians',
      '[Admin Edit] Non-Parsis can visit museum and heritage walks',
      '[Admin Edit] Remove shoes before entering permitted areas',
      '[Admin Edit] Photography restrictions apply',
      '[Admin Edit] Accessibility: Heritage sites have limited wheelchair access',
    ],
    specialDays: [
      {
        id: 'parsi-1',
        name: '[Admin Edit] Nowruz / Navroz',
        dateRule: '[Admin: March 21 - Vernal Equinox]',
        occasionType: 'Festival',
        ritualSteps: [
          '[Admin Edit] Fire temple prayers',
          '[Admin Edit] Community celebrations',
          '[Admin Edit] Traditional feast',
        ],
        adminDestinationLink: '[Admin-Added Fire Temple Heritage 1]',
      },
      {
        id: 'parsi-2',
        name: '[Admin Edit] Mukhtad / Frawardigan',
        dateRule: '[Admin: Last 10 days of year]',
        occasionType: 'Festival',
        ritualSteps: [
          '[Admin Edit] Prayers for departed souls',
          '[Admin Edit] Fire temple rituals',
        ],
        adminDestinationLink: '[Location X]',
      },
    ],
    sacredTexts: [
      {
        id: 'parsi-text-1',
        name: '[Admin Edit] Avesta',
        excerpt: '[Admin Edit] Collection of ancient Zoroastrian hymns and texts',
        useInItinerary: true,
      },
    ],
  },
};

export function DevotionalLowFiWireframe() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('faith-selector');
  const [selectedReligion, setSelectedReligion] = useState<Religion | null>(null);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [groupSize, setGroupSize] = useState('');
  const [seniorCare, setSeniorCare] = useState(false);
  const [medicalSupport, setMedicalSupport] = useState(false);
  const [packageType, setPackageType] = useState<'existing' | 'custom' | null>(null);
  const [specialRequests, setSpecialRequests] = useState('');
  const [notifyDeals, setNotifyDeals] = useState(false);
  const [notifyBudget, setNotifyBudget] = useState(false);
  const [notifyFestivals, setNotifyFestivals] = useState(false);
  const [showGrokInsights, setShowGrokInsights] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    procedures: true,
    specialDays: true,
    sacredTexts: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleReligionSelect = (religion: Religion) => {
    setSelectedReligion(religion);
    setCurrentScreen('religion-home');
  };

  const handleBack = () => {
    if (currentScreen === 'religion-home') {
      setCurrentScreen('faith-selector');
      setSelectedReligion(null);
    } else if (currentScreen === 'destinations') {
      setCurrentScreen('religion-home');
    } else if (currentScreen === 'group-details') {
      setCurrentScreen('destinations');
    } else if (currentScreen === 'package-choice') {
      setCurrentScreen('group-details');
    } else if (currentScreen === 'pricing') {
      setCurrentScreen('package-choice');
    } else if (currentScreen === 'confirmation') {
      setCurrentScreen('faith-selector');
      setSelectedReligion(null);
      setSelectedDestinations([]);
      setGroupSize('');
      setSeniorCare(false);
      setMedicalSupport(false);
      setPackageType(null);
      setSpecialRequests('');
    }
  };

  const handleSubmitInterest = () => {
    setCurrentScreen('confirmation');
    toast.success('Interest received! We will get back to you shortly.');
  };

  const currentReligion = selectedReligion ? religionDatabase[selectedReligion] : null;

  return (
    <div className="min-h-screen bg-gray-100 font-mono">
      {/* LOW-FI HEADER */}
      <div className="bg-white border-b-4 border-black p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {currentScreen !== 'faith-selector' && (
              <Button
                onClick={handleBack}
                variant="outline"
                className="border-2 border-black"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                BACK
              </Button>
            )}
            <h1 className="text-xl font-bold uppercase tracking-wide">
              DEVOTIONAL TOURISM - LOW-FI WIREFRAME
            </h1>
          </div>
          <Badge className="bg-purple-500 text-white">
            ADMIN EDITABLE
          </Badge>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <AnimatePresence mode="wait">
          {/* SCREEN 1: FAITH SELECTOR */}
          {currentScreen === 'faith-selector' && (
            <motion.div
              key="faith-selector"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white border-4 border-black p-6">
                <h2 className="text-2xl font-bold mb-2 uppercase">Choose Your Faith Journey</h2>
                <p className="text-sm text-gray-600 mb-6">
                  [LAYER GROUP: "Devotional – Rectified (Rituals + Special Days + Admin-Driven)"]
                </p>
                
                <div className="grid grid-cols-3 gap-4">
                  {(Object.keys(religionDatabase) as Religion[]).map((religion) => {
                    const data = religionDatabase[religion];
                    return (
                      <button
                        key={religion}
                        onClick={() => handleReligionSelect(religion)}
                        className="border-4 border-black p-6 hover:bg-gray-100 transition-colors text-center"
                        style={{ backgroundColor: data.color + '20' }}
                      >
                        <div className="text-5xl mb-3">{data.emoji}</div>
                        <div className="font-bold text-sm uppercase">{data.name}</div>
                        <div className="text-xs text-gray-600 mt-2">
                          [CLICKABLE TILE]
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 p-4 bg-yellow-100 border-2 border-yellow-600">
                  <p className="text-xs font-bold">
                    ⚠️ LOCK RULE: Hindu Pilgrims NOT shown here (separate flow). 
                    No other categories (Adventure, Wellness, etc.) affected.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* SCREEN 2: RELIGION HOME */}
          {currentScreen === 'religion-home' && currentReligion && (
            <motion.div
              key="religion-home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Religion Header */}
              <div className="bg-white border-4 border-black p-6" style={{ borderTopColor: currentReligion.color }}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-6xl">{currentReligion.emoji}</div>
                  <div>
                    <h2 className="text-3xl font-bold uppercase">{currentReligion.name}</h2>
                    <p className="text-sm text-gray-600">Religion Home Screen</p>
                  </div>
                </div>

                {/* Browse Buttons */}
                <div className="flex gap-3 mt-4">
                  <Button className="flex-1 border-2 border-black bg-white text-black hover:bg-gray-100">
                    <Globe className="mr-2 h-4 w-4" />
                    GOOGLE SEARCH
                  </Button>
                  <Button className="flex-1 border-2 border-black bg-white text-black hover:bg-gray-100">
                    <Youtube className="mr-2 h-4 w-4" />
                    YOUTUBE BROWSE
                  </Button>
                  <Button className="border-2 border-black bg-white text-black hover:bg-red-100">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* MODULE A: Religious Procedures & Etiquette */}
              <div className="bg-white border-4 border-black">
                <button
                  onClick={() => toggleSection('procedures')}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    <h3 className="font-bold uppercase">MODULE A: Religious Procedures & Etiquette</h3>
                  </div>
                  <ChevronDown className={`h-5 w-5 transition-transform ${expandedSections.procedures ? 'rotate-180' : ''}`} />
                </button>
                
                {expandedSections.procedures && (
                  <div className="p-4 border-t-2 border-black space-y-3">
                    {currentReligion.procedures.map((procedure, index) => (
                      <div key={index} className="border-2 border-dashed border-gray-400 p-3 bg-gray-50">
                        <div className="flex items-start gap-2">
                          <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">{procedure}</p>
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-4 flex items-center justify-between p-3 border-2 border-black">
                      <span className="text-sm font-bold">Senior Care Considerations</span>
                      <Switch checked={seniorCare} onCheckedChange={setSeniorCare} />
                    </div>
                  </div>
                )}
              </div>

              {/* MODULE B: Rituals & Special Days Calendar */}
              <div className="bg-white border-4 border-black">
                <button
                  onClick={() => toggleSection('specialDays')}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <h3 className="font-bold uppercase">MODULE B: Rituals & Special Days Calendar</h3>
                  </div>
                  <ChevronDown className={`h-5 w-5 transition-transform ${expandedSections.specialDays ? 'rotate-180' : ''}`} />
                </button>
                
                {expandedSections.specialDays && (
                  <div className="p-4 border-t-2 border-black space-y-4">
                    {currentReligion.specialDays.map((day) => (
                      <div key={day.id} className="border-2 border-black p-4 bg-blue-50">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-bold text-lg">{day.name}</h4>
                            <p className="text-xs text-gray-600 mt-1">{day.dateRule}</p>
                          </div>
                          <Badge className="bg-black text-white">{day.occasionType}</Badge>
                        </div>
                        
                        <div className="mb-3">
                          <p className="text-xs font-bold mb-2">RITUAL STEPS:</p>
                          <ul className="space-y-1">
                            {day.ritualSteps.map((step, idx) => (
                              <li key={idx} className="text-sm flex items-start gap-2">
                                <span className="font-bold">{idx + 1}.</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="p-2 bg-yellow-100 border border-yellow-600 text-xs">
                          📍 Destination Link: {day.adminDestinationLink}
                        </div>
                      </div>
                    ))}
                    
                    <Button className="w-full border-2 border-black bg-white text-black hover:bg-gray-100">
                      <Plus className="mr-2 h-4 w-4" />
                      [ADMIN: ADD NEW SPECIAL DAY]
                    </Button>
                  </div>
                )}
              </div>

              {/* MODULE C: Sacred Text References */}
              <div className="bg-white border-4 border-black">
                <button
                  onClick={() => toggleSection('sacredTexts')}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    <h3 className="font-bold uppercase">MODULE C: Sacred Text References</h3>
                  </div>
                  <ChevronDown className={`h-5 w-5 transition-transform ${expandedSections.sacredTexts ? 'rotate-180' : ''}`} />
                </button>
                
                {expandedSections.sacredTexts && (
                  <div className="p-4 border-t-2 border-black space-y-3">
                    {currentReligion.sacredTexts.map((text) => (
                      <div key={text.id} className="border-2 border-dashed border-gray-400 p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold">{text.name}</h4>
                          <Switch 
                            checked={text.useInItinerary}
                            disabled
                          />
                        </div>
                        <p className="text-sm text-gray-700">{text.excerpt}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          Use in itinerary planning: {text.useInItinerary ? 'YES' : 'NO'}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* MODULE D: Interest Capture */}
              <div className="bg-white border-4 border-black p-6">
                <h3 className="font-bold uppercase mb-4 flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  MODULE D: Save Interest & Notifications
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      What do you want to visit / why / constraints?
                    </label>
                    <textarea
                      className="w-full border-2 border-black p-2 font-mono text-sm"
                      rows={3}
                      placeholder="[User input field - Admin can see submissions]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="flex items-center justify-between p-3 border-2 border-black cursor-pointer hover:bg-gray-50">
                      <span className="text-sm font-bold flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        Notify me about deals
                      </span>
                      <Switch checked={notifyDeals} onCheckedChange={setNotifyDeals} />
                    </label>
                    
                    <label className="flex items-center justify-between p-3 border-2 border-black cursor-pointer hover:bg-gray-50">
                      <span className="text-sm font-bold flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        Notify me when budget matches
                      </span>
                      <Switch checked={notifyBudget} onCheckedChange={setNotifyBudget} />
                    </label>
                    
                    <label className="flex items-center justify-between p-3 border-2 border-black cursor-pointer hover:bg-gray-50">
                      <span className="text-sm font-bold flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        Notify me about festival dates
                      </span>
                      <Switch checked={notifyFestivals} onCheckedChange={setNotifyFestivals} />
                    </label>
                  </div>
                </div>
              </div>

              {/* Grok AI Insights */}
              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 border-4 border-black p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold uppercase flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    GROK AI INSIGHTS
                  </h3>
                  <Button
                    onClick={() => setShowGrokInsights(!showGrokInsights)}
                    className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-purple-600"
                  >
                    {showGrokInsights ? 'HIDE' : 'ASK GROK'}
                  </Button>
                </div>
                
                {showGrokInsights && (
                  <div className="space-y-3 mt-4">
                    <div className="bg-white text-black p-4 border-2 border-black">
                      <p className="text-sm font-bold mb-2">🌤️ Best Season:</p>
                      <p className="text-sm">[Grok AI: October to March recommended for most locations]</p>
                    </div>
                    
                    <div className="bg-white text-black p-4 border-2 border-black">
                      <p className="text-sm font-bold mb-2">👥 Crowd Avoidance:</p>
                      <p className="text-sm">[Grok AI: Visit on weekdays; avoid peak festival dates unless participating]</p>
                    </div>
                    
                    <div className="bg-white text-black p-4 border-2 border-black">
                      <p className="text-sm font-bold mb-2">♿ Senior-Friendly Routing:</p>
                      <p className="text-sm">[Grok AI: Wheelchair access available at {currentReligion.procedures.find(p => p.includes('Accessibility'))?.split(':')[1] || 'most locations'}]</p>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1 border-2 border-white bg-white text-purple-600 hover:bg-gray-100">
                        APPLY TO PLAN
                      </Button>
                      <Button className="flex-1 border-2 border-white bg-transparent text-white hover:bg-white hover:text-purple-600">
                        SAVE INSIGHT
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Next Step Button */}
              <Button
                onClick={() => setCurrentScreen('destinations')}
                className="w-full border-4 border-black bg-black text-white hover:bg-gray-800 h-14 text-lg"
              >
                CONTINUE TO DESTINATION SELECTION
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          )}

          {/* SCREEN 3: DESTINATIONS */}
          {currentScreen === 'destinations' && currentReligion && (
            <motion.div
              key="destinations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white border-4 border-black p-6">
                <h2 className="text-2xl font-bold mb-4 uppercase">
                  STEP 1: Select Destination(s)
                </h2>
                
                <div className="mb-6 p-4 bg-yellow-100 border-2 border-yellow-600">
                  <p className="text-sm font-bold">
                    ⚠️ NO REAL PLACE NAMES: All destinations are admin-added placeholders. 
                    Users discover via Google/YouTube browse.
                  </p>
                </div>

                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <label
                      key={num}
                      className="flex items-center gap-3 p-4 border-2 border-black cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        className="w-5 h-5"
                        checked={selectedDestinations.includes(`dest-${num}`)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedDestinations([...selectedDestinations, `dest-${num}`]);
                          } else {
                            setSelectedDestinations(selectedDestinations.filter(d => d !== `dest-${num}`));
                          }
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-bold">[Admin-Added Destination {num}]</p>
                        <p className="text-xs text-gray-600">[Admin can edit location details]</p>
                      </div>
                      <Badge className="bg-gray-200 text-black">PLACEHOLDER</Badge>
                    </label>
                  ))}
                </div>

                <div className="mt-6 flex gap-3">
                  <Button className="flex-1 border-2 border-black bg-white text-black hover:bg-gray-100">
                    <Globe className="mr-2 h-4 w-4" />
                    BROWSE GOOGLE
                  </Button>
                  <Button className="flex-1 border-2 border-black bg-white text-black hover:bg-gray-100">
                    <Youtube className="mr-2 h-4 w-4" />
                    BROWSE YOUTUBE
                  </Button>
                </div>
              </div>

              <Button
                onClick={() => setCurrentScreen('group-details')}
                disabled={selectedDestinations.length === 0}
                className="w-full border-4 border-black bg-black text-white hover:bg-gray-800 h-14 text-lg disabled:opacity-50"
              >
                CONTINUE TO GROUP DETAILS
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          )}

          {/* SCREEN 4: GROUP DETAILS */}
          {currentScreen === 'group-details' && (
            <motion.div
              key="group-details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white border-4 border-black p-6">
                <h2 className="text-2xl font-bold mb-6 uppercase">
                  STEP 2: Group Details
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold mb-2 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      GROUP SIZE
                    </label>
                    <Input
                      type="number"
                      className="w-full border-2 border-black font-mono"
                      placeholder="Enter number of people"
                      value={groupSize}
                      onChange={(e) => setGroupSize(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">AGE MIX</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['Children', 'Adults', 'Seniors', 'Mixed'].map((age) => (
                        <button
                          key={age}
                          className="p-3 border-2 border-black hover:bg-gray-100 text-sm font-bold"
                        >
                          {age}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 border-2 border-black cursor-pointer hover:bg-gray-50">
                      <span className="text-sm font-bold">♿ Senior Care Required</span>
                      <Switch checked={seniorCare} onCheckedChange={setSeniorCare} />
                    </label>
                    
                    <label className="flex items-center justify-between p-4 border-2 border-black cursor-pointer hover:bg-gray-50">
                      <span className="text-sm font-bold">❤️ Medical Support 24/7</span>
                      <Switch checked={medicalSupport} onCheckedChange={setMedicalSupport} />
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">SPECIAL REQUESTS</label>
                    <textarea
                      className="w-full border-2 border-black p-3 font-mono text-sm"
                      rows={4}
                      placeholder="[Any dietary restrictions, accessibility needs, ritual participation preferences, etc.]"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setCurrentScreen('package-choice')}
                disabled={!groupSize}
                className="w-full border-4 border-black bg-black text-white hover:bg-gray-800 h-14 text-lg disabled:opacity-50"
              >
                CONTINUE TO PACKAGE SELECTION
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          )}

          {/* SCREEN 5: PACKAGE CHOICE */}
          {currentScreen === 'package-choice' && (
            <motion.div
              key="package-choice"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white border-4 border-black p-6">
                <h2 className="text-2xl font-bold mb-6 uppercase">
                  STEP 3: Choose Package Type
                </h2>
                
                <div className="space-y-4">
                  <button
                    onClick={() => setPackageType('existing')}
                    className={`w-full p-6 border-4 border-black text-left hover:bg-gray-50 ${
                      packageType === 'existing' ? 'bg-green-100' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold">OPTION A: Choose Existing Package</h3>
                      {packageType === 'existing' && (
                        <Check className="h-6 w-6 text-green-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      [Admin Curated Package] - Pre-designed itineraries with fixed pricing
                    </p>
                    <div className="mt-4 p-3 bg-blue-50 border-2 border-blue-300">
                      <p className="text-xs font-bold mb-2">INCLUDES:</p>
                      <ul className="text-xs space-y-1">
                        <li>✓ Guided tours at [Admin-Added Destinations]</li>
                        <li>✓ Ritual support services</li>
                        <li>✓ Accommodation & meals</li>
                        <li>✓ Festival participation (if dates align)</li>
                      </ul>
                    </div>
                  </button>

                  <button
                    onClick={() => setPackageType('custom')}
                    className={`w-full p-6 border-4 border-black text-left hover:bg-gray-50 ${
                      packageType === 'custom' ? 'bg-purple-100' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold">OPTION B: Request Custom Plan</h3>
                      {packageType === 'custom' && (
                        <Check className="h-6 w-6 text-purple-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      [Grok AI Powered] - Personalized itinerary based on your inputs
                    </p>
                    <div className="mt-4 p-3 bg-purple-50 border-2 border-purple-300">
                      <p className="text-xs font-bold mb-2 flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        GROK AI WILL OPTIMIZE FOR:
                      </p>
                      <ul className="text-xs space-y-1">
                        <li>✓ Your budget constraints</li>
                        <li>✓ Senior care & accessibility needs</li>
                        <li>✓ Festival dates alignment</li>
                        <li>✓ Special ritual participation requests</li>
                      </ul>
                    </div>
                  </button>
                </div>
              </div>

              <Button
                onClick={() => setCurrentScreen('pricing')}
                disabled={!packageType}
                className="w-full border-4 border-black bg-black text-white hover:bg-gray-800 h-14 text-lg disabled:opacity-50"
              >
                CONTINUE TO PRICING
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          )}

          {/* SCREEN 6: PRICING */}
          {currentScreen === 'pricing' && (
            <motion.div
              key="pricing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white border-4 border-black p-6">
                <h2 className="text-2xl font-bold mb-6 uppercase">
                  STEP 4: Pricing Estimate
                </h2>
                
                <div className="p-6 bg-yellow-100 border-4 border-yellow-600 mb-6">
                  <p className="text-sm font-bold mb-2">
                    📊 ESTIMATED RANGE (Admin Provided)
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">₹[XX,XXX]</span>
                    <span className="text-xl">to</span>
                    <span className="text-4xl font-bold">₹[XX,XXX]</span>
                  </div>
                  <p className="text-xs mt-2 text-gray-700">
                    Per person | Based on group size: {groupSize} | {packageType === 'existing' ? 'Existing Package' : 'Custom Plan'}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-4 border-2 border-black">
                    <h3 className="font-bold text-sm mb-3">PRICING BREAKDOWN (ADMIN EDITABLE)</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Accommodation</span>
                        <span className="font-bold">₹[X,XXX]</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Transport</span>
                        <span className="font-bold">₹[X,XXX]</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Guided Tours & Ritual Support</span>
                        <span className="font-bold">₹[X,XXX]</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Meals</span>
                        <span className="font-bold">₹[X,XXX]</span>
                      </div>
                      {seniorCare && (
                        <div className="flex justify-between text-purple-600">
                          <span>♿ Senior Care Services</span>
                          <span className="font-bold">₹[X,XXX]</span>
                        </div>
                      )}
                      {medicalSupport && (
                        <div className="flex justify-between text-red-600">
                          <span>❤️ Medical Support 24/7</span>
                          <span className="font-bold">₹[X,XXX]</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border-2 border-blue-300">
                    <p className="text-xs font-bold mb-2">💡 NOTE:</p>
                    <p className="text-xs">
                      No payment required at this stage. This is an INTEREST/REQUEST submission only. 
                      Final pricing will be provided after Grok AI planning.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSubmitInterest}
                className="w-full border-4 border-black bg-green-600 text-white hover:bg-green-700 h-14 text-lg"
              >
                SUBMIT INTEREST / REQUEST
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          )}

          {/* SCREEN 7: CONFIRMATION */}
          {currentScreen === 'confirmation' && currentReligion && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              <div className="bg-white border-4 border-green-600 p-8 text-center">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="h-12 w-12 text-white" />
                </div>
                
                <h2 className="text-3xl font-bold mb-4 uppercase">
                  ✅ Interest Received!
                </h2>
                
                <div className="p-6 bg-gray-50 border-2 border-gray-300 mb-6">
                  <p className="text-lg font-bold mb-3">
                    Grok AI will plan and we'll get back shortly with:
                  </p>
                  <ul className="text-left space-y-2 max-w-md mx-auto">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Budget breakdown & final pricing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Facility details at [Admin-Added Destinations]</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Senior care options & accessibility info</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Your requested ritual participation details</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Festival alignment & special days calendar</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-purple-100 border-2 border-purple-600 mb-6">
                  <p className="font-bold text-sm flex items-center justify-center gap-2 mb-2">
                    <Sparkles className="h-5 w-5" />
                    GROK AI IS NOW PROCESSING YOUR REQUEST
                  </p>
                  <p className="text-xs text-gray-700">
                    You will receive notifications via email/SMS when your personalized plan is ready.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleBack}
                    className="flex-1 border-2 border-black bg-white text-black hover:bg-gray-100"
                  >
                    START NEW JOURNEY
                  </Button>
                  <Button className="flex-1 border-2 border-black bg-white text-black hover:bg-gray-100">
                    <Bell className="mr-2 h-4 w-4" />
                    VIEW NOTIFICATIONS
                  </Button>
                </div>
              </div>

              <div className="bg-white border-4 border-black p-6">
                <h3 className="font-bold uppercase mb-4">YOUR SUBMISSION SUMMARY:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-2 border-b">
                    <span className="font-bold">Religion:</span>
                    <span>{currentReligion.emoji} {currentReligion.name}</span>
                  </div>
                  <div className="flex justify-between p-2 border-b">
                    <span className="font-bold">Destinations:</span>
                    <span>{selectedDestinations.length} selected</span>
                  </div>
                  <div className="flex justify-between p-2 border-b">
                    <span className="font-bold">Group Size:</span>
                    <span>{groupSize} people</span>
                  </div>
                  <div className="flex justify-between p-2 border-b">
                    <span className="font-bold">Package Type:</span>
                    <span>{packageType === 'existing' ? 'Existing Package' : 'Custom Plan (Grok AI)'}</span>
                  </div>
                  <div className="flex justify-between p-2 border-b">
                    <span className="font-bold">Senior Care:</span>
                    <span>{seniorCare ? 'YES ✓' : 'NO'}</span>
                  </div>
                  <div className="flex justify-between p-2">
                    <span className="font-bold">Medical Support:</span>
                    <span>{medicalSupport ? 'YES ✓' : 'NO'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FOOTER - ADMIN NOTE */}
      <div className="bg-black text-white p-4 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-mono">
            🔒 LOW-FI WIREFRAME | ALL CONTENT ADMIN-EDITABLE | PROTOTYPE READY | 
            LAYER GROUP: "Devotional – Rectified (Rituals + Special Days + Admin-Driven)"
          </p>
        </div>
      </div>
    </div>
  );
}
