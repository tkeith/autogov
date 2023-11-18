"use client";

import React, { useEffect } from "react";
import { api } from "~/trpc/react";
import OrganizationCard from "~/app/_components/OrganizationCard";

export default function OrganizationsList() {
  const organizationsQuery = api.getOrganizations.useQuery(null);
  const addOrganizationMutation = api.addOrganization.useMutation();

  useEffect(() => {
    organizationsQuery.refetch().catch((error) => {
      console.error("Error refetching organizations:", error);
    });
  }, [organizationsQuery]);

  useEffect(() => {
    addOrganizationMutation
      .mutateAsync({
        name: "Organization Name",
        walletAddress: "0x123...",
        chainId: "1",
      })
      .then(() => {
        organizationsQuery.refetch().catch((error) => {
          console.error("Error refetching organizations after adding:", error);
        });
      })
      .catch((error) => {
        console.error("Error adding organization:", error);
      });
  }, [addOrganizationMutation, organizationsQuery]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {organizationsQuery.data?.organizations.map((organization, index) => (
        <OrganizationCard key={index} organization={organization} />
      ))}
    </div>
  );
}
