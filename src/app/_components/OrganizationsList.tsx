"use client";

import React from "react";
import dummyOrganizationsData from "~/lib/dummyOrganizationsData";
import OrganizationCard from "~/app/_components/OrganizationCard";

export default function OrganizationsList() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {dummyOrganizationsData.map((organization, index) => (
        <OrganizationCard key={index} organization={organization} />
      ))}
    </div>
  );
}
