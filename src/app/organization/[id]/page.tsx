"use client";

import React, { useEffect } from "react";
import { api } from "~/trpc/react";
import OrganizationCard from "~/app/_components/OrganizationCard";

export default function Page({ params }: { params: { id: string } }) {
  const organizationQuery = api.getOrganization.useQuery({
    id: parseInt(params.id),
  });

  useEffect(() => {
    organizationQuery.refetch().catch((error) => {
      console.error("Error fetching organization:", error);
    });
  }, [organizationQuery, params.id]);

  return (
    <div>
      <OrganizationCard
        organization={organizationQuery.data?.organization ?? null}
      />
    </div>
  );
}
