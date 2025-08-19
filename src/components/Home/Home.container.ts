import { connect } from "react-redux";
import { connectWalletRequest, getBalanceRequest } from "../../modules/wallet/actions";
import { getAddress, getError, isConnected, isConnecting, getBalance, isLoadingBalance } from "../../modules/wallet/selectors";
import { RootState } from "../../modules/types";
import { MapDispatch, MapDispatchProps, MapStateProps } from "./Home.types";
import Home from "./Home";

const mapState = (state: RootState): MapStateProps => ({
  address: getAddress(state),
  isConnected: isConnected(state),
  isConnecting: isConnecting(state),
  error: getError(state),
  balance: getBalance(state),
  isLoadingBalance: isLoadingBalance(state),
});

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onConnect: () => dispatch(connectWalletRequest()),
  onRefreshBalance: () => dispatch(getBalanceRequest()),
});

export default connect(mapState, mapDispatch)(Home);
