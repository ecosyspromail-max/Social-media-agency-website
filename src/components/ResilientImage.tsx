import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  fallbackMonogram?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackLabel = 'Zeed.MGTS Studio',
  fallbackMonogram,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#0F1433] via-[#151B42] to-[#07091B] border border-white/10 text-[#F8F9FA]/70 p-4 text-center ${className}`}
      >
        {fallbackMonogram ? (
          <span className="font-display text-lg font-bold tracking-tight text-[#00E5C7]">
            {fallbackMonogram}
          </span>
        ) : (
          <ImageOff className="w-6 h-6 text-[#00E5C7]/80 mb-2" aria-hidden="true" />
        )}
        <span className="text-xs font-medium text-[#F8F9FA]/60 mt-1">{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
