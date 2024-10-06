import { useQuery } from '@tanstack/react-query';

import { CONSTANTS } from '../constants';
import { getPlacesDashboard } from '../services/places-service';

type Props = {
  provinceName: string;
};

const useGetPlacesDashboard = ({ provinceName }: Props) =>
  useQuery({
    queryKey: [CONSTANTS.PLACE_DASHBOARD, provinceName],
    queryFn: getPlacesDashboard,
  });

export default useGetPlacesDashboard;
