'use client';

import useGetPlaceByName from '@/app/react-query/hooks/use-get-place';
import { createImageLoader } from '@/app/util';
import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import Link from 'next/link';

type Params = {
  params: { name: string };
};

const Page = ({ params }: Params) => {
  const { data: place } = useGetPlaceByName({
    placeName: decodeURI(params.name),
  });

  return (
    <div className="flex w-screen flex-col items-center justify-center px-6 py-12">
      <div className="flex w-full flex-col gap-2 lg:w-4/5">
        <Link href="/" className="flex items-center gap-2">
          <Icon icon="ep:arrow-left-bold" />
          <p>Back to home</p>
        </Link>

        <div className="relative aspect-[16/9] w-full bg-gray-300">
          <Image
            src="/assets/place-template.png"
            loader={createImageLoader(place?.image, 'place-holder.png')}
            alt="place"
            fill
          />
        </div>

        <p className="mt-4 text-2xl font-bold sm:mb-2 sm:text-4xl">
          {place?.name}
        </p>

        <div className="mb-2 flex items-center gap-2 text-gray-500 sm:mb-4">
          <Icon icon="pajamas:location" className="text-xl sm:text-2xl" />
          <p className="text-lg sm:text-xl">{place?.address}</p>
        </div>

        <p className="text-gray-500">{place?.description}</p>
      </div>
    </div>
  );
};

export default Page;
