import { useState, useEffect } from 'react';
import { AdminModeProvider } from '@/app/components/admin/AdminModeContext';
import { AdminSystemDemo } from '@/app/components/admin/AdminSystemDemo';
import { AdminDashboard } from '@/app/components/admin/AdminDashboard';
import { DestinationCardDemo } from '@/app/components/honeymoon/DestinationCardDemo';
import { ResearchDestinationDemo } from '@/app/components/shared/ResearchDestinationDemo';
import { InterestTrackerDemo } from '@/app/components/shared/InterestTrackerDemo';
import { TravelEssentialsMain } from '@/app/components/essentials/TravelEssentialsMain';
import { TravelEssentialsV2 } from '@/app/components/essentials/TravelEssentialsV2';
import { CustomTourDemo } from '@/app/components/custom-tour/CustomTourDemo';
import { HinduPilgrimsDemo } from '@/app/components/demos/HinduPilgrimsDemo';
import { DevotionalLowFiWireframe } from '@/app/components/devotional-lofi/DevotionalLowFiWireframe';
import { MainLayout } from '@/app/components/layout/MainLayout';
import { SplashScreen } from '@/app/components/onboarding/SplashScreen';
import { LanguageSelection } from '@/app/components/onboarding/LanguageSelection';
import { SignUp } from '@/app/components/onboarding/SignUp';
import { OTPVerification } from '@/app/components/onboarding/OTPVerification';
import { KYCIntro } from '@/app/components/onboarding/KYCIntro';
import { KYCPhone } from '@/app/components/onboarding/KYCPhone';
import { KYCDocuments } from '@/app/components/onboarding/KYCDocuments';
import { WelcomeVerified } from '@/app/components/onboarding/WelcomeVerified';
import { OnboardingSlides } from '@/app/components/onboarding/OnboardingSlides';
import { WelcomePostOnboarding } from '@/app/components/onboarding/WelcomePostOnboarding';
import { GetStarted } from '@/app/components/onboarding/GetStarted';
import { ComponentLibraryDemo } from '@/app/components/ui/ComponentLibraryDemo';
import { Toaster } from '@/app/components/ui/sonner';
import { UserData } from '@/types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showEssentials, setShowEssentials] = useState(false);
  const [showEssentialsV2, setShowEssentialsV2] = useState(false);
  const [showCustomTour, setShowCustomTour] = useState(false);
  const [showAdminDemo, setShowAdminDemo] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [showCardDemo, setShowCardDemo] = useState(false);
  const [showResearchDemo, setShowResearchDemo] = useState(false);
  const [showInterestDemo, setShowInterestDemo] = useState(false);
  const [showComponentLibrary, setShowComponentLibrary] = useState(false);
  const [showHinduPilgrims, setShowHinduPilgrims] = useState(false);
  const [showHinduPilgrimsFinal, setShowHinduPilgrimsFinal] = useState(false);
  const [showDevotionalLofi, setShowDevotionalLofi] = useState(false);

  useEffect(() => {
    // Check if user has already onboarded
    const onboarded = localStorage.getItem('grokyatra_onboarded');
    if (onboarded) {
      setIsOnboarded(true);
      setCurrentScreen('main');
    }
  }, []);

  const handleNavigation = (screen: string, data?: Partial<UserData>) => {
    setCurrentScreen(screen);
    if (data) {
      setUserData({ ...userData, ...data });
    }
  };

  const completeOnboarding = () => {
    localStorage.setItem('grokyatra_onboarded', 'true');
    setIsOnboarded(true);
    setCurrentScreen('main');
  };

  // Quick access to Interest Tracker Demo
  if (showInterestDemo) {
    return (
      <AdminModeProvider>
        <InterestTrackerDemo />
        <Toaster />
      </AdminModeProvider>
    );
  }

  // Quick access to Research Component Demo
  if (showResearchDemo) {
    return (
      <AdminModeProvider>
        <ResearchDestinationDemo />
        <Toaster />
      </AdminModeProvider>
    );
  }

  // Quick access to Admin Dashboard
  if (showAdminDashboard) {
    return (
      <AdminModeProvider>
        <AdminDashboard />
        <Toaster />
      </AdminModeProvider>
    );
  }

  // Quick access to Admin System Demo
  if (showAdminDemo) {
    return (
      <AdminModeProvider>
        <AdminSystemDemo />
        <Toaster />
      </AdminModeProvider>
    );
  }

  // Quick access to Card Component Demo
  if (showCardDemo) {
    return (
      <AdminModeProvider>
        <DestinationCardDemo />
        <Toaster />
      </AdminModeProvider>
    );
  }

  // Quick access to Travel Essentials
  if (showEssentials) {
    return (
      <AdminModeProvider>
        <TravelEssentialsMain />
        <Toaster />
      </AdminModeProvider>
    );
  }

  // Quick access to Travel Essentials V2 (New Screens)
  if (showEssentialsV2) {
    return (
      <AdminModeProvider>
        <TravelEssentialsV2 />
        <Toaster />
      </AdminModeProvider>
    );
  }

  // Quick access to Custom Tour Demo
  if (showCustomTour) {
    return (
      <AdminModeProvider>
        <CustomTourDemo />
        <Toaster />
      </AdminModeProvider>
    );
  }

  // Quick access to Component Library Demo
  if (showComponentLibrary) {
    return (
      <AdminModeProvider>
        <ComponentLibraryDemo />
        <Toaster />
      </AdminModeProvider>
    );
  }

  // Quick access to Hindu Pilgrims Demo
  if (showHinduPilgrims) {
    return (
      <AdminModeProvider>
        <HinduPilgrimsDemo />
        <Toaster />
      </AdminModeProvider>
    );
  }

  // Quick access to Hindu Pilgrims Final Demo
  if (showHinduPilgrimsFinal) {
    return (
      <AdminModeProvider>
        <HinduPilgrimsDemo />
        <Toaster />
      </AdminModeProvider>
    );
  }

  // Quick access to Devotional Low-Fi Wireframe
  if (showDevotionalLofi) {
    return (
      <AdminModeProvider>
        <DevotionalLowFiWireframe />
        <Toaster />
      </AdminModeProvider>
    );
  }

  if (isOnboarded && currentScreen === 'main') {
    return (
      <AdminModeProvider>
        <MainLayout userData={userData} />
        <Toaster />
      </AdminModeProvider>
    );
  }

  return (
    <AdminModeProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-orange-50">
        {/* Quick Access Buttons for Testing */}
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
          <button
            onClick={() => setShowAdminDashboard(true)}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow-2xl hover:shadow-3xl transition-all font-bold text-sm flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
            </svg>
            🔥 ADMIN DASHBOARD
          </button>
          <button
            onClick={() => setShowAdminDemo(true)}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-full shadow-2xl hover:shadow-3xl transition-all font-bold text-sm flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Admin System
          </button>
          <button
            onClick={() => setShowCardDemo(true)}
            className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-6 py-3 rounded-full shadow-2xl hover:shadow-3xl transition-all font-bold text-sm flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            Master Cards
          </button>
          <button
            onClick={() => setShowCustomTour(true)}
            className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-3 rounded-full shadow-2xl hover:shadow-3xl transition-all font-bold text-sm flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Custom Tour
          </button>
          <button
            onClick={() => setShowEssentials(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full shadow-2xl hover:shadow-3xl transition-all font-bold text-sm flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Travel Essentials
          </button>
          <button
            onClick={() => setShowEssentialsV2(true)}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-full shadow-2xl hover:shadow-3xl transition-all font-bold text-sm flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Travel Essentials V2
          </button>
          <button
            onClick={() => setShowResearchDemo(true)}
            className="bg-gradient-to-r from-green-600 to-lime-600 text-white px-6 py-3 rounded-full shadow-2xl hover:shadow-3xl transition-all font-bold text-sm flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Research Destinations
          </button>
          <button
            onClick={() => setShowInterestDemo(true)}
            className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-3 rounded-full shadow-2xl hover:shadow-3xl transition-all font-bold text-sm flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            Interest Tracker
          </button>
          <button
            onClick={() => setShowComponentLibrary(true)}
            className="bg-gradient-to-r from-gray-600 to-gray-800 text-white px-6 py-3 rounded-full shadow-2xl hover:shadow-3xl transition-all font-bold text-sm flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Component Library
          </button>
          <button
            onClick={() => setShowHinduPilgrims(true)}
            className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white px-6 py-3 rounded-full shadow-2xl hover:shadow-3xl transition-all font-bold text-sm flex items-center gap-2"
          >
            <span className="text-xl">🕉️</span>
            HINDU PILGRIMS ✨
          </button>
          <button
            onClick={() => setShowDevotionalLofi(true)}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-full shadow-2xl hover:shadow-3xl transition-all font-bold text-sm flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Devotional Low-Fi
          </button>
        </div>

        {currentScreen === 'splash' && (
          <SplashScreen onComplete={() => handleNavigation('language')} />
        )}
        {currentScreen === 'language' && (
          <LanguageSelection onNext={(lang) => handleNavigation('signup', { language: lang })} />
        )}
        {currentScreen === 'signup' && (
          <SignUp onNext={(data) => handleNavigation('otp', data)} />
        )}
        {currentScreen === 'otp' && (
          <OTPVerification onNext={() => handleNavigation('kyc-intro')} />
        )}
        {currentScreen === 'kyc-intro' && (
          <KYCIntro onNext={() => handleNavigation('kyc-phone')} />
        )}
        {currentScreen === 'kyc-phone' && (
          <KYCPhone onNext={() => handleNavigation('kyc-documents')} />
        )}
        {currentScreen === 'kyc-documents' && (
          <KYCDocuments onNext={() => handleNavigation('welcome-verified')} />
        )}
        {currentScreen === 'welcome-verified' && (
          <WelcomeVerified onNext={() => handleNavigation('onboarding-slides')} />
        )}
        {currentScreen === 'onboarding-slides' && (
          <OnboardingSlides onNext={() => handleNavigation('welcome-post')} />
        )}
        {currentScreen === 'welcome-post' && (
          <WelcomePostOnboarding onNext={() => handleNavigation('get-started')} />
        )}
        {currentScreen === 'get-started' && (
          <GetStarted onComplete={completeOnboarding} />
        )}
      </div>
    </AdminModeProvider>
  );
}