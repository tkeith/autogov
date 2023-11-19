"use client";

import React from "react";
import { api } from "~/trpc/react";
import OrganizationCard from "~/app/_components/OrganizationCard";
import ProposalList from "~/app/_components/ProposalList";
import CreateProposalForm from "~/app/_components/CreateProposalForm";

export default function Page({ params }: { params: { id: string } }) {
  const organizationId = parseInt(params.id);
  const organizationQuery = api.getOrganization.useQuery({
    id: organizationId,
  });
  const proposalsQuery = api.getProposalsByOrganization.useQuery(
    {
      organizationId,
    },
    { refetchInterval: 1000 },
  );

  async function handleNewProposal() {
    await proposalsQuery.refetch();
  }

  return (
    <div>
      <div className="mb-4">
        <OrganizationCard
          organization={organizationQuery.data?.organization ?? null}
        />
      </div>
      <CreateProposalForm
        organizationId={organizationId}
        onProposalCreated={handleNewProposal}
      />
      {proposalsQuery.data && <ProposalList proposals={proposalsQuery.data} />}
    </div>
  );
}
