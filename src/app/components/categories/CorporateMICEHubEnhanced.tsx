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
  Filter,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { CorporateCategoryDetailEnhanced } from '@/app/components/categories/corporate/CorporateCategoryDetailEnhanced';
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
// SUB-CATEGORIES DATA (ENHANCED)
// ========================================
const subCategories = [
  {
    id: 1,
    emoji: '🎤',
    title: 'Conferences & Exhibitions',
    description: 'Large-scale professional gatherings with hybrid capabilities',
    capacity: '100–5,000 delegates',
    duration: '1–3 days',
    budget: '$2,000–$5,000/delegate',
    budgetMin: 200000,
    budgetMax: 10000000,
    groupSizeMin: 100,
    groupSizeMax: 5000,
    durationDays: 2,
    gradient: 'from-blue-500 to-indigo-600',
    helperText: 'Ideal for 100-5,000 delegates | 1-3 days',
  },
  {
    id: 2,
    emoji: '📊',
    title: 'Board Meetings & AGMs',
    description: 'Executive boardrooms with privacy protocols & NDA compliance',
    capacity: '10–50 executives',
    duration: '1 day',
    budget: '₹50,000–₹2,00,000/day',
    budgetMin: 50000,
    budgetMax: 200000,
    groupSizeMin: 10,
    groupSizeMax: 50,
    durationDays: 1,
    gradient: 'from-slate-600 to-gray-700',
    helperText: 'Ideal for 10-50 executives | 1 day',
  },
  {
    id: 3,
    emoji: '🏆',
    title: 'Incentive Trips & Rewards',
    description: 'Employee rewards & recognition trips with measurable ROI',
    capacity: '20–200 employees',
    duration: '2–5 days',
    budget: '₹15,000–₹50,000/person',
    budgetMin: 300000,
    budgetMax: 10000000,
    groupSizeMin: 20,
    groupSizeMax: 200,
    durationDays: 3,
    gradient: 'from-amber-500 to-orange-600',
    helperText: 'Ideal for 20-200 employees | 2-5 days',
  },
  {
    id: 4,
    emoji: '🤝',
    title: 'Team Building & Offsite Retreats',
    description: 'Leadership workshops & team bonding for stronger collaboration',
    capacity: '15–100 employees',
    duration: '1–3 days',
    budget: '₹1,000–₹8,000/person',
    budgetMin: 15000,
    budgetMax: 800000,
    groupSizeMin: 15,
    groupSizeMax: 100,
    durationDays: 2,
    gradient: 'from-green-500 to-emerald-600',
    helperText: 'Ideal for 15-100 employees | 1-3 days',
  },
  {
    id: 5,
    emoji: '🏢',
    title: 'Trade Shows & Exhibitions',
    description: 'B2B showcases with lead generation & analytics tracking',
    capacity: '50–1,000 exhibitors',
    duration: '2–4 days',
    budget: '$1,000–$8,000/stall',
    budgetMin: 100000,
    budgetMax: 8000000,
    groupSizeMin: 50,
    groupSizeMax: 1000,
    durationDays: 3,
    gradient: 'from-purple-500 to-violet-600',
    helperText: 'Ideal for 50-1,000 exhibitors | 2-4 days',
  },
  {
    id: 6,
    emoji: '📚',
    title: 'Corporate Training & Workshops',
    description: 'Skill development & certification programs with expert trainers',
    capacity: '20–100 participants',
    duration: '1–5 days',
    budget: '₹5,000–₹15,000/person',
    budgetMin: 100000,
    budgetMax: 1500000,
    groupSizeMin: 20,
    groupSizeMax: 100,
    durationDays: 3,
    gradient: 'from-cyan-500 to-blue-600',
    helperText: 'Ideal for 20-100 participants | 1-5 days',
  },
];

