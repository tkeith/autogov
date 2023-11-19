export type Proposal = {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  creatorAddress: string;
  organizationId: number;
  codeGenerationStatus: string;
  code: string;
  status: string;
  codeIpfsUrl: string;
};

export default Proposal;
