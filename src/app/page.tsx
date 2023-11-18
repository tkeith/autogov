"use client";

import React from "react";
import AddOrganizationButton from "~/app/_components/AddOrganizationButton";
import OrganizationsList from "~/app/_components/OrganizationsList";

export default function Home() {
  return (
    <main>
      <AddOrganizationButton />
      <OrganizationsList />
    </main>
  );
}
