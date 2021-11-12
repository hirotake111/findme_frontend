import { Position } from "./types";
import { validatePosition } from "./validators";
import { config } from "./config";

interface Success {
  result: "success";
  position: Position;
}
interface CodeRequired {
  result: "code required";
}
type Result = Success | CodeRequired;

/**
 * get destination data from API server
 */
const getDestination = async (positionId: string): Promise<Result> => {
  try {
    const requestUrl = `${config.ApiServerUrl}/api/${positionId}`;
    // get position data from API server
    const body = await fetch(requestUrl).then((res) => res.json());

    switch (body.result) {
      case "code required":
        return { result: "code required" };

      case "success":
        return {
          result: "success",
          position: validatePosition(body.detail),
        };

      case "not found":
        throw new Error("404 - data not found");

      default:
        throw new Error(body.detail);
    }
  } catch (e) {
    throw e;
  }
};

export const api = {
  getDestination,
};
