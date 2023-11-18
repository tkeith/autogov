export type Proposal = {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  creatorAddress: string;
  yesVotes: number;
  noVotes: number;
  organizationId: number;
};

export default Proposal;
