import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ChevronDown,
  X,
  Heart,
  Bell,
  MapPin,
  Sparkles,
  Eye,
  Filter,
  Youtube,
  Globe,
  Info,
  Flame,
  BookOpen,
  Waves,
  Mountain,
  Flower2,
  Sun,
  Users,
  Calendar,
  DollarSign,
  Accessibility,
  Stethoscope,
  Clock,
  Check,
  ChevronRight,
  Star,
  Tag,
  Navigation,
  Loader2,
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
// HINDU PILGRIMS – LOW-FI ADMIN-DRIVEN
// STRICT MODE: Preserves existing design
// ========================================
//
// 🕉️ ADMIN-EDITABLE PLACEHOLDERS ONLY
// ⚠️ NO REAL TEMPLE NAMES OR DESTINATIONS
//
// Features:
// 1. 6 Sacred Circuits (fixed categories)
// 2. Hidden Spiritual Gems
// 3. 4 Browse Modes (Circuit/Geography/Deity/Packages)
// 4. Google & YouTube Discovery (mandatory)
// 5. Custom Hindu Tour Builder
// 6. Interest Capture & Notifications
// 7. Grok AI Advisory (neutral)
//
// ========================================

type BrowseMode = 'circuit' | 'geography' | 'deity' | 'packages';

interface HinduPilgrimsFlowProps {
  onBack: () => void;
}

