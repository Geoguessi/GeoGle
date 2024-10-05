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

  return response.data;
};

export const getProvinces = async () => {
  const response = await axios.get<string[]>(endpoints.provinces.list);

  return response.data;
};
