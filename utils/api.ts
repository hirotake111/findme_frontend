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
interface CreateSuccess {
  result: "success";
  link: string;
  position: Position;
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

/**
 * get destination data from API server using code, otherwise throw an error
 */
const getDestinationByCode = async (
  positionId: string,
  code: string
): Promise<Success> => {
  try {
    const requestUrl = `${config.ApiServerUrl}/api/${positionId}`;
    const init: RequestInit = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    };
    // get position data from API server
    const body = await fetch(requestUrl, init).then((res) => res.json());
    if (body.result === "success")
      return {
        result: "success",
        position: validatePosition(body.detail),
      };
    throw new Error(body.detail);
  } catch (e) {
    throw e;
  }
};

/**
 * post position and code to API server, then return position ID
 */
const createLink = async ({
  latitude,
  longitude,
  code,
}: Position): Promise<CreateSuccess> => {
  try {
    const requestUrl = `${config.ApiServerUrl}/api/`;
    const payload = { latitude, longitude, code };
    const init: RequestInit = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };
    // post data to API server
    const body = await fetch(requestUrl, init).then((res) => res.json());
    const { result, detail } = body;
    // validate result
    if (result !== "success") throw new Error(`network error - ${detail}`);
    // validate position
    const position = validatePosition(detail?.position);
    // validate id
    const id = detail?.id;
    if (!(id && typeof id === "string"))
      throw new Error(`validation error - invalid id: ${id}`);

    return {
      result: "success",
      link: `${config.hostname}/${id}`,
      position,
    };
  } catch (e) {
    throw e;
  }
};

export const api = {
  getDestination,
  getDestinationByCode,
  createLink,
};
