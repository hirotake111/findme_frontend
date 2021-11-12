import { useRef } from "react";
import { api } from "../utils/api";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

/**
 * custom hook for GetCodeModal
 */
export const useGetCodeModal = () => {
  const dispatch = useAppDispatch();
  const { modalEnabled, positionId, submitButtonEnabled } = useAppSelector(
    (state) => state.getCodeModal
  );
  const textRef = useRef<HTMLInputElement>(null);

  /**
   * get destination data using code
   */
  const getDestinationByCode = async (): Promise<void> => {
    const code = textRef.current?.value;

    // disable submit button
    dispatch({
      type: "getcode/updateSubmitButton",
      payload: { enabled: false },
    });
    // update submit state
    dispatch({
      type: "getcode/updateSubmitState",
      payload: { state: "submitting" },
    });
    try {
      // validate code
      if (!code) throw new Error(`code is null...`);
      // invoke network call
      const {
        position: { latitude, longitude },
      } = await api.getDestinationByCode(positionId, code);
      // on success,
      // disable modal
      dispatch({
        type: "getcode/toggleCodeModal",
        payload: { codeModalEnabled: false },
      });
      // clear error message
      dispatch({
        type: "getcode/updateModalErrorMessage",
        payload: { message: "" },
      });
      // set destination
      dispatch({
        type: "search/updateDirection",
        payload: { latitude, longitude },
      });
      // re-enable submit button
      dispatch({
        type: "getcode/updateSubmitButton",
        payload: { enabled: true },
      });
      // update submit state to stop
      dispatch({
        type: "getcode/updateSubmitState",
        payload: { state: "stop" },
      });
    } catch (e) {
      console.error(e);
      // dispatch error
      if (e instanceof Error)
        dispatch({
          type: "getcode/updateModalErrorMessage",
          payload: { message: e.message },
        });
      // re-enable submit button
      dispatch({
        type: "getcode/updateSubmitButton",
        payload: { enabled: true },
      });
      // update submit state to stop
      dispatch({
        type: "getcode/updateSubmitState",
        payload: { state: "stop" },
      });
    }
  };

  return [
    { modalEnabled, submitButtonEnabled, textRef },
    getDestinationByCode,
  ] as const;
};
