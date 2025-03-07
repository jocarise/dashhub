import { Location } from './Weather';

export interface AstroLocation {
  location: Location;
  astronomy: Astronomy;
}

export interface Astronomy {
  astro: AstroDetails;
}

export interface AstroDetails {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moonPhase: string;
  moonIllumination: number;
  isMoonUp: boolean;
  isSunUp: boolean;
}
