'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createImageLoader } from '@/util';

type PlaceCardProps = {
  title: string;
  image: string;
  link: string;
};

// make a PlaceCard Skeleton
const PlaceCard: React.FC<PlaceCardProps> = ({ title, image, link }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/place/${title}`);
  };

  return (
    <div
      className="cursor-pointer rounded-2xl border shadow-md"
      onClick={handleClick}
    >
      <div className="relative h-40 w-full">
        <Image
          src="/assets/place-template.png"
          loader={createImageLoader(image, 'place-holder.png')}
          alt={title}
          fill
          className="h-40 w-full rounded-md object-cover"
        />
      </div>

      <div className="flex flex-col p-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="top-20 text-blue-500 hover:underline"
        >
          Visit
        </Link>
      </div>
    </div>
  );
};

export default PlaceCard;

// --------------------------------------------------

export const PlaceCardSkeleton = () => {
  return (
    <div className="animate-pulse cursor-pointer rounded-2xl border shadow-md">
      <div className="relative h-40 w-full rounded-md bg-gray-300" />
      <div className="flex flex-col p-4">
        <div className="mb-2 h-6 w-3/4 rounded-md bg-gray-300" />
        <div className="h-4 w-1/3 rounded-md bg-gray-300" />
      </div>
    </div>
  );
};
