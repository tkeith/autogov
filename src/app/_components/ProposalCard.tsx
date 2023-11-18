import React from "react";
import type { Proposal } from "~/lib/ProposalType";

const ProposalCard: React.FC<{ proposal: Proposal }> = ({ proposal }) => {
  return (
    <div className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
      <div className="mb-4">
        <h3 className="text-xl font-bold">{proposal.title}</h3>
        <p>{proposal.description}</p>
      </div>
      <div className="mb-4">
        <span>Created at: {proposal.createdAt.toLocaleString()}</span>
      </div>
      <div className="mb-4">
        <span>Creator: {proposal.creatorAddress}</span>
      </div>
      <div className="mb-4">
        <span>Code Generation Status: {proposal.codeGenerationStatus}</span>
        {proposal.codeGenerationStatus === "success" && (
          <span>Code: {proposal.code}</span>
        )}
      </div>
    </div>
  );
};

export default ProposalCard;
