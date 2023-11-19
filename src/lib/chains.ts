const chains: {
  name: string;
  chainId: number;
  rpc: string;
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
];

export const getChainName = (chainId: number) => {
  const chain = chains.find((chain) => chain.chainId === chainId);
  return chain ? chain.name : "Unknown chain";
};

export default chains;
