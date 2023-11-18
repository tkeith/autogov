import { ethers } from "ethers";
import { db } from "~/server/db";

const getOrganizationAddress = async (id: number) => {
  const organization = await db.organization.findUnique({
    where: { id },
    select: { privKey: true },
  });

  if (!organization) {
    throw new Error("Organization not found");
  }

  const wallet = new ethers.Wallet(organization.privKey);
  return wallet.address;
};

export default getOrganizationAddress;
