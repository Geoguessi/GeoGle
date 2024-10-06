'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { PlaceCardLink, PlaceCardSkeleton } from '@/components/home/place-card';
import { Icon } from '@iconify/react/dist/iconify.js';
import useGetProvincePlaces from '@/react-query/hooks/use-get-province-places';
import { LoadingSpinner } from '@/components/spinner';

export default function Page() {
  const searchParams = useSearchParams();
  const province = searchParams?.get('province');

  // TODO: change to get all or something
  const { data: hrefList, isLoading } = useGetProvincePlaces({
    provinceName: province ?? '',
  });

  const router = useRouter();

  return (
    <div className="mx-auto flex h-screen flex-col items-center justify-center px-6 py-12 xl:max-w-screen-xl">
      <div className="flex h-full w-full flex-col gap-2">
        {/* header */}
        <div className="flex flex-col bg-white pb-4">
          {/* back button */}
          <div
            className="flex w-fit cursor-pointer items-center gap-2"
            onClick={router.back}
          >
            <Icon icon="ep:arrow-left-bold" />
            <p>Back to home</p>
          </div>

          {/* province title */}
          <p className="my-4 text-4xl md:text-5xl">{province}</p>

          {/* number of places found */}
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <p className="text-lg md:mt-4 md:text-2xl">
              ค้นพบ {hrefList?.href_res.length} สถานที่
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 overflow-y-auto sm:grid-cols-2 md:grid-cols-3">
          {isLoading
            ? Array.from({ length: 9 }).map((_, index) => (
                <PlaceCardSkeleton key={index} /> // Render skeletons when loading
              ))
            : hrefList?.href_res.map((link, index) => (
                <PlaceCardLink key={index} link={link} />
              ))}
        </div>
      </div>
    </div>
  );
}
