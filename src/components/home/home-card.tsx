'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import PlaceCard from '@/components/home/place-card';
import useGetPlacesDashboard from '@/react-query/hooks/use-get-places-dashboard';
import { cn } from '@/lib/utils';
import { PlaceCardRow, PlaceCardRowSkeleton } from './place-card-row';
import { CarouselItem } from '../ui/carousel';
import Link from 'next/link';

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
      <div className="mx-auto flex h-full w-full flex-grow flex-col gap-4 px-8 pt-20 xl:max-w-screen-2xl">
        {/* Recommendation Section */}
        <p className="text-2xl font-bold">สถานที่แนะนำของจังหวัด {province}</p>
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
        <p className="mt-8 text-2xl font-bold">
          ร้านอาหารและคาเฟ่ในจังหวัด {province}
        </p>
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
        <p className="mt-8 text-2xl font-bold">
          ที่เที่ยวของจังหวัด {province}
        </p>
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
                  isAttraction
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
      <div className="flex h-16 items-center justify-center bg-blue-500 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <p className="text-lg">
            Source code available at{' '}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/orgs/Geoguessi/repositories"
              className="font-semibold text-white underline transition duration-300 hover:text-blue-300"
            >
              Github
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
