// export type CoordinateObject = { 
//   lng: number; 
//   lat: number; 
// };

export interface SpotData {
  id: number;
  name: string;
  address: string;
  imageUrl?: string;
  lngLat?: {
    lat: number;
    lng: number;
  };
}

// export interface GeoData {
//   lngLat: CoordinateObject;
// }