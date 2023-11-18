"use client";

import React, { useState } from "react";
import { api } from "~/trpc/react";
import { toast } from "react-hot-toast";
import type Proposal from "~/lib/ProposalType";

const CreateProposalForm: React.FC<{
  organizationId: number;
  onProposalCreated: (proposal: Proposal) => void;
}> = ({ organizationId, onProposalCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const createProposalMutation = api.createProposal.useMutation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!title || !description) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const newProposal = await createProposalMutation.mutateAsync({
        title,
        description,
        creatorAddress: "0x0", // Replace with actual creator address
        organizationId,
      });
      onProposalCreated(newProposal);
      setTitle("");
      setDescription("");
      toast.success("Proposal created successfully!");
    } catch (error) {
      toast.error(`Error creating proposal: ${String(error)}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
    >
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="title"
        >
          Title
        </label>
        <input
          className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          id="title"
          type="text"
          placeholder="Proposal Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          id="description"
          placeholder="Proposal Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          type="submit"
        >
          Create Proposal
        </button>
      </div>
    </form>
  );
};

export default CreateProposalForm;
