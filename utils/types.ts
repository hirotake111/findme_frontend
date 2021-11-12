import { Reducer } from "redux";
import { GetCodeModalActionTypes } from "../actions/getCodeModalActions";

import { MapActionTypes } from "../actions/mapActions";
import { ShareLinkActionTypes } from "../actions/shareLinkActions";
import { store } from "./store";

/**
 * Map
 */
export type MapSearchStatus =
  | { status: "stop" }
  | { status: "searching" }
  | { status: "error"; detail: string };
export type Position = {
  latitude: number;
  longitude: number;
  code?: string | number;
};
export interface MapState {
  status: MapSearchStatus;
  position: Position;
  direction: Position;
  codeModalEnabled: boolean;
  errorMessage: string;
}

/**
 * getCodeModal
 */
export type GetCodeModalSubmitState = "stop" | "submitting";
export interface GetCodeModalState {
  modalEnabled: boolean;
  submitButtonEnabled: boolean;
  submitState: GetCodeModalSubmitState;
  positionId: string;
  errorMessage: string;
}

/**
 * shareCodeModal
 */
export type ShareLinkSubmitStatus = "stop" | "submitting";
export interface ShareLinkState {
  modalEnabled: boolean;
  errorMessage: string;
  link: string;
  submitStatus: ShareLinkSubmitStatus;
}

/**
 * reducer types
 */
export type MapReducer = Reducer<MapState, MapActionTypes>;
export type GetCodeModalReducer = Reducer<
  GetCodeModalState,
  GetCodeModalActionTypes
>;
export type ShareLinkReducer = Reducer<ShareLinkState, ShareLinkActionTypes>;

/**
 * state and dispatch type
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
