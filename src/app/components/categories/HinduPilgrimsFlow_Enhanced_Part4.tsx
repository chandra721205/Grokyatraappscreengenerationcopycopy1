// ========================================
// BOOKING FLOW - STEP 3: PROFESSIONAL ASSISTANCE
// ========================================
interface BookingStep3ScreenProps {
  onBack: () => void;
  tourCoordinator: string;
  setTourCoordinator: (coordinator: string) => void;
  medicalStaff: string;
  setMedicalStaff: (staff: string) => void;
  onContinue: () => void;
}

export function BookingStep3Screen({
  onBack,
  tourCoordinator,
  setTourCoordinator,
  medicalStaff,
  setMedicalStaff,
  onContinue,
}: BookingStep3ScreenProps) {
  const [medicalSharing, setMedicalSharing] = useState<'group' | 'individual'>('group');

  const coordinatorOptions = [
    { 
      id: 'expert', 
      name: 'Expert Tour Coordinator', 
      desc: '[Admin: Experienced guide with 10+ years]',
      features: ['Temple protocols', 'Local language', 'Safety certified'],
      price: '[Admin: ₹5,000]'
    },
    { 
      id: 'standard', 
      name: 'Standard Coordinator', 
      desc: '[Admin: Professional guide with 5+ years]',
      features: ['Basic guidance', 'English speaking', 'First aid trained'],
      price: '[Admin: ₹3,000]'
    },
    { 
      id: 'none', 
      name: 'No Coordinator', 
      desc: 'Self-guided pilgrimage',
      features: ['Independent travel', 'Digital maps provided', 'Emergency support'],
      price: 'Free'
    },
  ];

  const medicalOptions = [
    { 
      id: 'doctor', 
      name: 'Doctor', 
      desc: '[Admin: MBBS qualified physician]',
      icon: Stethoscope,
      price: '[Admin: ₹8,000/day]'
    },
    { 
      id: 'nurse', 
      name: 'Nurse', 
      desc: '[Admin: Registered nurse]',
      icon: HeartIcon,
      price: '[Admin: ₹4,000/day]'
    },
    { 
      id: 'compounder', 
      name: 'Compounder', 
      desc: '[Admin: Medical assistant]',
      icon: Briefcase,
      price: '[Admin: ₹2,000/day]'
    },
    { 
      id: 'none', 
      name: 'No Medical Staff', 
      desc: 'First aid kit provided',
      icon: Shield,
      price: 'Free'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 px-6 pt-8 pb-8 rounded-b-[2.5rem] shadow-2xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white text-sm font-semibold mb-6 hover:bg-white/20 px-4 py-2.5 rounded-2xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="text-center">
          <div className="w-20 h-20 bg-white/20 rounded-[1.5rem] flex items-center justify-center backdrop-blur-md shadow-2xl border-2 border-white/30 mx-auto mb-4">
            <Users className="w-11 h-11 text-white" />
          </div>
          <h1 className="text-white text-3xl font-bold mb-2">Professional Assistance</h1>
          <p className="text-white/90 text-base mb-1">Hindu Journey Package</p>
          <p className="text-white/80 text-sm">Step 3 of 4</p>
        </div>
      </div>

      <div className="px-6 pt-6">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-green-600">Step 3: Services</span>
            <span className="text-xs text-gray-600">75% Complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-600 to-teal-700 w-3/4 rounded-full"></div>
          </div>
        </div>

        {/* Tour Coordinator Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Tour Coordinator</h2>
          
          <div className="space-y-4">
            {coordinatorOptions.map((option) => {
              const isSelected = tourCoordinator === option.id;
              
              return (
                <button
                  key={option.id}
                  onClick={() => setTourCoordinator(option.id)}
                  className={`w-full bg-white p-5 rounded-2xl border-2 transition-all hover:scale-[1.01] ${
                    isSelected ? 'border-green-400 ring-2 ring-green-200' : 'border-gray-200'
                  } shadow-lg`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-left flex-1">
                      <h3 className="font-bold text-base text-gray-900 mb-1">{option.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{option.desc}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {option.features.map((feature, idx) => (
                          <Badge key={idx} className="bg-green-50 text-green-700 text-xs">
                            <Check className="w-3 h-3 mr-1" />
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      
                      <p className="text-sm font-bold text-green-600">{option.price}</p>
                    </div>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ml-3 flex-shrink-0 ${
                      isSelected ? 'bg-green-600 border-transparent' : 'border-gray-300'
                    }`}>
                      {isSelected && <Check className="w-5 h-5 text-white" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Medical Staff Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Medical Staff Selection</h2>
          
          <div className="space-y-4">
            {medicalOptions.map((option) => {
              const isSelected = medicalStaff === option.id;
              
              return (
                <button
                  key={option.id}
                  onClick={() => setMedicalStaff(option.id)}
                  className={`w-full bg-white p-5 rounded-2xl border-2 transition-all hover:scale-[1.01] ${
                    isSelected ? 'border-blue-400 ring-2 ring-blue-200' : 'border-gray-200'
                  } shadow-lg`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                        isSelected ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <option.icon className={`w-7 h-7 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-base text-gray-900 mb-1">{option.name}</h3>
                        <p className="text-sm text-gray-600 mb-1">{option.desc}</p>
                        <p className="text-sm font-bold text-blue-600">{option.price}</p>
                      </div>
                    </div>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'bg-blue-600 border-transparent' : 'border-gray-300'
                    }`}>
                      {isSelected && <Check className="w-5 h-5 text-white" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Medical Sharing Options */}
          {medicalStaff !== 'none' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 bg-blue-50 p-5 rounded-2xl border-2 border-blue-200"
            >
              <h4 className="font-bold text-sm text-gray-900 mb-4">Medical Support Type</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setMedicalSharing('group')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    medicalSharing === 'group' 
                      ? 'border-blue-500 bg-blue-100' 
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  <Users className={`w-6 h-6 mx-auto mb-2 ${
                    medicalSharing === 'group' ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                  <p className="text-sm font-semibold text-gray-900">Group-wide</p>
                  <p className="text-xs text-gray-600 mt-1">Shared cost</p>
                </button>
                
                <button
                  onClick={() => setMedicalSharing('individual')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    medicalSharing === 'individual' 
                      ? 'border-blue-500 bg-blue-100' 
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  <User className={`w-6 h-6 mx-auto mb-2 ${
                    medicalSharing === 'individual' ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                  <p className="text-sm font-semibold text-gray-900">Individual</p>
                  <p className="text-xs text-gray-600 mt-1">Dedicated</p>
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Service Summary */}
        <div className="bg-white rounded-3xl p-6 shadow-xl mb-6 border border-gray-100">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-900">
            <FileText className="w-5 h-5 text-green-600" />
            Service Summary
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm font-semibold text-gray-800">Coordinator</span>
              <span className="text-sm text-gray-700">
                {coordinatorOptions.find(o => o.id === tourCoordinator)?.name || 'Not selected'}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm font-semibold text-gray-800">Medical Staff</span>
              <span className="text-sm text-gray-700">
                {medicalOptions.find(o => o.id === medicalStaff)?.name || 'Not selected'}
              </span>
            </div>
            {medicalStaff !== 'none' && (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm font-semibold text-gray-800">Support Type</span>
                <Badge className="bg-blue-100 text-blue-700">
                  {medicalSharing === 'group' ? 'Group-wide' : 'Individual'}
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Continue Button */}
        <Button
          onClick={onContinue}
          disabled={!tourCoordinator || !medicalStaff}
          className="w-full rounded-2xl bg-gradient-to-r from-green-600 to-teal-700 text-white h-14 font-bold text-base shadow-2xl disabled:opacity-50 mb-4"
        >
          Continue to Itinerary & Summary
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>

        {/* Info */}
        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-green-900 leading-relaxed font-medium">
              Professional assistance ensures a smooth and safe pilgrimage. Medical staff can be shared across your group or assigned individually based on your needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// BOOKING FLOW - STEP 4: SUMMARY & ITINERARY
// ========================================
interface BookingStep4ScreenProps {
  onBack: () => void;
  selectedDestinations: string[];
  reachingTransport: string;
  localTransport: string;
  tourCoordinator: string;
  medicalStaff: string;
  onComplete: () => void;
}

export function BookingStep4Screen({
  onBack,
  selectedDestinations,
  reachingTransport,
  localTransport,
  tourCoordinator,
  medicalStaff,
  onComplete,
}: BookingStep4ScreenProps) {
  const [showItinerary, setShowItinerary] = useState(false);

  const handleGenerateItinerary = () => {
    setShowItinerary(true);
    toast.success('Full journey itinerary generated!', {
      description: 'Your complete pilgrimage plan from home and back',
      icon: '📋',
    });
  };

  const mockItinerary = [
    { day: 1, activity: '[Admin: Departure from home]', location: '[Admin: Your City]' },
    { day: 2, activity: '[Admin: Arrival at Destination 1]', location: '[Admin: Sacred Site 1]' },
    { day: 3, activity: '[Admin: Darshan at Temple 1]', location: '[Admin: Sacred Site 1]' },
    { day: 4, activity: '[Admin: Travel to Destination 2]', location: '[Admin: Sacred Site 2]' },
    { day: 5, activity: '[Admin: Return journey home]', location: '[Admin: Your City]' },
  ];

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
            <FileText className="w-11 h-11 text-white" />
          </div>
          <h1 className="text-white text-3xl font-bold mb-2">Booking Summary</h1>
          <p className="text-white/90 text-base mb-1">Hindu Journey Package</p>
          <p className="text-white/80 text-sm">Step 4 of 4 - Final Review</p>
        </div>
      </div>

      <div className="px-6 pt-6">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-orange-600">Step 4: Summary</span>
            <span className="text-xs text-gray-600">100% Complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-500 to-red-600 w-full rounded-full"></div>
          </div>
        </div>

        {/* Journey Summary Card */}
        <div className="bg-white rounded-3xl p-6 shadow-2xl mb-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-orange-600" />
            Your Sacred Journey
          </h2>

          <div className="space-y-4">
            {/* Destinations */}
            <div className="bg-orange-50 p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-orange-600" />
                <h3 className="font-bold text-sm text-gray-900">Destinations</h3>
              </div>
              <p className="text-sm text-gray-700 ml-7">
                {selectedDestinations.length} sacred sites selected
              </p>
            </div>

            {/* Transport */}
            <div className="bg-blue-50 p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <Train className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-sm text-gray-900">Transport</h3>
              </div>
              <p className="text-sm text-gray-700 ml-7">
                Reaching: {reachingTransport} • Local: {localTransport}
              </p>
            </div>

            {/* Services */}
            <div className="bg-green-50 p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-green-600" />
                <h3 className="font-bold text-sm text-gray-900">Professional Assistance</h3>
              </div>
              <p className="text-sm text-gray-700 ml-7">
                Coordinator: {tourCoordinator} • Medical: {medicalStaff}
              </p>
            </div>

            {/* Estimated Cost */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-2xl border-2 border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-sm text-gray-900">Estimated Package Cost</h3>
              </div>
              <p className="text-2xl font-bold text-purple-900 ml-7">[Admin: ₹45,000]</p>
              <p className="text-xs text-purple-700 ml-7 mt-1">Inclusive of all services and discounts</p>
            </div>
          </div>
        </div>

        {/* Generate Itinerary Button */}
        <Button
          onClick={handleGenerateItinerary}
          className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white h-14 font-bold text-base shadow-2xl mb-6"
        >
          <FileText className="w-5 h-5 mr-2" />
          Generate Full Journey Itinerary
        </Button>

        {/* Itinerary Display */}
        <AnimatePresence>
          {showItinerary && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-3xl p-6 shadow-xl mb-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-xl text-gray-900 flex items-center gap-2">
                  <Navigation className="w-6 h-6 text-blue-600" />
                  Day-by-Day Itinerary
                </h3>
                <Button
                  variant="outline"
                  className="h-9 rounded-lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>

              <div className="space-y-3">
                {mockItinerary.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-700 text-sm">
                        {item.day}
                      </div>
                      {idx < mockItinerary.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">{item.activity}</h4>
                      <p className="text-xs text-gray-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 bg-orange-50 p-4 rounded-2xl border border-orange-200">
                <p className="text-xs text-orange-900 font-medium">
                  ✨ This itinerary maps your complete journey from home and back, including all sacred sites, transit times, and rest periods.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Complete Booking Button */}
        <Button
          onClick={onComplete}
          className="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 text-white h-16 font-bold text-lg shadow-2xl mb-4"
        >
          <CheckCircle2 className="w-6 h-6 mr-2" />
          Complete Sacred Journey Booking
        </Button>

        {/* Share Options */}
        <div className="flex gap-3 mb-6">
          <Button
            variant="outline"
            className="flex-1 rounded-xl h-11"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button
            variant="outline"
            className="flex-1 rounded-xl h-11"
          >
            <Bookmark className="w-4 h-4 mr-2" />
            Save for Later
          </Button>
        </div>

        {/* Info */}
        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-orange-900 leading-relaxed font-medium">
              Review your complete sacred journey package. The generated itinerary shows your day-by-day schedule from departure to return. You'll receive a detailed confirmation via email after booking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// POST-TRIP FEEDBACK SCREEN
// ========================================
interface FeedbackScreenProps {
  onBack: () => void;
  rating: number;
  setRating: (rating: number) => void;
  feedback: string;
  setFeedback: (feedback: string) => void;
  onSubmit: () => void;
}

export function FeedbackScreen({
  onBack,
  rating,
  setRating,
  feedback,
  setFeedback,
  onSubmit,
}: FeedbackScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-rose-700 px-6 pt-8 pb-8 rounded-b-[2.5rem] shadow-2xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white text-sm font-semibold mb-6 hover:bg-white/20 px-4 py-2.5 rounded-2xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="text-center">
          <div className="w-20 h-20 bg-white/20 rounded-[1.5rem] flex items-center justify-center backdrop-blur-md shadow-2xl border-2 border-white/30 mx-auto mb-4">
            <Star className="w-11 h-11 text-white fill-white" />
          </div>
          <h1 className="text-white text-3xl font-bold mb-2">Share Your Experience</h1>
          <p className="text-white/90 text-base">Post-Trip Feedback</p>
        </div>
      </div>

      <div className="px-6 pt-6">
        {/* Thank You Message */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-3xl p-6 shadow-xl mb-6 border-2 border-orange-200">
          <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-orange-600" />
            Thank You for Your Sacred Journey! 🙏
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            We hope your pilgrimage was spiritually enriching and memorable. Your feedback helps us serve pilgrims better.
          </p>
        </div>

        {/* Star Rating */}
        <div className="bg-white rounded-3xl p-6 shadow-xl mb-6 border border-gray-100">
          <h3 className="font-bold text-lg mb-4 text-gray-900">Rate Your Experience</h3>
          
          <div className="flex justify-center gap-3 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="transition-all hover:scale-110"
              >
                <Star
                  className={`w-14 h-14 ${
                    star <= rating 
                      ? 'text-yellow-500 fill-yellow-500' 
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-gray-600">
            {rating === 0 && 'Tap a star to rate'}
            {rating === 1 && 'Poor - We\'ll improve'}
            {rating === 2 && 'Fair - Room for improvement'}
            {rating === 3 && 'Good - Satisfactory experience'}
            {rating === 4 && 'Very Good - Great experience'}
            {rating === 5 && 'Excellent - Outstanding experience!'}
          </p>
        </div>

        {/* Detailed Feedback */}
        <div className="bg-white rounded-3xl p-6 shadow-xl mb-6 border border-gray-100">
          <h3 className="font-bold text-lg mb-4 text-gray-900">Share More Details (Optional)</h3>
          
          <textarea
            placeholder="Tell us about your pilgrimage experience, highlights, suggestions for improvement..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full h-40 px-4 py-3 border-2 border-gray-300 rounded-2xl bg-gray-50 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Feedback Categories */}
        <div className="bg-white rounded-3xl p-6 shadow-xl mb-6 border border-gray-100">
          <h3 className="font-bold text-lg mb-4 text-gray-900">Rate Specific Aspects</h3>
          
          <div className="space-y-4">
            {[
              { name: 'Temple Access & Darshan', icon: Flame },
              { name: 'Transportation Quality', icon: Train },
              { name: 'Coordinator Service', icon: User },
              { name: 'Medical Support', icon: Stethoscope },
              { name: 'Overall Value for Money', icon: DollarSign },
            ].map((aspect, idx) => (
              <div key={idx} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <aspect.icon className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-semibold text-gray-800">{aspect.name}</span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 text-gray-300" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          onClick={onSubmit}
          disabled={rating === 0}
          className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-pink-700 text-white h-14 font-bold text-base shadow-2xl disabled:opacity-50 mb-4"
        >
          <CheckCircle2 className="w-5 h-5 mr-2" />
          Submit Feedback
        </Button>

        {/* Info */}
        <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-purple-900 leading-relaxed font-medium">
              Your feedback is invaluable in helping us improve the sacred journey experience for future pilgrims. All reviews are admin-editable and will be used to enhance our services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
