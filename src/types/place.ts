type Place = {
  link: string;
  name: string;
  address: string;
  description: string;
  tags: string[];
  image: string;
};

type PlaceTiny = {
  title: string;
  link: string;
  image: string;
};

type PlacesDashboard = {
  recommendation: PlaceTiny[];
  foodie: PlaceTiny[];
  attraction: PlaceTiny[];
};
