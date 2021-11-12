import { useRef } from "react";
import { api } from "../utils/api";

import { useAppDispatch, useAppSelector } from "./reduxHooks";

/**
 * custom hook responsible for shared link state
 */
export const useLinkModal = () => {
  const dispatch = useAppDispatch();
  const {
    link,
    map: { position },
  } = useAppSelector((state) => state);
  const ref = useRef<HTMLInputElement>(null);

  const sendPosition = async (): Promise<void> => {
    // validate code to be sent
    const code = ref.current?.value;
    // update state
    dispatch({
      type: "share/updateSubmitStatus",
      payload: { status: "submitting" },
    });
    try {
      // POST data
      const result = await api.createLink({ ...position, code });
      console.log("result:", result);
      // update state
      dispatch({
        type: "share/updateLink",
        payload: { link: result.link },
      });
      dispatch({
        type: "share/updateSubmitStatus",
        payload: { status: "done" },
      });
    } catch (e) {
      console.error(e);
      // update state
      if (e instanceof Error)
        dispatch({
          type: "share/updateErrorMessage",
          payload: { message: e.message },
        });
      dispatch({
        type: "share/updateSubmitStatus",
        payload: { status: "stop" },
      });
    }
  };

  return [link, ref, sendPosition] as const;
};
