import { Position } from "./types";

export const validatePosition = (data: any): Position => {
  // validate data
  if (!data) throw new Error(`validation error - data is ${data}`);
  const { latitude, longitude, code } = data;
  // validate latitude
  if (!(latitude && typeof latitude === "number"))
    throw new Error(`validation error - invalid latitude: ${latitude}`);
  // validate longitude
  if (!(longitude && typeof longitude === "number"))
    throw new Error(`validation error - invalid longitude: ${longitude}`);
  if (code && (typeof code === "string" || typeof code === "number"))
    return { latitude, longitude, code };
  if (code) throw new Error(`validation error - invalid code: ${code}`);
  return { latitude, longitude };
};
