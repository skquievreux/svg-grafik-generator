import { IconViewerModal } from './icon-viewer-modal';

// ... (in IconGallery function)

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

// Load persisted theme
useEffect(() => {
  const savedTheme = sessionStorage.getItem('svg-icon-theme');
  if (savedTheme) {
    try {
      setCustomColors(JSON.parse(savedTheme));
    } catch (e) {
      console.error("Failed to load theme", e);
    }
  }
}, []);

const handleApplyPalette = (colors: { background: string; border: string; icon: string }) => {
  const newColors = {
    bgColor: colors.background,
    borderColor: colors.border,
    iconColor: colors.icon
  };
  setCustomColors(newColors);
  sessionStorage.setItem('svg-icon-theme', JSON.stringify(newColors));
};

const openViewer = (icon: Icon) => {
  setViewerState({
    isOpen: true,
    iconName: icon.name,
    category: icon.category
  });
};

// ... inside rendering logic (replace grid item onClick)

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
      'card-3d group bg-white rounded-2xl border border-gray-100 relative overflow-hidden transition-all duration-300 cursor-pointer', // Added cursor-pointer
      viewMode === 'grid' && 'p-8 flex flex-col items-center hover:border-blue-200',
      viewMode === 'list' && 'flex items-center gap-6 p-4 hover:border-blue-200'
    )}
    onClick={() => openViewer(icon)} // Changed click handler
  >
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

      {/* Actions - Prevent propagation to not trigger viewer when action clicked */}
      <div className={cn(
        "flex gap-2 transition-all duration-300",
        viewMode === 'grid' ? "justify-center opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0" : "opacity-100"
      )} onClick={(e) => e.stopPropagation()}>
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
      </div >

  {/* Pagination */ }
{
  totalPages > 1 && (
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
  )
}

{/* Modal */ }
<IconViewerModal
  isOpen={viewerState.isOpen}
  onClose={() => setViewerState(prev => ({ ...prev, isOpen: false }))}
  iconName={viewerState.iconName}
  category={viewerState.category}
  onApplyPalette={handleApplyPalette}
/>
    </div >
  );
}