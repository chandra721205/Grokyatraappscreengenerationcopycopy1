import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Users, Plus } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface GroupDetailsProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

const groupTypes = [
  { id: 'family', emoji: '👨‍👩‍👧‍👦', name: 'Family', description: 'Parents, kids, grandparents' },
  { id: 'friends', emoji: '👫', name: 'Friends', description: 'Friend circle or besties' },
  { id: 'couple', emoji: '💑', name: 'Couple', description: 'Just two people' },
  { id: 'solo', emoji: '🚶', name: 'Solo', description: 'Traveling alone' },
  { id: 'extendedFamily', emoji: '👨‍👩‍👧‍👦', name: 'Extended Family', description: 'Multiple families together' },
  { id: 'spiritual', emoji: '🙏', name: 'Spiritual Group', description: 'Religious/pilgrimage group' },
  { id: 'corporate', emoji: '💼', name: 'Corporate Team', description: 'Office team or business delegation' },
  { id: 'student', emoji: '🎓', name: 'Student Group', description: 'School/college groups' },
  { id: 'research', emoji: '🔬', name: 'Research Team', description: 'Academic/research delegation' },
  { id: 'mixed', emoji: '👥', name: 'Mixed Group', description: 'Various relationships' },
];

const ageGroups = [
  { id: 'kids', label: 'Kids (0-12 years)', emoji: '👶', color: 'bg-yellow-500' },
  { id: 'teens', label: 'Teens (13-18 years)', emoji: '🧒', color: 'bg-purple-500' },
  { id: 'adults', label: 'Adults (19-59 years)', emoji: '👨', color: 'bg-green-500' },
  { id: 'seniors', label: 'Seniors (60+ years)', emoji: '👴', color: 'bg-teal-500' },
];

export function GroupDetails({ onNext, onBack }: GroupDetailsProps) {
  const [peopleCount, setPeopleCount] = useState(2);
  const [selectedGroupType, setSelectedGroupType] = useState<string>('');
  const [ageGroupCounts, setAgeGroupCounts] = useState<Record<string, number>>({
    kids: 0,
    teens: 0,
    adults: 2,
    seniors: 0,
  });

  const updateAgeCount = (ageGroupId: string, delta: number) => {
    const newCount = Math.max(0, ageGroupCounts[ageGroupId] + delta);
    setAgeGroupCounts({ ...ageGroupCounts, [ageGroupId]: newCount });
    
    // Update total people count
    const total = Object.values({ ...ageGroupCounts, [ageGroupId]: newCount }).reduce((a, b) => a + b, 0);
    setPeopleCount(total);
  };

  const totalTravelers = Object.values(ageGroupCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 px-4 pt-12 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <button className="text-white text-sm font-medium">Journey Map</button>
        </div>

        <div className="text-center">
          <h1 className="text-white font-bold text-2xl mb-2">Group Details</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 max-w-md mx-auto pb-20">
        {/* Icon & Title */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Tell Us About Your Group</h2>
          <p className="text-gray-600 text-sm">Help us personalize your combo trip perfectly</p>
        </div>

        {/* How many people */}
        <div className="bg-white rounded-3xl p-6 shadow-md mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-lg text-blue-900">How many people are traveling?</h3>
          </div>
          
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))}
              className="w-12 h-12 bg-blue-600 text-white rounded-full font-bold text-xl hover:bg-blue-700 transition-colors"
            >
              −
            </button>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600">{peopleCount}</div>
              <div className="text-sm text-gray-600 mt-1">people</div>
            </div>
            <button
              onClick={() => setPeopleCount(peopleCount + 1)}
              className="w-12 h-12 bg-blue-600 text-white rounded-full font-bold text-xl hover:bg-blue-700 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Group Type */}
        <div className="bg-white rounded-3xl p-6 shadow-md mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">👥</span>
            <h3 className="font-bold text-lg text-blue-900">What type of group is this?</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {groupTypes.map((type, index) => {
              const isSelected = selectedGroupType === type.id;
              return (
                <motion.button
                  key={type.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedGroupType(type.id)}
                  className={`relative p-4 rounded-2xl transition-all text-left ${
                    isSelected
                      ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg ring-2 ring-blue-400'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  <div className="text-2xl mb-2">{type.emoji}</div>
                  <div className={`font-bold text-sm mb-1 ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                    {type.name}
                  </div>
                  <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                    {type.description}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Age Groups */}
        <div className="bg-white rounded-3xl p-6 shadow-md mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">👨‍👩‍👧‍👦</span>
            <h3 className="font-bold text-lg text-blue-900">Number of Travelers (by Age Group)</h3>
          </div>
          
          <div className="space-y-4">
            {ageGroups.map((ageGroup) => (
              <div key={ageGroup.id}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{ageGroup.emoji}</span>
                    <span className="font-medium text-sm text-gray-700">{ageGroup.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateAgeCount(ageGroup.id, -1)}
                      className={`w-8 h-8 ${ageGroup.color} text-white rounded-full font-bold hover:opacity-80 transition-opacity`}
                    >
                      −
                    </button>
                    <div className="text-2xl font-bold text-gray-800 w-8 text-center">
                      {ageGroupCounts[ageGroup.id]}
                    </div>
                    <button
                      onClick={() => updateAgeCount(ageGroup.id, 1)}
                      className={`w-8 h-8 ${ageGroup.color} text-white rounded-full font-bold hover:opacity-80 transition-opacity`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total Summary */}
          <div className="mt-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border-2 border-blue-200">
            <div className="text-center">
              <div className="text-sm text-blue-700 mb-1">Total: <span className="font-bold text-2xl">{totalTravelers}</span> travelers</div>
              <div className="text-xs text-gray-600">(2 adults)</div>
            </div>
          </div>
        </div>

        {/* Group Member Details */}
        <div className="bg-white rounded-3xl p-6 shadow-md mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-base text-blue-900">Group Member Details (Optional but Recommended)</h3>
          </div>
          
          <p className="text-xs text-gray-600 mb-4">
            Adding individual details helps us plan better: age-appropriate activities, accessibility, dietary needs, etc.
          </p>

          <button className="w-full border-2 border-dashed border-blue-300 bg-blue-50 text-blue-600 py-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors">
            <Plus className="w-5 h-5" />
            Add Person
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            Click "Add Person" to provide details for each traveler
          </p>
        </div>

        {/* Continue Button */}
        <button
          onClick={() => onNext({ peopleCount, selectedGroupType, ageGroupCounts })}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-3xl font-bold shadow-lg hover:shadow-xl active:scale-[0.98] transition-all"
        >
          Continue to Preferences
        </button>

        <p className="text-center text-gray-400 text-sm mt-6">Scroll to see all options ↓</p>
      </div>
    </div>
  );
}
