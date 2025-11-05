'use client';

export function GalleryLoading() {
  return (
    <div className="flex items-center justify-center py-20" role="status" aria-live="polite">
      <div className="text-center">
        <div className="relative mb-6">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
          <div className="absolute inset-0 rounded-full border-4 border-purple-200 border-t-purple-600 mx-auto animate-spin animation-delay-300"></div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Icons werden geladen</h3>
        <p className="text-gray-600">Bitte warten Sie einen Moment...</p>
      </div>
    </div>
  );
}
