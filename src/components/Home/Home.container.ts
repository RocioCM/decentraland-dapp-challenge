import { connect } from "react-redux";
import { connectWalletRequest, getBalanceRequest, mintTokenRequest } from "../../modules/wallet/actions";
import {
  getAddress,
  getError,
  isConnected,
  isConnecting,
  getBalance,
  isLoadingBalance,
  isMinting,
  getMintError,
} from "../../modules/wallet/selectors";
import { RootState } from "../../modules/types";
import { MapDispatch, MapDispatchProps, MapStateProps } from "./Home.types";
import Home from "./Home";

const DEFAULT_MINT_AMOUNT = "1000";

const mapState = (state: RootState): MapStateProps => ({
  address: getAddress(state),
  isConnected: isConnected(state),
  isConnecting: isConnecting(state),
  error: getError(state),
  balance: getBalance(state),
  isLoadingBalance: isLoadingBalance(state),
  isMinting: isMinting(state),
  mintError: getMintError(state),
});

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onConnect: () => dispatch(connectWalletRequest()),
  onRefreshBalance: () => dispatch(getBalanceRequest()),
  onMint: () => dispatch(mintTokenRequest(DEFAULT_MINT_AMOUNT)), // Mint some DT tokens
});

export default connect(mapState, mapDispatch)(Home);
