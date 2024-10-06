'use client';

import useGetPlacesCSV from '@/react-query/hooks/use-get-places-csv';
import useGetProvinces from '@/react-query/hooks/use-get-provinces';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useMemo, useCallback } from 'react';
import SearchInput from '../search-input';

type Props = {
  province: string;
};

type CSVDownloadState = 'fresh' | 'fetching' | 'stale';

export default function SearchBar({ province }: Props) {
  const router = useRouter();

  // search is user's input, selected is the confirmed selected province
  const [searchProvinceName, setSearchProvinceName] = useState<string>('');
  const [selectedProvinceName, setSelectedProvinceName] = useState<string>('');

  // set input to province in search params
  useEffect(() => {
    setSelectedProvinceName(province ?? '');
    setSearchProvinceName(province ?? '');
  }, [province]);

  // all available province
  const { data: provinces, isLoading } = useGetProvinces();
  const allProvinces = useMemo(
    () =>
      provinces
        ?.filter((province) =>
          province.toLowerCase().includes(searchProvinceName.toLowerCase()),
        ) // filter for province that has the input
        .map((province) => {
          return { value: province, label: province };
        }), // format each value for autocomplete
    [provinces, searchProvinceName],
  );

  // csv downloading
  const [csvDownloadStatus, setCSVDownloadStatus] =
    useState<CSVDownloadState>('fresh');
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
    router.push(`/explore?province=${selectedProvinceName}`);
  };

  return (
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
  );
}
