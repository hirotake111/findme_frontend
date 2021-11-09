import { loader } from "./config";
import { Position } from "./types";

let map: google.maps.Map;

/**
 * initiate Google Maps API loader and draw map and a circle
 */
export const setPosition = async ({
  position,
  destination,
}: {
  position: Position;
  destination?: Position;
}): Promise<void> => {
  const { latitude, longitude } = position;
  // if position is default value, then skip loading
  if (latitude === -200 && longitude === -200) return;
  // load and render map
  try {
    await loader.load();
  } catch (e) {
    throw e;
  }
  // render Google Maps
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: { lat: latitude, lng: longitude },
    zoom: 20,
  });

  // if destination parameter is not given, or default value, then skip rendering direction
  if (
    destination &&
    destination.latitude !== -200 &&
    destination.longitude !== -200
  ) {
    // render direction
    const direction = new google.maps.DirectionsService();
    direction.route(
      {
        origin: { lat: latitude, lng: longitude },
        destination: { lat: destination.latitude, lng: destination.longitude },
        travelMode: google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status !== "OK") {
          throw new Error(status);
        } // create a DirectionRenderer object
        const renderer = new google.maps.DirectionsRenderer();
        // call setMap() on the renderer to bind it to the passed map
        renderer.setMap(map);
        // call setDirections() on the renderer, passing it the DirectionsResult
        renderer.setDirections(result);
      }
    );
    return;
  }
  // render circle
  new google.maps.Circle({
    center: { lat: latitude, lng: longitude },
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    map,
    radius: 2,
  });
};
