"use client";

import { useEffect, useState } from "react";
import Web3 from "web3";
import ConnectWalletInfoComponent from "~/app/_components/ConnectWalletInfoComponent";

export default function Web3Container({
  children,
}: {
  children: React.ReactNode;
}) {
  const [account, setAccount] = useState<string>("");

  useEffect(() => {
    void connectWallet();
  }, []);

  const connectWallet = async () => {
    // @ts-expect-error eth
    if (window.ethereum) {
      try {
        // Request account access
        // @ts-expect-error eth
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        await window.ethereum.enable();

        // We don't know window.ethereum prior to compiling, so we ignore this line
        // @ts-expect-error eth
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const web3 = new Web3(window.ethereum);

        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0] ?? "");
      } catch (error) {
        console.error("User denied account access");
      }
    }
    // Non-dapp browsers...
    else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!",
      );
    }
  };

  return (
    <>
      {account ? (
        <>
          <p>Your account: {account}</p>
          {children}
        </>
      ) : (
        <ConnectWalletInfoComponent />
      )}
    </>
  );
}
