import { loader } from "./config";

let map: google.maps.Map;

/**
 * initiate Google Maps API loader and draw map and a circle
 */
export const setPosition = ({ lat, lng }: { lat: number; lng: number }) => {
  // if position is default value, then skip loading
  console.log("check1");
  if (lat === -200 && lng === -200) return;
  // load and render map
  loader.load().then(() => {
    console.log("check2");
    map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat, lng },
      zoom: 20,
    });
    console.log("map:", map);
    // render circle
    new google.maps.Circle({
      center: { lat, lng },
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map,
      radius: 5,
    });
  });
};
