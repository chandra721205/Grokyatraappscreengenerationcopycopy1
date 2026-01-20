import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Search,
  Mountain,
  Globe,
  Youtube,
  Sparkles,
  Calendar,
  Star,
  ChevronRight,
  Heart,
  Waves,
  Wind,
  Bike,
  Bell,
  Shield,
  Users,
  Phone,
  Map,
  AlertTriangle,
  Clock,
  TrendingUp,
  User,
  CheckCircle2,
  Plus,
  Minus,
  Filter,
  Sliders,
  Bookmark,
  BookmarkCheck,
  FileText,
  Info,
  DollarSign,
  MapPin,
  Compass,
  Package,
  Leaf,
  Activity,
  Target,
} from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { InterestTrackerIcon } from '@/app/components/shared/InterestTracker';
import { PersonalizedDealsAlert } from '@/app/components/shared/PersonalizedDealsAlert';
import { ComboTourPlanner } from '@/app/components/planning/ComboTourPlanner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Switch } from '@/app/components/ui/switch';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';

// ========================================
// ADVENTURE TOURISM HUB – INTEGRATED LO-FI EDITS V2
// ========================================
// 
// 🔄 NEW IN V2 (PRESERVES ALL EXISTING DESIGN):
// 1. ✅ "Explore Places" Section with YouTube/Google Search
// 2. ✅ Result Cards with Thumbnails & Descriptions
// 3. ✅ "Note Interest" Functionality (Browse History Tracking)
// 4. ✅ "Notify Deals/Budget" System with Admin Triggers
// 5. ✅ Admin-Editable Fields for All Adventure Elements
// 6. ✅ Missing Fields Integration (Equipment, Safety, Eco-Impact, etc.)
//
// ✨ ALL ADDITIONS ARE LOW-FIDELITY & NON-DISRUPTIVE
// ========================================

type AdventureScreen = 
  | 'hub' 
  | 'trekking' 
  | 'water-sports' 
  | 'rock-climbing' 
  | 'wildlife' 
  | 'air-sports' 
  | 'cycling' 
  | 'senior'
  | 'explore-places'; // 🆕 NEW SCREEN

interface AdventureTourismHubProps {
  onBack: () => void;
}

// 🆕 V2: Interest Tracking System
interface NotedInterest {
  id: string;
  query: string;
  timestamp: Date;
  source: 'google' | 'youtube';
}

// 🆕 V2: Browse Result Item
interface BrowseResult {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  source: 'google' | 'youtube';
  isNoted: boolean;
}

