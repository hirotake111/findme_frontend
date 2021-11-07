import { useEffect } from "react";
import { useAppDispatch } from "../../../hooks/reduxHooks";

import { config } from "../../../utils/config";
import { validatePosition } from "../../../utils/validators";

interface Props {
  positionId: string;
}

/**
 * fetch other user's position data from API server
 */
export default function Initializer({ positionId }: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        // perfrom API call
        const body = await fetch(`${config.ApiServerUrl}/api/${positionId}`)
          .then((res) => res.json())
          .catch((err) => console.error("error:", err.message));
        if (body.result === "success") {
          // validate position data
          const { latitude, longitude } = validatePosition(body.detail);
          // update store
          dispatch({
            type: "search/updateDirection",
            payload: { latitude, longitude },
          });
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return null;
}
