'use client';

import { useSearchParams } from 'next/navigation';
import PlaceCard from '@/components/home/place-card';
import useGetPlacesDashboard from '@/react-query/hooks/use-get-places-dashboard';
import { cn } from '@/lib/utils';
import useWidth from '@/hooks/use-width';
import { PlaceCardRow, PlaceCardRowSkeleton } from './place-card-row';
import { CarouselItem } from '../ui/carousel';

type Props = {
  open: boolean;
};

export default function HomeCard({ open }: Props) {
  const searchParams = useSearchParams();
  const province = searchParams?.get('province');

  const { data: dashboard, isLoading } = useGetPlacesDashboard({
    provinceName: province ?? '',
  });

  // Use the custom useWidth hook to get the current screen width
  const screenWidth = useWidth();

  // Determine how many cards to show based on screen width
  const cardsToShow =
    screenWidth < 768
      ? screenWidth < 640
        ? 1
        : 2 // Show 2 cards for medium screens
      : 3; // Show 3 cards for larger screens

  return (
    <div
      className={cn(
        'absolute bottom-0 h-[1300px] max-h-[1300px] w-screen rounded-3xl bg-white transition-transform duration-1000',
        open ? 'translate-y-[800px]' : 'translate-y-full',
      )}
    >
      <div className="flex flex-col gap-4 px-8 pt-20">
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
      </div>
    </div>
  );
}
