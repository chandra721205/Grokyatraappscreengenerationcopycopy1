import { useState } from 'react';
import { ComboBuilder } from './ComboBuilder';
import { GroupDetails } from './GroupDetails';
import { TripPreferences } from './TripPreferences';
import { TransportPreference } from './TransportPreference';

interface ComboTourFlowProps {
  onBack: () => void;
}

export function ComboTourFlow({ onBack }: ComboTourFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [comboData, setComboData] = useState({
    selectedCategories: [],
    groupDetails: {},
    tripPreferences: {},
    transportPreference: {},
  });

  const handleComboNext = (data: { selectedCategories: string[] }) => {
    setComboData({ ...comboData, selectedCategories: data.selectedCategories });
    setCurrentStep(2);
  };

  const handleGroupNext = (data: any) => {
    setComboData({ ...comboData, groupDetails: data });
    setCurrentStep(3);
  };

  const handlePreferencesNext = (data: any) => {
    setComboData({ ...comboData, tripPreferences: data });
    setCurrentStep(4); // NEW: Go to Transport Preference
  };

  const handleTransportNext = (data: any) => {
    setComboData({ ...comboData, transportPreference: data });
    // Show final summary or go back to main
    alert('All preferences collected! This would normally generate AI recommendations and proceed to booking flow.');
    onBack();
  };

  const handleBack = () => {
    if (currentStep === 1) {
      onBack();
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      {currentStep === 1 && (
        <ComboBuilder
          onNext={handleComboNext}
          onBack={handleBack}
        />
      )}
      {currentStep === 2 && (
        <GroupDetails
          onNext={handleGroupNext}
          onBack={handleBack}
        />
      )}
      {currentStep === 3 && (
        <TripPreferences
          onNext={handlePreferencesNext}
          onBack={handleBack}
          selectedCategories={comboData.selectedCategories}
        />
      )}
      {currentStep === 4 && (
        <TransportPreference
          onNext={handleTransportNext}
          onBack={handleBack}
          selectedCategories={comboData.selectedCategories}
        />
      )}
    </>
  );
}