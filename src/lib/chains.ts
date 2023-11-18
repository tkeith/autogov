const chains = [
  {
    name: "Ethereum",
    chainId: 1,
    rpc: "https://mainnet.infura.io/v3/YOUR-PROJECT-ID",
  },
  {
    name: "Polygon",
    chainId: 137,
    rpc: "https://rpc-mainnet.maticvigil.com/",
  },
];

export const getChainName = (chainId: number) => {
  const chain = chains.find((chain) => chain.chainId === chainId);
  return chain ? chain.name : "Unknown chain";
};

export default chains;
