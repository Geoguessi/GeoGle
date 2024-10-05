import React from 'react';
import type { AutocompleteProps } from './autocomplete';
import { AutoComplete } from './autocomplete';
import { Icon } from '@iconify/react/dist/iconify.js';
import { cn } from '@/lib/utils';
import { LoadingSpinner } from './spinner';

type Props<T extends string> = AutocompleteProps<T> & {
  onSearch: () => void;
  // isSearchLoading?: boolean;
  onDownload: () => void;
  isDownloadLoading?: boolean;
};

export function SearchInput<T extends string>({
  onSearch,
  onDownload,
  isDownloadLoading = false, // Ensure default value for loading state
  ...props
}: Props<T>) {
  const handleDownload = () => {
    if (!isDownloadLoading) onDownload();
  };

  return (
    <div className="flex w-full items-center rounded-full border px-6">
      <Icon
        icon="tabler:search"
        className="h-8 w-8 cursor-pointer"
        onClick={onSearch}
      />
      <AutoComplete onEnterSelected={onSearch} {...props} />

      {/* Shrinking Icon and expanding spinner based on isDownloadLoading */}
      <div className="relative">
        <Icon
          icon="mynaui:download"
          className={cn(
            'cursor-pointer transition-all duration-300 ease-in-out',
            isDownloadLoading ? 'scale-0 opacity-0' : 'scale-100 opacity-100',
            'h-8 w-8',
          )}
          onClick={handleDownload}
        />

        {/* Wrapping the spinner with a div to manage its scaling separately */}
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out',
            isDownloadLoading ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
          )}
        >
          <LoadingSpinner className="animate-spin" />
        </div>
      </div>
    </div>
  );
}

export default SearchInput;
