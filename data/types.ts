export type Project = {
  id: string;
  title: string;
  description: string;
  url: string;
  demoVideo?: string;
  githubUrl?: string;
  thumbnail: string;
};

export type TechCategory = {
  name: string;
  technologies: string[];
};

export type TravelLocation = {
  country: string;
  lat: number;
  lng: number;
};
