import axios from 'axios';

import { HOST_API } from '@/global-config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || 'Something went wrong',
    ),
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const endpoints = {
  place: (placeName: string) => `/place/${placeName}`,
  provinces: {
    list: '/provinces',
    dashboard: (provinceName: string) => `/province/${provinceName}`,
    csv: '/provinces/csv',
    places: (province: string) => `/province/${province}/places`,
  },
};
