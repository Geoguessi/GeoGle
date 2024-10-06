'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createImageLoader } from '@/util';
import useGetPlaceByName from '@/react-query/hooks/use-get-place';

type PlaceCardProps = {
  title: string;
  image: string;
  link: string;
  isAttraction?: boolean;
};

// make a PlaceCard Skeleton
const PlaceCard: React.FC<PlaceCardProps> = ({
  title,
  image,
  link,
  isAttraction = false,
}) => {
  const router = useRouter();

  const handleClick = () => {
    const result = link.replace(
      /^https:\/\/www\.tripniceday\.com\/place\//,
      '',
    );

    // TODO: this is weird
    if (isAttraction) {
      router.push(`/place/${title}`);
    } else {
      router.push(`/place/${result}`);
    }
  };

  const decodeHtml = (html: string) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <div
      className="min-h-[300px] cursor-pointer rounded-2xl border shadow-md"
      onClick={handleClick}
    >
      <div className="relative h-48 w-full">
        <Image
          src="/assets/place-template.png"
          loader={createImageLoader(image, 'place-holder.png')}
          alt={title}
          fill
          className="h-48 w-full rounded-md object-cover"
        />
      </div>

      <div className="flex flex-col p-4">
        <h2 className="mb-4 text-xl font-bold">{decodeHtml(title)}</h2>
        {/* How to make this link on click not effect the handleClick? */}
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="top-20 text-blue-500 hover:underline"
          onClick={(e) => {
            e.stopPropagation();
          }} // Prevent click propagation
        >
          Visit
        </Link>
      </div>
    </div>
  );
};

export default PlaceCard;

// --------------------------------------------------

type PlaceCardLinkProps = {
  link: string;
};

export const PlaceCardLink = ({ link }: PlaceCardLinkProps) => {
  // remove place from "/place/%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%9B%E0%B8%A3%E0%B8%B2%E0%B8%87%E0%B8%84%E0%B9%8C"
  const placeName = link.replace(/^\/place\//, '');
  const { data: place, isLoading } = useGetPlaceByName({
    placeName: decodeURI(placeName),
  });

  if (isLoading || !place) return <PlaceCardSkeleton />;

  // TODO: How would you know if it's an attraction?
  return <PlaceCard title={place.name} image={place.image} link={place.link} />;
};

// --------------------------------------------------

export const PlaceCardSkeleton = () => {
  return (
    <div className="min-h-[300px] animate-pulse cursor-pointer rounded-2xl border shadow-md">
      <div className="relative h-48 w-full rounded-md bg-gray-300" />
      <div className="flex flex-col p-4">
        <div className="mb-2 h-6 w-3/4 rounded-md bg-gray-300" />
        <div className="h-4 w-1/3 rounded-md bg-gray-300" />
      </div>
    </div>
  );
};
