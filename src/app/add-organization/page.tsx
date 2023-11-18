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
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Chain ID:
        <input
          type="text"
          value={chainId}
          onChange={(e) => setChainId(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
