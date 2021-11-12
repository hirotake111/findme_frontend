import { useEffect } from "react";
import { updateErrorMessageAction } from "../actions/mapActions";
import { MapSearchStatus } from "../utils/types";
import { useAppDispatch } from "./reduxHooks";

export const useSearchStatus = () => {
  const dispatch = useAppDispatch();
  /**
   *dispatch and update search status
   */
  const updateSearchStatus = (status: MapSearchStatus) => {
    dispatch({ type: "search/updateSearchStatus", payload: status });
  };

  return updateSearchStatus;
};

/**
 * custom hook to get current position
 */
export const useGetCurrentPosition = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    /**
     * get current position from navigator.geolocation
     */
    // update status
    dispatch({
      type: "search/updateSearchStatus",
      payload: { status: "searching" },
    });

    // get current position from nagigator object
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        // upon success...
        ///update current position
        dispatch({
          type: "search/updatePosition",
          payload: { latitude: coords.latitude, longitude: coords.longitude },
        });
        // update status
        dispatch({
          type: "search/updateSearchStatus",
          payload: { status: "stop" },
        });
      },
      // upon failue, console error
      (err) => {
        // update status
        dispatch({
          type: "search/updateSearchStatus",
          payload: { status: "stop" },
        });
        dispatch(updateErrorMessageAction({ message: err.message }));
      }
    );
  }, []);
};
