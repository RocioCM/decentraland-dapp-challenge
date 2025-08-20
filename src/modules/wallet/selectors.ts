import { RootState } from "../types";

const getState = (state: RootState) => state.wallet;
export const getAddress = (state: RootState) => getState(state).address || "";
export const isConnected = (state: RootState) => !!getAddress(state);
export const isConnecting = (state: RootState) => getState(state).isConnecting;
export const getError = (state: RootState) => getState(state).error;
export const getBalance = (state: RootState) => getState(state).balance || "0";
export const isLoadingBalance = (state: RootState) => getState(state).isLoadingBalance;
export const isTransferring = (state: RootState) => getState(state).isTransferring;
export const getTransferError = (state: RootState) => getState(state).transferError;
export const getTransferSuccess = (state: RootState) => getState(state).transferSuccess;
export const isMinting = (state: RootState) => getState(state).isMinting;
export const getMintError = (state: RootState) => getState(state).mintError;
