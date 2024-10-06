import SearchBar from '@/components/explore/search-bar';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-screen items-center justify-center px-6 py-24">
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
      <div className="relative z-10 flex w-3/5 flex-col items-center gap-12 transition-transform duration-1000">
        <p className="text-8xl text-white">GeoGle</p>
        <SearchBar province="" />
      </div>
    </div>
  );
}
