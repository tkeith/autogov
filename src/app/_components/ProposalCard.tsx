"use client";

import React, { useState } from "react";
import type { Proposal } from "~/lib/ProposalType";
import CodeModal from "~/app/_components/CodeModal";
import Spinner from "~/app/_components/Spinner";
import { api } from "~/trpc/react";

const getEmojiForStatus = (status: string) => {
  switch (status) {
    case "voting":
      return "🗳️"; // Emoji for voting
    case "implementing":
      return "🤖"; // Emoji for implementing
    case "implemented":
      return "✅"; // Emoji for implemented
    case "rejected":
      return "❌"; // Emoji for rejected
    default:
      return "";
  }
};

const ProposalCard: React.FC<{ proposal: Proposal }> = ({ proposal }) => {
  const [showCode, setShowCode] = useState(false);
  const [showCodeResult, setShowCodeResult] = useState(false);
  const voteOnProposalMutation = api.voteOnProposal.useMutation();

  const handleVote = async (vote: string) => {
    await voteOnProposalMutation.mutateAsync({
      proposalId: proposal.id,
      vote,
    });
  };

  return (
    <div className="mb-4 rounded border p-4 shadow-lg">
      <div className="mb-4">
        <h3 className="mb-4 text-xl font-bold">
          <span className="">{proposal.title}</span>
          <span className="ml-2">-</span>
          <span className="ml-2">{proposal.status}</span>
          <span className="ml-2">{getEmojiForStatus(proposal.status)}</span>
        </h3>
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
      <div className="mb-4 flex items-center space-x-2">
        <div>Status: {proposal.status}</div>
        {proposal.status === "implementing" && (
          <div>
            <Spinner />
          </div>
        )}
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
          <>
            <button
              className="mt-4 w-36 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              onClick={() => setShowCode(true)}
            >
              View Code
            </button>
            {proposal.status === "implemented" && (
              <button
                className="ml-4 mt-4 w-36 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                onClick={() => setShowCodeResult(true)}
              >
                View Result
              </button>
            )}
            {proposal.status === "voting" && (
              <>
                <button
                  className="ml-4 w-36 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700 focus:outline-none"
                  onClick={() => handleVote("yes")}
                >
                  Vote Yes
                </button>
                <button
                  className="ml-4 w-36 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 focus:outline-none"
                  onClick={() => handleVote("no")}
                >
                  Vote No
                </button>
              </>
            )}
          </>
        )}
      </div>

      {showCode && (
        <CodeModal
          code={proposal.code}
          codeIpfsUrl={proposal.codeIpfsUrl}
          onClose={() => setShowCode(false)}
        />
      )}

      {showCodeResult && (
        <CodeModal
          code={proposal.codeResult}
          codeIpfsUrl={proposal.codeResultIpfsUrl}
          onClose={() => setShowCodeResult(false)}
        />
      )}
    </div>
  );
};

export default ProposalCard;
