"use client";

import React from "react";

// Define the type for organization
type Organization = {
  id: number;
  name: string;
  walletAddress: string;
  chainId: number;
  createdAt: Date;
};

export default function OrganizationCard({
  organization,
}: {
  organization: Organization;
}) {
  return (
    <div className="rounded border p-4 shadow-lg">
      <h2 className="text-xl font-bold">{organization.name}</h2>
      <p>Wallet Address: {organization.walletAddress}</p>
      <p>Chain ID: {organization.chainId}</p>
      <p>Created At: {new Date(organization.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
