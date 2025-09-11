// export type CoordinateObject = { 
//   lng: number; 
//   lat: number; 
// };

export interface SpotData {
  id: number;
  name: string;
  address: string;
  imageUrl: string;
  rating: number;
  priceLevel?: number; 
  types: string[];     
}


// export interface GeoData {
//   lngLat: CoordinateObject;
// }