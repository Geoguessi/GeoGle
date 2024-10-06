import { cn } from '@/lib/utils';
import Image from 'next/image';

type Props = {
  className: string;
};

const NotFound = ({ className }: Props) => {
  return (
    <div
      className={cn(
        'flex h-full w-full flex-col items-center justify-center',
        className,
      )}
    >
      <Image
        src="/assets/not-found.png"
        alt="not found"
        width={250}
        height={250}
      />
      <p className="mt-16 text-3xl font-bold">ไม่พบผลการค้นหา...</p>
    </div>
  );
};

export default NotFound;
