'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import PlaceCard, { PlaceCardSkeleton } from '@/components/home/place-card';
import useGetPlacesDashboard from '@/react-query/hooks/use-get-places-dashboard';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useMemo } from 'react';

export default function Page() {
  const searchParams = useSearchParams();
  const province = searchParams?.get('province');

  // TODO: change to get all or something
  const { data: dashboard, isLoading } = useGetPlacesDashboard({
    provinceName: province ?? '',
  });
  const places = useMemo(
    () => [
      ...(dashboard?.recommendation ?? []),
      ...(dashboard?.foodie ?? []),
      ...(dashboard?.attraction ?? []),
    ],
    [dashboard],
  );

  const router = useRouter();

  return (
    <div className="flex w-screen flex-col items-center justify-center px-6 py-12">
      <div className="flex w-full flex-col gap-2">
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={router.back}
        >
          <Icon icon="ep:arrow-left-bold" />
          <p>Back to home</p>
        </div>

        <p className="my-4 text-5xl">{province}</p>

        <p className="mt-4 text-2xl">ค้นพบ {places.length} สถานที่</p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 9 }).map((_, index) => (
                <PlaceCardSkeleton key={index} /> // Render skeletons when loading
              ))
            : places?.map((place) => (
                <PlaceCard
                  key={place.title}
                  title={place.title}
                  image={place.image}
                  link={place.link}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
