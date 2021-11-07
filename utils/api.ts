import { Position } from "./types";
import { validatePosition } from "./validators";

/**
 * get position data from API server
 */
const getDirection = async (
  url: string,
  positionId: string
): Promise<Position> => {
  try {
    const requestUrl = `${url}/api/${positionId}`;
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
