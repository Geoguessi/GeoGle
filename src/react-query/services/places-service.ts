import { thaiEnglishProvinceMapping } from '@/constants/thai-province';
import { axios } from '@/util';
import { endpoints } from '@/util/axios';
import { isAllEnglishAlphabet } from '@/util/helper';

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

  console.log(provinceName);

  const translatedProvince = isAllEnglishAlphabet(provinceName)
    ? provinceName
    : thaiEnglishProvinceMapping[
        provinceName as keyof typeof thaiEnglishProvinceMapping
      ];

  const response = await axios.get<PlacesDashboard>(
    endpoints.provinces.dashboard(translatedProvince),
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

export const getPlacesCSV = async () => {
  const response = await axios.get<Blob>(endpoints.provinces.csv, {
    responseType: 'blob',
  });

  return response.data;
};

export const getProvincePlaces = async ({ queryKey }: Params) => {
  const [_, provinceName] = queryKey;
  if (provinceName === '') return null;

  const translatedProvince = isAllEnglishAlphabet(provinceName)
    ? provinceName
    : thaiEnglishProvinceMapping[
        provinceName as keyof typeof thaiEnglishProvinceMapping
      ];

  const response = await axios.get<PlaceLinks>(
    endpoints.provinces.places(translatedProvince),
  );

  return response.data;
};
