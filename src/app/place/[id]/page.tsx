import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';

type Params = {
  params: { id: string };
};

const page = ({ params }: Params) => {
  return (
    <div className="flex w-screen flex-col items-center justify-center px-6 py-12">
      <div className="flex w-full flex-col gap-2 lg:w-4/5">
        <div className="flex items-center gap-2">
          <Icon icon="ep:arrow-left-bold" />
          <p>Back to home</p>
        </div>

        <div className="relative aspect-[16/9] w-full">
          <Image src="/assets/place-template.png" alt="place" fill />
        </div>

        <p className="mt-4 text-2xl font-bold sm:mb-2 sm:text-4xl">
          Name of the place
        </p>

        <div className="mb-2 flex items-center gap-2 text-gray-500 sm:mb-4">
          <Icon icon="pajamas:location" className="text-xl sm:text-2xl" />
          <p className="text-lg sm:text-xl">Pikat Location</p>
        </div>

        <p className="text-gray-500">
          This is the description for the text description It is a long
          established fact that a reader will be distracted by the readable
          content of a page when looking at its layout. The point of using Lorem
          Ipsum is thatit has a more-or-less normal distribution of letters, as
          opposed to using &apos;Content here, content here&apos;, making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for &apos;lorem ipsum&apos; will uncover many web sites still
          in their infancy. Various versions have evolved over the years,
          sometimes by accident, sometimes on purpose (injected humour and the
          like).
        </p>
      </div>
    </div>
  );
};

export default page;
