import { useState } from 'react';
import { EcoTourismLanding } from './EcoTourismLanding';
import { EcoSubCategoryTemplate } from './EcoSubCategoryTemplate';
import { EcoInterestCapture } from './EcoInterestCapture';
import { EcoBudgetPreferences } from './EcoBudgetPreferences';
import { EcoAdminDashboard } from './EcoAdminDashboard';
import { EcoFlowDiagram } from './EcoFlowDiagram';
import { EcoComponentLibrary } from './EcoComponentLibrary';
import { Button } from '@/app/components/ui/button';
import { EcoBudgetPreferencesData } from '@/types';
import { toast } from 'sonner';

type Screen = 'landing' | 'sub-category' | 'admin' | 'flow' | 'components';

interface SubCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export function EcoTourismDemo() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [selectedCategory, setSelectedCategory] = useState<SubCategory | null>(null);
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState('');

  const categoryMap: Record<string, SubCategory> = {
    'national-parks': {
      id: 'national-parks',
      name: 'National Parks & Wildlife',
      icon: '🐅',
      description: 'Tiger reserves, birdwatching, bio-diverse zones',
    },
    'tribal-villages': {
      id: 'tribal-villages',
      name: 'Tribal & Heritage Villages',
      icon: '🏘️',
      description: 'Indigenous communities, traditional crafts, cultural exchange',
    },
    'organic-farms': {
      id: 'organic-farms',
      name: 'Organic Farms & Agro-Tourism',
      icon: '🌾',
      description: 'Farm stays, organic produce, hands-on farming',
    },
    'eco-lodges': {
      id: 'eco-lodges',
      name: 'Eco-Lodges & Sustainable Stays',
      icon: '🏡',
      description: 'Zero-waste resorts, bamboo cottages, tree houses',
    },
    'coastal-marine': {
      id: 'coastal-marine',
      name: 'Coastal & Marine Conservation',
      icon: '🐚',
      description: 'Beach cleanups, coral restoration, mangrove tours',
    },
    'forest-camps': {
      id: 'forest-camps',
      name: 'Forest Conservation Camps',
      icon: '🌲',
      description: 'Reforestation, wildlife monitoring, eco-volunteering',
    },
  };

  const handleSubCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryMap[categoryId]);
    setCurrentScreen('sub-category');
  };

  const handleBack = () => {
    setCurrentScreen('landing');
    setSelectedCategory(null);
  };

  const handleSaveInterest = (destinationId: string) => {
    setSelectedDestination(destinationId);
    setShowInterestModal(true);
  };

  const handleSetPreferences = () => {
    setShowPreferencesModal(true);
  };

  const handleSavePreferences = (preferences: EcoBudgetPreferencesData) => {
    // Store preferences in local state or context
    toast.success('Preferences saved successfully!', {
      description: `Budget: ${preferences.budgetRange} • Duration: ${preferences.tripDuration} days`,
    });
  };

  return (
    <>
      {/* Navigation Bar */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-gray-900 rounded-full border-3 border-gray-700 p-3 shadow-2xl">
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentScreen('landing')}
            className={`px-6 py-3 rounded-full font-bold text-sm ${
              currentScreen === 'landing'
                ? 'bg-green-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            🏠 Landing
          </button>
          <button
            onClick={() => setCurrentScreen('admin')}
            className={`px-6 py-3 rounded-full font-bold text-sm ${
              currentScreen === 'admin'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            🛠️ Admin
          </button>
          <button
            onClick={() => setCurrentScreen('flow')}
            className={`px-6 py-3 rounded-full font-bold text-sm ${
              currentScreen === 'flow'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            📊 Flow
          </button>
          <button
            onClick={() => setCurrentScreen('components')}
            className={`px-6 py-3 rounded-full font-bold text-sm ${
              currentScreen === 'components'
                ? 'bg-amber-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            🧩 Components
          </button>
        </div>
      </div>

      {currentScreen === 'landing' && (
        <EcoTourismLanding onSubCategorySelect={handleSubCategorySelect} />
      )}

      {currentScreen === 'sub-category' && selectedCategory && (
        <EcoSubCategoryTemplate
          categoryId={selectedCategory.id}
          categoryName={selectedCategory.name}
          categoryIcon={selectedCategory.icon}
          categoryDescription={selectedCategory.description}
          onBack={handleBack}
          onSaveInterest={handleSaveInterest}
          onSetPreferences={handleSetPreferences}
        />
      )}

      {currentScreen === 'admin' && (
        <EcoAdminDashboard isOpen={true} onClose={() => setCurrentScreen('landing')} />
      )}

      {currentScreen === 'flow' && <EcoFlowDiagram />}

      {currentScreen === 'components' && <EcoComponentLibrary />}

      <EcoInterestCapture
        isOpen={showInterestModal}
        onClose={() => setShowInterestModal(false)}
        categoryName={selectedCategory?.name}
      />

      <EcoBudgetPreferences
        isOpen={showPreferencesModal}
        onClose={() => setShowPreferencesModal(false)}
        onSave={handleSavePreferences}
      />
    </>
  );
}
