'use client';

import { useSearchParams } from 'next/navigation';
import PlaceCard, { PlaceCardSkeleton } from '@/components/home/place-card';
import useGetPlacesDashboard from '@/react-query/hooks/use-get-places-dashboard';
import { cn } from '@/lib/utils';
import useWidth from '@/hooks/use-width';

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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {isLoading
            ? Array.from({ length: cardsToShow }).map((_, index) => (
                <PlaceCardSkeleton key={index} /> // Render skeletons when loading
              ))
            : dashboard?.recommendation
                ?.slice(0, cardsToShow)
                .map((place) => (
                  <PlaceCard
                    key={place.title}
                    title={place.title}
                    image={place.image}
                    link={place.link}
                  />
                ))}
        </div>

        {/* Foodie Section */}
        <p className="mt-8 text-2xl">ร้านอาหารและคาเฟ่ในจังหวัด {province}</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {isLoading
            ? Array.from({ length: cardsToShow }).map((_, index) => (
                <PlaceCardSkeleton key={index} /> // Render skeletons when loading
              ))
            : dashboard?.foodie
                ?.slice(0, cardsToShow)
                .map((place) => (
                  <PlaceCard
                    key={place.title}
                    title={place.title}
                    image={place.image}
                    link={place.link}
                  />
                ))}
        </div>

        {/* Attraction Section */}
        <p className="mt-8 text-2xl">ที่เที่ยวของจังหวัด {province}</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {isLoading
            ? Array.from({ length: cardsToShow }).map((_, index) => (
                <PlaceCardSkeleton key={index} /> // Render skeletons when loading
              ))
            : dashboard?.attraction
                ?.slice(0, cardsToShow)
                .map((place) => (
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
