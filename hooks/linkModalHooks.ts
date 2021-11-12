import { useRef } from "react";

import { useAppDispatch, useAppSelector } from "./reduxHooks";

/**
 * custom hook responsible for shared link state
 */
export const useLinkModal = () => {
  const dispatch = useAppDispatch();
  const { link } = useAppSelector((state) => state);
  const textRef = useRef<HTMLInputElement>(null);

  const sendPosition = (): void => {};

  return [link, textRef, sendPosition] as const;
};
