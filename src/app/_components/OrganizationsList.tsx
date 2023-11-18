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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {organizationsQuery.data?.organizations.map((organization, index) => (
        <Link key={index} href={`/organization/${organization.id}`}>
          <a>
            <OrganizationCard organization={organization} />
          </a>
        </Link>
      ))}
    </div>
  );
}
