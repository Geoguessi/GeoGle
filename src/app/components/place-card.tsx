'use client';

import { useRouter } from 'next/navigation';

type PlaceCardProps = {
  title: string;
  image: string;
  link: string;
};

const PlaceCard: React.FC<PlaceCardProps> = ({ title, image, link }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/place/${title}`);
  };

  return (
    <div
      className="cursor-pointer rounded-lg border p-4 shadow-md"
      onClick={handleClick}
    >
      <img
        src={image}
        alt={title}
        className="mb-4 h-40 w-full rounded-md object-cover"
      />
      <h2 className="text-xl font-bold">{title}</h2>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        Visit
      </a>
    </div>
  );
};

export default PlaceCard;
