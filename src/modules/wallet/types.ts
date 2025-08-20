import { ethers } from "ethers";

export type WalletState = {
  address: string | null;
  isConnecting: boolean;
  error: string | null;
  balance: string | null;
  isLoadingBalance: boolean;
  isTransferring: boolean;
  transferError: string | null;
  transferSuccess: boolean;
  isMinting: boolean;
  mintError: string | null;
};

export type WindowWithEthereum = Window & {
  ethereum: ethers.Eip1193Provider;
};
