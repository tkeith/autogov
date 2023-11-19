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
    info: `ApeCoin ERC-20 token is 0x4d224452801aced8b2f0aebe155379bb5d594381 with 18 decimals. USDC ERC-20 token is 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48 with 6 decimals. sDAI ERC-20 token is 0x83f20f44975d03b1b09e64809b757c47f942beea with 18 decimals.

1inch has a swap API like this: https://api.1inch.dev/swap/v5.2/\${chainId}/swap?src=\${swapFromTokenAddress}&dst=\${swapToTokenAddress}&amount=\${swapAmount}&from=\${caller}&slippage=1&disableEstimate=false&includeTokensInfo=true&includeProtocols=true&compatibility=true&allowPartialFill=false
- Use Authorization: Bearer MVDMYK67zM4FFHi1W1zeIxqtJTKY7muF
- amount is of the sending token
- You must approve spending of the token by spender 0x1111111254eeb25477b68fb85ed929f73a960582 using ERC-20 approve before calling the API
- From the response json, you have tx, which you can use to execute the swap with Ethers
`,
  },
  {
    name: "Sepolia",
    chainId: 11155111,
    rpc: "https://1rpc.io/sepolia",
    info: `
AAVE ERC-20 token: 0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9 with 18 decimals

# AAVE/USD oracle
Oracle address: 0xED4C91FC28B48E2Cf98b59668408EAeE44665511
Oracle ABI: ["function read() external view returns (uint256)"]

Kisser address: 0x0Dcc19657007713483A5cA76e6A7bbe5f56EA37d
Kisser ABI: ["function selfKiss(address oracle) external"]


To read the oracle, call selfKiss first on the Kisser (passing in the oracle address, and ignoring errors), and then call read on the oracle and shift the decimal point 18 spots to the left.
`,
  },
  // polygon
  {
    name: "Polygon",
    chainId: 137,
    rpc: "https://polygon-rpc.com",
    info: `ApeCoin token is 0xb7b31a6bc18e48888545ce79e83e06003be70930`,
  },
  {
    name: "Arbitrum",
    chainId: 42161,
    rpc: "https://1rpc.io/arb",
  },
];

export const getChainName = (chainId: number) => {
  const chain = chains.find((chain) => chain.chainId === chainId);
  return chain ? chain.name : "Unknown chain";
};

export default chains;
