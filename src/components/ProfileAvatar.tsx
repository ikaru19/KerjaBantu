"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface ProfileAvatarProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

const ProfileAvatar = ({ src, alt, size = 40, className = "" }: ProfileAvatarProps) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // If the src changes, reset error state
  useEffect(() => {
    setImageSrc(src);
    setHasError(false);
  }, [src]);

  // Handle image load error
  const handleError = () => {
    if (!hasError) {
      // Generate a random fallback from randomuser.me
      const gender = Math.random() > 0.5 ? 'men' : 'women';
      const randomId = Math.floor(Math.random() * 99) + 1;
      const fallbackSrc = `https://randomuser.me/api/portraits/${gender}/${randomId}.jpg`;
      
      setImageSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return (
    <div 
      className={`relative rounded-full overflow-hidden ${className}`} 
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes={`${size}px`}
        className="object-cover"
        onError={handleError}
        priority={size > 60} // Prioritize larger avatars
      />
    </div>
  );
};

export default ProfileAvatar; 