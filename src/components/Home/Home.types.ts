import { Dispatch, UnknownAction } from "redux";
import { ConnectWalletRequestAction, GetBalanceRequestAction } from "../../modules/wallet/actions";

export type Props = {
  address: string;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  balance: string;
  isLoadingBalance: boolean;
  onConnect: () => void;
  onRefreshBalance: () => void;
};

export type MapStateProps = Pick<Props, "address" | "isConnected" | "isConnecting" | "error" | "balance" | "isLoadingBalance">;
export type MapDispatchProps = Pick<Props, "onConnect" | "onRefreshBalance">;
export type MapDispatch = Dispatch<ConnectWalletRequestAction | GetBalanceRequestAction | UnknownAction>;
