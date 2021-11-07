import { Position } from "./types";
import { validatePosition } from "./validators";
import { config } from "./config";

/**
 * get position data from API server
 */
const getDirection = async (positionId: string): Promise<Position> => {
  try {
    const requestUrl = `${config.ApiServerUrl}/api/${positionId}`;
    // get position data from API server
    const body = await fetch(requestUrl).then((res) => res.json());
    if (body.result !== "success")
      throw new Error("failed to fetch data from API server");
    // validate and return position data
    return validatePosition(body.detail);
  } catch (e) {
    throw e;
  }
};

export const api = {
  getDirection,
};
