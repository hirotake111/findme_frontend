import { useRef } from "react";
import { api } from "../utils/api";
import { useAppSelector } from "./reduxHooks";

/**
 * custom hook for GetCodeModal
 */
export const useGetCodeModal = () => {
  const { modalEnabled, positionId } = useAppSelector(
    (state) => state.getCodeModal
  );

  /**
   * get destination data using code
   */
  const getDestinationByCode = async (code: string): Promise<void> => {
    if (!positionId) return;
    // disable submit button
    try {
      // invoke network call
      // const result = await api.getDestinationByCode(positionId, code);
      // on success,
      // disable modal
      // clear error message
      // set destination
    } catch (e) {
      // dispatch error
      // re-enable submit button
    }
  };

  return [modalEnabled];
};
