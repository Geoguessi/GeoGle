'use client';

import NotFound from '@/components/not-found';
import useGetPlaceByName from '@/react-query/hooks/use-get-place';
import { createImageLoader } from '@/util';
import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Params = {
  params: { name: string };
};

const Page = ({ params }: Params) => {
  const {
    data: place,
    isLoading,
    error,
  } = useGetPlaceByName({
    placeName: decodeURI(params.name),
  });

  const router = useRouter();

  if (isLoading) return <PlaceSkeleton />;

  const result = error as unknown as { detail: string };
  if (error && result.detail.includes('404')) return <PlaceNotFound />;

  return (
    <div className="mx-auto flex flex-col items-center justify-center px-6 py-12 xl:max-w-screen-xl">
      <div className="flex w-full flex-col gap-2">
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={router.back}
        >
          <Icon icon="ep:arrow-left-bold" />
          <p>Back to home</p>
        </div>

        <div className="relative mt-4 aspect-[16/9] w-full bg-gray-300">
          <Image
            src="/assets/place-template.png"
            loader={createImageLoader(place?.image, 'place-holder.png')}
            alt="place"
            fill
          />
        </div>

        <p className="mt-4 text-2xl font-bold sm:mb-2 sm:text-4xl">
          {place?.name}
        </p>

        {place?.address && (
          <div className="mb-2 flex items-center gap-2 text-gray-500 sm:mb-4">
            <Icon icon="pajamas:location" className="text-xl sm:text-2xl" />
            <p className="text-lg sm:text-xl">{place?.address}</p>
          </div>
        )}

        <p className="text-gray-500">{place?.description}</p>
      </div>
    </div>
  );
};

export default Page;

// --------------------------------------------------

const PlaceSkeleton = () => {
  const router = useRouter();

  return (
    <div className="mx-auto flex flex-col items-center justify-center px-6 py-12 xl:max-w-screen-xl">
      <div className="flex w-full flex-col gap-2">
        {/* Back button skeleton */}
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={router.back}
        >
          <Icon icon="ep:arrow-left-bold" />
          <p>Back to home</p>
        </div>

        {/* Image placeholder */}
        <div className="relative mt-4 aspect-[16/9] w-full animate-pulse bg-gray-300" />

        {/* Title skeleton */}
        <div className="mt-4 h-8 w-3/4 animate-pulse rounded-md bg-gray-300 sm:mb-2 sm:h-10" />

        {/* Address skeleton */}
        <div className="mb-2 flex animate-pulse items-center gap-2 text-gray-500 sm:mb-4">
          <Icon icon="pajamas:location" className="text-xl sm:text-2xl" />
          <div className="h-4 w-1/2 rounded-md bg-gray-300" />
        </div>

        {/* Description skeleton */}
        <div className="h-24 w-full animate-pulse rounded-md bg-gray-300" />
      </div>
    </div>
  );
};

// --------------------------------------------------

const PlaceNotFound = () => {
  const router = useRouter();

  return (
    <div className="mx-auto flex min-h-screen flex-col items-center px-6 py-12 xl:max-w-screen-xl">
      <div className="flex h-full w-full flex-grow flex-col gap-2">
        <div className="flex items-center gap-2" onClick={router.back}>
          <Icon icon="ep:arrow-left-bold" />
          <p>Back to home</p>
        </div>
        <NotFound className="flex-grow" />
      </div>
    </div>
  );
};
