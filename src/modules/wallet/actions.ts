// Connect Wallet
export const CONNECT_WALLET_REQUEST = "[Request] Connect Wallet";
export const CONNECT_WALLET_SUCCESS = "[Success] Connect Wallet";
export const CONNECT_WALLET_FAILURE = "[Failure] Connect Wallet";

export const GET_BALANCE_REQUEST = "[Request] Get Balance";
export const GET_BALANCE_SUCCESS = "[Success] Get Balance";
export const GET_BALANCE_FAILURE = "[Failure] Get Balance";

export const TRANSFER_TOKEN_REQUEST = "[Request] Transfer Token";
export const TRANSFER_TOKEN_SUCCESS = "[Success] Transfer Token";
export const TRANSFER_TOKEN_FAILURE = "[Failure] Transfer Token";

export const MINT_TOKEN_REQUEST = "[Request] Mint Token";
export const MINT_TOKEN_SUCCESS = "[Success] Mint Token";
export const MINT_TOKEN_FAILURE = "[Failure] Mint Token";

export function connectWalletRequest() {
  return {
    type: CONNECT_WALLET_REQUEST,
    payload: {},
  };
}

export function connectWalletSuccess(address: string) {
  return {
    type: CONNECT_WALLET_SUCCESS,
    payload: { address },
  };
}

export function connectWalletFailure(error: string) {
  return {
    type: CONNECT_WALLET_FAILURE,
    payload: { error },
  };
}

export function getBalanceRequest() {
  return {
    type: GET_BALANCE_REQUEST,
  };
}

export function getBalanceSuccess(balance: string) {
  return {
    type: GET_BALANCE_SUCCESS,
    payload: { balance },
  };
}

export function getBalanceFailure(error: string) {
  return {
    type: GET_BALANCE_FAILURE,
    payload: { error },
  };
}

export function transferTokenRequest(to: string, amount: string) {
  return {
    type: TRANSFER_TOKEN_REQUEST,
    payload: { to, amount },
  };
}

export function transferTokenSuccess() {
  return {
    type: TRANSFER_TOKEN_SUCCESS,
  };
}

export function transferTokenFailure(error: string) {
  return {
    type: TRANSFER_TOKEN_FAILURE,
    payload: { error },
  };
}

export function mintTokenRequest(amount: string) {
  return {
    type: MINT_TOKEN_REQUEST,
    payload: { amount },
  };
}

export function mintTokenSuccess() {
  return {
    type: MINT_TOKEN_SUCCESS,
  };
}

export function mintTokenFailure(error: string) {
  return {
    type: MINT_TOKEN_FAILURE,
    payload: { error },
  };
}

export type ConnectWalletRequestAction = ReturnType<typeof connectWalletRequest>;
export type ConnectWalletSuccessAction = ReturnType<typeof connectWalletSuccess>;
export type ConnectWalletFailureAction = ReturnType<typeof connectWalletFailure>;
export type GetBalanceRequestAction = ReturnType<typeof getBalanceRequest>;
export type GetBalanceSuccessAction = ReturnType<typeof getBalanceSuccess>;
export type GetBalanceFailureAction = ReturnType<typeof getBalanceFailure>;
export type TransferTokenRequestAction = ReturnType<typeof transferTokenRequest>;
export type TransferTokenSuccessAction = ReturnType<typeof transferTokenSuccess>;
export type TransferTokenFailureAction = ReturnType<typeof transferTokenFailure>;
export type MintTokenRequestAction = ReturnType<typeof mintTokenRequest>;
export type MintTokenSuccessAction = ReturnType<typeof mintTokenSuccess>;
export type MintTokenFailureAction = ReturnType<typeof mintTokenFailure>;

export type WalletAction =
  | ConnectWalletRequestAction
  | ConnectWalletSuccessAction
  | ConnectWalletFailureAction
  | GetBalanceRequestAction
  | GetBalanceSuccessAction
  | GetBalanceFailureAction
  | TransferTokenRequestAction
  | TransferTokenSuccessAction
  | TransferTokenFailureAction
  | MintTokenRequestAction
  | MintTokenSuccessAction
  | MintTokenFailureAction;
