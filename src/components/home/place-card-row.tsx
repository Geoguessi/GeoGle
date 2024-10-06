'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { PlaceCardSkeleton } from './place-card';
import type { PropsWithChildren } from 'react';

export const PlaceCardRowSkeleton = () => {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full px-5"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3">
            <PlaceCardSkeleton />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

// --------------------------------------------------

export const PlaceCardRow = ({ children }: PropsWithChildren) => {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full px-5"
    >
      <CarouselContent>
        {/* {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3">
              <PlaceCardSkeleton />
            </CarouselItem>
          ))} */}
        {children}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
