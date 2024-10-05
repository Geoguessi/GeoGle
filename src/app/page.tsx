'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useGetPlacesDashboard from './react-query/hooks/use-get-places-dashboard';
import useGetProvinces from './react-query/hooks/use-get-provinces';
import PlaceCard from './components/place-card';
import SearchInput from '@/components/search-input';

export default function Home() {
  const searchParams = useSearchParams();
  const province = searchParams.get('province');
  const router = useRouter();

  const [searchProvinceName, setSearchProvinceName] = useState<string>('');
  const [selectedProvinceName, setSelectedProvinceName] = useState('');

  useEffect(() => {
    setSelectedProvinceName(province ?? '');
  }, [province]);

  const { data: dashboard } = useGetPlacesDashboard({
    provinceName: province ?? '',
  });
  const { data: provinces, isLoading } = useGetProvinces();
  const allProvinces = useMemo(
    () =>
      provinces
        ?.filter((province) => province.includes(searchProvinceName)) // filter for province that has the input
        .map((province) => {
          return { value: province, label: province };
        }), // format each value for autocomplete
    [provinces, searchProvinceName],
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/?province=${selectedProvinceName}`);
  };

  return (
    <div className="w-screen px-6 py-24">
      <div className="flex flex-col gap-4">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <SearchInput
            selectedValue={selectedProvinceName}
            onSelectedValueChange={setSelectedProvinceName}
            searchValue={searchProvinceName}
            onSearchValueChange={setSearchProvinceName}
            items={allProvinces ?? []}
            isLoading={isLoading}
            emptyMessage="Province not found."
          />

          <button className="rounded bg-blue-400 p-4" type="submit">
            Search
          </button>
        </form>

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

        {/* Provinces Section */}
        <p className="mt-8 text-2xl font-semibold">Provinces</p>
        <div>{provinces?.join(', ')}</div>
      </div>
    </div>
  );
}
