import React, { useState, useEffect, useRef } from 'react';

interface SmoothImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  skeletonClassName?: string;
  containerClassName?: string;
}

export const SmoothImage: React.FC<SmoothImageProps> = ({
  src,
  alt = '',
  className = '',
  containerClassName = '',
  skeletonClassName = '',
  onError,
  width,
  height,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, [src]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${containerClassName}`}>
      {/* Subtle Skeleton Loader Placeholder */}
      {!isLoaded && !hasError && (
        <div
          className={`absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-200/70 to-slate-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-pulse ${skeletonClassName}`}
          aria-hidden="true"
        />
      )}

      {/* Actual Image with Fade-In Transition */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="eager"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={(e) => {
          setHasError(true);
          setIsLoaded(true);
          if (onError) onError(e);
        }}
        className={`${className} transition-opacity duration-300 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};
