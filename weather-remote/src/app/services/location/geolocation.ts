//TODO: Improve Geolocation abstraction
export function getLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => resolve(position), // resolve with position data
      (error: GeolocationPositionError) => reject(error) // reject with an error
    );
  });
}
