"use client";

import React, { useEffect } from "react";
import { api } from "~/trpc/react";
import OrganizationCard from "~/app/_components/OrganizationCard";
import Link from "next/link";

export default function OrganizationsList() {
  const organizationsQuery = api.getOrganizations.useQuery(null);

  useEffect(() => {
    organizationsQuery.refetch().catch((error) => {
      console.error("Error refetching organizations:", error);
    });
  }, [organizationsQuery]);

  return (
    <div className="flex flex-col space-y-4">
      {organizationsQuery.data?.organizations.map((organization, index) => (
        <Link key={index} href={`/organization/${organization.id}`}>
          <OrganizationCard organization={organization} />
        </Link>
      ))}
    </div>
  );
}
