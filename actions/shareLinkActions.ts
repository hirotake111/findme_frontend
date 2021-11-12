import { PayloadAction } from "@reduxjs/toolkit";
import { ShareLinkSubmitStatus } from "../utils/types";

/**
 * types
 */
type UpdateModalType = "share/updateModal";
type UpdateErrorMessageType = "share/updateErrorMessage";
type UpdateLinkType = "share/updateLink";
type UpdateSubmitStatusType = "share/updateSubmitStatus";

/**
 * payload types
 */
interface UpdateModalPayloadType {
  enabled: boolean;
}
interface UpdateErrorMessagePayloadType {
  message: string;
}
interface UpdateLinkPayloadType {
  link: string;
}
interface UpdateSubmitStatusPayloadType {
  status: ShareLinkSubmitStatus;
}

/**
 * action types
 */
interface UpdateModalActionType
  extends PayloadAction<UpdateModalPayloadType, UpdateModalType> {
  type: UpdateModalType;
  payload: UpdateModalPayloadType;
}
interface UpdateErrorMessageActionType
  extends PayloadAction<UpdateErrorMessagePayloadType, UpdateErrorMessageType> {
  type: UpdateErrorMessageType;
  payload: UpdateErrorMessagePayloadType;
}
interface UpdateLinkActionType
  extends PayloadAction<UpdateLinkPayloadType, UpdateLinkType> {
  type: UpdateLinkType;
  payload: UpdateLinkPayloadType;
}
interface UpdateSubmitStatusActionType
  extends PayloadAction<UpdateSubmitStatusPayloadType, UpdateSubmitStatusType> {
  type: UpdateSubmitStatusType;
  payload: UpdateSubmitStatusPayloadType;
}
export type ShareLinkActionTypes =
  | UpdateModalActionType
  | UpdateErrorMessageActionType
  | UpdateLinkActionType
  | UpdateSubmitStatusActionType;
