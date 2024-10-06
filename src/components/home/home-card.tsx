'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import PlaceCard from '@/components/home/place-card';
import useGetPlacesDashboard from '@/react-query/hooks/use-get-places-dashboard';
import { cn } from '@/lib/utils';
import { PlaceCardRow, PlaceCardRowSkeleton } from './place-card-row';
import { CarouselItem } from '../ui/carousel';
import Image from 'next/image';

type Props = {
  open: boolean;
};

export default function HomeCard({ open }: Props) {
  const searchParams = useSearchParams();
  const province = searchParams?.get('province');

  const { data: dashboard, isLoading } = useGetPlacesDashboard({
    provinceName: province ?? '',
  });

  const router = useRouter();

  return (
    <div
      className={cn(
        'absolute bottom-0 flex h-[1500px] max-h-[1500px] w-screen flex-col rounded-t-3xl bg-white transition-transform duration-1000',
        open ? 'translate-y-[1000px]' : 'translate-y-full',
      )}
    >
      <div className="flex h-full flex-grow flex-col gap-4 px-8 pt-20">
        {/* Recommendation Section */}
        <p className="text-2xl">สถานที่แนะนำของจังหวัด {province}</p>
        {isLoading ? (
          <PlaceCardRowSkeleton />
        ) : (
          <PlaceCardRow>
            {dashboard?.recommendation?.map((place) => (
              <CarouselItem
                key={place.title}
                className="sm:basis-1/2 md:basis-1/3"
              >
                <PlaceCard
                  key={place.title}
                  title={place.title}
                  image={place.image}
                  link={place.link}
                />
              </CarouselItem>
            ))}
          </PlaceCardRow>
        )}

        {/* Foodie Section */}
        <p className="mt-8 text-2xl">ร้านอาหารและคาเฟ่ในจังหวัด {province}</p>
        {isLoading ? (
          <PlaceCardRowSkeleton />
        ) : (
          <PlaceCardRow>
            {dashboard?.foodie?.map((place) => (
              <CarouselItem
                key={place.title}
                className="sm:basis-1/2 md:basis-1/3"
              >
                <PlaceCard
                  key={place.title}
                  title={place.title}
                  image={place.image}
                  link={place.link}
                />
              </CarouselItem>
            ))}
          </PlaceCardRow>
        )}

        {/* Attraction Section */}
        <p className="mt-8 text-2xl">ที่เที่ยวของจังหวัด {province}</p>
        {isLoading ? (
          <PlaceCardRowSkeleton />
        ) : (
          <PlaceCardRow>
            {dashboard?.attraction?.map((place) => (
              <CarouselItem
                key={place.title}
                className="sm:basis-1/2 md:basis-1/3"
              >
                <PlaceCard
                  key={place.title}
                  title={place.title}
                  image={place.image}
                  link={place.link}
                />
              </CarouselItem>
            ))}
          </PlaceCardRow>
        )}

        <button
          className="mr-6 mt-2 w-fit self-end rounded-full bg-blue-500 px-4 py-2 text-white"
          onClick={() => router.push(`/explore?province=${province}`)}
        >
          ดูเพิ่มเติม
        </button>
      </div>

      {/* Footer */}
      <div className="flex h-32 items-center justify-center bg-blue-500">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white p-2 sm:h-16 sm:w-16 sm:p-0">
            {/* make Image responsive */}
            <Image src="/assets/logo.svg" alt="logo" width={48} height={48} />
          </div>

          <div className="flex flex-col text-white">
            <p className="text-base sm:text-xl">2024 - 2024 | GeoGle.co.ltd</p>
            <p className="text-base sm:text-xl">
              For Theory of Computation only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
