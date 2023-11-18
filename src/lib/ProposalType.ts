export type Proposal = {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  creatorAddress: string;
  organizationId: number;
};

export default Proposal;
