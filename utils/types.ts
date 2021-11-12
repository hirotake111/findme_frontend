import { Reducer } from "redux";
import { GetCodeModalActionTypes } from "../actions/getCodeModalActions";

import { MapActionTypes } from "../actions/mapActions";
import { store } from "./store";

/**
 * map types
 */
export type MapSearchStatus =
  | { status: "stop" }
  | { status: "searching" }
  | { status: "error"; detail: string };

export type Position = { latitude: number; longitude: number };

export interface MapState {
  status: MapSearchStatus;
  position: Position;
  direction: Position;
  codeModalEnabled: boolean;
  errorMessage: string;
}

export type GetCodeModalSubmitState = "stop" | "submitting";

export interface GetCodeModalState {
  modalEnabled: boolean;
  submitButtonEnabled: boolean;
  submitState: GetCodeModalSubmitState;
  positionId: string;
  errorMessage: string;
}

/**
 * reducer types
 */
export type MapReducer = Reducer<MapState, MapActionTypes>;
export type GetCodeModalReducer = Reducer<
  GetCodeModalState,
  GetCodeModalActionTypes
>;

/**
 * state and dispatch type
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
