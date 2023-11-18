"use client";

import { useContext } from "react";
import WalletAddressContext from "~/lib/WalletAddressContext";

export default function ConnectWalletInfoComponent() {
  const walletAddress = useContext(WalletAddressContext);
  return (
    <div>
      {walletAddress
        ? `Wallet Address: ${walletAddress}`
        : "Connect your wallet to continue"}
    </div>
  );
}
