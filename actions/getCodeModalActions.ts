import { PayloadAction } from "@reduxjs/toolkit";

import { GetCodeModalSubmitState } from "../utils/types";

/**
 * Types
 */
type ToggleCodeModalType = "getcode/toggleCodeModal";
type UpdateSubmitButtonType = "getcode/updateSubmitButton";
type UpdateSubmitStateType = "getcode/updateSubmitState";
type UpdatePositionIdType = "getcode/updatePositionId";
type UpdateModalErrorMessageType = "getcode/updateModalErrorMessage";

/**
 * payload Types
 */
interface ToggleCodeModalPayloadType {
  codeModalEnabled: boolean;
}
interface UpdateSubmitButtonPayloadType {
  enabled: boolean;
}
interface UpdateSubmitStatePayloadType {
  state: GetCodeModalSubmitState;
}
interface UpdatePositionIdPayloadType {
  id: string;
}
interface UpdateModalErrorMessagePayloadType {
  message: string;
}

/**
 * Action Types
 */
interface ToggleCodeModalActionType
  extends PayloadAction<ToggleCodeModalPayloadType, ToggleCodeModalType> {
  type: ToggleCodeModalType;
  payload: ToggleCodeModalPayloadType;
}
interface UpdateSubmitButtonActionType
  extends PayloadAction<UpdateSubmitButtonPayloadType, UpdateSubmitButtonType> {
  type: UpdateSubmitButtonType;
  payload: UpdateSubmitButtonPayloadType;
}
interface UpdateSubmitStateActionType
  extends PayloadAction<UpdateSubmitStatePayloadType, UpdateSubmitStateType> {
  type: UpdateSubmitStateType;
  payload: UpdateSubmitStatePayloadType;
}
interface UpdatePositionIdActionType
  extends PayloadAction<UpdatePositionIdPayloadType, UpdatePositionIdType> {
  type: UpdatePositionIdType;
  payload: UpdatePositionIdPayloadType;
}
interface UpdateModalErrorMessageActionType
  extends PayloadAction<
    UpdateModalErrorMessagePayloadType,
    UpdateModalErrorMessageType
  > {
  type: UpdateModalErrorMessageType;
  payload: UpdateModalErrorMessagePayloadType;
}

export type GetCodeModalActionTypes =
  | { type: "default" }
  | ToggleCodeModalActionType
  | UpdateSubmitButtonActionType
  | UpdateSubmitStateActionType
  | UpdatePositionIdActionType
  | UpdateModalErrorMessageActionType;
