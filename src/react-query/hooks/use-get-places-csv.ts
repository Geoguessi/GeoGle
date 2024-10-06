import { useQuery } from '@tanstack/react-query';

import { CONSTANTS } from '../constants';
import { getPlacesCSV } from '../services/places-service';

const useGetPlacesCSV = (enabled: boolean) =>
  useQuery({
    queryKey: [CONSTANTS.PLACE_CSV],
    queryFn: getPlacesCSV,
    enabled,
  });

export default useGetPlacesCSV;
