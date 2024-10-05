'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useGetPlacesDashboard from './react-query/hooks/use-get-places-dashboard';
import useGetProvinces from './react-query/hooks/use-get-provinces';
import PlaceCard from './components/place-card';
import SearchInput from '@/components/search-input';
import useGetPlacesCSV from './react-query/hooks/use-get-places-csv';

export default function Home() {
  const searchParams = useSearchParams();
  const province = searchParams.get('province');
  const router = useRouter();

  const [searchProvinceName, setSearchProvinceName] = useState<string>('');
  const [selectedProvinceName, setSelectedProvinceName] = useState('');

  useEffect(() => {
    setSelectedProvinceName(province ?? '');
    setSearchProvinceName(province ?? '');
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

  const [csvDownloadStatus, setCSVDownloadStatus] = useState<
    'fresh' | 'fetching' | 'stale'
  >('fresh');
  const { data: csv, isLoading: fetchCSVLoading } = useGetPlacesCSV(
    csvDownloadStatus !== 'fresh',
  );

  const downloadCSV = useCallback(() => {
    if (!csv) return;

    const href = URL.createObjectURL(csv);

    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', 'province_data.csv');
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }, [csv]);

  // automatically download the csv when the fetching is finished
  // only happen when the csv needed to be fetched for the first time user click the download icon
  useEffect(() => {
    if (csv && csvDownloadStatus === 'fetching') {
      downloadCSV();
      setCSVDownloadStatus('stale');
    }
  }, [csv, csvDownloadStatus]);

  const handleDownload = () => {
    if (csvDownloadStatus !== 'fresh') {
      downloadCSV();
      return;
    }
    setCSVDownloadStatus('fetching'); // This triggers fetching the CSV and the useEffect
  };

  const handleSubmit = () => {
    router.push(`/?province=${selectedProvinceName}`);
  };

  return (
    <div className="w-screen px-6 py-24">
      <div className="flex flex-col gap-4">
        <SearchInput
          onSearch={handleSubmit}
          onDownload={handleDownload}
          isDownloadLoading={fetchCSVLoading}
          selectedValue={selectedProvinceName}
          onSelectedValueChange={setSelectedProvinceName}
          searchValue={searchProvinceName}
          onSearchValueChange={setSearchProvinceName}
          items={allProvinces ?? []}
          isLoading={isLoading}
          emptyMessage="Province not found."
        />

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
