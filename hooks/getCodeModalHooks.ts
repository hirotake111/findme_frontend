import { useRef } from "react";
import { api } from "../utils/api";
import { useAppSelector } from "./reduxHooks";

/**
 * custom hook for GetCodeModal
 */
export const useGetCodeModal = () => {
  const { modalEnabled } = useAppSelector((state) => state.getCodeModal);

  /**
   * get destination data using code
   */
  const getDestinationByCode = async (code: string): Promise<void> => {
    // invoke network call
    // await api.getDestinationByCode()
  };

  return [modalEnabled];
};
