"use client";

import React, { useContext, useState } from "react";
import { api } from "~/trpc/react";
import WalletAddressContext from "~/lib/WalletAddressContext";

export default function AddOrganizationPage() {
  const [name, setName] = useState("");
  const [chainId, setChainId] = useState("");
  const walletAddress = useContext(WalletAddressContext);
  const addOrganizationMutation = api.addOrganization.useMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await addOrganizationMutation.mutateAsync({ name, walletAddress, chainId });
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
          Chain ID:
          <input
            type="text"
            value={chainId}
            onChange={(e) => setChainId(e.target.value)}
            className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
