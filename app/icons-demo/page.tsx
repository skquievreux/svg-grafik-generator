'use client';

import { galleryIcons } from '@/app/api/gallery/data';
import { SmartIcon } from '@/components/icons/smart-icon';
import { useState, useMemo } from 'react';

export default function IconsDemoPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(galleryIcons.map(icon => icon.category));
    return ['all', ...Array.from(cats).sort()];
  }, []);

  // Filter icons
  const filteredIcons = useMemo(() => {
    return galleryIcons.filter(icon => {
      const matchesSearch = icon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        icon.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || icon.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Group by category for list view
  const iconsByCategory = useMemo(() => {
    const grouped = new Map<string, typeof galleryIcons>();
    filteredIcons.forEach(icon => {
      if (!grouped.has(icon.category)) {
        grouped.set(icon.category, []);
      }
      grouped.get(icon.category)!.push(icon);
    });
    return grouped;
  }, [filteredIcons]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Icon Gallery
          </h1>
          <p className="text-lg text-gray-600">
            {filteredIcons.length} icons • 100% Lucide React Coverage
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Icons
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or tag..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                View Mode
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${viewMode === 'grid'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${viewMode === 'list'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {filteredIcons.map(icon => (
              <div
                key={icon.name}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4 flex flex-col items-center justify-center group cursor-pointer"
                title={`${icon.name}\nCategory: ${icon.category}\nTags: ${icon.tags.join(', ')}`}
              >
                <SmartIcon
                  icon={icon}
                  size={48}
                  className="text-gray-700 group-hover:text-blue-600 transition-colors mb-2"
                />
                <span className="text-xs text-gray-600 text-center line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {icon.name}
                </span>
                <span className="text-[10px] text-gray-400 mt-1">
                  {icon.category}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="space-y-8">
            {Array.from(iconsByCategory.entries())
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([category, icons]) => (
                <div key={category} className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 capitalize">
                    {category}
                    <span className="text-sm font-normal text-gray-500 ml-2">
                      ({icons.length} icons)
                    </span>
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {icons.map(icon => (
                      <div
                        key={icon.name}
                        className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                        title={`Tags: ${icon.tags.join(', ')}`}
                      >
                        <SmartIcon
                          icon={icon}
                          size={40}
                          className="text-gray-700 group-hover:text-blue-600 transition-colors mb-2"
                        />
                        <span className="text-xs text-gray-600 text-center group-hover:text-blue-600 transition-colors">
                          {icon.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Empty State */}
        {filteredIcons.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <SmartIcon
              icon={{ name: 'Search', category: '', tags: [] }}
              size={64}
              className="text-gray-400 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No icons found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Footer Stats */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">271</div>
              <div className="text-sm text-gray-600">Total Icons</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">100%</div>
              <div className="text-sm text-gray-600">Coverage</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">13</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">$0</div>
              <div className="text-sm text-gray-600">AI Costs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
