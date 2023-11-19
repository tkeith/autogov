"use client";

import React, { useContext, useState } from "react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import WalletAddressContext from "~/lib/WalletAddressContext";
import chains from "~/lib/chains";

export default function AddOrganizationPage() {
  const [name, setName] = useState("");
  const [chainId, setChainId] = useState<number>(
    chains?.[0] ? chains[0].chainId : 0,
  );
  const creatorAddress = useContext(WalletAddressContext);
  const addOrganizationMutation = api.addOrganization.useMutation();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await addOrganizationMutation.mutateAsync({
      name,
      creatorAddress,
      chainId: chainId,
    });
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
    >
      <div className="mb-4">
        <label className="mb-2 block">
          <span className="text-sm font-bold text-gray-700">Name:</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </div>
      <div className="mb-6">
        <label className="mb-2 block">
          <span className="text-sm font-bold text-gray-700">Chain:</span>
          <select
            value={chainId ?? ""}
            onChange={(e) => setChainId(Number(e.target.value))}
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
