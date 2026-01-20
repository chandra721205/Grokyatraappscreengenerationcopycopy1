import { useState } from 'react';
import { SikhDevoteesEnhanced } from './SikhDevoteesEnhanced';
import { ChristianPilgrimsEnhanced } from './ChristianPilgrimsEnhanced';
import { MuslimTravelersEnhanced } from './MuslimTravelersEnhanced';
import { BuddhistFollowersEnhanced } from './BuddhistFollowersEnhanced';
import { JainPilgrimsEnhanced } from './JainPilgrimsEnhanced';
import { JewishHeritageEnhanced } from './JewishHeritageEnhanced';
import { BahaiVisitorsEnhanced } from './BahaiVisitorsEnhanced';
import { IndigenousTribalEnhanced } from './IndigenousTribalEnhanced';
import { ParsiHeritageEnhanced } from './ParsiHeritageEnhanced';
import { HinduPilgrimsPreserved } from './HinduPilgrimsPreserved';

// ========================================
// DEVOTIONAL TOURISM ENHANCED - ALL RELIGIONS
// Complete Implementation with Religion-Specific Content
// ========================================
// 
// SCOPE:
// - 10 religious categories (Hindu preserved, 9 enhanced)
// - Religion-specific rituals, festivals, sacred texts
// - Common planning/customization flows
// - Grok AI integration throughout
// - Admin-editable placeholders
// 
// ISOLATION:
// - No cross-religion linking
// - Each religion has independent flow
// - Preserved Hindu Pilgrims component unchanged
// 
// ========================================

type ReligionCategory = 
  | 'hindu'
  | 'sikh'
  | 'christian'
  | 'muslim'
  | 'buddhist'
  | 'jain'
  | 'jewish'
  | 'bahai'
  | 'indigenous'
  | 'parsi';

interface DevotionalTourismEnhancedProps {
  initialCategory?: ReligionCategory;
  onBack: () => void;
}

export function DevotionalTourismEnhanced({ 
  initialCategory, 
  onBack 
}: DevotionalTourismEnhancedProps) {
  const [selectedReligion, setSelectedReligion] = useState<ReligionCategory | null>(
    initialCategory || null
  );

  // Render religion-specific component
  if (selectedReligion === 'hindu') {
    return <HinduPilgrimsPreserved onBack={() => setSelectedReligion(null)} />;
  }

  if (selectedReligion === 'sikh') {
    return <SikhDevoteesEnhanced onBack={() => setSelectedReligion(null)} />;
  }

  if (selectedReligion === 'christian') {
    return <ChristianPilgrimsEnhanced onBack={() => setSelectedReligion(null)} />;
  }

  if (selectedReligion === 'muslim') {
    return <MuslimTravelersEnhanced onBack={() => setSelectedReligion(null)} />;
  }

  if (selectedReligion === 'buddhist') {
    return <BuddhistFollowersEnhanced onBack={() => setSelectedReligion(null)} />;
  }

  if (selectedReligion === 'jain') {
    return <JainPilgrimsEnhanced onBack={() => setSelectedReligion(null)} />;
  }

  if (selectedReligion === 'jewish') {
    return <JewishHeritageEnhanced onBack={() => setSelectedReligion(null)} />;
  }

  if (selectedReligion === 'bahai') {
    return <BahaiVisitorsEnhanced onBack={() => setSelectedReligion(null)} />;
  }

  if (selectedReligion === 'indigenous') {
    return <IndigenousTribalEnhanced onBack={() => setSelectedReligion(null)} />;
  }

  if (selectedReligion === 'parsi') {
    return <ParsiHeritageEnhanced onBack={() => setSelectedReligion(null)} />;
  }

  // Main Devotional Tourism Hub (if needed)
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Devotional Tourism - Enhanced
      </h1>
      <p className="text-gray-600 mb-8">
        Select a religion category to explore (All 9 non-Hindu religions enhanced)
      </p>
      
      <div className="grid gap-4">
        <button
          onClick={() => setSelectedReligion('sikh')}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-left"
        >
          <div className="text-4xl mb-2">☬</div>
          <h3 className="text-xl font-bold text-gray-900">Sikh Devotees</h3>
          <p className="text-sm text-gray-600">Eternal Gurpurabs & 5 Takhts</p>
        </button>

        <button
          onClick={() => setSelectedReligion('christian')}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-left"
        >
          <div className="text-4xl mb-2">✝️</div>
          <h3 className="text-xl font-bold text-gray-900">Christian Pilgrims</h3>
          <p className="text-sm text-gray-600">Sacred Churches & Basilicas</p>
        </button>

        <button
          onClick={() => setSelectedReligion('muslim')}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-left"
        >
          <div className="text-4xl mb-2">☪️</div>
          <h3 className="text-xl font-bold text-gray-900">Muslim Travelers</h3>
          <p className="text-sm text-gray-600">Dargahs & Heritage Mosques</p>
        </button>

        <button
          onClick={() => setSelectedReligion('buddhist')}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-left"
        >
          <div className="text-4xl mb-2">☸️</div>
          <h3 className="text-xl font-bold text-gray-900">Buddhist Followers</h3>
          <p className="text-sm text-gray-600">Buddha's Path & Sacred Sites</p>
        </button>

        <button
          onClick={() => setSelectedReligion('jain')}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-left"
        >
          <div className="text-4xl mb-2">卐</div>
          <h3 className="text-xl font-bold text-gray-900">Jain Pilgrims</h3>
          <p className="text-sm text-gray-600">Palitana & Sacred Tirthas</p>
        </button>

        <button
          onClick={() => setSelectedReligion('jewish')}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-left"
        >
          <div className="text-4xl mb-2">✡</div>
          <h3 className="text-xl font-bold text-gray-900">Jewish Heritage</h3>
          <p className="text-sm text-gray-600">Synagogues & Sacred History</p>
        </button>

        <button
          onClick={() => setSelectedReligion('bahai')}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-left"
        >
          <div className="text-4xl mb-2">★</div>
          <h3 className="text-xl font-bold text-gray-900">Bahá'í Visitors</h3>
          <p className="text-sm text-gray-600">Lotus Temple & Unity</p>
        </button>

        <button
          onClick={() => setSelectedReligion('indigenous')}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-left"
        >
          <div className="text-4xl mb-2">🌿</div>
          <h3 className="text-xl font-bold text-gray-900">Indigenous & Tribal</h3>
          <p className="text-sm text-gray-600">Ancient Traditions & Festivals</p>
        </button>

        <button
          onClick={() => setSelectedReligion('parsi')}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-left"
        >
          <div className="text-4xl mb-2">🔥</div>
          <h3 className="text-xl font-bold text-gray-900">Parsi Heritage</h3>
          <p className="text-sm text-gray-600">Fire Temples & Nowruz</p>
        </button>
      </div>
    </div>
  );
}
