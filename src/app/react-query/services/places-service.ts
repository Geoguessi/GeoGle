import { axios } from '@/app/util';
import { endpoints } from '@/app/util/axios';

type Params = {
  queryKey: string[];
};

export const getPlaceByName = async ({ queryKey }: Params) => {
  const [_, placeName] = queryKey;

  if (placeName === '') return null;

  const response = await axios.get<Place>(endpoints.place(placeName));

  return response.data;
};

export const getPlacesDashboard = async ({ queryKey }: Params) => {
  const [_, provinceName] = queryKey;
  if (provinceName === '') return null;

  const response = await axios.get<PlacesDashboard>(
    endpoints.provinces.dashboard(provinceName),
  );

  const sortPlacesByTitle = (places: PlaceTiny[]) =>
    places.sort((a, b) => a.title.localeCompare(b.title));

  const { recommendation, foodie, attraction } = response.data;

  const dashboard = {
    recommendation: sortPlacesByTitle(recommendation),
    foodie: sortPlacesByTitle(foodie),
    attraction: sortPlacesByTitle(attraction),
  };

  return dashboard;
};

export const getProvinces = async () => {
  const response = await axios.get<string[]>(endpoints.provinces.list);

  return response.data;
};
