import { SchoolInfo } from '@/types';

export const NYC_SCHOOLS: readonly SchoolInfo[] = [
  { name: 'Columbia University', lat: 40.8075, lng: -73.9626 },
  { name: 'New York University (NYU)', lat: 40.7295, lng: -73.9965 },
  { name: 'Fordham University', lat: 40.8613, lng: -73.8855 },
  { name: 'The New School', lat: 40.7355, lng: -73.9976 },
  { name: 'Pace University', lat: 40.7112, lng: -74.0055 },
  { name: "St. John's University", lat: 40.7233, lng: -73.7949 },
  { name: 'CUNY - Hunter College', lat: 40.7685, lng: -73.9655 },
  { name: 'CUNY - Baruch College', lat: 40.7404, lng: -73.9836 },
  { name: 'CUNY - Brooklyn College', lat: 40.6311, lng: -73.9524 },
  { name: 'CUNY - City College', lat: 40.8200, lng: -73.9493 },
  { name: 'CUNY - Queens College', lat: 40.7364, lng: -73.8200 },
  { name: 'CUNY - Lehman College', lat: 40.8730, lng: -73.8945 },
  { name: 'CUNY - John Jay College', lat: 40.7705, lng: -73.9889 },
  { name: 'CUNY - Medgar Evers College', lat: 40.6663, lng: -73.9575 },
  { name: 'CUNY - College of Staten Island', lat: 40.6023, lng: -74.1502 },
  { name: 'Yeshiva University', lat: 40.8505, lng: -73.9293 },
  { name: 'New York Institute of Technology', lat: 40.7565, lng: -73.9800 },
  { name: 'Pratt Institute', lat: 40.6889, lng: -73.9634 },
  { name: 'Fashion Institute of Technology', lat: 40.7475, lng: -73.9949 },
  { name: 'Cooper Union', lat: 40.7296, lng: -73.9907 },
  { name: 'Barnard College', lat: 40.8090, lng: -73.9639 },
  { name: 'Manhattan College', lat: 40.8897, lng: -73.9025 },
] as const;

export const NYC_AREAS: readonly SchoolInfo[] = [
  // Manhattan
  { name: 'Manhattan - Upper East Side', lat: 40.7736, lng: -73.9566 },
  { name: 'Manhattan - Upper West Side', lat: 40.7870, lng: -73.9754 },
  { name: 'Manhattan - Midtown', lat: 40.7549, lng: -73.9840 },
  { name: 'Manhattan - Downtown', lat: 40.7128, lng: -74.0060 },
  { name: 'Manhattan - Harlem', lat: 40.8176, lng: -73.9482 },
  { name: 'Manhattan - Washington Heights', lat: 40.8515, lng: -73.9376 },
  { name: 'Manhattan - East Village', lat: 40.7282, lng: -73.9942 },
  { name: 'Manhattan - West Village', lat: 40.7358, lng: -74.0036 },
  { name: 'Manhattan - Chelsea', lat: 40.7465, lng: -74.0014 },
  // Brooklyn
  { name: 'Brooklyn - Williamsburg', lat: 40.7081, lng: -73.9571 },
  { name: 'Brooklyn - Park Slope', lat: 40.6681, lng: -73.9806 },
  { name: 'Brooklyn - Downtown Brooklyn', lat: 40.6943, lng: -73.9249 },
  { name: 'Brooklyn - Bushwick', lat: 40.6953, lng: -73.9171 },
  { name: 'Brooklyn - Bedford-Stuyvesant', lat: 40.6872, lng: -73.9418 },
  { name: 'Brooklyn - Coney Island', lat: 40.5755, lng: -73.9707 },
  // Queens
  { name: 'Queens - Flushing', lat: 40.7675, lng: -73.8331 },
  { name: 'Queens - Long Island City', lat: 40.7447, lng: -73.9485 },
  { name: 'Queens - Astoria', lat: 40.7644, lng: -73.9235 },
  { name: 'Queens - Jamaica', lat: 40.7027, lng: -73.7890 },
  { name: 'Queens - Forest Hills', lat: 40.7181, lng: -73.8448 },
  // Bronx
  { name: 'Bronx - South Bronx', lat: 40.8176, lng: -73.9182 },
  { name: 'Bronx - Fordham', lat: 40.8613, lng: -73.8907 },
  { name: 'Bronx - Riverdale', lat: 40.8901, lng: -73.9118 },
  // Staten Island
  { name: 'Staten Island - St. George', lat: 40.6437, lng: -74.0776 },
  { name: 'Staten Island - New Dorp', lat: 40.5739, lng: -74.1163 },
] as const;

export const ALL_LOCATIONS: readonly SchoolInfo[] = [...NYC_SCHOOLS, ...NYC_AREAS] as const;

export function getSchoolByName(name: string): SchoolInfo | undefined {
  return NYC_SCHOOLS.find((s) => s.name === name);
}

export function getLocationByName(name: string): SchoolInfo | undefined {
  return ALL_LOCATIONS.find((s) => s.name === name);
}
