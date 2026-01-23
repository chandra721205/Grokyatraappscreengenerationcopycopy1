import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import {
  ArrowLeft,
  Mic,
  BarChart3,
  Award,
  Users,
  Building2,
  BookOpen,
  MapPin,
  Clock,
  CheckCircle,
  Sparkles,
  TrendingDown,
  DollarSign,
  Monitor,
  Utensils,
  Globe,
  Youtube,
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { CorporateMICEPlanningFlow } from '@/app/components/categories/CorporateMICEPlanningFlow';

// ========================================
// THEME: CORPORATE & MICE COLORS
// ========================================
const corporateTheme = {
  primary: '#475569',      // Slate Gray
  secondary: '#334155',    // Darker Slate
  accent: '#10B981',       // Green
  gold: '#F59E0B',         // Gold for premium
  background: '#F8FAFC',   // Very Light Gray
  white: '#FFFFFF',
  lightGray: '#F1F5F9',
  mediumGray: '#E2E8F0',
};

// ========================================
// DATA: CORPORATE SUB-CATEGORIES
// ========================================
const subCategories = [
  {
    id: 1,
    icon: Mic,
    emoji: '🎤',
    title: 'Conferences & Exhibitions',
    description: 'Large-scale events, trade shows, product launches',
    services: [
      'Venue booking',
      'AV equipment',
      'Delegate management',
      'Exhibitor coordination',
    ],
    pax: '100-5,000 delegates',
    duration: '1-3 days',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: 2,
    icon: BarChart3,
    emoji: '📊',
    title: 'Board Meetings & AGMs',
    description: 'Executive boardrooms, annual general meetings, strategy sessions',
    services: [
      'Premium boardrooms',
      'Secretarial support',
      'Video conferencing',
      'Privacy assured',
    ],
    pax: '10-50 executives',
    duration: '1 day',
    gradient: 'from-slate-600 to-gray-700',
  },
  {
    id: 3,
    icon: Award,
    emoji: '🏆',
    title: 'Incentive Trips & Rewards',
    description: 'Employee rewards, top-performer trips, luxury getaways',
    services: [
      'Luxury stays',
      'Fine dining',
      'VIP experiences',
      'Recognition events',
    ],
    pax: '20-200 employees',
    duration: '2-5 days',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 4,
    icon: Users,
    emoji: '🤝',
    title: 'Team Building & Offsite Retreats',
    description: 'Leadership workshops, team bonding, outdoor activities',
    services: [
      'Facilitators',
      'Adventure activities',
      'Workshop venues',
      'Meals included',
    ],
    pax: '15-100 employees',
    duration: '1-3 days',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    id: 5,
    icon: Building2,
    emoji: '🏢',
    title: 'Trade Shows & Exhibitions',
    description: 'B2B expos, industry showcases, product demos',
    services: [
      'Stall design',
      'Booth setup',
      'Lead generation',
      'Marketing collateral',
    ],
    pax: '50-1,000 exhibitors',
    duration: '3-4 days',
    gradient: 'from-purple-500 to-violet-600',
  },
  {
    id: 6,
    icon: BookOpen,
    emoji: '📚',
    title: 'Corporate Training & Workshops',
    description: 'Skill development, certification programs, leadership training',
    services: [
      'Expert trainers',
      'Training materials',
      'Certification',
      'Follow-up support',
    ],
    pax: '20-100 participants',
    duration: '1-3 days',
    gradient: 'from-cyan-500 to-blue-600',
  },
];

// ========================================
// COMPLETE MICE PACKAGE DATA
// ========================================
const micePackageIncludes = [
  {
    id: 1,
    icon: Building2,
    title: 'Venue & Stay',
    items: [
      'Conference halls (50-5,000 capacity)',
      'Breakout rooms',
      'Premium hotel accommodations',
      'VIP lounges',
    ],
    color: corporateTheme.primary,
  },
  {
    id: 2,
    icon: Monitor,
    title: 'AV & Technology',
    items: [
      '4K UHD screens',
      'Wireless microphones',
      'Live streaming setup',
      'Technical support',
    ],
    color: '#3B82F6', // Blue
  },
  {
    id: 3,
    icon: Utensils,
    title: 'F&B & Hospitality',
    items: [
      'Buffet/Plated meals',
      'Gala dinners',
      'Dietary accommodations',
      '24/7 concierge',
    ],
    color: '#10B981', // Green
  },
];

// ========================================
// MAIN COMPONENT
// ========================================
export function CorporateMICEHub({ onBack }: { onBack: () => void }) {
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);

  const handleGoogleSearch = (query: string) => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query + ' India')}`, '_blank');
  };

  const handleYouTubeSearch = (query: string) => {
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' India')}`, '_blank');
  };

  const handleSubCategoryClick = (id: number) => {
    setSelectedSubCategory(id);
  };

  // Show planning flow if sub-category is selected
  if (selectedSubCategory) {
    const subCat = subCategories.find(s => s.id === selectedSubCategory);
    if (subCat) {
      return (
        <CorporateMICEPlanningFlow
          subCategory={{
            id: subCat.id,
            title: subCat.title,
            emoji: subCat.emoji,
            gradient: subCat.gradient,
          }}
          onBack={() => setSelectedSubCategory(null)}
        />
      );
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: corporateTheme.background }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-600 to-gray-700 px-6 pt-12 pb-8 rounded-b-[2rem]">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-6"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Building2 className="w-9 h-9 text-white" />
          </div>
          <div>
            <h1 className="text-white text-3xl font-bold">Corporate & MICE</h1>
            <p className="text-white/80 text-sm">Professional event solutions</p>
          </div>
        </div>

        {/* Search Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={() => handleGoogleSearch('Corporate MICE events venues')}
            className="flex-1 bg-white text-slate-600 hover:bg-gray-100 rounded-full h-9 flex items-center justify-center gap-2 text-sm"
          >
            <Globe className="w-4 h-4" />
            Google Search
          </Button>
          <Button
            onClick={() => handleYouTubeSearch('Corporate event planning')}
            className="flex-1 bg-white text-red-600 hover:bg-gray-100 rounded-full h-9 flex items-center justify-center gap-2 text-sm"
          >
            <Youtube className="w-4 h-4" />
            YouTube
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-4 pb-8">
        {/* Sub-Categories Grid - 2 rows x 3 columns */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: corporateTheme.primary }}>
            MICE Solutions
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {subCategories.map((subCat, index) => (
              <motion.div
                key={subCat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleSubCategoryClick(subCat.id)}
                className="bg-white rounded-3xl p-5 shadow-md hover:shadow-xl transition-all cursor-pointer"
              >
                {/* Header with Icon & Title */}
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${subCat.gradient}`}
                  >
                    <span className="text-2xl">{subCat.emoji}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-base mb-1" style={{ color: corporateTheme.primary }}>
                      {subCat.title}
                    </h3>
                    <p className="text-xs text-gray-600">{subCat.description}</p>
                  </div>
                </div>

                {/* Services Included */}
                <div className="mb-3">
                  <p className="text-xs font-semibold mb-2 text-gray-700">Services Included:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {subCat.services.map((service, idx) => (
                      <div key={idx} className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                        <span className="text-xs text-gray-600">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer - Pax & Duration */}
                <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-xs text-gray-600">{subCat.pax}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-xs text-gray-600">{subCat.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Complete MICE Package Includes - 3 Columns */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: corporateTheme.primary }}>
            Complete MICE Package Includes
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {micePackageIncludes.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white rounded-2xl p-5 shadow-md"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: pkg.color + '20' }}
                  >
                    <pkg.icon className="w-5 h-5" style={{ color: pkg.color }} />
                  </div>
                  <h3 className="font-bold text-base" style={{ color: corporateTheme.primary }}>
                    {pkg.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {pkg.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Grok Corporate Travel Optimization - AI Insight Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-6 shadow-2xl"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg mb-1">
                Grok Corporate Travel Optimization
              </h3>
              <p className="text-white/90 text-xs">AI-powered insights for maximum ROI</p>
            </div>
          </div>

          {/* Insights Grid */}
          <div className="space-y-3">
            {/* Off-Season Deals */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm mb-1">Off-Season Savings</p>
                  <p className="text-white/90 text-xs">
                    Book during Apr-Jun to save <strong>30-50%</strong> on venue costs
                  </p>
                </div>
              </div>
            </div>

            {/* Budget Breakdown */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm mb-2">Typical Budget Breakdown</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/90">Venue & AV:</span>
                      <span className="text-white font-medium">40%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-white/90">F&B:</span>
                      <span className="text-white font-medium">30%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-white/90">Accommodation:</span>
                      <span className="text-white font-medium">20%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-white/90">Others:</span>
                      <span className="text-white font-medium">10%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ROI Tip */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm mb-1">ROI Impact</p>
                  <p className="text-white/90 text-xs">
                    Incentive trips boost sales by <strong>20-30%</strong> within 6 months
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={() => toast.success('Connecting with Grok AI advisor...')}
            className="w-full mt-4 bg-white text-purple-600 hover:bg-gray-100 rounded-full h-11 font-semibold"
          >
            Get Personalized Quote
          </Button>
        </motion.div>

        {/* Admin Note */}
        <div className="mt-6 p-4 bg-purple-50 border-2 border-purple-200 rounded-2xl">
          <p className="text-xs text-purple-800 text-center">
            <strong>Admin Managed:</strong> All venues, vendors, and pricing configured via admin panel
          </p>
        </div>
      </div>
    </div>
  );
}

export default CorporateMICEHub;
