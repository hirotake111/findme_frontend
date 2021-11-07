import { api } from "../utils/api";
import { useAppDispatch } from "./reduxHooks";

/**
 * custom hook to update direction data in redux store
 */
export const useUpdateDirection = () => {
  const dispatch = useAppDispatch();

  /**
   * get position data from API server and update redux state
   */
  const updateDirection = async (positionId: string): Promise<void> => {
    try {
      const position = await api.getDirection(positionId);
      dispatch({ type: "search/updateDirection", payload: position });
    } catch (e) {
      dispatch({
        type: "search/updateSearchStatus",
        payload: { status: "error", detail: e as string },
      });
    }
  };

  return updateDirection;
};