// 6 FIXED SACRED CIRCUITS (Categories Only)
const sacredCircuits = [
  {
    id: '12-jyotirlinga',
    icon: Flame,
    name: '12 Jyotirlingas',
    count: 12,
    deity: 'Lord Shiva',
    description: '[Admin: Description of circuit significance]',
    gradient: 'from-orange-500 to-red-600',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
  {
    id: '108-divya-desam',
    icon: BookOpen,
    name: '108 Divya Desams',
    count: 108,
    deity: 'Lord Vishnu',
    description: '[Admin: Description of circuit significance]',
    gradient: 'from-blue-500 to-indigo-600',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    id: 'pancha-bhoota',
    icon: Waves,
    name: 'Pancha Bhoota Sthalams',
    count: 5,
    deity: 'Shiva – 5 Elements',
    description: '[Admin: Description of 5 element temples]',
    gradient: 'from-purple-500 to-pink-600',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    id: 'char-dham',
    icon: Mountain,
    name: 'Char Dham Yatra',
    count: 4,
    deity: 'Vishnu & Shiva',
    description: '[Admin: Description of 4 dhams circuit]',
    gradient: 'from-green-500 to-teal-600',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    id: '51-shakti-peetha',
    icon: Flower2,
    name: '51 Shakti Peethas',
    count: 51,
    deity: 'Goddess Shakti',
    description: '[Admin: Description of shakti peethas]',
    gradient: 'from-pink-500 to-rose-600',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
  },
  {
    id: 'navagraha',
    icon: Sun,
    name: 'Navagraha Temples',
    count: 9,
    deity: 'Nine Planets',
    description: '[Admin: Description of planetary temples]',
    gradient: 'from-yellow-500 to-orange-600',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
  },
];

// DEITY CATEGORIES
const deityCategories = [
  { id: 'shiva', name: 'Shiva', emoji: '🔱', color: 'red' },
  { id: 'vishnu', name: 'Vishnu', emoji: '🪷', color: 'blue' },
  { id: 'shakti', name: 'Shakti', emoji: '🌺', color: 'pink' },
  { id: 'ganesha', name: 'Ganesha', emoji: '🐘', color: 'orange' },
  { id: 'murugan', name: 'Murugan', emoji: '🦚', color: 'green' },
  { id: 'surya', name: 'Surya', emoji: '☀️', color: 'yellow' },
  { id: 'mixed', name: 'Mixed Deities', emoji: '✨', color: 'purple' },
];

// SPECIAL PACKAGE TYPES
const packageTypes = [
  { id: 'festival', name: 'Festival-Based', icon: Star, color: 'orange' },
  { id: 'senior', name: 'Senior-Friendly', icon: Accessibility, color: 'blue' },
  { id: 'low-crowd', name: 'Low-Crowd Periods', icon: Users, color: 'green' },
  { id: 'short', name: 'Short Duration', icon: Clock, color: 'purple' },
];

export function HinduPilgrimsFlow({ onBack }: HinduPilgrimsFlowProps) {
  const [browseMode, setBrowseMode] = useState<BrowseMode>('circuit');
  const [savedInterests, setSavedInterests] = useState<string[]>([]);
  const [notifySettings, setNotifySettings] = useState({
    deals: false,
    budget: false,
    festivals: false,
    seniorFriendly: false,
  });
  
  // Custom Tour States
  const [showCustomTour, setShowCustomTour] = useState(false);
  const [customTourData, setCustomTourData] = useState({
    circuits: [] as string[],
    deity: '',
    geography: '',
    dates: '',
    groupSize: '',
    budget: '',
    seniorCare: false,
    medicalNeeds: false,
    specialRequests: '',
  });
  
  // Hidden Gems
  const [showHiddenGems, setShowHiddenGems] = useState(false);
  
  // AI Response
  const [showAIResponse, setShowAIResponse] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);

  const handleSaveInterest = (circuitId: string) => {
    if (!savedInterests.includes(circuitId)) {
      setSavedInterests([...savedInterests, circuitId]);
      toast.success('Interest saved!', {
        description: 'We\'ll notify you about relevant opportunities',
        icon: '💖',
      });
    }
  };

  const handleGoogleSearch = (query: string) => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query + ' Hindu pilgrimage sacred temples')}`, '_blank');
    toast.info('Opening Google Search', {
      description: 'Discover temples and sacred sites',
      icon: '🔍',
    });
  };

  const handleYouTubeBrowse = (query: string) => {
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' Hindu temple darshan pilgrimage')}`, '_blank');
    toast.info('Opening YouTube', {
      description: 'Watch temple videos and virtual darshan',
      icon: '▶️',
    });
  };

  const handleCustomTourRequest = () => {
    setShowCustomTour(false);
    setAiProcessing(true);
    setShowAIResponse(true);
    
    // Simulate Grok AI processing
    setTimeout(() => {
      setAiProcessing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-orange-50/30 to-white pb-20">
      {/* GROUP: Hindu Pilgrims – Rectified Header */}
      <div className="bg-white border-b border-gray-200 px-6 pt-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 text-sm font-semibold hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Journey
          </button>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-wider">
              <span>SCROLL</span>
              <ChevronDown className="w-3 h-3" />
            </div>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-2">
          <div className="w-9 h-9 bg-orange-100 rounded-2xl flex items-center justify-center">
            <span className="text-xl">🕉️</span>
          </div>
          <h1 className="text-slate-900 text-[32px] font-bold tracking-tight leading-tight">
            Hindu Pilgrims
          </h1>
        </div>
        
        <p className="text-gray-600 text-base pl-[52px]">
          Browse Sacred Circuits, Interest & Custom Tours
        </p>

        {/* Admin Notice */}
        <div className="mt-4 pl-[52px]">
          <div className="bg-purple-50 border-2 border-dashed border-purple-300 rounded-xl p-3">
            <p className="text-xs text-purple-900 font-semibold">
              ⚠️ Admin-Driven Content: All temple names, destinations, and details are admin-managed placeholders.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pt-6 space-y-6">
        {/* GROUP: Discovery Buttons (Mandatory) */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 shadow-2xl">
          <h3 className="text-white font-bold text-xl mb-3">🔍 Discover Sacred Sites</h3>
          <p className="text-white/90 text-sm mb-4">
            Browse temples using Google Search and YouTube videos (No internal browsing)
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => handleGoogleSearch('Hindu sacred circuits')}
              className="bg-white hover:bg-gray-100 text-blue-600 rounded-xl h-12 font-bold shadow-lg"
            >
              <Globe className="w-4 h-4 mr-2" />
              Google Search
            </Button>
            <Button
              onClick={() => handleYouTubeBrowse('Hindu pilgrimage temples')}
              className="bg-red-600 hover:bg-red-700 text-white rounded-xl h-12 font-bold shadow-lg"
            >
              <Youtube className="w-4 h-4 mr-2" />
              YouTube Browse
            </Button>
          </div>
        </div>

        {/* GROUP: Browse Modes */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-5">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Browse By</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setBrowseMode('circuit')}
              className={`p-4 rounded-xl border-2 transition-all ${
                browseMode === 'circuit'
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Star className={`w-5 h-5 mb-2 ${browseMode === 'circuit' ? 'text-orange-600' : 'text-gray-600'}`} />
              <p className="text-sm font-semibold text-gray-900">Sacred Circuit</p>
              <p className="text-xs text-gray-600">6 circuits</p>
            </button>
            <button
              onClick={() => setBrowseMode('geography')}
              className={`p-4 rounded-xl border-2 transition-all ${
                browseMode === 'geography'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <MapPin className={`w-5 h-5 mb-2 ${browseMode === 'geography' ? 'text-blue-600' : 'text-gray-600'}`} />
              <p className="text-sm font-semibold text-gray-900">Geography</p>
              <p className="text-xs text-gray-600">State → District</p>
            </button>
            <button
              onClick={() => setBrowseMode('deity')}
              className={`p-4 rounded-xl border-2 transition-all ${
                browseMode === 'deity'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Flame className={`w-5 h-5 mb-2 ${browseMode === 'deity' ? 'text-purple-600' : 'text-gray-600'}`} />
              <p className="text-sm font-semibold text-gray-900">Deity</p>
              <p className="text-xs text-gray-600">7 categories</p>
            </button>
            <button
              onClick={() => setBrowseMode('packages')}
              className={`p-4 rounded-xl border-2 transition-all ${
                browseMode === 'packages'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Tag className={`w-5 h-5 mb-2 ${browseMode === 'packages' ? 'text-green-600' : 'text-gray-600'}`} />
              <p className="text-sm font-semibold text-gray-900">Packages</p>
              <p className="text-xs text-gray-600">Admin curated</p>
            </button>
          </div>
        </div>

        {/* GROUP: Custom Hindu Tour Builder */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-6 shadow-2xl">
          <h3 className="text-white font-bold text-xl mb-2">✨ Custom-Made Hindu Tours</h3>
          <p className="text-white/90 text-sm mb-4">
            Request a personalized pilgrimage itinerary
          </p>
          <Button
            onClick={() => setShowCustomTour(true)}
            className="w-full bg-white hover:bg-gray-100 text-orange-600 rounded-xl h-12 font-bold shadow-lg"
          >
            Request Custom Pilgrimage
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* GROUP: Notification Settings */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-5">
            <Bell className="w-6 h-6 text-orange-600" />
            <div>
              <h3 className="text-lg font-bold text-gray-900">Notify Me About</h3>
              <p className="text-xs text-gray-600">Receive updates on your interests</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm font-semibold text-gray-900">Deals & Offers</span>
              <Switch
                checked={notifySettings.deals}
                onCheckedChange={(checked) => setNotifySettings({ ...notifySettings, deals: checked })}
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm font-semibold text-gray-900">Budget Match Alerts</span>
              <Switch
                checked={notifySettings.budget}
                onCheckedChange={(checked) => setNotifySettings({ ...notifySettings, budget: checked })}
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm font-semibold text-gray-900">Festival Dates</span>
              <Switch
                checked={notifySettings.festivals}
                onCheckedChange={(checked) => setNotifySettings({ ...notifySettings, festivals: checked })}
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm font-semibold text-gray-900">Senior-Friendly Options</span>
              <Switch
                checked={notifySettings.seniorFriendly}
                onCheckedChange={(checked) => setNotifySettings({ ...notifySettings, seniorFriendly: checked })}
              />
            </div>
          </div>
        </div>

        {/* BROWSE MODE: Sacred Circuits */}
        {browseMode === 'circuit' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">6 Sacred Circuits</h2>
            <p className="text-sm text-gray-600 mb-5">Circuit categories (not browsable lists)</p>

            <div className="space-y-4">
              {sacredCircuits.map((circuit) => (
                <div
                  key={circuit.id}
                  className="bg-white rounded-3xl shadow-lg border-2 border-gray-200 p-6 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 ${circuit.iconBg} rounded-2xl flex items-center justify-center`}>
                      <circuit.icon className={`w-7 h-7 ${circuit.iconColor}`} />
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleGoogleSearch(circuit.name)}
                        className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center hover:bg-blue-100 transition-all"
                        title="Google Search"
                      >
                        <Globe className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleYouTubeBrowse(circuit.name)}
                        className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center hover:bg-red-100 transition-all"
                        title="YouTube Browse"
                      >
                        <Youtube className="w-4 h-4 text-red-600" />
                      </button>
                      <button
                        onClick={() => handleSaveInterest(circuit.id)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                          savedInterests.includes(circuit.id)
                            ? 'bg-pink-100'
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                        title="Save Interest"
                      >
                        <Heart className={`w-4 h-4 ${
                          savedInterests.includes(circuit.id)
                            ? 'text-pink-600 fill-pink-600'
                            : 'text-gray-600'
                        }`} />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-1">{circuit.name}</h3>
                  <p className="text-sm text-orange-600 font-semibold mb-2">
                    {circuit.count} Sacred Sites • {circuit.deity}
                  </p>

                  {/* Admin-Editable Description */}
                  <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-3 mb-4">
                    <p className="text-xs text-gray-500 mb-1">Admin editable: Circuit description</p>
                    <p className="text-sm text-gray-700">{circuit.description}</p>
                  </div>

                  <Button
                    onClick={() => handleGoogleSearch(circuit.name)}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl h-11 font-bold"
                  >
                    Browse on Google
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BROWSE MODE: Geography */}
        {browseMode === 'geography' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Browse by Geography</h2>
            <p className="text-sm text-gray-600 mb-5">State → District → Region (Admin-managed)</p>

            <div className="space-y-4">
              {['State 1', 'State 2', 'State 3'].map((state, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5">
                  <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-3 mb-4">
                    <p className="text-xs text-gray-500 mb-1">Admin editable: State name</p>
                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-orange-600" />
                      [Admin: {state} Name]
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {['District 1', 'District 2', 'District 3', 'District 4'].map((district, dIdx) => (
                      <div
                        key={dIdx}
                        className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-3 hover:border-orange-400 transition-all"
                      >
                        <p className="text-xs text-gray-500 mb-1">Admin: District</p>
                        <p className="text-sm font-semibold text-gray-900">[{district}]</p>
                        <p className="text-xs text-gray-600">[X] admin-added sites</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BROWSE MODE: Deity */}
        {browseMode === 'deity' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Browse by Deity</h2>
            <p className="text-sm text-gray-600 mb-5">Filter circuits by deity preference</p>

            <div className="grid grid-cols-2 gap-4">
              {deityCategories.map((deity) => {
                const colorClasses = {
                  red: 'from-red-500 to-pink-600',
                  blue: 'from-blue-500 to-indigo-600',
                  pink: 'from-pink-500 to-rose-600',
                  orange: 'from-orange-500 to-red-600',
                  green: 'from-green-500 to-teal-600',
                  yellow: 'from-yellow-500 to-orange-600',
                  purple: 'from-purple-500 to-pink-600',
                };
                
                return (
                  <button
                    key={deity.id}
                    onClick={() => handleGoogleSearch(deity.name + ' temples')}
                    className={`bg-gradient-to-br ${colorClasses[deity.color as keyof typeof colorClasses]} rounded-2xl p-5 text-left hover:scale-105 transition-all shadow-lg`}
                  >
                    <span className="text-4xl mb-2 block">{deity.emoji}</span>
                    <h4 className="text-white font-bold text-lg mb-1">{deity.name}</h4>
                    <p className="text-white/80 text-xs">Browse sacred sites</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* BROWSE MODE: Special Packages */}
        {browseMode === 'packages' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Special Packages (Admin Curated)</h2>
            <p className="text-sm text-gray-600 mb-5">Festival, Senior-Friendly, Low-Crowd, Short Duration</p>

            <div className="space-y-4">
              {packageTypes.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-5 hover:shadow-xl transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 bg-${pkg.color}-100 rounded-xl flex items-center justify-center`}>
                      <pkg.icon className={`w-5 h-5 text-${pkg.color}-600`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{pkg.name}</h4>
                      <p className="text-xs text-gray-600">Admin-published packages</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">[Admin: Package detail 1]</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">[Admin: Package detail 2]</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">[Admin: Package detail 3]</span>
                    </div>
                  </div>

                  <Button className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl h-11 font-bold">
                    Save Interest
                    <Heart className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GROUP: Hidden Spiritual Gems */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                💎 Hidden Spiritual Gems
              </h2>
              <p className="text-sm text-gray-600">
                Ancient, lesser-known temples (Admin-added only)
              </p>
            </div>
            <button
              onClick={() => setShowHiddenGems(!showHiddenGems)}
              className="px-4 py-2 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-all text-sm font-semibold flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              {showHiddenGems ? 'Hide' : 'Show'}
            </button>
          </div>

          <AnimatePresence>
            {showHiddenGems && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-purple-50 border-2 border-dashed border-purple-300 rounded-2xl p-4"
                  >
                    <p className="text-xs text-purple-600 mb-2">Admin-Published Sacred Site</p>
                    <h4 className="font-bold text-gray-900 mb-2">[Admin-Added Sacred Site {i}]</h4>
                    <p className="text-xs text-gray-600 mb-3">[Admin: District, State]</p>
                    <p className="text-sm text-gray-700 mb-3 italic">
                      "[Admin: Brief description of gem's significance and local traditions]"
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 rounded-xl h-9 text-xs"
                        onClick={() => handleGoogleSearch('hidden temple gem ' + i)}
                      >
                        <Globe className="w-3 h-3 mr-1" />
                        Browse
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 rounded-xl h-9 text-xs"
                        onClick={() => handleSaveInterest('gem-' + i)}
                      >
                        <Heart className="w-3 h-3 mr-1" />
                        Save
                      </Button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* GROUP: Grok AI Advisory */}
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
              <h3 className="text-white font-bold text-lg">Ask Grok About Hindu Circuits</h3>
            </div>
            
            <div className="space-y-2 mb-4">
              <button className="w-full text-left px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white text-sm transition-all backdrop-blur-sm">
                ✨ Optimize for seniors & accessibility
              </button>
              <button className="w-full text-left px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white text-sm transition-all backdrop-blur-sm">
                🎭 Low-crowd recommendations
              </button>
              <button className="w-full text-left px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white text-sm transition-all backdrop-blur-sm">
                📅 Festival-aligned planning
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <p className="text-purple-100 text-sm leading-relaxed italic">
                "[Admin: Grok AI advisory content - neutral, no real temple examples]"
              </p>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-orange-900 leading-relaxed font-medium">
                <strong className="block mb-1">Admin-Driven Content Notice</strong>
                All temple names, sacred sites, destinations, prices, and itineraries are admin-managed placeholders. 
                Tourists discover locations via Google/YouTube. Custom tour requests are handled by Grok AI.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Tour Dialog */}
      <Dialog open={showCustomTour} onOpenChange={setShowCustomTour}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-orange-600" />
              Request Custom Pilgrimage
            </DialogTitle>
            <DialogDescription>
              Tell us your preferences - Grok AI will create your itinerary
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Circuit(s) of Interest */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Circuit(s) of Interest
              </label>
              <div className="space-y-2">
                {sacredCircuits.slice(0, 3).map((circuit) => (
                  <label key={circuit.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customTourData.circuits.includes(circuit.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCustomTourData({
                            ...customTourData,
                            circuits: [...customTourData.circuits, circuit.id]
                          });
                        } else {
                          setCustomTourData({
                            ...customTourData,
                            circuits: customTourData.circuits.filter(c => c !== circuit.id)
                          });
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-sm font-medium text-gray-900">{circuit.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Deity Preference */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Deity Preference
              </label>
              <Select value={customTourData.deity} onValueChange={(value) => setCustomTourData({ ...customTourData, deity: value })}>
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue placeholder="Choose deity" />
                </SelectTrigger>
                <SelectContent>
                  {deityCategories.map((deity) => (
                    <SelectItem key={deity.id} value={deity.id}>
                      {deity.emoji} {deity.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Geography Preference */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Geography Preference
              </label>
              <Input
                type="text"
                placeholder="[Admin: State/Region dropdown]"
                value={customTourData.geography}
                onChange={(e) => setCustomTourData({ ...customTourData, geography: e.target.value })}
                className="h-11 rounded-xl"
              />
            </div>

            {/* Travel Dates */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Travel Dates (Flexible)
              </label>
              <Input
                type="text"
                placeholder="[Admin: Date picker]"
                value={customTourData.dates}
                onChange={(e) => setCustomTourData({ ...customTourData, dates: e.target.value })}
                className="h-11 rounded-xl"
              />
            </div>

            {/* Group Size */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Group Size
              </label>
              <Input
                type="number"
                placeholder="Number of people"
                value={customTourData.groupSize}
                onChange={(e) => setCustomTourData({ ...customTourData, groupSize: e.target.value })}
                className="h-11 rounded-xl"
              />
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Budget Range
              </label>
              <Select value={customTourData.budget} onValueChange={(value) => setCustomTourData({ ...customTourData, budget: value })}>
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Under ₹30,000</SelectItem>
                  <SelectItem value="mid">₹30,000 - ₹75,000</SelectItem>
                  <SelectItem value="high">₹75,000 - ₹1,50,000</SelectItem>
                  <SelectItem value="premium">Above ₹1,50,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Senior Care */}
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
              <div>
                <p className="font-semibold text-sm text-gray-900">Senior Care Required</p>
                <p className="text-xs text-gray-600">Wheelchair, medical support</p>
              </div>
              <Switch
                checked={customTourData.seniorCare}
                onCheckedChange={(checked) => setCustomTourData({ ...customTourData, seniorCare: checked })}
              />
            </div>

            {/* Medical Needs */}
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
              <div>
                <p className="font-semibold text-sm text-gray-900">Medical Assistance Needed</p>
                <p className="text-xs text-gray-600">On-site medical staff</p>
              </div>
              <Switch
                checked={customTourData.medicalNeeds}
                onCheckedChange={(checked) => setCustomTourData({ ...customTourData, medicalNeeds: checked })}
              />
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Special Requests
              </label>
              <textarea
                placeholder="Any specific requirements or preferences..."
                value={customTourData.specialRequests}
                onChange={(e) => setCustomTourData({ ...customTourData, specialRequests: e.target.value })}
                className="w-full h-24 px-4 py-3 border-2 border-gray-300 rounded-xl bg-gray-50 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Submit */}
            <Button
              onClick={handleCustomTourRequest}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl h-12 font-bold shadow-lg"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Request Custom Pilgrimage
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Response Dialog */}
      <Dialog open={showAIResponse} onOpenChange={setShowAIResponse}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              Grok AI Response
            </DialogTitle>
          </DialogHeader>

          <div className="py-6">
            {aiProcessing ? (
              <div className="flex flex-col items-center gap-4 p-8">
                <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
                <div className="text-center">
                  <p className="font-bold text-gray-900 mb-1">Processing your request...</p>
                  <p className="text-sm text-gray-600">Grok AI is analyzing your preferences</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-5 border-2 border-green-200">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-green-900 mb-1">Request Received!</h4>
                      <p className="text-sm text-green-800 leading-relaxed">
                        Grok AI will review your requirements and get back with budget, facilities, senior care options, and specific details.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-2xl p-5 border-2 border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    What happens next?
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-purple-800">
                      <Check className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Grok AI analyzes your circuit, deity, and geography preferences</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-purple-800">
                      <Check className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Budget optimization with admin-published package matching</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-purple-800">
                      <Check className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Senior care & medical assistance coordination</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-purple-800">
                      <Check className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Custom itinerary with festival timing & crowd analysis</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-orange-50 rounded-2xl p-4 border border-orange-200">
                  <p className="text-sm text-orange-900">
                    <strong className="flex items-center gap-2 mb-2">
                      <Bell className="w-4 h-4" />
                      You'll receive a notification
                    </strong>
                    Check your email and app notifications within 24 hours for your personalized Hindu pilgrimage itinerary.
                  </p>
                </div>

                <Button
                  onClick={() => setShowAIResponse(false)}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-xl h-11 font-bold"
                >
                  Got it, Thanks!
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
