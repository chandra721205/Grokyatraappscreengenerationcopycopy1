import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Search, Heart, Activity, Stethoscope, HandHeart, Phone, Shield, Users, MapPin, Calendar, Star, ChevronRight, Clock, UserCheck, Syringe, Pill, Ambulance, Headset } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { PersonalizedDealsAlert } from '@/app/components/shared/PersonalizedDealsAlert';

interface SeniorWellnessHubProps {
  onBack: () => void;
}

export function SeniorWellnessHub({ onBack }: SeniorWellnessHubProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<string | null>(null);

  // Senior Wellness Services
  const seniorServices = [
    {
      id: 'doctor-on-tour',
      icon: Stethoscope,
      title: 'Doctor on Tour',
      description: 'Travel with medical professionals',
      gradient: 'from-blue-500 to-cyan-600',
      details: 'Dedicated medical doctor accompanies your entire journey, available 24/7'
    },
    {
      id: 'nursing-care',
      icon: Syringe,
      title: 'Nursing Care',
      description: 'Professional nursing assistance',
      gradient: 'from-green-500 to-emerald-600',
      details: 'Qualified nurses for medication management and health monitoring'
    },
    {
      id: 'personal-assistant',
      icon: UserCheck,
      title: 'Personal Assistant',
      description: 'Dedicated travel companion',
      gradient: 'from-purple-500 to-indigo-600',
      details: 'Personal assistant for daily activities, mobility support, and companionship'
    },
    {
      id: 'emergency-support',
      icon: Ambulance,
      title: 'Emergency Support',
      description: '24/7 medical emergency',
      gradient: 'from-red-500 to-orange-600',
      details: 'Immediate emergency medical response and hospital coordination'
    },
    {
      id: 'medication-management',
      icon: Pill,
      title: 'Medication Management',
      description: 'Timely medication reminders',
      gradient: 'from-yellow-500 to-amber-600',
      details: 'Ensure proper medication schedules and prescription management'
    },
    {
      id: 'health-monitoring',
      icon: Activity,
      title: 'Health Monitoring',
      description: 'Continuous health tracking',
      gradient: 'from-pink-500 to-rose-600',
      details: 'Regular vitals monitoring with digital health tracking devices'
    },
  ];

  // Sample senior-friendly tour packages
  const seniorPackages = [
    {
      name: 'Golden Years Retreat',
      destination: 'Admin-Selected Destination 1',
      description: 'Peaceful journey with wellness activities',
      price: '₹25,000',
      duration: '5N/6D',
      rating: 4.9,
      reviews: 187,
      includes: ['Doctor on Tour', 'Wheelchair Access', 'Slow-paced itinerary'],
      ageGroup: '60+ years',
    },
    {
      name: 'Heritage & Wellness Tour',
      destination: 'Popular Location A',
      description: 'Cultural exploration with health monitoring',
      price: '₹32,000',
      duration: '6N/7D',
      rating: 4.8,
      reviews: 142,
      includes: ['Nursing Care', 'Personal Assistant', 'Comfortable transport'],
      ageGroup: '55+ years',
    },
    {
      name: 'Coastal Serenity Package',
      destination: 'Destination Package B',
      description: 'Relaxation with wellness activities',
      price: '₹28,500',
      duration: '7N/8D',
      rating: 4.9,
      reviews: 203,
      includes: ['Health Monitoring', 'Spa Treatments', 'Dietary planning'],
      ageGroup: '60+ years',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 pt-12 pb-8 rounded-b-[2rem]">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-6"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Heart className="w-9 h-9 text-white" />
          </div>
          <div>
            <h1 className="text-white text-3xl font-bold">Senior Wellness</h1>
            <p className="text-white/80 text-sm">Comfortable travel with care</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search services, destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-full bg-white border-0 shadow-lg"
          />
        </div>
      </div>

      <div className="px-6 -mt-6 pb-8">
        {/* ========================================
            PERSONALIZED DEALS ALERT
            Location: Below category intro, above services
            ======================================== */}
        <div className="mb-6">
          <PersonalizedDealsAlert
            category="senior-wellness"
            showAdminIndicators={false}
            onSavePreferences={(data) => {
              console.log('Senior wellness deal preferences saved:', data);
              // Backend sync would happen here in production
            }}
            content={{
              heading: '[Admin: Get Senior Care Deal Alerts]',
              description: '[Admin: Set your budget for senior wellness packages]',
              budgetPlaceholder: '[Admin: e.g., ₹45,000 for 6 nights]',
              notificationText: '[Admin: Notify me of senior care travel deals]',
              buttonLabel: '[Admin: Save Senior Care Preferences]'
            }}
          />
        </div>

        {/* Senior Care Services */}
        <Card className="bg-white rounded-3xl p-6 shadow-xl mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Care Services</h2>
            <Shield className="w-6 h-6 text-indigo-600" />
          </div>
          <p className="text-gray-600 text-sm mb-6">Professional medical and personal care during your journey</p>
          
          <div className="grid grid-cols-2 gap-4">
            {seniorServices.map((service) => (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedService(service.id)}
                className={`p-4 rounded-2xl transition-all ${
                  selectedService === service.id 
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                  selectedService === service.id 
                    ? 'bg-white/20' 
                    : `bg-gradient-to-br ${service.gradient}`
                }`}>
                  <service.icon className={`w-6 h-6 ${
                    selectedService === service.id ? 'text-white' : 'text-white'
                  }`} />
                </div>
                <h3 className={`font-bold text-sm mb-1 ${
                  selectedService === service.id ? 'text-white' : 'text-gray-900'
                }`}>
                  {service.title}
                </h3>
                <p className={`text-xs ${
                  selectedService === service.id ? 'text-white/80' : 'text-gray-600'
                }`}>
                  {service.description}
                </p>
              </motion.button>
            ))}
          </div>

          {selectedService && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                  <Headset className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">Service Details</h4>
                  <p className="text-sm text-gray-700">
                    {seniorServices.find(s => s.id === selectedService)?.details}
                  </p>
                  <Button className="mt-3 h-9 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-sm">
                    Book This Service
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </Card>

        {/* Senior-Friendly Packages */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Recommended Packages</h2>
            <button className="text-indigo-600 text-sm font-semibold">View All</button>
          </div>

          <div className="space-y-4">
            {seniorPackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg">{pkg.name}</h3>
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
                          {pkg.ageGroup}
                        </span>
                      </div>
                      <p className="text-indigo-600 font-semibold text-sm mb-1">{pkg.destination}</p>
                      <p className="text-gray-600 text-sm mb-2">{pkg.description}</p>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-semibold text-sm">{pkg.rating}</span>
                        <span className="text-gray-500 text-xs">({pkg.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Includes */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-500 mb-2">Includes:</p>
                    <div className="flex flex-wrap gap-2">
                      {pkg.includes.map((item, i) => (
                        <span key={i} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Duration</p>
                        <p className="font-semibold text-sm">{pkg.duration}</p>
                      </div>
                      <div className="w-px h-8 bg-gray-200" />
                      <div>
                        <p className="text-xs text-gray-500">Starting from</p>
                        <p className="font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                          {pkg.price}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 h-11">
                    View Package Details <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Key Features for Seniors */}
        <Card className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-6 text-white">
          <h2 className="text-xl font-bold mb-4">Why Choose Senior Wellness?</h2>
          <div className="space-y-3">
            {[
              { icon: Shield, text: 'Comprehensive travel insurance included' },
              { icon: Heart, text: 'Medical professionals on every tour' },
              { icon: Clock, text: 'Flexible, slow-paced itineraries' },
              { icon: Phone, text: '24/7 emergency helpline' },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-white/90">{feature.text}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}