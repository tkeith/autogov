"use client";

import React, { useState } from "react";
import type { Proposal } from "~/lib/ProposalType";
import CodeModal from "~/app/_components/CodeModal";
import Spinner from "~/app/_components/Spinner";

const ProposalCard: React.FC<{ proposal: Proposal }> = ({ proposal }) => {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="mb-4 rounded border p-4 shadow-lg">
      <div className="mb-4">
        <h3 className="mb-4 text-xl font-bold">{proposal.title}</h3>
        <div className="rounded bg-gray-200 p-4">
          <p>{proposal.description}</p>
        </div>
      </div>
      <div className="mb-4">
        <span>Created at: {proposal.createdAt.toLocaleString()}</span>
      </div>
      <div className="mb-4">
        <span>Creator: {proposal.creatorAddress}</span>
      </div>
      <div className="mb-4">
        <span>Status: {proposal.status}</span>
      </div>
      <div className="mb-4">
        <div className="flex items-center space-x-2">
          <div>Code Generation Status: {proposal.codeGenerationStatus}</div>
          {proposal.codeGenerationStatus === "pending" && (
            <div>
              <Spinner />
            </div>
          )}
        </div>
        {proposal.codeGenerationStatus === "success" && (
          <button
            className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            onClick={() => setShowCode(true)}
          >
            View Code
          </button>
        )}
      </div>
      {showCode && (
        <CodeModal code={proposal.code} onClose={() => setShowCode(false)} />
      )}
    </div>
  );
};

export default ProposalCard;