export function AdventureTourismHub({ onBack }: AdventureTourismHubProps) {
  const [currentScreen, setCurrentScreen] = useState<AdventureScreen>('hub');
  const [showPlanner, setShowPlanner] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // 🆕 V2: Explore Places States
  const [explorePlacesQuery, setExplorePlacesQuery] = useState('');
  const [exploreSource, setExploreSource] = useState<'google' | 'youtube'>('google');
  const [browseResults, setBrowseResults] = useState<BrowseResult[]>([]);
  const [notedInterests, setNotedInterests] = useState<NotedInterest[]>([]);
  
  // 🆕 V2: Deal/Budget Notification States
  const [showDealNotification, setShowDealNotification] = useState(false);
  const [dealBudgetRange, setDealBudgetRange] = useState('');
  const [dealDestination, setDealDestination] = useState('');
  const [dealAlertActive, setDealAlertActive] = useState(false);
  
  // 🆕 V2: NEW Admin-Editable Fields (Low-Fi)
  const [destinationName, setDestinationName] = useState('[Admin-Editable Destination Name]');
  const [activityType, setActivityType] = useState('[Admin-Update Activity Type]');
  const [itineraryDays, setItineraryDays] = useState('[Admin: Days]');
  const [safetyGuidelines, setSafetyGuidelines] = useState('[Admin: Safety Guidelines]');
  const [equipmentNeeds, setEquipmentNeeds] = useState('[Admin: Equipment List]');
  const [groupSizeMin, setGroupSizeMin] = useState('[Admin: Min]');
  const [groupSizeMax, setGroupSizeMax] = useState('[Admin: Max]');
  const [difficultyLevel, setDifficultyLevel] = useState('[Admin: Level]');
  const [seasonalAvailability, setSeasonalAvailability] = useState('[Admin: Seasons]');
  const [ecoImpactNotes, setEcoImpactNotes] = useState('[Admin: Eco-Impact Notes]');
  const [budgetRangeMin, setBudgetRangeMin] = useState('[Admin: Min Budget]');
  const [budgetRangeMax, setBudgetRangeMax] = useState('[Admin: Max Budget]');
  const [durationOptions, setDurationOptions] = useState('[Admin: Duration Options]');
  
  // Existing states preserved
  const [budgetRange, setBudgetRange] = useState('[Admin: Budget Option 2]');
  const [tripDuration, setTripDuration] = useState<string[]>([]);
  const [dealAlertEnabled, setDealAlertEnabled] = useState(false);
  const [notificationMethod, setNotificationMethod] = useState('WhatsApp');
  const [adventureTypes, setAdventureTypes] = useState<string[]>([]);
  const [difficultyLevels, setDifficultyLevels] = useState<string[]>([]);
  const [groupPreferences, setGroupPreferences] = useState<string[]>([]);
  const [accommodation, setAccommodation] = useState<string[]>([]);
  const [showGoogleDialog, setShowGoogleDialog] = useState(false);
  const [showYouTubeDialog, setShowYouTubeDialog] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState<string[]>([]);
  const [stateRegionFilter, setStateRegionFilter] = useState('');
  const [seniorFriendlyOnly, setSeniorFriendlyOnly] = useState(false);

  // 🆕 V2: Handle Explore Places Search
  const handleExplorePlacesSearch = () => {
    if (!explorePlacesQuery.trim()) {
      toast.error('Please enter a search query');
      return;
    }

    // Mock browse results
    const mockResults: BrowseResult[] = [
      {
        id: '1',
        title: `[Result 1: ${explorePlacesQuery}]`,
        description: '[Admin-Managed Description - Placeholder for browsed content from YouTube/Google]',
        thumbnail: '/placeholder-thumbnail.jpg',
        source: exploreSource,
        isNoted: false,
      },
      {
        id: '2',
        title: `[Result 2: ${explorePlacesQuery}]`,
        description: '[Admin: Description snippet showing preview of found adventure spot]',
        thumbnail: '/placeholder-thumbnail.jpg',
        source: exploreSource,
        isNoted: false,
      },
      {
        id: '3',
        title: `[Result 3: ${explorePlacesQuery}]`,
        description: '[Admin: Third result with details about the adventure destination]',
        thumbnail: '/placeholder-thumbnail.jpg',
        source: exploreSource,
        isNoted: false,
      },
    ];

    setBrowseResults(mockResults);
    toast.success(`Showing ${exploreSource === 'google' ? 'Google' : 'YouTube'} results`);
  };

  // 🆕 V2: Note Interest - Track User Browsing
  const handleNoteInterest = (result: BrowseResult) => {
    const newInterest: NotedInterest = {
      id: `${Date.now()}-${result.id}`,
      query: result.title,
      timestamp: new Date(),
      source: result.source,
    };

    setNotedInterests([...notedInterests, newInterest]);
    
    // Update result as noted
    setBrowseResults(browseResults.map(r => 
      r.id === result.id ? { ...r, isNoted: true } : r
    ));

    toast.success('Interest noted! We\'ll track this for you', {
      description: 'Admin can see your browsing history internally',
    });
  };

  // 🆕 V2: Trigger Deal Notification (Admin Action)
  const handleTriggerDealNotification = () => {
    if (!dealBudgetRange || !dealDestination) {
      toast.error('Admin: Please set budget range and destination');
      return;
    }

    setDealAlertActive(true);
    setShowDealNotification(true);
    
    toast.success('Deal Alert Triggered!', {
      description: `${dealDestination} package within ${dealBudgetRange}`,
    });
  };

  const handleGoogleSearch = (customQuery?: string) => {
    setShowGoogleDialog(true);
  };

  const handleYouTubeSearch = (customQuery?: string) => {
    setShowYouTubeDialog(true);
  };

  if (showPlanner) {
    return <ComboTourPlanner onBack={() => setShowPlanner(false)} />;