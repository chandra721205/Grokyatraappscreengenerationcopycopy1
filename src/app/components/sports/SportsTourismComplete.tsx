import { useState } from 'react';
import { SportsTourismHub } from './SportsTourismHub';
import { SportsTripTypesSelector, TripType } from './SportsTripTypesSelector';
import { SportsPackageListing, SportsPackage } from './SportsPackageListing';
import { SportsPackageDetail } from './SportsPackageDetail';

interface SportsTourismCompleteProps {
  onBack: () => void;
  onStartBooking: (pkg: SportsPackage) => void;
}

type ViewState = 'hub' | 'trip-types' | 'packages' | 'detail';

interface SelectedSportCategory {
  id: string;
  name: string;
  emoji: string;
  sports: string[];
}

export function SportsTourismComplete({ onBack, onStartBooking }: SportsTourismCompleteProps) {
  const [currentView, setCurrentView] = useState<ViewState>('hub');
  const [selectedCategory, setSelectedCategory] = useState<SelectedSportCategory | null>(null);
  const [selectedTripType, setSelectedTripType] = useState<TripType | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<SportsPackage | null>(null);

  // Define all 10 sports categories
  const sportsCategories: SelectedSportCategory[] = [
    {
      id: 'team-sports',
      name: 'Team Sports',
      emoji: '🏀',
      sports: ['Basketball', 'Soccer', 'Volleyball', 'Cricket'],
    },
    {
      id: 'water-sports',
      name: 'Water Sports',
      emoji: '🏊',
      sports: ['Swimming', 'Kayaking', 'Surfing'],
    },
    {
      id: 'adventure-sports',
      name: 'Adventure Sports',
      emoji: '🧗',
      sports: ['Rock Climbing', 'Mountain Biking', 'Ziplining'],
    },
    {
      id: 'racquet-sports',
      name: 'Racquet Sports',
      emoji: '🎾',
      sports: ['Tennis', 'Pickleball', 'Badminton'],
    },
    {
      id: 'winter-sports',
      name: 'Winter Sports',
      emoji: '⛷️',
      sports: ['Skiing', 'Snowboarding', 'Ice Skating'],
    },
    {
      id: 'combat-sports',
      name: 'Combat Sports',
      emoji: '🥊',
      sports: ['Boxing', 'Martial Arts', 'Fencing'],
    },
    {
      id: 'precision-sports',
      name: 'Precision Sports',
      emoji: '🏹',
      sports: ['Archery', 'Golf', 'Darts'],
    },
    {
      id: 'endurance-sports',
      name: 'Endurance Sports',
      emoji: '🏃',
      sports: ['Running', 'Cycling', 'Triathlon'],
    },
    {
      id: 'mind-sports',
      name: 'Mind Sports',
      emoji: '♟️',
      sports: ['Chess', 'Esports', 'Bridge'],
    },
    {
      id: 'emerging-sports',
      name: 'Emerging Sports',
      emoji: '⚽',
      sports: ['FootGolf', 'Spikeball'],
    },
  ];

  const handleCategorySelect = (categoryId: string) => {
    const category = sportsCategories.find(c => c.id === categoryId);
    if (category) {
      setSelectedCategory(category);
      setCurrentView('trip-types');
    }
  };

  const handleTripTypeSelect = (tripType: TripType) => {
    setSelectedTripType(tripType);
    setCurrentView('packages');
  };

  const handlePackageSelect = (pkg: SportsPackage) => {
    setSelectedPackage(pkg);
    setCurrentView('detail');
  };

  const handleBookNow = (pkg: SportsPackage) => {
    // This would trigger the main booking flow
    onStartBooking(pkg);
  };

  const handleBackFromTripTypes = () => {
    setCurrentView('hub');
    setSelectedCategory(null);
  };

  const handleBackFromPackages = () => {
    setCurrentView('trip-types');
    setSelectedTripType(null);
  };

  const handleBackFromDetail = () => {
    setCurrentView('packages');
    setSelectedPackage(null);
  };

  return (
    <>
      {/* LAYER 1: Sports Categories Hub (Find Your Game) */}
      {currentView === 'hub' && (
        <SportsTourismHub 
          onBack={onBack}
          onSelectCategory={handleCategorySelect}
        />
      )}

      {/* LAYER 2: Trip Types Selector (How Do You Want to Experience Sports?) */}
      {currentView === 'trip-types' && selectedCategory && (
        <SportsTripTypesSelector
          sportCategory={selectedCategory}
          onBack={handleBackFromTripTypes}
          onSelectTripType={handleTripTypeSelect}
        />
      )}

      {/* LAYER 3: Package Listing (Specific Bookable Tours) */}
      {currentView === 'packages' && selectedCategory && selectedTripType && (
        <SportsPackageListing
          tripType={selectedTripType}
          sportCategory={selectedCategory}
          onBack={handleBackFromPackages}
          onSelectPackage={handlePackageSelect}
        />
      )}

      {/* LAYER 4: Package Detail (Full Information) */}
      {currentView === 'detail' && selectedPackage && (
        <SportsPackageDetail
          package={selectedPackage}
          onBack={handleBackFromDetail}
          onBookNow={handleBookNow}
        />
      )}
    </>
  );
}
