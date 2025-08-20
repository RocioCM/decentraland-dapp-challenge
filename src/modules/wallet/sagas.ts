import { ethers } from "ethers";
import { call, put, takeEvery, select } from "redux-saga/effects";
import { isErrorWithMessage } from "../utils";
import {
  connectWalletFailure,
  connectWalletSuccess,
  CONNECT_WALLET_REQUEST,
  getBalanceSuccess,
  getBalanceFailure,
  GET_BALANCE_REQUEST,
  transferTokenSuccess,
  transferTokenFailure,
  TRANSFER_TOKEN_REQUEST,
  TransferTokenRequestAction,
  getBalanceRequest,
  mintTokenSuccess,
  mintTokenFailure,
  MINT_TOKEN_REQUEST,
  MintTokenRequestAction,
} from "./actions";
import { WindowWithEthereum } from "./types";
import { getAddress } from "./selectors";

// The regular `window` object with `ethereum` injected by MetaMask
const windowWithEthereum = window as unknown as WindowWithEthereum;

/* This is the Dummy Token address, it identifies the token contract once deployed */
export const TOKEN_ADDRESS = import.meta.env.VITE_TOKEN_ADDRESS;
if (!TOKEN_ADDRESS) {
  console.error(`Missing env variable VITE_TOKEN_ADDRESS`);
}

/* This is the Dummy Token ABI (application binary interface)
  You will need this to interact with the deployed contract, ie:

  const provider = new.ethers.providers.Web3Provider(window.ethereum)
  const token = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider)
  const balance = await token.balanceOf(walletAddress) // --> returns the balance of DummyToken of the walletAddress
*/
export const TOKEN_ABI = [
  "function symbol() view returns (string)",
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount)",
  "function mint(uint256 amount)",
];

export function* walletSaga() {
  yield takeEvery(CONNECT_WALLET_REQUEST, handleConnectWalletRequest);
  yield takeEvery(GET_BALANCE_REQUEST, handleGetBalanceRequest);
  yield takeEvery(TRANSFER_TOKEN_REQUEST, handleTransferTokenRequest);
  yield takeEvery(MINT_TOKEN_REQUEST, handleMintTokenRequest);
}

function* handleConnectWalletRequest() {
  try {
    const provider = new ethers.BrowserProvider(windowWithEthereum.ethereum);
    yield call([provider, "send"], "eth_requestAccounts", []) as Awaited<ReturnType<typeof provider.send>>;
    const signer = (yield call([provider, "getSigner"])) as Awaited<ReturnType<typeof provider.getSigner>>;

    const address = (yield call([signer, "getAddress"])) as Awaited<ReturnType<typeof signer.getAddress>>;
    yield put(connectWalletSuccess(address));

    // Auto-fetch balance after successful connection
    yield put(getBalanceRequest());
  } catch (error) {
    yield put(connectWalletFailure(isErrorWithMessage(error) ? error.message : "Unknown error"));
  }
}

function* handleGetBalanceRequest() {
  try {
    const address: string = yield select(getAddress);
    if (!address) {
      yield put(getBalanceFailure("Wallet not connected"));
      return;
    }

    const provider = new ethers.BrowserProvider(windowWithEthereum.ethereum);
    const token = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider);
    const getBalance = token.balanceOf;
    const balance = (yield call(getBalance, address)) as bigint;

    // Convert from wei to ether (assuming 18 decimals)
    const formattedBalance = ethers.formatEther(balance);
    yield put(getBalanceSuccess(formattedBalance));
  } catch (error) {
    yield put(getBalanceFailure(isErrorWithMessage(error) ? error.message : "Failed to fetch balance"));
  }
}

function* handleTransferTokenRequest(action: TransferTokenRequestAction) {
  try {
    const { to, amount } = action.payload;

    const provider = new ethers.BrowserProvider(windowWithEthereum.ethereum);
    const signer = (yield call([provider, "getSigner"])) as Awaited<ReturnType<typeof provider.getSigner>>;
    const token = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);

    // Convert amount from ether to wei (assuming 18 decimals)
    const amountWei = ethers.parseEther(amount);

    const tx = (yield call(token.transfer, to, amountWei)) as ethers.TransactionResponse;
    yield call([tx, "wait"]); // Wait for transaction confirmation

    yield put(transferTokenSuccess());

    // Refresh balance after successful transfer
    yield put(getBalanceRequest());
  } catch (error) {
    yield put(transferTokenFailure(isErrorWithMessage(error) ? error.message : "Transfer failed"));
  }
}

function* handleMintTokenRequest(action: MintTokenRequestAction) {
  try {
    const { amount } = action.payload;

    const provider = new ethers.BrowserProvider(windowWithEthereum.ethereum);
    const signer = (yield call([provider, "getSigner"])) as Awaited<ReturnType<typeof provider.getSigner>>;
    const token = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);

    // Convert amount from ether to wei (assuming 18 decimals)
    const amountWei = ethers.parseEther(amount);

    const tx = (yield call(token.mint, amountWei)) as ethers.TransactionResponse;
    yield call([tx, "wait"]); // Wait for transaction confirmation

    yield put(mintTokenSuccess());

    // Refresh balance after successful mint
    yield put(getBalanceRequest());
  } catch (error) {
    yield put(mintTokenFailure(isErrorWithMessage(error) ? error.message : "Mint failed"));
  }
}
