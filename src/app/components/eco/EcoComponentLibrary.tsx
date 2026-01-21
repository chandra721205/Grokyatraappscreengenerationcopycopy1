import { motion } from 'motion/react';
import { Heart, Star, Bell, Check, DollarSign, Calendar } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

export function EcoComponentLibrary() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            🧩 Eco-Tourism Component Library
          </h1>
          <p className="text-xl text-gray-300 font-semibold">
            Reusable components for eco-tourism category
          </p>
        </div>

        <div className="space-y-12">
          {/* Discovery Buttons */}
          <ComponentSection
            title="Discovery Buttons"
            description="Google Search and YouTube Browse buttons"
            icon="🔍"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ComponentExample
                label="Google Search Button"
                specs={{
                  'Background': 'White (#FFFFFF)',
                  'Border': '3px solid Blue-500',
                  'Text Color': 'Blue-700',
                  'Padding': '24px horizontal, 16px vertical',
                  'Border Radius': '12px',
                  'Font': 'Bold 16px',
                }}
              >
                <Button className="bg-white border-3 border-blue-500 text-blue-700 hover:bg-blue-50 px-6 py-4 rounded-xl text-base font-bold flex items-center justify-center gap-3 w-full">
                  <span className="text-2xl">🔍</span>
                  Google Search
                </Button>
              </ComponentExample>

              <ComponentExample
                label="YouTube Browse Button"
                specs={{
                  'Background': 'White (#FFFFFF)',
                  'Border': '3px solid Red-500',
                  'Text Color': 'Red-700',
                  'Padding': '24px horizontal, 16px vertical',
                  'Border Radius': '12px',
                  'Font': 'Bold 16px',
                }}
              >
                <Button className="bg-white border-3 border-red-500 text-red-700 hover:bg-red-50 px-6 py-4 rounded-xl text-base font-bold flex items-center justify-center gap-3 w-full">
                  <span className="text-2xl">📺</span>
                  YouTube Browse
                </Button>
              </ComponentExample>
            </div>
          </ComponentSection>

          {/* Interest Capture Buttons */}
          <ComponentSection
            title="Interest Capture Buttons"
            description="Save to Wishlist and Mark Interested actions"
            icon="❤️"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ComponentExample
                label="Save to Wishlist (Inactive)"
                specs={{
                  'Background': 'White',
                  'Border': '3px solid Pink-400',
                  'Text Color': 'Pink-600',
                  'Icon': 'Heart outline',
                  'State': 'Not saved',
                }}
              >
                <Button className="bg-white hover:bg-pink-50 text-pink-600 border-3 border-pink-400 px-6 py-4 rounded-xl text-base font-bold flex items-center justify-center gap-2 w-full">
                  <Heart className="h-5 w-5" />
                  Save to Wishlist
                </Button>
              </ComponentExample>

              <ComponentExample
                label="Save to Wishlist (Active)"
                specs={{
                  'Background': 'Pink-500',
                  'Border': '3px solid Pink-400',
                  'Text Color': 'White',
                  'Icon': 'Heart filled',
                  'State': 'Saved',
                }}
              >
                <Button className="bg-pink-500 hover:bg-pink-600 text-white border-3 border-pink-400 px-6 py-4 rounded-xl text-base font-bold flex items-center justify-center gap-2 w-full">
                  <Heart className="h-5 w-5 fill-white" />
                  Saved to Wishlist
                </Button>
              </ComponentExample>

              <ComponentExample
                label="Mark Interested (Inactive)"
                specs={{
                  'Background': 'White',
                  'Border': '3px solid Yellow-400',
                  'Text Color': 'Yellow-600',
                  'Icon': 'Star outline',
                }}
              >
                <Button className="bg-white hover:bg-yellow-50 text-yellow-600 border-3 border-yellow-400 px-6 py-4 rounded-xl text-base font-bold flex items-center justify-center gap-2 w-full">
                  <Star className="h-5 w-5" />
                  Mark Interested
                </Button>
              </ComponentExample>

              <ComponentExample
                label="Mark Interested (Active)"
                specs={{
                  'Background': 'Yellow-500',
                  'Border': '3px solid Yellow-400',
                  'Text Color': 'White',
                  'Icon': 'Star filled',
                }}
              >
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white border-3 border-yellow-400 px-6 py-4 rounded-xl text-base font-bold flex items-center justify-center gap-2 w-full">
                  <Star className="h-5 w-5 fill-white" />
                  Interested
                </Button>
              </ComponentExample>
            </div>
          </ComponentSection>

          {/* Notify Me Button */}
          <ComponentSection
            title="Notify Me Button"
            description="Deal notification trigger button"
            icon="🔔"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ComponentExample
                label="Notify Me (Primary)"
                specs={{
                  'Background': 'Gradient Green-600 to Emerald-600',
                  'Text Color': 'White',
                  'Padding': '24px horizontal, 16px vertical',
                  'Icon': 'Bell',
                  'Effect': 'Scale 1.05 on hover',
                }}
              >
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-4 rounded-xl text-base font-bold flex items-center justify-center gap-2 w-full">
                  <Bell className="h-5 w-5" />
                  Notify Me
                </Button>
              </ComponentExample>

              <ComponentExample
                label="Notify Me (Disabled)"
                specs={{
                  'Background': 'Gray-500',
                  'Text Color': 'Gray-300',
                  'Opacity': '50%',
                  'State': 'Disabled',
                }}
              >
                <Button disabled className="bg-gray-500 text-gray-300 opacity-50 cursor-not-allowed px-6 py-4 rounded-xl text-base font-bold flex items-center justify-center gap-2 w-full">
                  <Bell className="h-5 w-5" />
                  Notify Me
                </Button>
              </ComponentExample>
            </div>
          </ComponentSection>

          {/* Budget Selector */}
          <ComponentSection
            title="Budget Range Selector"
            description="4-option budget selection cards"
            icon="💰"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { id: 'budget', label: 'Budget', range: '₹5k-15k', gradient: 'from-blue-500 to-cyan-500', selected: false },
                { id: 'medium', label: 'Medium', range: '₹15k-35k', gradient: 'from-green-500 to-emerald-500', selected: true },
                { id: 'premium', label: 'Premium', range: '₹35k-75k', gradient: 'from-amber-500 to-orange-500', selected: false },
                { id: 'luxury', label: 'Luxury', range: '₹75k+', gradient: 'from-purple-500 to-pink-500', selected: false },
              ].map(option => (
                <div
                  key={option.id}
                  className={`rounded-2xl p-6 border-3 transition-all cursor-pointer ${
                    option.selected
                      ? `bg-gradient-to-r ${option.gradient} border-white shadow-xl`
                      : 'bg-white border-gray-300 shadow-md'
                  }`}
                >
                  <h4 className={`text-xl font-bold mb-2 ${option.selected ? 'text-white' : 'text-gray-900'}`}>
                    {option.label}
                  </h4>
                  <p className={`text-base font-semibold ${option.selected ? 'text-white/90' : 'text-gray-600'}`}>
                    {option.range}
                  </p>
                  {option.selected && <Check className="h-6 w-6 text-white mt-2" />}
                </div>
              ))}
            </div>
            <div className="mt-4 bg-gray-800 rounded-xl p-4">
              <h4 className="text-lg font-bold text-white mb-2">Specifications:</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• <strong>Selected:</strong> Gradient background + white border + checkmark</li>
                <li>• <strong>Unselected:</strong> White background + gray border</li>
                <li>• <strong>Hover:</strong> Scale 1.05 transition</li>
                <li>• <strong>Border:</strong> 3px solid</li>
                <li>• <strong>Padding:</strong> 24px all sides</li>
              </ul>
            </div>
          </ComponentSection>

          {/* Multi-Select Chips */}
          <ComponentSection
            title="Preference Chips (Multi-Select)"
            description="Stay style, diet, and other preference selections"
            icon="🏷️"
          >
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-white mb-4">Stay Style Chips:</h4>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: 'Resort', selected: true },
                    { label: 'Villa', selected: false },
                    { label: 'Boutique', selected: true },
                    { label: 'Budget', selected: false },
                    { label: 'Luxury', selected: false },
                  ].map(chip => (
                    <button
                      key={chip.label}
                      className={`px-6 py-3 rounded-xl font-bold text-base transition-all ${
                        chip.selected
                          ? 'bg-emerald-600 text-white border-3 border-emerald-400'
                          : 'bg-white text-gray-700 border-3 border-gray-300'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-4">Diet Preferences:</h4>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: 'Veg', selected: true },
                    { label: 'Jain', selected: false },
                    { label: 'Vegan', selected: true },
                    { label: 'Other', selected: false },
                  ].map(chip => (
                    <button
                      key={chip.label}
                      className={`px-6 py-3 rounded-xl font-bold text-base transition-all ${
                        chip.selected
                          ? 'bg-teal-600 text-white border-3 border-teal-400'
                          : 'bg-white text-gray-700 border-3 border-gray-300'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-4">
                <h4 className="text-lg font-bold text-white mb-2">Specifications:</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• <strong>Selected:</strong> Colored background + white text + colored border</li>
                  <li>• <strong>Unselected:</strong> White background + gray text + gray border</li>
                  <li>• <strong>Hover:</strong> Scale 1.05 on hover</li>
                  <li>• <strong>Multi-select:</strong> Toggle behavior (can select multiple)</li>
                  <li>• <strong>Colors vary:</strong> Emerald for stay, Teal for diet</li>
                </ul>
              </div>
            </div>
          </ComponentSection>

          {/* Toggle Switches */}
          <ComponentSection
            title="Toggle Switches"
            description="Deal alerts, safety features, and preferences"
            icon="🔘"
          >
            <div className="space-y-4">
              {[
                { label: 'Notify me when deals match my budget', enabled: true },
                { label: 'Accessibility-friendly required', enabled: false },
                { label: 'Medical support preferred', enabled: true },
                { label: 'Senior-friendly add-ons', enabled: false },
              ].map((toggle, idx) => (
                <div key={idx} className="bg-gray-800 rounded-xl p-5 flex items-center justify-between">
                  <span className="text-lg font-bold text-white">{toggle.label}</span>
                  <div className={`w-14 h-8 rounded-full transition-all ${
                    toggle.enabled ? 'bg-green-500' : 'bg-gray-600'
                  }`}>
                    <div className={`w-6 h-6 bg-white rounded-full mt-1 transition-all ${
                      toggle.enabled ? 'ml-7' : 'ml-1'
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-gray-800 rounded-xl p-4">
              <h4 className="text-lg font-bold text-white mb-2">Specifications:</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• <strong>Width:</strong> 56px (14 * 4px)</li>
                <li>• <strong>Height:</strong> 32px (8 * 4px)</li>
                <li>• <strong>Knob:</strong> 24px circle, white</li>
                <li>• <strong>Enabled:</strong> Green-500 background, knob at right</li>
                <li>• <strong>Disabled:</strong> Gray-600 background, knob at left</li>
                <li>• <strong>Transition:</strong> 300ms ease-in-out</li>
              </ul>
            </div>
          </ComponentSection>

          {/* Admin Editable Markers */}
          <ComponentSection
            title="Admin Editable Markers"
            description="Visual indicators for admin-editable content"
            icon="✏️"
          >
            <div className="space-y-4">
              <div className="bg-yellow-100 border-2 border-dashed border-yellow-400 rounded-xl p-4">
                <p className="text-sm font-bold text-yellow-800 text-center">
                  [Admin Editable: Update destination details]
                </p>
              </div>

              <div className="bg-gray-100 border-2 border-dashed border-gray-400 rounded-xl p-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Admin-Added Destination 1</h3>
                <p className="text-sm text-gray-600 font-semibold">📍 Admin-Added Location</p>
              </div>

              <div className="bg-purple-900 border-3 border-purple-700 rounded-2xl p-4">
                <p className="text-base text-white font-semibold">
                  <span className="bg-purple-700 px-3 py-1 rounded-lg">[Admin: Update This Text]</span>
                  {' '}Your interests are saved for admin review
                </p>
              </div>
            </div>
            <div className="mt-4 bg-gray-800 rounded-xl p-4">
              <h4 className="text-lg font-bold text-white mb-2">Marker Types:</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• <strong>Yellow Box:</strong> Admin-editable fields (dashed border)</li>
                <li>• <strong>Gray Box:</strong> Placeholder content (dashed border)</li>
                <li>• <strong>Purple Badge:</strong> Inline admin text (solid background)</li>
                <li>• <strong>Font:</strong> Bold, 12-14px</li>
              </ul>
            </div>
          </ComponentSection>

          {/* Placeholder Cards */}
          <ComponentSection
            title="Destination Placeholder Cards"
            description="Admin-added destination card template"
            icon="🏞️"
          >
            <div className="bg-white rounded-3xl border-3 border-gray-300 overflow-hidden shadow-lg max-w-md">
              {/* Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                <div className="text-9xl">🌿</div>
              </div>

              {/* Admin Badge */}
              <div className="bg-yellow-100 border-b-2 border-dashed border-yellow-400 px-4 py-2">
                <p className="text-xs font-bold text-yellow-800 text-center">
                  [Admin Editable: Update destination details]
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="bg-gray-100 border-2 border-dashed border-gray-400 rounded-xl p-3 mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Admin-Added Destination 1</h3>
                  <p className="text-sm text-gray-600 font-semibold">📍 Admin-Added Location</p>
                </div>

                <div className="mb-4">
                  <p className="text-base font-semibold text-gray-700 mb-2">Admin-Published Experience</p>
                  <div className="space-y-1">
                    {['Admin-Curated Activity 1', 'Admin-Curated Activity 2', 'Admin-Curated Activity 3'].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                        <span className="font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-green-100 border-2 border-green-400 rounded-xl p-3 mb-4">
                  <p className="text-sm font-bold text-green-800 flex items-center gap-2">
                    ♻️ Admin-Verified Eco-Rating
                  </p>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-white hover:bg-pink-50 text-pink-600 border-3 border-pink-400 px-6 py-4 rounded-xl text-base font-bold flex items-center justify-center gap-2">
                    <Heart className="h-5 w-5" />
                    Save Interest
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-4 rounded-xl text-base font-bold flex items-center justify-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notify Me
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-4 bg-gray-800 rounded-xl p-4">
              <h4 className="text-lg font-bold text-white mb-2">Card Structure:</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• <strong>Width:</strong> Full width on mobile, max 400px on desktop</li>
                <li>• <strong>Border:</strong> 3px solid gray-300</li>
                <li>• <strong>Border Radius:</strong> 24px (rounded-3xl)</li>
                <li>• <strong>Image:</strong> 192px height (h-48)</li>
                <li>• <strong>Padding:</strong> 24px inside content area</li>
                <li>• <strong>Shadow:</strong> Large drop shadow</li>
              </ul>
            </div>
          </ComponentSection>

          {/* Color Palette */}
          <ComponentSection
            title="Color Palette"
            description="Eco-tourism category color system"
            icon="🎨"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Primary Green', hex: '#059669', class: 'bg-green-600' },
                { name: 'Emerald', hex: '#10B981', class: 'bg-emerald-600' },
                { name: 'Lime Accent', hex: '#84CC16', class: 'bg-lime-600' },
                { name: 'Teal', hex: '#0D9488', class: 'bg-teal-600' },
                { name: 'Blue', hex: '#2563EB', class: 'bg-blue-600' },
                { name: 'Amber', hex: '#D97706', class: 'bg-amber-600' },
                { name: 'Purple', hex: '#9333EA', class: 'bg-purple-600' },
                { name: 'Pink', hex: '#DB2777', class: 'bg-pink-600' },
              ].map(color => (
                <div key={color.name} className="bg-gray-800 rounded-xl p-4">
                  <div className={`${color.class} h-20 rounded-lg mb-3 border-2 border-white`}></div>
                  <p className="text-sm font-bold text-white mb-1">{color.name}</p>
                  <p className="text-xs text-gray-400 font-mono">{color.hex}</p>
                </div>
              ))}
            </div>
          </ComponentSection>

          {/* Typography */}
          <ComponentSection
            title="Typography System"
            description="Font sizes, weights, and usage"
            icon="📝"
          >
            <div className="bg-gray-800 rounded-xl p-6 space-y-4">
              <div className="border-b border-gray-700 pb-4">
                <p className="text-4xl font-bold text-white mb-2">Heading 1 - 36px Bold</p>
                <p className="text-sm text-gray-400 font-mono">text-4xl font-bold</p>
              </div>
              <div className="border-b border-gray-700 pb-4">
                <p className="text-3xl font-bold text-white mb-2">Heading 2 - 30px Bold</p>
                <p className="text-sm text-gray-400 font-mono">text-3xl font-bold</p>
              </div>
              <div className="border-b border-gray-700 pb-4">
                <p className="text-2xl font-bold text-white mb-2">Heading 3 - 24px Bold</p>
                <p className="text-sm text-gray-400 font-mono">text-2xl font-bold</p>
              </div>
              <div className="border-b border-gray-700 pb-4">
                <p className="text-xl font-bold text-white mb-2">Heading 4 - 20px Bold</p>
                <p className="text-sm text-gray-400 font-mono">text-xl font-bold</p>
              </div>
              <div className="border-b border-gray-700 pb-4">
                <p className="text-lg font-semibold text-gray-300 mb-2">Body Large - 18px Semibold</p>
                <p className="text-sm text-gray-400 font-mono">text-lg font-semibold</p>
              </div>
              <div className="border-b border-gray-700 pb-4">
                <p className="text-base font-semibold text-gray-300 mb-2">Body Regular - 16px Semibold</p>
                <p className="text-sm text-gray-400 font-mono">text-base font-semibold</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-400 mb-2">Caption - 14px Semibold</p>
                <p className="text-sm text-gray-400 font-mono">text-sm font-semibold</p>
              </div>
            </div>
          </ComponentSection>
        </div>
      </div>
    </div>
  );
}

interface ComponentSectionProps {
  title: string;
  description: string;
  icon: string;
  children: React.ReactNode;
}

function ComponentSection({ title, description, icon, children }: ComponentSectionProps) {
  return (
    <div className="bg-gray-800 rounded-3xl border-3 border-gray-700 p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-5xl">{icon}</span>
          <h2 className="text-3xl font-bold text-white">{title}</h2>
        </div>
        <p className="text-lg text-gray-400 font-semibold">{description}</p>
      </div>
      {children}
    </div>
  );
}

interface ComponentExampleProps {
  label: string;
  specs: Record<string, string>;
  children: React.ReactNode;
}

function ComponentExample({ label, specs, children }: ComponentExampleProps) {
  return (
    <div className="bg-gray-900 rounded-2xl p-6 border-2 border-gray-700">
      <h4 className="text-lg font-bold text-white mb-4">{label}</h4>
      <div className="mb-6">{children}</div>
      <div className="bg-gray-800 rounded-xl p-4">
        <h5 className="text-sm font-bold text-gray-400 mb-2">Specifications:</h5>
        <div className="space-y-1">
          {Object.entries(specs).map(([key, value]) => (
            <div key={key} className="flex items-start gap-2">
              <span className="text-xs text-gray-500 font-semibold min-w-24">{key}:</span>
              <span className="text-xs text-gray-300 font-semibold">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
