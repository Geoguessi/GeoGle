'use client';

import HomeCard from '@/components/home/home-card';
import SearchBar from '@/components/home/search-bar';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();
  const province = searchParams?.get('province');

  return (
    <div
      className={cn(
        'relative flex min-h-screen w-screen items-center justify-center px-6 py-24',
        !province && 'overflow-hidden',
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
          'relative z-10 flex w-full flex-col items-center gap-12 px-5 transition-transform duration-1000 md:w-4/5 lg:w-3/5',
          province ? '-translate-y-[250px]' : 'translate-y-0',
        )}
      >
        <p className="text-6xl text-white sm:text-8xl">GeoGle</p>
        <SearchBar province={province ?? ''} />
      </div>

      <HomeCard open={!!province} />
    </div>
  );
}
