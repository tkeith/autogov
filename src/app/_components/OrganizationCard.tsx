"use client";

import React, { useEffect } from "react";
import { getChainName } from "~/lib/chains";
import getBalance from "~/lib/getBalance";

export default function OrganizationCard({
  organization,
  includeBalance,
}: {
  organization: {
    id: number;
    name: string;
    creatorAddress: string;
    address: string;
    chainId: number;
    createdAt: Date;
  } | null;
  includeBalance?: boolean;
}) {
  const [balance, setBalance] = React.useState<string | null>(null);

  useEffect(() => {
    if (!organization) {
      return;
    }

    function refresh() {
      if (includeBalance) {
        void getBalance(organization!.chainId, organization!.address).then(
          (balance) => {
            setBalance(balance);
          },
        );
      }
    }
    refresh();
    const interval = setInterval(refresh, 5000);
    return () => clearInterval(interval);
  }, [organization, includeBalance]);

  if (!organization) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded border p-4 shadow-lg">
      <h2 className="text-xl font-bold">{organization.name}</h2>
      <p>Creator Address: {organization.creatorAddress}</p>
      <p>Organization Address: {organization.address}</p>
      <p>Chain: {getChainName(organization.chainId)}</p>
      {includeBalance && <p>Balance: {balance}</p>}
    </div>
  );
}
