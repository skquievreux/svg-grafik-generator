'use client';

import { useState, useEffect, useMemo } from 'react';
import { DynamicIcon } from '@/components/icons/dynamic-icon';
import { Button } from '@/components/ui/button';
import { cn, formatCategoryName, copyToClipboard, downloadSVG } from '@/lib/utils';
import { Search, Grid, List, Download, Copy, Heart, Palette, RotateCcw, Sun, Moon, ChevronLeft, ChevronRight } from 'lucide-react';

import { IconViewerModal } from './icon-viewer-modal';

interface Icon {
  name: string;
  category: string;
  tags: string[];
}

interface GalleryData {
  icons: Icon[];
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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(24);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Theme Effect
  useEffect(() => {
    console.log('Testing Theme Toggle. Current state:', theme); // Debug Log
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'dark') {
      root.classList.add('dark');
      console.log('Applied DARK class to HTML element');
    } else {
      root.classList.add('light'); // Explicitly add light for strict CSS frameworks
      console.log('Applied LIGHT class to HTML element');
    }
  }, [theme]);

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

  // Viewer Modal State
  const [viewerState, setViewerState] = useState<{
    isOpen: boolean;
    iconName: string | null;
    category: string | null;
  }>({
    isOpen: false,
    iconName: null,
    category: null
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

  // Filter Logic
  const filteredIcons = useMemo(() => {
    if (!galleryData) return [];

    let icons: Icon[] = galleryData.icons;

    // Filter by category
    if (selectedCategory !== 'all') {
      icons = icons.filter(icon => icon.category === selectedCategory);
    }

    // Filter by search term (searches name, category, and tags)
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      icons = icons.filter(icon =>
        icon.name.toLowerCase().includes(term) ||
        icon.category.toLowerCase().includes(term) ||
        icon.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    // Filter by selected tags (OR logic - icon must have at least one of the selected tags)
    if (selectedTags.length > 0) {
      icons = icons.filter(icon =>
        selectedTags.some(selectedTag =>
          icon.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase())
        )
      );
    }

    return icons;
  }, [galleryData, selectedCategory, searchTerm, selectedTags]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredIcons.length / itemsPerPage);
  const paginatedIcons = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredIcons.slice(start, start + itemsPerPage);
  }, [filteredIcons, currentPage, itemsPerPage]);

  const toggleFavorite = (iconName: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(iconName)) {
      newFavorites.delete(iconName);
    } else {
      newFavorites.add(iconName);
    }
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(Array.from(newFavorites)));
  };

  const getIconSearchParams = (icon: Icon) => {
    const params = new URLSearchParams({
      name: icon.name,
      category: icon.category
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

      const btn = e.currentTarget as HTMLButtonElement;
      const originalInner = btn.innerHTML;
      btn.innerHTML = '<span class="text-green-600 font-bold">✓</span>';
      setTimeout(() => {
        btn.innerHTML = originalInner;
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

  const copyPaletteConfig = async () => {
    const config = JSON.stringify(customColors, null, 2);
    await copyToClipboard(config);
  };

  // Viewer Modal Handlers
  const openViewer = (icon: Icon) => {
    setViewerState({
      isOpen: true,
      iconName: icon.name,
      category: icon.category
    });
  };

  const closeViewer = () => {
    setViewerState(prev => ({ ...prev, isOpen: false }));
  };

  const handleApplyPalette = (colors: { background: string; border: string; icon: string }) => {
    setCustomColors({
      bgColor: colors.background,
      borderColor: colors.border,
      iconColor: colors.icon
    });
    // Save to session storage
    sessionStorage.setItem('svg-icon-theme', JSON.stringify(colors));
  };

  // Load persisted theme
  useEffect(() => {
    const savedTheme = sessionStorage.getItem('svg-icon-theme');
    if (savedTheme) {
      try {
        const colors = JSON.parse(savedTheme);
        setCustomColors({
          bgColor: colors.background,
          borderColor: colors.border,
          iconColor: colors.icon
        });
      } catch (e) { console.error(e) }
    }
  }, []);


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
      {/* Control Panel */}
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
              className="w-full pl-12 pr-4 py-4 text-base md:text-lg bg-white/50 dark:bg-space-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-space-800 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none placeholder-gray-400"
            />
          </div>

          {/* Selected Tags Display */}
          {selectedTags.length > 0 && (
            <div className="flex-1 flex flex-wrap items-center gap-2 p-3 bg-blue-50 dark:bg-space-light/10 rounded-xl border border-blue-200 dark:border-space-light/20">
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Aktive Tags:</span>
              {selectedTags.map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedTags(prev => prev.filter(t => t !== tag));
                    setCurrentPage(1);
                  }}
                  className="group flex items-center gap-1 px-3 py-1 text-sm font-medium bg-blue-500 dark:bg-neon-purple text-white rounded-full hover:bg-blue-600 dark:hover:bg-neon-purple/80 transition-colors"
                >
                  {tag}
                  <span className="text-xs opacity-70 group-hover:opacity-100">×</span>
                </button>
              ))}
              <button
                onClick={() => {
                  setSelectedTags([]);
                  setCurrentPage(1);
                }}
                className="ml-auto text-xs font-semibold text-red-600 dark:text-red-400 hover:underline"
              >
                Alle entfernen
              </button>
            </div>
          )}

          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="px-6 py-4 text-base md:text-lg bg-white dark:bg-space-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-space-800 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none min-w-[200px] cursor-pointer appearance-none shadow-sm"
          >
            <option value="all" className="bg-white dark:bg-space-900 text-gray-900 dark:text-gray-100">Alle Kategorien ({galleryData.metadata.total})</option>
            {galleryData.metadata.categories.map(category => (
              <option key={category} value={category} className="bg-white dark:bg-space-900 text-gray-900 dark:text-gray-100">
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
            <div className="bg-gray-100/50 dark:bg-space-light/20 p-1 rounded-xl flex border border-gray-200 dark:border-space-800">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('grid')}
                className={cn("rounded-lg h-full px-4", viewMode === 'grid' && "shadow-sm bg-white dark:bg-space-800")}
                title="Raster"
              >
                <Grid className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('list')}
                className={cn("rounded-lg h-full px-4", viewMode === 'list' && "shadow-sm bg-white dark:bg-space-800")}
                title="Liste"
              >
                <List className="h-5 w-5" />
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-12 h-12 rounded-xl dark:border-space-800 dark:bg-space-900 dark:text-yellow-400"
              title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Color Picker Panel */}
        {showColorPicker && (
          <div className="mt-6 p-6 bg-white/60 dark:bg-space-900 rounded-xl border border-blue-100 dark:border-space-800 animate-pop-in">
            <div className="flex flex-wrap gap-8 items-end">
              {/* Background Color */}
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
                  <span className="text-sm font-mono text-gray-600 bg-white dark:bg-space-800 dark:text-gray-300 px-2 py-1 rounded border border-gray-200 dark:border-space-700">{customColors.bgColor || 'Standard'}</span>
                </div>
              </div>

              {/* Border Color */}
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
                  <span className="text-sm font-mono text-gray-600 bg-white dark:bg-space-800 dark:text-gray-300 px-2 py-1 rounded border border-gray-200 dark:border-space-700">{customColors.borderColor || 'Standard'}</span>
                </div>
              </div>

              {/* Icon Color */}
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
                  <span className="text-sm font-mono text-gray-600 bg-white dark:bg-space-800 dark:text-gray-300 px-2 py-1 rounded border border-gray-200 dark:border-space-700">{customColors.iconColor || 'Standard'}</span>
                </div>
              </div>

              <div className="flex-1 flex justify-end">
                <Button variant="outline" onClick={copyPaletteConfig} className="gap-2 dark:border-space-800 dark:bg-space-900 dark:text-gray-200">
                  <Copy className="h-4 w-4" />
                  Palette Kopieren
                </Button>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
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
        )}

        {/* Stats Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-6 border-t border-gray-100 dark:border-space-800 gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
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
        'gallery-grid pb-20 justify-items-center',
        viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
          : 'flex flex-col gap-4'
      )}>
        {paginatedIcons.map((icon, index) => {
          const delayClass = `delay-${(index % 5) * 100}`;

          return (
            <div
              key={icon.name}
              className={cn(
                'card-3d-wrapper animate-pop-in w-full max-w-[280px]',
                viewMode === 'list' && 'max-w-none',
                delayClass
              )}
            >
              <div
                className={cn(
                  'card-3d group bg-white dark:bg-space-800 dark:border-space-700 rounded-2xl border border-gray-100 relative overflow-hidden transition-all duration-300 cursor-pointer',
                  viewMode === 'grid' && 'p-8 flex flex-col items-center hover:border-blue-200 dark:hover:border-neon-purple',
                  viewMode === 'list' && 'flex items-center gap-6 p-4 hover:border-blue-200 dark:hover:border-neon-purple'
                )}
                onClick={() => openViewer(icon)}
              >
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(icon.name);
                    }}
                    className="p-2 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Heart className={cn("h-4 w-4", favorites.has(icon.name) ? "fill-red-500 text-red-500" : "text-gray-400")} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyIconCode(icon, e);
                    }}
                    className="p-2 hover:bg-blue-50 rounded-full transition-colors bg-white/80 dark:bg-space-900/80 shadow-sm"
                    title="Code kopieren"
                  >
                    <Copy className="h-4 w-4 text-gray-500 dark:text-gray-300" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadIcon(icon, e);
                    }}
                    className="p-2 hover:bg-blue-50 rounded-full transition-colors bg-white/80 dark:bg-space-900/80 shadow-sm"
                    title="Download SVG"
                  >
                    <Download className="h-4 w-4 text-gray-500 dark:text-gray-300" />
                  </button>
                </div>

                <div className={cn(
                  "relative transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
                  viewMode === 'grid' ? "mb-6" : ""
                )}>
                  <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <DynamicIcon
                    name={icon.name}
                    category={icon.category}
                    size={viewMode === 'grid' ? 64 : 48}
                    bgColor={customColors.bgColor}
                    borderColor={customColors.borderColor}
                    iconColor={customColors.iconColor}
                  />
                </div>

                <div className={cn("text-center", viewMode === 'list' && "text-left")}>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-1">{icon.name}</h3>
                  <span className="text-xs font-bold tracking-wider text-gray-400 dark:text-gray-500 uppercase block mb-2">{icon.category}</span>

                  {/* Tag Chips */}
                  <div className="flex flex-wrap gap-1 justify-center">
                    {icon.tags.slice(0, 3).map((tag, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add tag if not already selected
                          if (!selectedTags.includes(tag)) {
                            setSelectedTags(prev => [...prev, tag]);
                            setCurrentPage(1);
                          }
                        }}
                        className="px-2 py-0.5 text-[10px] font-medium bg-blue-50 dark:bg-space-light/20 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-100 dark:hover:bg-space-light/30 transition-colors"
                        title={`Suche nach "${tag}"`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 py-8">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="dark:bg-space-900 dark:border-space-800 dark:text-gray-100"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Zurück
          </Button>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Seite {currentPage} von {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="dark:bg-space-900 dark:border-space-800 dark:text-gray-100"
          >
            Weiter
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}

      {/* Viewer Modal */}
      <IconViewerModal
        isOpen={viewerState.isOpen}
        onClose={closeViewer}
        iconName={viewerState.iconName}
        category={viewerState.category}
        onApplyPalette={handleApplyPalette}
      />
    </div>
  );
}