import { useEffect } from "react";
import { updateErrorMessageAction } from "../actions/mapActions";
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
        const data = await api.getDestination(positionId);
        if (data.result === "success") {
          // got destination position -> update store
          return dispatch({
            type: "search/updateDirection",
            payload: data.position,
          });
        }
        // code required -> show modal to input code
        dispatch({
          type: "getcode/toggleCodeModal",
          payload: { codeModalEnabled: true },
        });
      } catch (e) {
        dispatch(updateErrorMessageAction({ message: `${e}` }));
      }
    })();
  }, []);
};
