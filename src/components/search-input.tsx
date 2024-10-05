import React from 'react';
import type { AutocompleteProps } from './autocomplete';
import { AutoComplete } from './autocomplete';
import { Icon } from '@iconify/react/dist/iconify.js';

export function SearchInput<T extends string>({
  ...props
}: AutocompleteProps<T>) {
  return (
    <div className="flex w-full items-center rounded-full border px-6">
      <Icon icon="tabler:search" className="h-8 w-8" />
      <AutoComplete {...props} />
      <Icon icon="mynaui:download" className="h-8 w-8" />
    </div>
  );
}

export default SearchInput;
