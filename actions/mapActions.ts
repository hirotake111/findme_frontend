import { PayloadAction } from "@reduxjs/toolkit";
import { MapSearchStatus } from "../utils/types";
/**
 * Types
 */
type UpdateMapSearchStatusType = "search/updateSearchStatus";
type UpdatePositionType = "search/updatePosition";
type UpdateDirectionType = "search/updateDirection";
type ToggleCodeModalType = "search/toggleCodeModal";
type UpdateErrorMessageType = "search/updateErrorMessage";

/**
 * Payload Types
 */
interface UpdatePositionPayloadType {
  latitude: number;
  longitude: number;
}
interface ToggleCodeModalPayloadType {
  codeModalEnabled: boolean;
}
interface UpdateErrorMessagePayloadType {
  message: string | null;
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
interface ToggleCodeModalActionType
  extends PayloadAction<ToggleCodeModalPayloadType, ToggleCodeModalType> {
  type: ToggleCodeModalType;
  payload: ToggleCodeModalPayloadType;
}
interface UpdateErrormessageActionType
  extends PayloadAction<UpdateErrorMessagePayloadType, UpdateErrorMessageType> {
  type: UpdateErrorMessageType;
  payload: UpdateErrorMessagePayloadType;
}

/**
 * combined action types
 */
export type MapActionTypes =
  | { type: "default" }
  | UpdateMapSearchStatusActionType
  | UpdatePositionActionType
  | UpdateDirectionActionType
  | ToggleCodeModalActionType
  | UpdateErrormessageActionType;

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
export const toggleCodeModalAction = (
  payload: ToggleCodeModalPayloadType
): ToggleCodeModalActionType => ({
  type: "search/toggleCodeModal",
  payload,
});
export const updateErrorMessageAction = (
  payload: UpdateErrorMessagePayloadType
): UpdateErrormessageActionType => ({
  type: "search/updateErrorMessage",
  payload,
});
