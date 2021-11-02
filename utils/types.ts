import { Reducer } from "redux";

import { MapActionTypes } from "../actions/mapActions";
import { store } from "./store";

/**
 * map types
 */
export type MapSearchStatus =
  | { status: "stop" }
  | { status: "searching" }
  | { status: "error"; detail: string };

export interface MapState {
  status: MapSearchStatus;
  position: {
    latitude: number;
    longitude: number;
  };
}

export type MapReducer = Reducer<MapState, MapActionTypes>;

/**
 * state and dispatch type
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
