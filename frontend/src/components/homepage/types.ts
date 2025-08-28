export type CoordinateObject = { 
  lng: number; 
  lat: number; 
};

export interface SpotData {
  id: number;
  name: string;       // restaurant name
  imageUrl: string;   // restaurant image
  lngLat: CoordinateObject;
}

export interface GeoData {
  lngLat: CoordinateObject;
}