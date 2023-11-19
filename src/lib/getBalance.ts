import { ethers } from "ethers";
import chains from "~/lib/chains";

async function getBalance(chainId: number, address: string) {
  const chain = chains.find((chain) => chain.chainId === chainId);
  if (!chain) {
    throw Error("unexpected no chain");
  }

  // Create a provider
  const provider = new ethers.providers.JsonRpcProvider(chain.rpc);

  // Get the balance
  const balance = await provider.getBalance(address);

  // Convert the balance from Wei to Ether
  let balanceInEther = ethers.utils.formatEther(balance);

  console.log(`Balance of ${address}: ${balanceInEther}`);

  if (balanceInEther.length > 8) {
    balanceInEther = balanceInEther.substr(0, 8);
  }
  return balanceInEther;
}

export default getBalance;
