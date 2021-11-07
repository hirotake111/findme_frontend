import { PayloadAction } from "@reduxjs/toolkit";
import { MapSearchStatus } from "../utils/types";
/**
 * Types
 */
type UpdateMapSearchStatusType = "search/updateSearchStatus";
type UpdatePositionType = "search/updatePosition";
type UpdateDirectionType = "search/updateDirection";

/**
 * Payload Types
 */
interface UpdatePositionPayloadType {
  latitude: number;
  longitude: number;
}

/**
 * Action Types
 */
interface UpdateMapSearchStatusActionType
  extends PayloadAction<MapSearchStatus, UpdateMapSearchStatusType> {
  type: UpdateMapSearchStatusType;
  payload: MapSearchStatus;
}
interface UpdatePositionActionType
  extends PayloadAction<UpdatePositionPayloadType, UpdatePositionType> {
  type: UpdatePositionType;
  payload: UpdatePositionPayloadType;
}
interface UpdateDirectionActionType
  extends PayloadAction<UpdatePositionPayloadType, UpdateDirectionType> {
  type: UpdateDirectionType;
  payload: UpdatePositionPayloadType;
}

/**
 * combined action types
 */
export type MapActionTypes =
  | { type: "default" }
  | UpdateMapSearchStatusActionType
  | UpdatePositionActionType
  | UpdateDirectionActionType;

/**
 * Action Creators
 */
export const updateMapSearchStatusAction = (
  payload: MapSearchStatus
): UpdateMapSearchStatusActionType => ({
  type: "search/updateSearchStatus",
  payload,
});
export const updatePositionAction = (
  payload: UpdatePositionPayloadType
): UpdatePositionActionType => ({
  type: "search/updatePosition",
  payload,
});
export const updateDirectionAction = (
  payload: UpdatePositionPayloadType
): UpdateDirectionActionType => ({
  type: "search/updateDirection",
  payload,
});
