import { Loader } from "@googlemaps/js-api-loader";

export const loader = new Loader({
  apiKey: (process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY as string) || "",
});

export const config = {
  ApiServerUrl: process.env.NEXT_PUBLIC_API_SERVER || "",
};
