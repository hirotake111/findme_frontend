import { useEffect } from "react";
import { api } from "../utils/api";
import { useAppDispatch } from "./reduxHooks";

/**
 * custom hook to update direction data in redux store
 */
export const useUpdateDirection = async (positionId: string) => {
  const dispatch = useAppDispatch();

  /**
   * get position data from API server and update redux state
   */
  useEffect(() => {
    (async () => {
      try {
        const position = await api.getDirection(positionId);
        dispatch({ type: "search/updateDirection", payload: position });
      } catch (e) {
        dispatch({
          type: "search/updateSearchStatus",
          payload: { status: "error", detail: e as string },
        });
      }
    })();
  }, []);
};
