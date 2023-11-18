import React from "react";
import ProposalCard from "~/app/_components/ProposalCard";
import type { Proposal } from "~/lib/ProposalType";

const ProposalList: React.FC<{ proposals: Proposal[] }> = ({ proposals }) => {
  return (
    <div>
      {proposals.map((proposal) => (
        <ProposalCard key={proposal.id} proposal={proposal} />
      ))}
    </div>
  );
};

export default ProposalList;
