"use client";

import React from "react";
import { getChainName } from "~/lib/chains";

// Define the type for organization
type Organization = {
  id: number;
  name: string;
  creatorAddress: string;
  chainId: number;
  createdAt: Date;
};

export default function OrganizationCard({
  organization,
}: {
  organization: Organization | null;
}) {
  if (!organization) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded border p-4 shadow-lg">
      <h2 className="text-xl font-bold">{organization.name}</h2>
      <p>Creator Address: {organization.creatorAddress}</p>
      <p>Chain: {getChainName(organization.chainId)}</p>
      <p>Created At: {new Date(organization.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
