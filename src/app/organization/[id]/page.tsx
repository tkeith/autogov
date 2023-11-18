"use client";

import React, { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import OrganizationCard from "~/app/_components/OrganizationCard";
import ProposalList from "~/app/_components/ProposalList";
import CreateProposalForm from "~/app/_components/CreateProposalForm";
import type Proposal from "~/lib/ProposalType";

export default function Page({ params }: { params: { id: string } }) {
  const organizationId = parseInt(params.id);
  const organizationQuery = api.getOrganization.useQuery({
    id: organizationId,
  });
  const proposalsQuery = api.getProposalsByOrganization.useQuery({
    organizationId,
  });
  const [proposals, setProposals] = useState(proposalsQuery.data ?? []);

  useEffect(() => {
    organizationQuery.refetch().catch((error) => {
      console.error("Error fetching organization:", error);
    });
  }, [organizationQuery, organizationId]);

  useEffect(() => {
    proposalsQuery
      .refetch()
      .then((result) => {
        if (result.data) {
          setProposals(result.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching proposals:", error);
      });
  }, [proposalsQuery, organizationId]);

  const handleNewProposal = (proposal: Proposal) => {
    setProposals((prevProposals) => [...prevProposals, proposal]);
  };

  return (
    <div>
      <OrganizationCard
        organization={organizationQuery.data?.organization ?? null}
      />
      <CreateProposalForm
        organizationId={organizationId}
        onProposalCreated={handleNewProposal}
      />
      <ProposalList proposals={proposals} />
    </div>
  );
}
