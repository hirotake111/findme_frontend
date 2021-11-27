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
    zoom: 19,
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
  // render location dot
  new google.maps.Marker({
    position: { lat: latitude, lng: longitude },
    map,
    icon: {
      url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAF96VFh0UmF3IHByb2ZpbGUgdHlwZSBBUFAxAABo3uNKT81LLcpMVigoyk/LzEnlUgADYxMuE0sTS6NEAwMDCwMIMDQwMDYEkkZAtjlUKNEABZgamFmaGZsZmgMxiM8FAEi2FMnxHlGkAAADqElEQVRo3t1aTWgTQRQOiuDPQfHs38GDogc1BwVtQxM9xIMexIN4EWw9iAehuQdq0zb+IYhglFovClXQU+uhIuqh3hQll3iwpyjG38Zkt5uffc4XnHaSbpLZ3dnEZOBB2H3z3jeZN+9vx+fzYPgTtCoQpdVHrtA6EH7jme+/HFFawQBu6BnWNwdGjB2BWH5P32jeb0V4B54KL5uDuW3D7Y/S2uCwvrUR4GaEuZABWS0FHhhd2O4UdN3FMJneLoRtN7Y+GMvvUw2eE2RDh3LTOnCd1vQN5XZ5BXwZMV3QqQT84TFa3zuU39sy8P8IOqHb3T8fpY1emoyMSQGDI/Bwc+0ELy6i4nLtepp2mE0jc5L3UAhMsdxut0rPJfRDN2eMY1enF8Inbmj7XbtZhunkI1rZFD/cmFMlr1PFi1/nzSdGkT5RzcAzvAOPU/kVF9s0ujqw+9mP5QgDmCbJAV7McXIeGpqS3Qg7OVs4lTfMD1Yg9QLR518mZbImFcvWC8FcyLAbsev++3YETb0tn2XAvouAvjGwd14YdCahUTCWW6QQIzzDO/CIAzKm3pf77ei23AUkVbICHr8pnDZNynMQJfYPT7wyKBzPVQG3IvCAtyTsCmRBprQpMawWnkc+q2Rbn+TK/+gmRR7qTYHXEuZkdVM0p6SdLLYqX0LItnFgBxe3v0R04b5mGzwnzIUMPiBbFkdVmhGIa5tkJ4reZvyl4Rg8p3tMBh+FEqUduVRUSTKTnieL58UDG76cc70AyMgIBxs6pMyIYV5agKT9f/ltTnJFOIhuwXOCLD6gQ/oc8AJcdtuYb09xRQN3NWULgCwhfqSk3SkaBZViRTK3EYNUSBF4Hic0Y8mM+if0HhlMlaIHbQ8Z5lszxnGuIP2zrAw8J8jkA7pkMAG79AKuPTOOcgWZeVP5AsSDjAxWegGyJoSUWAj/FBpRa0JiviSbfldMqOMPcce7UVeBLK4gkMVVBLI2phLjKlIJm8lcxMNkLuIomXOTTmc1kwYf2E+nMQdzlaTTKgoaZJWyBQ141RY0DkrK6XflAQbih1geZnhJeXu5WeEZ3mVqSkrIgCzXJaXqoh65TUuLerdtFXgQ2bYKeD1pq6hobLE86SlztXMWvaA5vPO0sYWB9p2K1iJS4ra0Fju/udsN7fWu+MDRFZ+YuuIjX1d8Zu2OD92WC9G3ub1qABktBV7vssfBMX1L7yVjZ7PLHuABb9svezS7boNDyK/b4LdX123+Au+jOmNxrkG0AAAAAElFTkSuQmCC",
      scaledSize: new google.maps.Size(32, 32),
    },
  });
};
