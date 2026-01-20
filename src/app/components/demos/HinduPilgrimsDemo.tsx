import { useState } from 'react';
import { HinduPilgrimsPreserved } from '@/app/components/categories/HinduPilgrimsPreserved';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Check, Sparkles } from 'lucide-react';

// ========================================
// HINDU PILGRIMS DEMO PAGE
// ========================================
//
// Demonstrates the PRESERVED & ENHANCED version
// All existing elements kept + 4 new sections added
//
// ========================================

export function HinduPilgrimsDemo() {
  const [showFlow, setShowFlow] = useState(false);

  if (showFlow) {
    return <HinduPilgrimsPreserved onBack={() => setShowFlow(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-6xl">🕉️</span>
            <h1 className="text-5xl font-bold text-gray-900">
              Hindu Pilgrims - Preserved & Enhanced
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive, beautiful, and fully functional Hindu Pilgrims section with 
            all four new fields, AI integration, and admin-managed content
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Feature 1: Sacred Circuits */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-orange-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">6 Sacred Circuits</h2>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5 text-green-600" />
                <span>Char Dham Yatra (4 Dhams)</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5 text-green-600" />
                <span>12 Jyotirlingas</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5 text-green-600" />
                <span>108 Divya Desams</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5 text-green-600" />
                <span>51 Shakti Peethas</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5 text-green-600" />
                <span>Navagraha Temples 🪐</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5 text-green-600" />
                <span>Pancha Bhoota Sthalams</span>
              </li>
            </ul>
            <Badge className="mt-4 bg-orange-100 text-orange-800">
              Beautiful gradient cards with icons
            </Badge>
          </div>

          {/* Feature 2: Hidden Gems */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">💎 Hidden Gems</h2>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5 text-purple-600" />
                <span>Toggle show/hide functionality</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5 text-purple-600" />
                <span>Lesser-known temples (&lt;50 visitors/day)</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5 text-purple-600" />
                <span>Visitor count & accessibility info</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5 text-purple-600" />
                <span>Admin-editable gem details</span>
              </li>
            </ul>
            <Badge className="mt-4 bg-purple-100 text-purple-800">
              Collapsible section with animations
            </Badge>
          </div>

          {/* Feature 3: Browse by Geography */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">📍 Geography Browse</h2>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5 text-green-600" />
                <span>State/district grid layout</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5 text-green-600" />
                <span>Temple count per state</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5 text-green-600" />
                <span>Filter by district option</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5 text-green-600" />
                <span>Admin-managed locations</span>
              </li>
            </ul>
            <Badge className="mt-4 bg-green-100 text-green-800">
              Interactive map-style grid
            </Badge>
          </div>

          {/* Feature 4: Browse by Deity */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">🕉️ Deity Filter</h2>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5 text-blue-600" />
                <span>7 deity categories with icons</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5 text-blue-600" />
                <span>Shiva, Vishnu, Shakti, Ganesha, etc.</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5 text-blue-600" />
                <span>Temple count per deity</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5 text-blue-600" />
                <span>Click to filter & view circuits</span>
              </li>
            </ul>
            <Badge className="mt-4 bg-blue-100 text-blue-800">
              Beautiful deity cards with gradients
            </Badge>
          </div>

          {/* Feature 5: Special Packages */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-pink-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">🎁 Special Packages</h2>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5 text-pink-600" />
                <span>Festival Season Package</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5 text-pink-600" />
                <span>Senior Citizen Package</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5 text-pink-600" />
                <span>Low-Crowd Experience</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5 text-pink-600" />
                <span>Short Circuit Package</span>
              </li>
            </ul>
            <Badge className="mt-4 bg-pink-100 text-pink-800">
              Admin-created with pricing
            </Badge>
          </div>

          {/* Feature 6: Custom Tour Builder */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-yellow-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">🛠️ Custom Tour Builder</h2>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5 text-yellow-600" />
                <span>9 comprehensive form fields</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5 text-yellow-600" />
                <span>Dates, group size, senior needs</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5 text-yellow-600" />
                <span>Deity preference & budget</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5 text-yellow-600" />
                <span>Transportation & accommodation</span>
              </li>
            </ul>
            <Badge className="mt-4 bg-yellow-100 text-yellow-800">
              Grok AI integration
            </Badge>
          </div>
        </div>

        {/* Additional Features */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl shadow-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Additional Features Included
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-3">❤️ Interest Capture</h3>
              <ul className="space-y-1 text-sm">
                <li>• Heart icons on all cards</li>
                <li>• Save/remove interests</li>
                <li>• Toast notifications</li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-3">🔔 Notifications</h3>
              <ul className="space-y-1 text-sm">
                <li>• Deal alerts toggle</li>
                <li>• Package updates</li>
                <li>• Festival dates</li>
                <li>• New circuits</li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-3">🌐 Browse Integration</h3>
              <ul className="space-y-1 text-sm">
                <li>• YouTube browse buttons</li>
                <li>• Google search buttons</li>
                <li>• Opens external links</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Grok AI Features */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl shadow-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            🤖 Grok AI Features
          </h2>
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-white">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <strong>Animated Typing Indicator:</strong> Shows AI processing state with loading spinner
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <strong>Success Response:</strong> Confirmation message with reference ID
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <strong>Detailed Promise:</strong> Lists budget, facilities, senior care, and itinerary details
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Admin Features */}
        <div className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-3xl shadow-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            🔧 Admin-Editable Zones
          </h2>
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-white">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <strong>40+ Editable Fields:</strong> All content marked with dashed borders
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <strong>Visual Indicators:</strong> Gray backgrounds, "Admin editable: [field]" labels
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <strong>Placeholder Text:</strong> All content uses [Admin: ...] format
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <strong>Zero Real Content:</strong> 100% admin-managed placeholder system
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Design Features */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-12 border-4 border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            🎨 Beautiful Design Elements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-bold text-lg text-gray-800">Visual Enhancements</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>24-32px rounded corners</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Subtle shadow effects (xl, 2xl)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>7 unique gradient combinations</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Consistent Lucide icon set</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-lg text-gray-800">Interactions</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Smooth hover effects (scale 1.02-1.05)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Typography hierarchy</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Loading states & animations</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Micro-interactions throughout</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Launch Button */}
        <div className="text-center">
          <Button
            onClick={() => setShowFlow(true)}
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-12 py-8 text-2xl rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-105"
          >
            <Sparkles className="w-8 h-8 mr-3" />
            Launch Hindu Pilgrims Ultimate Experience
          </Button>
          <p className="text-gray-600 mt-4">
            Click to explore all features in action
          </p>
        </div>
      </div>
    </div>
  );
}