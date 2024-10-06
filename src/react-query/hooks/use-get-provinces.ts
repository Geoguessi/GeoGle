import { useQuery } from '@tanstack/react-query';

import { CONSTANTS } from '../constants';
import { getProvinces } from '../services/places-service';

const useGetProvinces = () =>
  useQuery({
    queryKey: [CONSTANTS.PROVINCES],
    queryFn: getProvinces,
  });

export default useGetProvinces;
