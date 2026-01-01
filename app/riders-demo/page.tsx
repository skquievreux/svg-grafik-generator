'use client';

import { useState, useEffect } from 'react';
import { RiderAvatarGenerator } from '@/lib/riders/avatar-generator';
import type { RiderAvatarConfig } from '@/lib/riders/avatar-generator';

export default function RidersDemoPage() {
  const [riderName, setRiderName] = useState('Sendit_76');
  const [level, setLevel] = useState(1);
  const [selectedPreset, setSelectedPreset] = useState(0);

  // Deterministic initial state for server/client consistency
  const [randomConfig, setRandomConfig] = useState<RiderAvatarConfig | null>(null);

  // Initialize random config on client side only to avoid hydration mismatch
  useEffect(() => {
    setRandomConfig(RiderAvatarGenerator.getRandomConfig(level, riderName));
  }, []); // Run once on mount

  const handleGenerateRandom = () => {
    setRandomConfig(RiderAvatarGenerator.getRandomConfig(level, riderName));
  };

  const presets = RiderAvatarGenerator.getStarterPresets(riderName);

  const helmetOptions = [
    'fullface_pro',
    'fullface_basic',
    'halfshell_trail',
    'dirt_bowl',
  ] as const;

  const shapeOptions = ['circle', 'octagon', 'hexagon', 'diamond'] as const;
  const schemeOptions = ['primary', 'team', 'premium'] as const;

  const glassesOptions = [
    'none',
    'goggles',
    'sunglasses',
  ] as const;

  const [customConfig, setCustomConfig] = useState<RiderAvatarConfig>({
    riderName: 'Custom_Rider',
    level: 10,
    backgroundShape: 'circle',
    helmetStyle: 'fullface_pro',
    glassesStyle: 'goggles',
    colorScheme: 'primary',
    size: 256,
    showLevel: true,
  });

  const updateCustomConfig = (updates: Partial<RiderAvatarConfig>) => {
    setCustomConfig((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold mb-2">🏍️ Rider Avatar Generator</h1>
          <p className="text-orange-100">Bikepark Okarben - Personalisierte Rider-Profile</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Starter Presets */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="bg-orange-600 text-white px-3 py-1 rounded">1</span>
            Starter-Presets
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {presets.map((preset, index) => {
              const svg = RiderAvatarGenerator.generateSVG({
                ...preset,
                riderName,
                level,
                elementId: `preset-${index}`
              });

              return (
                <div
                  key={index}
                  onClick={() => setSelectedPreset(index)}
                  className={`
                    bg-gray-800 rounded-lg p-4 cursor-pointer transition-all
                    hover:bg-gray-700 hover:scale-105
                    ${selectedPreset === index ? 'ring-4 ring-orange-500 scale-105' : ''}
                  `}
                >
                  <div
                    className="aspect-square mb-3 rounded-lg overflow-hidden bg-gray-900 flex items-center justify-center p-2"
                    dangerouslySetInnerHTML={{ __html: svg }}
                  />
                  <p className="text-center font-semibold">Preset {index + 1}</p>
                  <p className="text-center text-sm text-gray-400">{preset.helmetStyle}</p>
                  <p className="text-center text-xs text-gray-500">{preset.colorScheme}</p>
                </div>
              );
            })}
          </div>

          {/* Preview URL */}
          <div className="mt-6 bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">API-URL für Preset {selectedPreset + 1}:</p>
            <code className="text-xs bg-black p-2 rounded block overflow-x-auto">
              {`/api/riders/avatar?name=${riderName}&level=${level}&preset=${selectedPreset}`}
            </code>
          </div>
        </section>

        {/* Random Generator */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="bg-orange-600 text-white px-3 py-1 rounded">2</span>
            Zufalls-Generator
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Rider-Name</label>
                <input
                  type="text"
                  value={riderName}
                  onChange={(e) => setRiderName(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Level: {level}</label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={level}
                  onChange={(e) => setLevel(parseInt(e.target.value))}
                  className="w-full accent-orange-500"
                />
              </div>
              <button
                onClick={handleGenerateRandom}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
              >
                🎲 Neuen Avatar generieren
              </button>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 flex items-center justify-center">
              {randomConfig ? (
                (() => {
                  const svg = RiderAvatarGenerator.generateSVG({ ...randomConfig, elementId: 'random-gen' });
                  return (
                    <div
                      className="w-64 h-64 flex items-center justify-center p-4 bg-gray-900 rounded-full"
                      dangerouslySetInnerHTML={{ __html: svg }}
                    />
                  );
                })()
              ) : (
                <div className="w-64 h-64 flex items-center justify-center text-gray-500">
                  Lade Generator...
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Custom Builder */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="bg-orange-600 text-white px-3 py-1 rounded">3</span>
            Custom Avatar Builder
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-lg p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rider-Name</label>
                <input
                  type="text"
                  value={customConfig.riderName}
                  onChange={(e) => updateCustomConfig({ riderName: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Level: {customConfig.level}
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={customConfig.level}
                  onChange={(e) => updateCustomConfig({ level: parseInt(e.target.value) })}
                  className="w-full accent-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Helm-Style</label>
                <select
                  value={customConfig.helmetStyle}
                  onChange={(e) => updateCustomConfig({ helmetStyle: e.target.value as any })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  {helmetOptions.map((helmet) => (
                    <option key={helmet} value={helmet}>
                      {helmet}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Hintergrund-Form</label>
                <select
                  value={customConfig.backgroundShape}
                  onChange={(e) => updateCustomConfig({ backgroundShape: e.target.value as any })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  {shapeOptions.map((shape) => (
                    <option key={shape} value={shape}>
                      {shape}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Brille</label>
                <select
                  value={customConfig.glassesStyle || 'none'}
                  onChange={(e) =>
                    updateCustomConfig({
                      glassesStyle: e.target.value === 'none' ? undefined : (e.target.value as any),
                    })
                  }
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  {glassesOptions.map((glasses) => (
                    <option key={glasses} value={glasses}>
                      {glasses}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Farbschema</label>
                <select
                  value={customConfig.colorScheme}
                  onChange={(e) => updateCustomConfig({ colorScheme: e.target.value as any })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  {schemeOptions.map((scheme) => (
                    <option key={scheme} value={scheme}>
                      {scheme}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="showLevel"
                  checked={customConfig.showLevel}
                  onChange={(e) => updateCustomConfig({ showLevel: e.target.checked })}
                  className="w-5 h-5 accent-orange-500"
                />
                <label htmlFor="showLevel" className="text-sm font-medium">
                  Level-Badge anzeigen
                </label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="animated"
                  checked={customConfig.animated || false}
                  onChange={(e) => updateCustomConfig({ animated: e.target.checked })}
                  className="w-5 h-5 accent-orange-500"
                />
                <label htmlFor="animated" className="text-sm font-medium">
                  Animation aktivieren
                </label>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 flex items-center justify-center">
              {(() => {
                const svg = RiderAvatarGenerator.generateSVG({ ...customConfig, elementId: 'custom-builder' });
                return (
                  <div
                    className="w-64 h-64 flex items-center justify-center p-4 bg-gray-900 rounded-full"
                    dangerouslySetInnerHTML={{ __html: svg }}
                  />
                );
              })()}
            </div>
          </div>
        </section>

        {/* Scaling Test */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="bg-orange-600 text-white px-3 py-1 rounded">4</span>
            Quality & Scaling Test
          </h2>
          <div className="bg-gray-800 rounded-lg p-8">
            <p className="text-gray-400 mb-6">Testet die Lesbarkeit und Detailschärfe des aktuellen Custom-Avatars in verschiedenen Auflösungen.</p>

            <div className="flex flex-wrap items-end gap-8 justify-center lg:justify-start">
              {[32, 48, 64, 128, 256].map((size) => {
                const svg = RiderAvatarGenerator.generateSVG({ ...customConfig, size, elementId: `scale-${size}` });
                return (
                  <div key={size} className="flex flex-col items-center gap-2">
                    <div
                      style={{ width: size, height: size }}
                      className="bg-gray-900 rounded-full ring-2 ring-gray-700 flex items-center justify-center overflow-hidden"
                      dangerouslySetInnerHTML={{ __html: svg }}
                    />
                    <span className="text-xs text-gray-500 font-mono">{size}px</span>
                  </div>
                );
              })}

              <div className="flex flex-col items-center gap-2">
                {(() => {
                  const size = 300;
                  const svg = RiderAvatarGenerator.generateSVG({ ...customConfig, size, elementId: 'scale-300' });
                  return (
                    <>
                      <div
                        style={{ width: size, height: size }}
                        className="bg-gray-900 rounded-full ring-2 ring-gray-700 flex items-center justify-center overflow-hidden"
                        dangerouslySetInnerHTML={{ __html: svg }}
                      />
                      <span className="text-xs text-gray-500 font-mono">{size}px (Preview)</span>
                    </>
                  )
                })()}
              </div>
            </div>
          </div>
        </section>

        {/* Progression Test */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="bg-orange-600 text-white px-3 py-1 rounded">5</span>
            Level Progression System
          </h2>
          <div className="bg-gray-800 rounded-lg p-8">
            <p className="text-gray-400 mb-6">Visualisierung der Qualitätsstufen basierend auf dem Level.</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { lvl: 1, label: 'ROOKIE (Lvl 1)', desc: 'Flat Design, Basic' },
                { lvl: 4, label: 'AMATEUR (Lvl 4)', desc: '+Schatten, +Brille' },
                { lvl: 8, label: 'PRO (Lvl 8)', desc: '+Reflexionen' },
                { lvl: 15, label: 'ELITE (Lvl 15)', desc: '+Elite Glow' }
              ].map((tier) => {
                const config = {
                  ...customConfig,
                  level: tier.lvl,
                  elementId: `tier-${tier.lvl}`,
                  glassesStyle: customConfig.glassesStyle || 'goggles'
                };
                const svg = RiderAvatarGenerator.generateSVG(config as RiderAvatarConfig);
                return (
                  <div key={tier.lvl} className="flex flex-col items-center gap-3">
                    <div
                      className="w-32 h-32 bg-gray-900 rounded-lg p-2 ring-1 ring-gray-700 flex items-center justify-center overflow-hidden"
                      dangerouslySetInnerHTML={{ __html: svg }}
                    />
                    <div className="text-center">
                      <span className={`block font-bold ${tier.lvl >= 10 ? 'text-yellow-400' : 'text-white'}`}>{tier.label}</span>
                      <span className="text-xs text-gray-500">{tier.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
