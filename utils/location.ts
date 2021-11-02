import { loader } from "./config";

let map: google.maps.Map;

/**
 * initiate Google Maps API loader and draw map and a circle
 */
export const setPosition = ({ lat, lng }: { lat: number; lng: number }) => {
  // if position is default value, then skip loading
  if (lat === -200 && lng === -200) return;
  // load and render map
  loader.load().then(() => {
    map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat, lng },
      zoom: 20,
    });

    // render circle
    new google.maps.Circle({
      center: { lat, lng },
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map,
      radius: 2,
    });

    /**
     * direction renderer example
     */
    // // render direction
    // const direction = new google.maps.DirectionsService();
    // direction.route(
    //   {
    //     origin: { lat, lng },
    //     destination: { lat: 35.7330201, lng: 139.8346616 },
    //     travelMode: google.maps.TravelMode.WALKING,
    //   },
    //   (result, status) => {
    //     if (status !== "OK") {
    //       console.error("not OK!");
    //       return;
    //     } // create a DirectionRenderer object
    //     const renderer = new google.maps.DirectionsRenderer();
    //     // call setMap() on the renderer to bind it to the passed map
    //     renderer.setMap(map);
    //     // call setDirections() on the renderer, passing it the DirectionsResult
    //     renderer.setDirections(result);
    //   }
    // );
  });
};
