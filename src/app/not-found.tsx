import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center p-5">
      <div className="mask-effect bg-linear-purple-gray before:bg-linear-gray mx-auto flex w-full flex-col-reverse items-center justify-between gap-8 rounded-[30px] p-6 backdrop-blur-[70.5px] before:absolute before:inset-0 before:z-0 before:rounded-3xl before:p-[2px] before:content-[''] sm:p-12 md:flex-row md:p-16 lg:max-w-screen-lg lg:text-nowrap">
        <div className="relative z-10 basis-1/2 font-bold">
          <h4 className="text-3xl leading-normal md:text-4xl md:leading-relaxed lg:text-5xl lg:leading-[72px]">
            Ooops...
            <br />
            Page not found
          </h4>
          <p className="my-5 text-lg md:text-xl lg:text-2xl">
            The page you are looking for does not exits.
          </p>
          <Link href="/">กลับหน้าหลัก</Link>
        </div>
        <div className="basis-1/2">
          <Image
            src="/assets/404.svg"
            alt="404 illustrations"
            width="400"
            height="400"
          />
        </div>
      </div>
    </div>
  );
}
