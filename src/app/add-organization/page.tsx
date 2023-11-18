"use client";

import React, { useState } from "react";
import { api } from "~/trpc/react";

export default function AddOrganizationPage() {
  const [name, setName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [chainId, setChainId] = useState("");
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
        Wallet Address:
        <input
          type="text"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
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
