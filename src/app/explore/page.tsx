'use client';

import { useSearchParams } from 'next/navigation';
import PlaceCard from '@/components/explore/place-card';
import useGetPlacesDashboard from '@/react-query/hooks/use-get-places-dashboard';
import SearchBar from '@/components/explore/search-bar';

export default function Home() {
  const searchParams = useSearchParams();
  const province = searchParams.get('province');

  const { data: dashboard } = useGetPlacesDashboard({
    provinceName: province ?? '',
  });

  return (
    <div className="w-screen px-6 py-24">
      <div className="flex flex-col gap-4">
        <SearchBar province={province ?? ''} />

        {/* Recommendation Section */}
        <p className="text-2xl font-semibold">Recommendation</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {dashboard?.recommendation?.map((place) => (
            <PlaceCard
              key={place.title}
              title={place.title}
              image={place.image}
              link={place.link}
            />
          ))}
        </div>

        {/* Foodie Section */}
        <p className="mt-8 text-2xl font-semibold">Foodie</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {dashboard?.foodie?.map((place) => (
            <PlaceCard
              key={place.title}
              title={place.title}
              image={place.image}
              link={place.link}
            />
          ))}
        </div>

        {/* Attraction Section */}
        <p className="mt-8 text-2xl font-semibold">Attraction</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {dashboard?.attraction?.map((place) => (
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
