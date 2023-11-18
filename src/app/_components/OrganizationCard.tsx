"use client";

import React from "react";

// Define the type for organization
type Organization = {
  name: string;
  walletAddress: string;
  chainName: string;
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
      <p>Chain Name: {organization.chainName}</p>
    </div>
  );
}
