'use client';

import SearchBar from '@/components/explore/search-bar';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [isCardVisible, setIsCardVisible] = useState(false);

  const handleButtonClick = () => {
    setIsCardVisible(!isCardVisible); // Toggle card visibility
  };

  return (
    <div
      className={cn(
        'relative flex min-h-screen w-screen items-center justify-center px-6 py-24',
        !isCardVisible && 'overflow-hidden',
      )}
    >
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/assets/landing-thumbnail.png" // Ensure the correct path for the image
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={75}
          className="absolute inset-0"
        />
        {/* Blue overlay */}
        <div className="absolute inset-0 bg-blue-500 opacity-60" />
      </div>

      {/* Search bar */}
      <div
        className={cn(
          'relative z-10 flex w-3/5 flex-col items-center gap-12 transition-transform duration-1000',
          isCardVisible ? '-translate-y-[100px]' : 'translate-y-0',
        )}
      >
        <p className="text-8xl text-white">GeoGle</p>
        <SearchBar province="" />
        <button
          onClick={handleButtonClick}
          className="rounded-md bg-white px-4 py-2 text-blue-500"
        >
          Test
        </button>
      </div>

      {/* Sliding Card */}
      {/* The card starts off-screen with translate-y-full and slides up when visible */}
      <div
        className={cn(
          'absolute bottom-0 h-[800px] w-full rounded-3xl bg-white transition-transform duration-1000',
          isCardVisible ? 'translate-y-[600px]' : 'translate-y-full',
        )}
      >
        <p className="p-6">Test content inside the card</p>
      </div>
    </div>
  );
}
