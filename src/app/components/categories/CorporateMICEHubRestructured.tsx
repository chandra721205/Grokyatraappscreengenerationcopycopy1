import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import {
  ArrowLeft,
  Building2,
  Users,
  Clock,
  DollarSign,
  CheckCircle,
  Sparkles,
  TrendingDown,
  Award,
  Globe,
  Youtube,
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { CorporateCategoryDetail } from '@/app/components/categories/corporate/CorporateCategoryDetail';
import { CorporateEventDetailsForm } from '@/app/components/categories/corporate/CorporateEventDetailsForm';
import { CorporateProposalScreen } from '@/app/components/categories/corporate/CorporateProposalScreen';
import { CorporateConfirmBooking } from '@/app/components/categories/corporate/CorporateConfirmBooking';

// ========================================
// THEME
// ========================================
const corporateTheme = {
  primary: '#475569',
  secondary: '#334155',
  accent: '#10B981',
  background: '#F8FAFC',
};

// ========================================
// SUB-CATEGORIES DATA
// ========================================
const subCategories = [
  {
    id: 1,
    emoji: '🎤',
    title: 'Conferences & Exhibitions',
    description: 'Large-scale events, trade shows, product launches',
    capacity: '100–5,000 delegates',
    duration: '1–3 days',
    budget: '$2,000–$5,000/delegate',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: 2,
    emoji: '📊',
    title: 'Board Meetings & AGMs',
    description: 'Executive boardrooms, annual meetings, strategy sessions',
    capacity: '10–50 executives',
    duration: '1 day',
    budget: '₹50,000–₹2,00,000/day',
    gradient: 'from-slate-600 to-gray-700',
  },
  {
    id: 3,
    emoji: '🏆',
    title: 'Incentive Trips & Rewards',
    description: 'Employee rewards, top-performer trips, luxury getaways',
    capacity: '20–200 employees',
    duration: '2–5 days',
    budget: '₹15,000–₹50,000/person',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 4,
    emoji: '🤝',
    title: 'Team Building & Offsite Retreats',
    description: 'Leadership workshops, team bonding, outdoor activities',
    capacity: '15–100 employees',
    duration: '1–3 days',
    budget: '₹1,000–₹8,000/person',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    id: 5,
    emoji: '🏢',
    title: 'Trade Shows & Exhibitions',
    description: 'B2B expos, industry showcases, product demos',
    capacity: '50–1,000 exhibitors',
    duration: '2–4 days',
    budget: '$1,000–$8,000/stall',
    gradient: 'from-purple-500 to-violet-600',
  },
  {
    id: 6,
    emoji: '📚',
    title: 'Corporate Training & Workshops',
    description: 'Skill development, certification programs, leadership training',
    capacity: '20–100 participants',
    duration: '1–5 days',
    budget: '₹5,000–₹15,000/person',
    gradient: 'from-cyan-500 to-blue-600',
  },
];

// ========================================
// NAVIGATION STATES
// ========================================
type NavigationState =
  | { screen: 'hub' }
  | { screen: 'categoryDetail'; categoryId: number }
  | { screen: 'eventDetails'; categoryId: number }
  | { screen: 'proposal'; categoryId: number; formData: any }
  | { screen: 'confirmation'; categoryId: number; formData: any };

// ========================================
// MAIN COMPONENT
// ========================================
export function CorporateMICEHubRestructured({ onBack }: { onBack: () => void }) {
  const [navState, setNavState] = useState<NavigationState>({ screen: 'hub' });

  const handleGoogleSearch = (query: string) => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query + ' India')}`, '_blank');
  };

  const handleYouTubeSearch = (query: string) => {
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' India')}`, '_blank');
  };

  // Get current category data
  const getCurrentCategory = () => {
    if (navState.screen === 'hub') return null;
    return subCategories.find(cat => cat.id === navState.categoryId) || null;
  };

  const currentCategory = getCurrentCategory();

  // ========================================
  // RENDER: CATEGORY HUB (Home)
  // ========================================
  if (navState.screen === 'hub') {
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
          {/* Microcopy */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 text-center">
              Choose the type of corporate event you'd like us to plan end-to-end.
            </p>
          </div>

          {/* Sub-Categories Grid - 2 columns */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {subCategories.map((subCat, index) => (
              <motion.div
                key={subCat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setNavState({ screen: 'categoryDetail', categoryId: subCat.id })}
                className="bg-white rounded-3xl p-4 shadow-md hover:shadow-xl transition-all cursor-pointer"
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${subCat.gradient} mb-3`}
                >
                  <span className="text-4xl">{subCat.emoji}</span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-sm mb-2 leading-tight" style={{ color: corporateTheme.primary }}>
                  {subCat.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{subCat.description}</p>

                {/* Quick Specs */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3 h-3 text-gray-400" />
                    <span className="text-[10px] text-gray-500">{subCat.capacity}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-[10px] text-gray-500">{subCat.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-3 h-3 text-gray-400" />
                    <span className="text-[10px] text-gray-500">{subCat.budget}</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setNavState({ screen: 'categoryDetail', categoryId: subCat.id });
                    }}
                    className="flex-1 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setNavState({ screen: 'eventDetails', categoryId: subCat.id });
                    }}
                    className="flex-1 text-xs font-semibold text-green-600 hover:text-green-700 transition-colors"
                  >
                    Build Package
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Grok AI Insight Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-6 shadow-2xl mb-6"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg mb-1">
                  Grok Corporate Intelligence
                </h3>
                <p className="text-white/90 text-xs">AI-powered insights for maximum ROI</p>
              </div>
            </div>

            <div className="space-y-3">
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
          </motion.div>

          {/* Admin Note */}
          <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-2xl">
            <p className="text-xs text-purple-800 text-center">
              <strong>Admin Managed:</strong> All venues, vendors, and pricing configured via admin panel
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ========================================
  // RENDER: CATEGORY DETAIL SCREEN
  // ========================================
  if (navState.screen === 'categoryDetail' && currentCategory) {
    return (
      <CorporateCategoryDetail
        categoryId={currentCategory.id}
        categoryTitle={currentCategory.title}
        categoryEmoji={currentCategory.emoji}
        categoryGradient={currentCategory.gradient}
        onBack={() => setNavState({ screen: 'hub' })}
        onRequestQuote={() => setNavState({ screen: 'eventDetails', categoryId: currentCategory.id })}
        onScheduleCall={() => toast.success('Scheduling call...')}
      />
    );
  }

  // ========================================
  // RENDER: EVENT DETAILS FORM
  // ========================================
  if (navState.screen === 'eventDetails' && currentCategory) {
    return (
      <CorporateEventDetailsForm
        categoryId={currentCategory.id}
        categoryTitle={currentCategory.title}
        categoryEmoji={currentCategory.emoji}
        categoryGradient={currentCategory.gradient}
        onBack={() => setNavState({ screen: 'categoryDetail', categoryId: currentCategory.id })}
        onSubmit={(formData) => {
          toast.success('Generating proposal...');
          setNavState({ screen: 'proposal', categoryId: currentCategory.id, formData });
        }}
      />
    );
  }

  // ========================================
  // RENDER: PROPOSAL SCREEN
  // ========================================
  if (navState.screen === 'proposal' && currentCategory) {
    return (
      <CorporateProposalScreen
        categoryTitle={currentCategory.title}
        categoryEmoji={currentCategory.emoji}
        categoryGradient={currentCategory.gradient}
        formData={navState.formData}
        onBack={() => setNavState({ screen: 'eventDetails', categoryId: currentCategory.id })}
        onConfirm={() => {
          toast.success('Confirming booking...');
          setNavState({ screen: 'confirmation', categoryId: currentCategory.id, formData: navState.formData });
        }}
      />
    );
  }

  // ========================================
  // RENDER: CONFIRMATION SCREEN
  // ========================================
  if (navState.screen === 'confirmation' && currentCategory) {
    return (
      <CorporateConfirmBooking
        categoryTitle={currentCategory.title}
        categoryEmoji={currentCategory.emoji}
        formData={navState.formData}
        onBackToHub={() => setNavState({ screen: 'hub' })}
      />
    );
  }

  return null;
}

export default CorporateMICEHubRestructured;
