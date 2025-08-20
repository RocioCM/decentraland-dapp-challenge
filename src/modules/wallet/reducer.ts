import { AnyAction } from "redux";
import {
  ConnectWalletFailureAction,
  ConnectWalletSuccessAction,
  GetBalanceSuccessAction,
  GetBalanceFailureAction,
  TransferTokenFailureAction,
  MintTokenFailureAction,
  CONNECT_WALLET_FAILURE,
  CONNECT_WALLET_REQUEST,
  CONNECT_WALLET_SUCCESS,
  GET_BALANCE_REQUEST,
  GET_BALANCE_SUCCESS,
  GET_BALANCE_FAILURE,
  TRANSFER_TOKEN_REQUEST,
  TRANSFER_TOKEN_SUCCESS,
  TRANSFER_TOKEN_FAILURE,
  TRANSFER_TOKEN_RESET,
  MINT_TOKEN_REQUEST,
  MINT_TOKEN_SUCCESS,
  MINT_TOKEN_FAILURE,
} from "./actions";
import { WalletState } from "./types";

const INITIAL_STATE: WalletState = {
  address: null,
  isConnecting: false,
  error: null,
  balance: null,
  isLoadingBalance: false,
  isTransferring: false,
  transferError: null,
  transferSuccess: false,
  isMinting: false,
  mintError: null,
};

export function walletReducer(state: WalletState = INITIAL_STATE, action: AnyAction): WalletState {
  switch (action.type) {
    case CONNECT_WALLET_REQUEST: {
      return {
        ...state,
        isConnecting: true,
        error: null,
      };
    }
    case CONNECT_WALLET_SUCCESS: {
      const { address } = action.payload as ConnectWalletSuccessAction["payload"];
      return {
        ...state,
        isConnecting: false,
        address,
        error: null,
      };
    }

    case CONNECT_WALLET_FAILURE: {
      const { error } = action.payload as ConnectWalletFailureAction["payload"];
      return {
        ...state,
        isConnecting: false,
        error,
      };
    }

    case GET_BALANCE_REQUEST: {
      return {
        ...state,
        isLoadingBalance: true,
        error: null,
      };
    }

    case GET_BALANCE_SUCCESS: {
      const { balance } = action.payload as GetBalanceSuccessAction["payload"];
      return {
        ...state,
        isLoadingBalance: false,
        balance,
        error: null,
      };
    }

    case GET_BALANCE_FAILURE: {
      const { error } = action.payload as GetBalanceFailureAction["payload"];
      return {
        ...state,
        isLoadingBalance: false,
        error,
      };
    }

    case TRANSFER_TOKEN_REQUEST: {
      return {
        ...state,
        isTransferring: true,
        transferError: null,
        transferSuccess: false,
      };
    }

    case TRANSFER_TOKEN_SUCCESS: {
      return {
        ...state,
        isTransferring: false,
        transferError: null,
        transferSuccess: true,
      };
    }

    case TRANSFER_TOKEN_FAILURE: {
      const { error } = action.payload as TransferTokenFailureAction["payload"];
      return {
        ...state,
        isTransferring: false,
        transferError: error,
        transferSuccess: false,
      };
    }

    case TRANSFER_TOKEN_RESET: {
      return {
        ...state,
        transferError: null,
        transferSuccess: false,
      };
    }

    case MINT_TOKEN_REQUEST: {
      return {
        ...state,
        isMinting: true,
        mintError: null,
      };
    }

    case MINT_TOKEN_SUCCESS: {
      return {
        ...state,
        isMinting: false,
        mintError: null,
      };
    }

    case MINT_TOKEN_FAILURE: {
      const { error } = action.payload as MintTokenFailureAction["payload"];
      return {
        ...state,
        isMinting: false,
        mintError: error,
      };
    }

    default:
      return state;
  }
}
