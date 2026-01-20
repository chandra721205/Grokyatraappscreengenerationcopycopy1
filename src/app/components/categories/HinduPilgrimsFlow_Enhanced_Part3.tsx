// ========================================
// BOOKING FLOW - STEP 1: DESTINATION PRIORITY
// ========================================
interface BookingStep1ScreenProps {
  onBack: () => void;
  selectedDestinations: string[];
  setSelectedDestinations: (destinations: string[]) => void;
  onContinue: () => void;
}

export function BookingStep1Screen({
  onBack,
  selectedDestinations,
  setSelectedDestinations,
  onContinue,
}: BookingStep1ScreenProps) {
  const [showNearbyAttractions, setShowNearbyAttractions] = useState(false);

  const primaryDestinations = [
    { id: '1', name: '[Admin: Destination 1]', category: 'Hindu Pilgrimage', nearby: 3 },
    { id: '2', name: '[Admin: Destination 2]', category: 'Hindu Pilgrimage', nearby: 2 },
    { id: '3', name: '[Admin: Destination 3]', category: 'Hindu Pilgrimage', nearby: 5 },
  ];

  const nearbyAttractions = [
    { id: 'n1', name: '[Admin: Heritage Site 1]', category: 'Heritage Tourism', distance: '15 km' },
    { id: 'n2', name: '[Admin: Eco Spot 1]', category: 'Eco Tourism', distance: '22 km' },
    { id: 'n3', name: '[Admin: Heritage Site 2]', category: 'Heritage Tourism', distance: '30 km' },
  ];

  const toggleDestination = (id: string) => {
    if (selectedDestinations.includes(id)) {
      setSelectedDestinations(selectedDestinations.filter(d => d !== id));
    } else {
      setSelectedDestinations([...selectedDestinations, id]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 px-6 pt-8 pb-8 rounded-b-[2.5rem] shadow-2xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white text-sm font-semibold mb-6 hover:bg-white/20 px-4 py-2.5 rounded-2xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="text-center">
          <div className="w-20 h-20 bg-white/20 rounded-[1.5rem] flex items-center justify-center backdrop-blur-md shadow-2xl border-2 border-white/30 mx-auto mb-4">
            <MapPin className="w-11 h-11 text-white" />
          </div>
          <h1 className="text-white text-3xl font-bold mb-2">Select Destinations</h1>
          <p className="text-white/90 text-base mb-1">Hindu Journey Package</p>
          <p className="text-white/80 text-sm">Step 1 of 4</p>
        </div>
      </div>

      <div className="px-6 pt-6">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-orange-600">Step 1: Destinations</span>
            <span className="text-xs text-gray-600">25% Complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-500 to-red-600 w-1/4 rounded-full"></div>
          </div>
        </div>

        {/* Primary Destinations */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Sacred Destinations</h2>
          
          <div className="space-y-4">
            {primaryDestinations.map((destination) => {
              const isSelected = selectedDestinations.includes(destination.id);
              
              return (
                <button
                  key={destination.id}
                  onClick={() => toggleDestination(destination.id)}
                  className={`w-full bg-white p-5 rounded-2xl border-2 transition-all hover:scale-[1.01] ${
                    isSelected ? 'border-orange-400 ring-2 ring-orange-200' : 'border-gray-200'
                  } shadow-lg`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                        isSelected ? 'bg-orange-100' : 'bg-gray-100'
                      }`}>
                        <Flame className={`w-7 h-7 ${isSelected ? 'text-orange-600' : 'text-gray-600'}`} />
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-base text-gray-900 mb-1">{destination.name}</h3>
                        <p className="text-sm text-gray-600">{destination.category}</p>
                      </div>
                    </div>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected ? 'bg-orange-600 border-transparent' : 'border-gray-300'
                    }`}>
                      {isSelected && <Check className="w-5 h-5 text-white" />}
                    </div>
                  </div>

                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex items-center gap-2 text-sm text-blue-600">
                          <Info className="w-4 h-4" />
                          <span className="font-semibold">{destination.nearby} nearby attractions available</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Nearby Attractions - Multi-Category */}
        {selectedDestinations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-6 shadow-xl mb-6 border-2 border-blue-200"
          >
            <button
              onClick={() => setShowNearbyAttractions(!showNearbyAttractions)}
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Compass className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">Build Multi-Category Experience</h3>
                  <p className="text-sm text-gray-600">Add nearby Heritage & Eco attractions</p>
                </div>
              </div>
              {showNearbyAttractions ? (
                <ChevronUp className="w-5 h-5 text-blue-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-blue-600" />
              )}
            </button>

            <AnimatePresence>
              {showNearbyAttractions && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 space-y-3">
                    {nearbyAttractions.map((attraction) => {
                      const isSelected = selectedDestinations.includes(attraction.id);
                      const categoryColors = {
                        'Heritage Tourism': { bg: 'bg-purple-50', text: 'text-purple-700', icon: Building },
                        'Eco Tourism': { bg: 'bg-green-50', text: 'text-green-700', icon: Leaf },
                      };
                      const colors = categoryColors[attraction.category as keyof typeof categoryColors];
                      
                      return (
                        <button
                          key={attraction.id}
                          onClick={() => toggleDestination(attraction.id)}
                          className={`w-full bg-white p-4 rounded-xl border transition-all ${
                            isSelected ? 'border-blue-400 ring-2 ring-blue-200' : 'border-gray-200'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center`}>
                                <colors.icon className={`w-5 h-5 ${colors.text}`} />
                              </div>
                              <div className="text-left">
                                <h4 className="font-semibold text-sm text-gray-900">{attraction.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge className={`${colors.bg} ${colors.text} text-[10px]`}>
                                    {attraction.category}
                                  </Badge>
                                  <span className="text-xs text-gray-600">{attraction.distance} away</span>
                                </div>
                              </div>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              isSelected ? 'bg-blue-600 border-transparent' : 'border-gray-300'
                            }`}>
                              {isSelected && <Check className="w-4 h-4 text-white" />}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Summary */}
        <div className="bg-white rounded-3xl p-6 shadow-xl mb-6 border border-gray-100">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-900">
            <FileText className="w-5 h-5 text-orange-600" />
            Journey Summary
          </h3>
          
          <div className="bg-orange-50 p-4 rounded-2xl">
            <p className="text-sm font-semibold text-gray-800 mb-2">
              {selectedDestinations.length} {selectedDestinations.length === 1 ? 'destination' : 'destinations'} selected
            </p>
            <p className="text-xs text-gray-600">
              Estimated duration: [Admin: Based on destinations]
            </p>
          </div>
        </div>

        {/* Continue Button */}
        <Button
          onClick={onContinue}
          disabled={selectedDestinations.length === 0}
          className="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 text-white h-14 font-bold text-base shadow-2xl disabled:opacity-50 mb-4"
        >
          Continue to Transport Selection
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>

        {/* Info */}
        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-orange-900 leading-relaxed font-medium">
              Select your primary sacred destinations first. The system will then show nearby Heritage and Eco Tourism attractions to build a comprehensive multi-category journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// BOOKING FLOW - STEP 2: TRANSPORT SELECTION
// ========================================
interface BookingStep2ScreenProps {
  onBack: () => void;
  reachingTransport: string;
  setReachingTransport: (transport: string) => void;
  localTransport: string;
  setLocalTransport: (transport: string) => void;
  onContinue: () => void;
}

export function BookingStep2Screen({
  onBack,
  reachingTransport,
  setReachingTransport,
  localTransport,
  setLocalTransport,
  onContinue,
}: BookingStep2ScreenProps) {
  const [hasRailwayDiscount, setHasRailwayDiscount] = useState(false);

  const reachingOptions = [
    { id: 'flight', name: 'Flight', icon: PlaneTakeoff, desc: 'Fastest option', color: 'blue' },
    { id: 'train', name: 'Train', icon: Train, desc: 'Scenic & economical', color: 'green', discount: true },
    { id: 'bus', name: 'Bus', icon: Bus, desc: 'Budget-friendly', color: 'orange' },
  ];

  const localOptions = [
    { id: 'eco-ride', name: 'Eco-Rides', icon: Leaf, desc: 'Environmentally friendly', color: 'green' },
    { id: 'taxi', name: 'Private Taxi', icon: Car, desc: 'Comfortable & convenient', color: 'blue' },
    { id: 'shared', name: 'Shared Vehicles', icon: Users, desc: 'Cost-effective', color: 'purple' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-6 pt-8 pb-8 rounded-b-[2.5rem] shadow-2xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white text-sm font-semibold mb-6 hover:bg-white/20 px-4 py-2.5 rounded-2xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="text-center">
          <div className="w-20 h-20 bg-white/20 rounded-[1.5rem] flex items-center justify-center backdrop-blur-md shadow-2xl border-2 border-white/30 mx-auto mb-4">
            <Train className="w-11 h-11 text-white" />
          </div>
          <h1 className="text-white text-3xl font-bold mb-2">Select Transport</h1>
          <p className="text-white/90 text-base mb-1">Hindu Journey Package</p>
          <p className="text-white/80 text-sm">Step 2 of 4</p>
        </div>
      </div>

      <div className="px-6 pt-6">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-blue-600">Step 2: Transport</span>
            <span className="text-xs text-gray-600">50% Complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-700 w-1/2 rounded-full"></div>
          </div>
        </div>

        {/* Reaching Destination */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Reaching Destination</h2>
          
          <div className="space-y-4">
            {reachingOptions.map((option) => {
              const isSelected = reachingTransport === option.id;
              const colorClasses = {
                blue: { bg: 'from-blue-50 to-cyan-50', border: 'border-blue-200', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
                green: { bg: 'from-green-50 to-emerald-50', border: 'border-green-200', iconBg: 'bg-green-100', iconColor: 'text-green-600' },
                orange: { bg: 'from-orange-50 to-amber-50', border: 'border-orange-200', iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
              };
              const colors = colorClasses[option.color as keyof typeof colorClasses];
              
              return (
                <button
                  key={option.id}
                  onClick={() => setReachingTransport(option.id)}
                  className={`w-full bg-gradient-to-r ${colors.bg} p-5 rounded-2xl border-2 transition-all hover:scale-[1.01] ${
                    isSelected ? `${colors.border} ring-2 ring-offset-2` : colors.border
                  } shadow-lg`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 ${colors.iconBg} rounded-2xl flex items-center justify-center`}>
                        <option.icon className={`w-7 h-7 ${colors.iconColor}`} />
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-base text-gray-900 mb-1">{option.name}</h3>
                        <p className="text-sm text-gray-600">{option.desc}</p>
                        {option.discount && (
                          <Badge className="bg-green-100 text-green-700 text-[10px] mt-2">
                            <Percent className="w-3 h-3 mr-1" />
                            Railway concession available
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected ? `bg-${option.color}-600 border-transparent` : 'border-gray-300'
                    }`}>
                      {isSelected && <Check className="w-5 h-5 text-white" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Railway Discount Toggle */}
          {reachingTransport === 'train' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 bg-green-50 p-5 rounded-2xl border-2 border-green-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-gray-900 mb-1">Apply Railway Concession</h4>
                  <p className="text-xs text-gray-600">Senior citizen discounts available</p>
                </div>
                <Switch
                  checked={hasRailwayDiscount}
                  onCheckedChange={setHasRailwayDiscount}
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Local Travel */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Local Travel (Within City)</h2>
          
          <div className="space-y-4">
            {localOptions.map((option) => {
              const isSelected = localTransport === option.id;
              const colorClasses = {
                green: { bg: 'from-green-50 to-emerald-50', border: 'border-green-200', iconBg: 'bg-green-100', iconColor: 'text-green-600' },
                blue: { bg: 'from-blue-50 to-cyan-50', border: 'border-blue-200', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
                purple: { bg: 'from-purple-50 to-pink-50', border: 'border-purple-200', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
              };
              const colors = colorClasses[option.color as keyof typeof colorClasses];
              
              return (
                <button
                  key={option.id}
                  onClick={() => setLocalTransport(option.id)}
                  className={`w-full bg-gradient-to-r ${colors.bg} p-5 rounded-2xl border-2 transition-all hover:scale-[1.01] ${
                    isSelected ? `${colors.border} ring-2 ring-offset-2` : colors.border
                  } shadow-lg`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 ${colors.iconBg} rounded-2xl flex items-center justify-center`}>
                        <option.icon className={`w-7 h-7 ${colors.iconColor}`} />
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-base text-gray-900 mb-1">{option.name}</h3>
                        <p className="text-sm text-gray-600">{option.desc}</p>
                      </div>
                    </div>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected ? `bg-${option.color}-600 border-transparent` : 'border-gray-300'
                    }`}>
                      {isSelected && <Check className="w-5 h-5 text-white" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Continue Button */}
        <Button
          onClick={onContinue}
          disabled={!reachingTransport || !localTransport}
          className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white h-14 font-bold text-base shadow-2xl disabled:opacity-50 mb-4"
        >
          Continue to Professional Assistance
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>

        {/* Info */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-900 leading-relaxed font-medium">
              Choose your preferred mode of transport for reaching the destination and local travel. Applicable discounts (like railway concessions) will be automatically applied to your final package price.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Continue with Step 3 & 4 and Feedback screen...
