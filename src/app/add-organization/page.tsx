"use client";

import React, { useContext, useState } from "react";
import { ethers } from "ethers";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import WalletAddressContext from "~/lib/WalletAddressContext";
import chains from "~/lib/chains";
import toast from "react-hot-toast";

export default function AddOrganizationPage() {
  const [name, setName] = useState("");
  const [chainId, setChainId] = useState("");
  const creatorAddress = useContext(WalletAddressContext);
  const addOrganizationMutation = api.addOrganization.useMutation();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const keys = ethers.Wallet.createRandom();
    const chainExists = chains.some(
      (chain) => chain.chainId === Number(chainId),
    );
    if (!chainExists) {
      toast.error("Invalid chain ID");
      return;
    }
    await addOrganizationMutation.mutateAsync({
      name,
      creatorAddress,
      chainId,
      privKey: keys.privateKey,
      pubKey: keys.publicKey,
    });
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
    >
      <div className="mb-4">
        <label className="mb-2 block text-sm font-bold text-gray-700">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </div>
      <div className="mb-6">
        <label className="mb-2 block text-sm font-bold text-gray-700">
          Chain:
          <select
            value={chainId}
            onChange={(e) => setChainId(e.target.value)}
            className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {chains.map((chain) => (
              <option key={chain.chainId} value={chain.chainId}>
                {chain.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="flex items-center justify-between">
        <input
          type="submit"
          value="Submit"
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </form>
  );
}