// ========================================
// FILTER OPTIONS
// ========================================
const filterOptions = {
  groupSize: [
    { label: '10-50 people', min: 10, max: 50 },
    { label: '51-200 people', min: 51, max: 200 },
    { label: '201-1000 people', min: 201, max: 1000 },
    { label: '1000+ people', min: 1001, max: 10000 },
  ],
  budgetRange: [
    { label: 'Under ₹5L', min: 0, max: 500000 },
    { label: '₹5L-₹20L', min: 500000, max: 2000000 },
    { label: '₹20L-₹50L', min: 2000000, max: 5000000 },
    { label: '₹50L+', min: 5000000, max: 100000000 },
  ],
  duration: [
    { label: '1 day', days: 1 },
    { label: '2-3 days', days: 2 },
    { label: '4-7 days', days: 5 },
    { label: '1 week+', days: 8 },
  ],
};

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
export function CorporateMICEHubEnhanced({ onBack }: { onBack: () => void }) {
  const [navState, setNavState] = useState<NavigationState>({ screen: 'hub' });
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    groupSize: '',
    budgetRange: '',
    duration: '',
  });

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

  // Filter categories based on selected filters
  const getFilteredCategories = () => {
    if (!filters.groupSize && !filters.budgetRange && !filters.duration) {
      return subCategories;
    }

    return subCategories.filter(cat => {
      // Group size filter
      if (filters.groupSize) {
        const groupSizeFilter = filterOptions.groupSize.find(opt => opt.label === filters.groupSize);
        if (groupSizeFilter) {
          const matchesMin = cat.groupSizeMin >= groupSizeFilter.min;
          const matchesMax = cat.groupSizeMax <= groupSizeFilter.max;
          if (!matchesMin && !matchesMax) return false;
        }
      }

      // Budget filter
      if (filters.budgetRange) {
        const budgetFilter = filterOptions.budgetRange.find(opt => opt.label === filters.budgetRange);
        if (budgetFilter) {
          const inRange = cat.budgetMin <= budgetFilter.max && cat.budgetMax >= budgetFilter.min;
          if (!inRange) return false;
        }
      }

      // Duration filter
      if (filters.duration) {
        const durationFilter = filterOptions.duration.find(opt => opt.label === filters.duration);
        if (durationFilter) {
          const matchesDuration = cat.durationDays >= durationFilter.days - 1 && cat.durationDays <= durationFilter.days + 2;
          if (!matchesDuration) return false;
        }
      }

      return true;
    });
  };

  const filteredCategories = getFilteredCategories();
  const hasActiveFilters = filters.groupSize || filters.budgetRange || filters.duration;

  const clearFilters = () => {
    setFilters({ groupSize: '', budgetRange: '', duration: '' });
  };

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
              <h1 className="text-white text-3xl font-bold">Plan Your Business Event</h1>
              <p className="text-white/80 text-sm">Select your event type to build a custom package</p>
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
          {/* Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="w-full h-12 rounded-2xl border-2 border-gray-300 bg-white flex items-center justify-between font-semibold"
            >
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-slate-600" />
                <span className="text-slate-700">Filter by Group Size, Budget & Duration</span>
              </div>
              {hasActiveFilters && (
                <Badge className="bg-green-100 text-green-700 text-xs">
                  {Object.values(filters).filter(Boolean).length} active
                </Badge>
              )}
            </Button>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 bg-white rounded-2xl p-5 shadow-md space-y-4"
                >
                  {/* Group Size Dropdown */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Group Size
                    </label>
                    <select
                      value={filters.groupSize}
                      onChange={(e) => setFilters({ ...filters, groupSize: e.target.value })}
                      className="w-full h-11 px-4 border-2 border-gray-200 rounded-xl focus:border-slate-600 focus:outline-none"
                    >
                      <option value="">All sizes</option>
                      {filterOptions.groupSize.map((opt) => (
                        <option key={opt.label} value={opt.label}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Budget Range Dropdown */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Budget Range
                    </label>
                    <select
                      value={filters.budgetRange}
                      onChange={(e) => setFilters({ ...filters, budgetRange: e.target.value })}
                      className="w-full h-11 px-4 border-2 border-gray-200 rounded-xl focus:border-slate-600 focus:outline-none"
                    >
                      <option value="">All budgets</option>
                      {filterOptions.budgetRange.map((opt) => (
                        <option key={opt.label} value={opt.label}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Duration Dropdown */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Duration
                    </label>
                    <select
                      value={filters.duration}
                      onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                      className="w-full h-11 px-4 border-2 border-gray-200 rounded-xl focus:border-slate-600 focus:outline-none"
                    >
                      <option value="">All durations</option>
                      {filterOptions.duration.map((opt) => (
                        <option key={opt.label} value={opt.label}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Helper Text */}
                  <p className="text-xs text-gray-500 pt-2">
                    Use filters to find the best event type for your team size and budget.
                  </p>

                  {/* Clear Filters */}
                  {hasActiveFilters && (
                    <Button
                      onClick={clearFilters}
                      variant="outline"
                      className="w-full h-10 rounded-xl font-semibold text-sm"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Clear All Filters
                    </Button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Empty State or Category Grid */}
          {filteredCategories.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 shadow-md text-center"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No matching event types</h3>
              <p className="text-sm text-gray-600 mb-4">
                No event types match your current filters. Try adjusting your budget, group size, or duration.
              </p>
              <Button
                onClick={clearFilters}
                className="bg-slate-600 hover:bg-slate-700 text-white rounded-full h-10 px-6"
              >
                Clear Filters
              </Button>
            </motion.div>
          ) : (
            <>
              {/* Sub-Categories Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {filteredCategories.map((subCat, index) => (
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

                    {/* Helper Text */}
                    <p className="text-[10px] text-gray-500 mb-3">{subCat.helperText}</p>

                    {/* CTAs */}
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setNavState({ screen: 'categoryDetail', categoryId: subCat.id });
                        }}
                        className="flex-1 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors py-2"
                      >
                        View Details
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setNavState({ screen: 'eventDetails', categoryId: subCat.id });
                        }}
                        className="flex-1 text-xs font-semibold text-green-600 hover:text-green-700 transition-colors py-2 bg-green-50 rounded-xl"
                      >
                        Build Package
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}

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

          {/* Footer CTA - Custom Combo Tour */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 shadow-xl mb-6"
          >
            <div className="text-center mb-4">
              <h3 className="text-white font-bold text-xl mb-2">
                Need a multi-event combo?
              </h3>
              <p className="text-white/90 text-sm">
                Combine conference + team building + incentive trip for better rates
              </p>
            </div>

            <Button
              onClick={() => toast.success('Opening Custom Combo Tour wizard...')}
              className="w-full bg-white text-blue-600 hover:bg-gray-100 rounded-full h-12 font-bold text-base shadow-lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Create Custom Combo Tour
            </Button>
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
      <CorporateCategoryDetailEnhanced
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

export default CorporateMICEHubEnhanced;
