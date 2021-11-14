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
      // update state
      dispatch({
        type: "share/updateErrorMessage",
        payload: { message: "" },
      });
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

/**
 * custom hook to handle share.modalEnabled
 */
export const useModalEnabled = () => {
  const dispatch = useAppDispatch();

  const enable = () => {
    dispatch({
      type: "share/updateModal",
      payload: { enabled: true },
    });
  };

  return enable;
};

/**
 * custom hook to handle copy message
 */
export const useCopyMessageHandler = () => {
  const dispatch = useAppDispatch();
  const { copyMessage } = useAppSelector((state) => state.link);

  const popUp = () => {
    // display pop up message
    dispatch({
      type: "share/updateCopyMessage",
      payload: { enabled: true },
    });
    setTimeout(() => {
      // hide the message
      dispatch({
        type: "share/updateCopyMessage",
        payload: { enabled: false },
      });
    }, 2000);
  };

  return [copyMessage, popUp] as const;
};
