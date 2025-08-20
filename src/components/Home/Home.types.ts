import { Dispatch, UnknownAction } from "redux";
import { ConnectWalletRequestAction, GetBalanceRequestAction, MintTokenRequestAction } from "../../modules/wallet/actions";

export type Props = {
  address: string;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  balance: string;
  isLoadingBalance: boolean;
  isMinting: boolean;
  mintError: string | null;
  onConnect: () => void;
  onRefreshBalance: () => void;
  onMint: () => void;
};

export type MapStateProps = Pick<
  Props,
  "address" | "isConnected" | "isConnecting" | "error" | "balance" | "isLoadingBalance" | "isMinting" | "mintError"
>;
export type MapDispatchProps = Pick<Props, "onConnect" | "onRefreshBalance" | "onMint">;
export type MapDispatch = Dispatch<ConnectWalletRequestAction | GetBalanceRequestAction | MintTokenRequestAction | UnknownAction>;
