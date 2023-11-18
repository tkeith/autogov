"use client";

import React from "react";
import { api } from "~/trpc/react";
import OrganizationCard from "~/app/_components/OrganizationCard";
import Link from "next/link";
import AddOrganizationButton from "~/app/_components/AddOrganizationButton";

export default function OrganizationsList() {
  const organizationsQuery = api.getOrganizations.useQuery(null);

  return (
    <div className="flex flex-col space-y-4">
      {organizationsQuery.data?.organizations.map((organization, index) => (
        <Link key={index} href={`/organization/${organization.id}`}>
          <OrganizationCard organization={organization} />
        </Link>
      ))}
      <div className="mt-4">
        <AddOrganizationButton />
      </div>
    </div>
  );
}
