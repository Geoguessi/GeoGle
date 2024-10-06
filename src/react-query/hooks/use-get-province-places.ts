import { useQuery } from '@tanstack/react-query';

import { CONSTANTS } from '../constants';
import { getProvincePlaces } from '../services/places-service';

type Props = {
  provinceName: string;
};

const useGetProvincePlaces = ({ provinceName }: Props) =>
  useQuery({
    queryKey: [CONSTANTS.PROVINCE_PLACES, provinceName],
    queryFn: getProvincePlaces,
  });

export default useGetProvincePlaces;
