// ========================================
// TEMPLE DETAIL SCREEN - Amenities & Importance
// ========================================
interface TempleDetailScreenProps {
  onBack: () => void;
  onGoogleBrowse: (query: string) => void;
  onYouTubeBrowse: (query: string) => void;
  onStartBooking: () => void;
}

export function TempleDetailScreen({
  onBack,
  onGoogleBrowse,
  onYouTubeBrowse,
  onStartBooking,
}: TempleDetailScreenProps) {
  const [expandedFacility, setExpandedFacility] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 px-6 pt-8 pb-8 rounded-b-[2.5rem] shadow-2xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white text-sm font-semibold mb-6 hover:bg-white/20 px-4 py-2.5 rounded-2xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Circuit
        </button>

        <div className="mb-6">
          <div className="w-20 h-20 bg-white/20 rounded-[1.5rem] flex items-center justify-center backdrop-blur-md shadow-2xl border-2 border-white/30 mb-4">
            <Flame className="w-11 h-11 text-white" />
          </div>
          <h1 className="text-white text-3xl font-bold mb-2">[Admin: Temple Name]</h1>
          <p className="text-white/95 text-base font-medium mb-1">[Admin: City, State]</p>
          <p className="text-white/80 text-sm">Dedicated to: [Admin: Deity Name]</p>
        </div>

        {/* Browse Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => onYouTubeBrowse('[Admin: Temple Name]')}
            className="bg-white hover:bg-gray-100 text-red-600 rounded-xl h-11 font-bold"
          >
            <Play className="w-4 h-4 mr-2" />
            Watch Videos
          </Button>
          <Button
            onClick={() => onGoogleBrowse('[Admin: Temple Name]')}
            className="bg-white hover:bg-gray-100 text-blue-600 rounded-xl h-11 font-bold"
          >
            <Globe className="w-4 h-4 mr-2" />
            Explore Map
          </Button>
        </div>
      </div>

      <div className="px-6 pt-6">
        {/* Beauty & History Section */}
        <div className="bg-white rounded-3xl p-6 shadow-xl mb-6 border border-gray-100">
          <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-gray-900">
            <BookOpen className="w-6 h-6 text-orange-600" />
            Beauty & History
          </h3>
          
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-5 rounded-2xl border-2 border-dashed border-orange-300 mb-4">
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              [Admin: Rich description of temple's beauty and architectural significance]
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              [Admin: Historical importance and cultural heritage details]
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              [Admin: Spiritual significance and mythological connections]
            </p>
          </div>

          {/* Image Gallery Placeholder */}
          <div className="grid grid-cols-3 gap-3">
            <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300">
              <Camera className="w-8 h-8 text-gray-400" />
            </div>
            <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300">
              <Camera className="w-8 h-8 text-gray-400" />
            </div>
            <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300">
              <Camera className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Amenities & Importance - Multi-Age Facility Matrix */}
        <div className="bg-white rounded-3xl p-6 shadow-xl mb-6 border border-gray-100">
          <h3 className="font-bold text-xl mb-5 flex items-center gap-2 text-gray-900">
            <Shield className="w-6 h-6 text-blue-600" />
            Amenities & Importance
          </h3>

          {/* Accessibility Features */}
          <div className="mb-5">
            <button
              onClick={() => setExpandedFacility(expandedFacility === 'accessibility' ? null : 'accessibility')}
              className="w-full bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-2xl border-2 border-blue-200 flex items-center justify-between hover:border-blue-300 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Accessibility className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-base text-gray-900">Accessible Darshan Features</h4>
                  <p className="text-xs text-gray-600">For seniors & wheelchair users</p>
                </div>
              </div>
              {expandedFacility === 'accessibility' ? (
                <ChevronUp className="w-5 h-5 text-blue-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-blue-600" />
              )}
            </button>

            <AnimatePresence>
              {expandedFacility === 'accessibility' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-blue-50 p-4 rounded-b-2xl space-y-3 border-2 border-t-0 border-blue-200">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm text-gray-900 mb-1">Ramps & Elevators</p>
                        <p className="text-xs text-gray-600">[Admin: Wheelchair-accessible ramps at all entry points]</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm text-gray-900 mb-1">Battery Cars</p>
                        <p className="text-xs text-gray-600">[Admin: Electric vehicles for elderly devotees]</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm text-gray-900 mb-1">Priority Queues</p>
                        <p className="text-xs text-gray-600">[Admin: Dedicated queues for senior citizens and differently-abled]</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm text-gray-900 mb-1">Seating Areas</p>
                        <p className="text-xs text-gray-600">[Admin: Comfortable resting zones throughout the premises]</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Medical Support */}
          <div className="mb-5">
            <button
              onClick={() => setExpandedFacility(expandedFacility === 'medical' ? null : 'medical')}
              className="w-full bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-2xl border-2 border-green-200 flex items-center justify-between hover:border-green-300 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-base text-gray-900">Medical Support</h4>
                  <p className="text-xs text-gray-600">On-site medical facilities</p>
                </div>
              </div>
              {expandedFacility === 'medical' ? (
                <ChevronUp className="w-5 h-5 text-green-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-green-600" />
              )}
            </button>

            <AnimatePresence>
              {expandedFacility === 'medical' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-green-50 p-4 rounded-b-2xl space-y-3 border-2 border-t-0 border-green-200">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm text-gray-900 mb-1">Medical Center</p>
                        <p className="text-xs text-gray-600">[Admin: Fully equipped medical center with qualified doctors]</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm text-gray-900 mb-1">24/7 Ambulance</p>
                        <p className="text-xs text-gray-600">[Admin: Emergency ambulance service available round the clock]</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm text-gray-900 mb-1">First Aid Stations</p>
                        <p className="text-xs text-gray-600">[Admin: Multiple first aid points throughout the temple]</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm text-gray-900 mb-1">Priority Help for Seniors</p>
                        <p className="text-xs text-gray-600">[Admin: Dedicated medical assistance for elderly devotees]</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Additional Facilities */}
          <div>
            <button
              onClick={() => setExpandedFacility(expandedFacility === 'facilities' ? null : 'facilities')}
              className="w-full bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-2xl border-2 border-purple-200 flex items-center justify-between hover:border-purple-300 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-base text-gray-900">Additional Facilities</h4>
                  <p className="text-xs text-gray-600">Comfort & convenience</p>
                </div>
              </div>
              {expandedFacility === 'facilities' ? (
                <ChevronUp className="w-5 h-5 text-purple-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-purple-600" />
              )}
            </button>

            <AnimatePresence>
              {expandedFacility === 'facilities' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-purple-50 p-4 rounded-b-2xl space-y-3 border-2 border-t-0 border-purple-200">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm text-gray-900 mb-1">Clean Washrooms</p>
                        <p className="text-xs text-gray-600">[Admin: Well-maintained, clean restroom facilities]</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm text-gray-900 mb-1">Drinking Water</p>
                        <p className="text-xs text-gray-600">[Admin: Purified drinking water stations]</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm text-gray-900 mb-1">Prasadam Counter</p>
                        <p className="text-xs text-gray-600">[Admin: Sacred offerings and prasadam distribution]</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm text-gray-900 mb-1">Shoe Deposit</p>
                        <p className="text-xs text-gray-600">[Admin: Secure footwear storage facilities]</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Darshan Timings */}
        <div className="bg-white rounded-3xl p-6 shadow-xl mb-6 border border-gray-100">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-900">
            <Clock className="w-5 h-5 text-orange-600" />
            Darshan Timings
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
              <span className="font-semibold text-sm text-gray-800">Morning</span>
              <span className="text-sm text-gray-700">[Admin: 6:00 AM - 12:00 PM]</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
              <span className="font-semibold text-sm text-gray-800">Evening</span>
              <span className="text-sm text-gray-700">[Admin: 4:00 PM - 9:00 PM]</span>
            </div>
          </div>
        </div>

        {/* Start Booking */}
        <Button
          onClick={onStartBooking}
          className="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 text-white h-14 font-bold text-base shadow-2xl mb-4"
        >
          Start Sacred Journey Booking
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>

        {/* Info */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-900 leading-relaxed font-medium">
              All accessibility features and medical support information is admin-editable. Click the expandable sections to view detailed amenities for each facility type.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// DISCOUNT & CONCESSION PORTAL
// ========================================
interface DiscountPortalScreenProps {
  onBack: () => void;
  selectedDiscounts: string[];
  setSelectedDiscounts: (discounts: string[]) => void;
  organizationId: string;
  setOrganizationId: (id: string) => void;
  onContinue: () => void;
}

export function DiscountPortalScreen({
  onBack,
  selectedDiscounts,
  setSelectedDiscounts,
  organizationId,
  setOrganizationId,
  onContinue,
}: DiscountPortalScreenProps) {
  const toggleDiscount = (id: string) => {
    if (selectedDiscounts.includes(id)) {
      setSelectedDiscounts(selectedDiscounts.filter(d => d !== id));
    } else {
      setSelectedDiscounts([...selectedDiscounts, id]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-6 pt-8 pb-8 rounded-b-[2.5rem] shadow-2xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white text-sm font-semibold mb-6 hover:bg-white/20 px-4 py-2.5 rounded-2xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Explorer
        </button>

        <div className="text-center mb-4">
          <div className="w-20 h-20 bg-white/20 rounded-[1.5rem] flex items-center justify-center backdrop-blur-md shadow-2xl border-2 border-white/30 mx-auto mb-4">
            <Tag className="w-11 h-11 text-white" />
          </div>
          <h1 className="text-white text-3xl font-bold mb-2">Browse Discounts</h1>
          <p className="text-white/90 text-base">Save more on your sacred journey</p>
        </div>
      </div>

      <div className="px-6 pt-6">
        {/* Discount Categories */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Available Concessions</h2>
          
          <div className="space-y-4">
            {discountCategories.map((category) => {
              const isSelected = selectedDiscounts.includes(category.id);
              const colorClasses = {
                blue: {
                  bg: 'from-blue-50 to-cyan-50',
                  border: 'border-blue-200',
                  iconBg: 'bg-blue-100',
                  iconColor: 'text-blue-600',
                  checkBg: 'bg-blue-600',
                },
                green: {
                  bg: 'from-green-50 to-emerald-50',
                  border: 'border-green-200',
                  iconBg: 'bg-green-100',
                  iconColor: 'text-green-600',
                  checkBg: 'bg-green-600',
                },
                purple: {
                  bg: 'from-purple-50 to-pink-50',
                  border: 'border-purple-200',
                  iconBg: 'bg-purple-100',
                  iconColor: 'text-purple-600',
                  checkBg: 'bg-purple-600',
                },
                orange: {
                  bg: 'from-orange-50 to-amber-50',
                  border: 'border-orange-200',
                  iconBg: 'bg-orange-100',
                  iconColor: 'text-orange-600',
                  checkBg: 'bg-orange-600',
                },
                pink: {
                  bg: 'from-pink-50 to-rose-50',
                  border: 'border-pink-200',
                  iconBg: 'bg-pink-100',
                  iconColor: 'text-pink-600',
                  checkBg: 'bg-pink-600',
                },
              };
              
              const colors = colorClasses[category.color as keyof typeof colorClasses];

              return (
                <button
                  key={category.id}
                  onClick={() => toggleDiscount(category.id)}
                  className={`w-full bg-gradient-to-r ${colors.bg} p-5 rounded-2xl border-2 ${
                    isSelected ? colors.border + ' ring-2 ring-offset-2' : colors.border
                  } transition-all hover:scale-[1.02]`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 ${colors.iconBg} rounded-2xl flex items-center justify-center`}>
                        <category.icon className={`w-7 h-7 ${colors.iconColor}`} />
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-base text-gray-900 mb-1">{category.name}</h3>
                        <p className="text-sm text-gray-600">{category.desc}</p>
                      </div>
                    </div>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected ? `${colors.checkBg} border-transparent` : 'border-gray-300'
                    }`}>
                      {isSelected && <Check className="w-5 h-5 text-white" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Customized Group Discounts */}
        {selectedDiscounts.includes('group') && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-white rounded-3xl p-6 shadow-xl mb-6 border border-gray-100"
          >
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-900">
              <Building className="w-5 h-5 text-purple-600" />
              Organization Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Organization / Institute ID
                </label>
                <Input
                  type="text"
                  placeholder="Enter your organization ID or code"
                  value={organizationId}
                  onChange={(e) => setOrganizationId(e.target.value)}
                  className="h-12 bg-gray-50 border-gray-300 rounded-xl"
                />
                <p className="text-xs text-gray-600 mt-2">
                  [Admin: This will be verified to apply customized group discounts]
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200">
                <p className="text-sm text-purple-900 font-medium">
                  💡 <strong>Tip:</strong> Contact your organization's travel coordinator for the discount code. Group discounts can save up to 40% on pilgrimage packages.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Summary */}
        <div className="bg-white rounded-3xl p-6 shadow-xl mb-6 border border-gray-100">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-900">
            <Receipt className="w-5 h-5 text-orange-600" />
            Selected Concessions
          </h3>
          
          {selectedDiscounts.length === 0 ? (
            <p className="text-sm text-gray-600 text-center py-4">No discounts selected yet</p>
          ) : (
            <div className="space-y-2">
              {selectedDiscounts.map((id) => {
                const category = discountCategories.find(c => c.id === id);
                return category ? (
                  <div key={id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-sm font-semibold text-gray-800">{category.name}</span>
                    <Badge className="bg-green-100 text-green-700">
                      <Check className="w-3 h-3 mr-1" />
                      Applied
                    </Badge>
                  </div>
                ) : null;
              })}
            </div>
          )}
        </div>

        {/* Continue Button */}
        <Button
          onClick={onContinue}
          disabled={selectedDiscounts.length === 0}
          className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white h-14 font-bold text-base shadow-2xl disabled:opacity-50 mb-4"
        >
          Apply Discounts & Continue
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>

        {/* Info */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-900 leading-relaxed font-medium">
              Select all applicable discounts. Your final package price will be calculated based on the best available concession. Admin can update discount percentages and eligibility criteria.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Continue with booking flow screens in next file...
