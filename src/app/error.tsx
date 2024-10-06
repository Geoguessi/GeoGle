'use client';

import Link from 'next/link';
import Image from 'next/image';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({}: Props) {
  return (
    <div className="relative flex min-h-screen items-center justify-center p-5">
      <div className="mask-effect bg-linear-purple-gray before:bg-linear-gray mx-auto flex w-full flex-col-reverse items-center justify-center gap-8 rounded-[30px] p-6 backdrop-blur-[70.5px] before:absolute before:inset-0 before:z-0 before:rounded-3xl before:p-[2px] before:content-[''] sm:p-12 md:flex-row md:items-center md:justify-between md:p-16 lg:max-w-screen-md lg:text-nowrap">
        <div className="relative z-10 basis-1/2 font-bold">
          <h4 className="text-3xl leading-normal md:hidden">
            Something went wrong!
          </h4>
          <h4 className="hidden md:block md:text-4xl md:leading-relaxed lg:text-5xl lg:leading-[72px]">
            Something
            <br />
            went wrong!
          </h4>

          <p className="my-5 text-lg md:text-xl lg:text-2xl">
            Please try again.
          </p>
          <Link href="/">กลับหน้าหลัก</Link>
        </div>
        <div className="">
          <Image
            src="/assets/error.svg"
            alt="error illustrations"
            width="400"
            height="400"
          />
        </div>
      </div>
    </div>
  );
}
