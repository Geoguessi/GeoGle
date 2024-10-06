import { useQuery } from '@tanstack/react-query';

import { CONSTANTS } from '../constants';
import { getPlaceByName } from '../services/places-service';

type Props = {
  placeName: string;
};

const useGetPlaceByName = ({ placeName }: Props) =>
  useQuery({
    queryKey: [CONSTANTS.PLACE_DETAIL, placeName],
    queryFn: getPlaceByName,
    // throwOnError: true,
  });

export default useGetPlaceByName;
