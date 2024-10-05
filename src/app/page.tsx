'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useGetPlacesDashboard from './react-query/hooks/use-get-places-dashboard';
import useGetProvinces from './react-query/hooks/use-get-provinces';

export default function Home() {
  const searchParams = useSearchParams();
  const province = searchParams.get('province');
  const router = useRouter();

  const [provinceName, setProvinceName] = useState('');

  useEffect(() => {
    setProvinceName(province ?? '');
  }, [province]);

  const { data: dashboard } = useGetPlacesDashboard({
    provinceName: province ?? '',
  });
  const { data: provinces } = useGetProvinces();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/?province=${provinceName}`);
  };

  return (
    <div className="w-screen px-6 py-24">
      <div className="flex flex-col gap-4">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <input
            placeholder="place"
            className="border px-4 py-4"
            value={provinceName ?? ''}
            onChange={(e) => setProvinceName(e.target.value)}
          />

          <button className="rounded bg-blue-400 p-4" type="submit">
            Search
          </button>
        </form>

        {/* Recommendation Section */}
        <p className="text-2xl font-semibold">Recommendation</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {dashboard?.recommendation?.map((place) => (
            <div key={place.link} className="rounded-lg border p-4 shadow-md">
              <img
                src={place.image}
                alt={place.title}
                className="mb-4 h-40 w-full rounded-md object-cover"
              />
              <h2 className="text-xl font-bold">{place.title}</h2>
              <a
                href={place.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Visit
              </a>
            </div>
          ))}
        </div>

        {/* Foodie Section */}
        <p className="mt-8 text-2xl font-semibold">Foodie</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {dashboard?.foodie?.map((place) => (
            <div key={place.link} className="rounded-lg border p-4 shadow-md">
              <img
                src={place.image}
                alt={place.title}
                className="mb-4 h-40 w-full rounded-md object-cover"
              />
              <h2 className="text-xl font-bold">{place.title}</h2>
              <a
                href={place.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Visit
              </a>
            </div>
          ))}
        </div>

        {/* Attraction Section */}
        <p className="mt-8 text-2xl font-semibold">Attraction</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {dashboard?.attraction?.map((place) => (
            <div key={place.link} className="rounded-lg border p-4 shadow-md">
              <img
                src={place.image}
                alt={place.title}
                className="mb-4 h-40 w-full rounded-md object-cover"
              />
              <h2 className="text-xl font-bold">{place.title}</h2>
              <a
                href={place.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Visit
              </a>
            </div>
          ))}
        </div>

        <p className="mt-8 text-2xl font-semibold">Provinces</p>
        <div>{provinces?.join(', ')}</div>
      </div>
    </div>
  );
}
