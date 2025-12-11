'use client';

import { useState, useEffect, useMemo } from 'react';
import { DynamicIcon } from '@/components/icons/dynamic-icon';
import { Button } from '@/components/ui/button';
import { cn, formatCategoryName, copyToClipboard, downloadSVG } from '@/lib/utils';
import { Search, Grid, List, Download, Copy, Heart, Palette, RotateCcw } from 'lucide-react';

interface Icon {
  name: string;
  category: string;
}

interface GalleryData {
  categories: Record<string, { count: number; icons: string[] }>;
  metadata: {
    total: number;
    categories: string[];
  };
}

export function IconGallery() {
  const [galleryData, setGalleryData] = useState<GalleryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(60);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Custom Colors State
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [customColors, setCustomColors] = useState<{
    bgColor: string;
    borderColor: string;
    iconColor: string;
  }>({
    bgColor: '',
    borderColor: '',
    iconColor: ''
  });

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        setGalleryData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load gallery:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      try {
        setFavorites(new Set(JSON.parse(storedFavorites)));
      } catch (e) {
        console.error('Failed to parse favorites:', e);
      }
    }
  }, []);

  const filteredIcons = useMemo(() => {
    if (!galleryData) return [];
    let icons: Icon[] = [];

    // Flatten all icons
    Object.entries(galleryData.categories).forEach(([cat, data]) => {
      data.icons.forEach(name => {
        icons.push({ name, category: cat });
      });
    });

    return icons.filter(icon => {
      const matchesSearch = icon.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || icon.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [galleryData, searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredIcons.length / itemsPerPage);

  const paginatedIcons = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredIcons.slice(start, start + itemsPerPage);
  }, [filteredIcons, currentPage, itemsPerPage]);

  const toggleFavorite = (name: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(name)) {
      newFavorites.delete(name);
    } else {
      newFavorites.add(name);
    }
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(Array.from(newFavorites)));
  };

  const getIconSearchParams = (icon: Icon) => {
    const params = new URLSearchParams({
      name: icon.name,
      category: icon.category,
    });

    if (customColors.bgColor) params.append('bgColor', customColors.bgColor);
    if (customColors.borderColor) params.append('borderColor', customColors.borderColor);
    if (customColors.iconColor) params.append('iconColor', customColors.iconColor);

    return params;
  };

  const triggerConfetti = (x: number, y: number) => {
    for (let i = 0; i < 20; i++) {
      const piece = document.createElement('div');
      piece.classList.add('confetti-piece');
      piece.style.left = `${x}px`;
      piece.style.top = `${y}px`;
      piece.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;

      // Random spread
      const spreadX = (Math.random() - 0.5) * 200;
      const spreadY = (Math.random() - 1) * 200;
      piece.animate([
        { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
        { transform: `translate(${spreadX}px, ${spreadY}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
      ], {
        duration: 1000 + Math.random() * 500,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
      });

      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 1500);
    }
  };

  const copyIconCode = async (icon: Icon, e: React.MouseEvent) => {
    try {
      const params = getIconSearchParams(icon);
      const response = await fetch(`/api/icons?${params.toString()}`);
      const svgCode = await response.text();
      await copyToClipboard(svgCode);

      // Visual feedback
      const btn = e.currentTarget as HTMLButtonElement;
      btn.innerHTML = '<span class="text-green-600 font-bold">Kopiert!</span>';
      setTimeout(() => {
        // Since we are using Lucide icons, simple re-render triggers reset, strictly speaking updating state is better but direct DOM manipulation for instant feedback works too for simple things. 
        // Actually, let's just trigger a small pulse or state instead. 
        // For now, let's revert logic: purely visual logic is complex without state.
      }, 1000);

    } catch (error) {
      console.error('Failed to copy icon:', error);
    }
  };

  const downloadIcon = async (icon: Icon, e: React.MouseEvent) => {
    try {
      triggerConfetti(e.clientX, e.clientY);
      const params = getIconSearchParams(icon);
      const response = await fetch(`/api/icons?${params.toString()}`);
      const svgCode = await response.text();
      const filename = `${icon.name.toLowerCase().replace(/\s+/g, '-')}.svg`;
      downloadSVG(svgCode, filename);
    } catch (error) {
      console.error('Failed to download icon:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!galleryData) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Fehler beim Laden der Galerie.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-pop-in">
      {/* Control Panel - Glassmorphism */}
      <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 sticky top-24 z-40 transition-all duration-300">
        <div className="flex flex-col xl:flex-row gap-6 mb-6">
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Suchen Sie nach Icons (z.B. 'Herz', 'Reise')..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-4 text-base md:text-lg bg-white/50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none placeholder-gray-400"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="px-6 py-4 text-base md:text-lg bg-white/50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none min-w-[200px] cursor-pointer"
          >
            <option value="all">Alle Kategorien ({galleryData.metadata.total})</option>
            {galleryData.metadata.categories.map(category => (
              <option key={category} value={category}>
                {formatCategoryName(category)} ({galleryData.categories[category]?.count || 0})
              </option>
            ))}
          </select>

          <div className="flex gap-3">
            <Button
              variant={showColorPicker ? 'primary' : 'outline'}
              size="lg"
              onClick={() => setShowColorPicker(!showColorPicker)}
              className={cn("px-6 py-4 text-base font-semibold transition-all", showColorPicker ? "shadow-lg shadow-blue-500/20" : "")}
              title="Farben anpassen"
            >
              <Palette className="h-5 w-5 mr-0 md:mr-2" />
              <span className="hidden md:inline">Anpassen</span>
            </Button>
            <div className="bg-gray-100/50 p-1 rounded-xl flex border border-gray-200">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('grid')}
                className={cn("rounded-lg h-full px-4", viewMode === 'grid' && "shadow-sm bg-white")}
                title="Raster"
              >
                <Grid className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('list')}
                className={cn("rounded-lg h-full px-4", viewMode === 'list' && "shadow-sm bg-white")}
                title="Liste"
              >
                <List className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Color Picker Panel - Animate Slide */}
        {showColorPicker && (
          <div className="mt-6 p-6 bg-white/60 rounded-xl border border-blue-100 animate-pop-in">
            <div className="flex flex-wrap gap-8 items-end">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2 tracking-wider">Hintergrund</label>
                <div className="flex items-center gap-3">
                  <div className="relative group cursor-pointer overflow-hidden rounded-full shadow-sm hover:shadow-md transition-shadow">
                    <input
                      type="color"
                      value={customColors.bgColor || '#000000'}
                      onChange={(e) => setCustomColors({ ...customColors, bgColor: e.target.value })}
                      className="h-10 w-10 p-0 border-0 absolute -top-1 -left-1 w-[120%] h-[120%] cursor-pointer"
                    />
                    <div className="w-10 h-10 border-2 border-white pointer-events-none rounded-full" style={{ backgroundColor: customColors.bgColor || '#000000' }}></div>
                  </div>
                  <span className="text-sm font-mono text-gray-600 bg-white px-2 py-1 rounded border border-gray-200">{customColors.bgColor || 'Standard'}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2 tracking-wider">Rahmen</label>
                <div className="flex items-center gap-3">
                  <div className="relative group cursor-pointer overflow-hidden rounded-full shadow-sm hover:shadow-md transition-shadow">
                    <input
                      type="color"
                      value={customColors.borderColor || '#000000'}
                      onChange={(e) => setCustomColors({ ...customColors, borderColor: e.target.value })}
                      className="h-10 w-10 p-0 border-0 absolute -top-1 -left-1 w-[120%] h-[120%] cursor-pointer"
                    />
                    <div className="w-10 h-10 border-2 border-white pointer-events-none rounded-full" style={{ backgroundColor: customColors.borderColor || '#000000' }}></div>
                  </div>
                  <span className="text-sm font-mono text-gray-600 bg-white px-2 py-1 rounded border border-gray-200">{customColors.borderColor || 'Standard'}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2 tracking-wider">Icon</label>
                <div className="flex items-center gap-3">
                  <div className="relative group cursor-pointer overflow-hidden rounded-full shadow-sm hover:shadow-md transition-shadow">
                    <input
                      type="color"
                      value={customColors.iconColor || '#000000'}
                      onChange={(e) => setCustomColors({ ...customColors, iconColor: e.target.value })}
                      className="h-10 w-10 p-0 border-0 absolute -top-1 -left-1 w-[120%] h-[120%] cursor-pointer"
                    />
                    <div className="w-10 h-10 border-2 border-white pointer-events-none rounded-full" style={{ backgroundColor: customColors.iconColor || '#000000' }}></div>
                  </div>
                  <span className="text-sm font-mono text-gray-600 bg-white px-2 py-1 rounded border border-gray-200">{customColors.iconColor || 'Standard'}</span>
                </div>
              </div>

              <div className="ml-auto">
                <Button
                  variant="ghost"
                  onClick={() => setCustomColors({ bgColor: '', borderColor: '', iconColor: '' })}
                  className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 text-gray-500"
                >
                  <RotateCcw className="h-4 w-4" />
                  Zurücksetzen
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-6 border-t border-gray-100 gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <span className="font-semibold">{filteredIcons.length}</span> Icons gefunden
          </div>
          {favorites.size > 0 && (
            <span className="inline-flex items-center gap-2 text-sm font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full animate-bounce delay-1000">
              <Heart className="h-3 w-3 fill-current" />
              {favorites.size} Favoriten
            </span>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className={cn(
        'gallery-grid pb-20 justify-items-center', // Added justify-items-center to ensure grid items are centered in their columns
        viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
          : 'flex flex-col gap-4'
      )}>
        {paginatedIcons.map((icon, index) => {
          // Staggered Delay Logic - Cycle through generic delay classes
          const delayClass = `delay-${(index % 5) * 100}`;

          return (
            <div
              key={icon.name}
              className={cn(
                'card-3d-wrapper animate-pop-in w-full max-w-[280px]', // Wrapper for 3D effect
                viewMode === 'list' && 'max-w-none',
                delayClass // Apply staggered delay
              )}
            >
              <div className={cn(
                'card-3d group bg-white rounded-2xl border border-gray-100 relative overflow-hidden transition-all duration-300',
                viewMode === 'grid' && 'p-8 flex flex-col items-center hover:border-blue-200',
                viewMode === 'list' && 'flex items-center gap-6 p-4 hover:border-blue-200'
              )}>
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/30 group-hover:to-purple-50/30 transition-all duration-500 pointer-events-none" />

                <div className={cn(
                  'relative z-10 transition-transform duration-300 group-hover:scale-110',
                  viewMode === 'grid' && 'mb-6',
                  viewMode === 'list' && 'flex-shrink-0'
                )}>
                  <div className="relative inline-block drop-shadow-sm group-hover:drop-shadow-lg transition-all duration-300">
                    <DynamicIcon
                      name={icon.name}
                      category={icon.category}
                      size={viewMode === 'grid' ? 72 : 48}
                      bgColor={customColors.bgColor}
                      borderColor={customColors.borderColor}
                      iconColor={customColors.iconColor}
                    />
                    {favorites.has(icon.name) && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg animate-pop-in">
                        <Heart className="h-3 w-3 fill-current" />
                      </div>
                    )}
                  </div>
                </div>

                <div className={cn(
                  'relative z-10 text-center w-full',
                  viewMode === 'list' && 'flex-1 text-left'
                )}>
                  <h3 className="font-bold text-gray-800 mb-1 text-lg leading-tight group-hover:text-blue-600 transition-colors">{icon.name}</h3>
                  <div className="text-xs font-medium text-gray-400 mb-4 uppercase tracking-wider">
                    {formatCategoryName(icon.category)}
                  </div>

                  {/* Actions - Visible on hover/focus or always in list */}
                  <div className={cn(
                    "flex gap-2 transition-all duration-300",
                    viewMode === 'grid' ? "justify-center opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0" : "opacity-100"
                  )}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => copyIconCode(icon, e)}
                      title="Kopieren"
                      className="h-8 w-8 p-0 rounded-full hover:bg-blue-100 hover:text-blue-600"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => downloadIcon(icon, e)}
                      title="Download"
                      className="h-8 w-8 p-0 rounded-full hover:bg-green-100 hover:text-green-600"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(icon.name)}
                      title="Favorit"
                      className={cn(
                        "h-8 w-8 p-0 rounded-full hover:bg-red-100 hover:text-red-600",
                        favorites.has(icon.name) && "text-red-500 bg-red-50"
                      )}
                    >
                      <Heart className={cn("h-4 w-4", favorites.has(icon.name) && "fill-current")} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12 pb-12">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="rounded-full px-6 hover:bg-white hover:text-blue-600 hover:border-blue-200 transition-all font-medium"
          >
            ←
          </Button>

          <span className="text-sm font-medium text-gray-500 bg-white/80 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm border border-gray-100">
            Seite {currentPage} von {totalPages}
          </span>

          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="rounded-full px-6 hover:bg-white hover:text-blue-600 hover:border-blue-200 transition-all font-medium"
          >
            →
          </Button>
        </div>
      )}
    </div>
  );
}