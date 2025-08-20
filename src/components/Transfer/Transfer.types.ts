import { Dispatch, UnknownAction } from "redux";
import { TransferTokenRequestAction } from "../../modules/wallet/actions";

export type Props = {
  isConnected: boolean;
  balance: string;
  isLoadingBalance: boolean;
  isTransferring: boolean;
  transferError: string | null;
  transferSuccess: boolean;
  onTransfer: (to: string, amount: string) => void;
};

export type MapStateProps = Pick<Props, "isConnected" | "balance" | "isLoadingBalance" | "isTransferring" | "transferError" | "transferSuccess">;
export type MapDispatchProps = Pick<Props, "onTransfer">;
export type MapDispatch = Dispatch<TransferTokenRequestAction | UnknownAction>;
