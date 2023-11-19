const chains: {
  name: string;
  chainId: number;
  rpc: string;
  info?: string;
}[] = [
  {
    name: "Linea",
    chainId: 59144,
    rpc: "https://linea.drpc.org",
  },
  {
    name: "ZKEVM",
    chainId: 1101,
    rpc: "https://polygon-zkevm.drpc.org",
  },
  // ethereum
  {
    name: "Ethereum",
    chainId: 1,
    rpc: "https://eth.llamarpc.com",
  },
  // polygon
  {
    name: "Polygon",
    chainId: 137,
    rpc: "https://polygon-rpc.com",
    info: `ApeCoin token is 0xb7b31a6bc18e48888545ce79e83e06003be70930`,
  },
];

export const getChainName = (chainId: number) => {
  const chain = chains.find((chain) => chain.chainId === chainId);
  return chain ? chain.name : "Unknown chain";
};

export default chains;
