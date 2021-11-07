import { Position } from "./types";

export const validatePosition = (data: any): Position => {
  // validate data
  if (!data) throw new Error("validation error - data is undefined");
  const { latitude, longitude } = data;
  // validate latitude
  if (!(latitude && typeof latitude === "number"))
    throw new Error(`validation error - invalid latitude: ${latitude}`);
  // validate longitude
  if (!(longitude && typeof longitude === "number"))
    throw new Error(`validation error - invalid longitude: ${longitude}`);

  return { latitude, longitude };
};
