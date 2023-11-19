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
    info: `ApeCoin ERC-20 token is 0x4d224452801aced8b2f0aebe155379bb5d594381 with 18 decimals. USDC ERC-20 token is 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48 with 6 decimals. sDAI ERC-20 token is 0x83f20f44975d03b1b09e64809b757c47f942beea with 18 decimals. GHO ERC-20 token is 0x40D16FC0246aD3160Ccc09B8D0D3A2cD28aE6C2f with 18 decimals.

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


To read the oracle, call selfKiss first on the Kisser (passing in the oracle address, and ignoring errors), and then call read on the oracle and divide by 1e18.
`,
  },
  // polygon
  {
    name: "Polygon",
    chainId: 137,
    rpc: "https://polygon-rpc.com",
    info: `ApeCoin token is 0xb7b31a6bc18e48888545ce79e83e06003be70930. The GnosisSafeProxyFactory address is 0xa6b71e26c5e0845f74c812102ca7114b6a896ab2 and the ABI is:
    [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract GnosisSafeProxy","name":"proxy","type":"address"},{"indexed":false,"internalType":"address","name":"singleton","type":"address"}],"name":"ProxyCreation","type":"event"},{"inputs":[{"internalType":"address","name":"_singleton","type":"address"},{"internalType":"bytes","name":"initializer","type":"bytes"},{"internalType":"uint256","name":"saltNonce","type":"uint256"}],"name":"calculateCreateProxyWithNonceAddress","outputs":[{"internalType":"contract GnosisSafeProxy","name":"proxy","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"singleton","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"createProxy","outputs":[{"internalType":"contract GnosisSafeProxy","name":"proxy","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_singleton","type":"address"},{"internalType":"bytes","name":"initializer","type":"bytes"},{"internalType":"uint256","name":"saltNonce","type":"uint256"},{"internalType":"contract IProxyCreationCallback","name":"callback","type":"address"}],"name":"createProxyWithCallback","outputs":[{"internalType":"contract GnosisSafeProxy","name":"proxy","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_singleton","type":"address"},{"internalType":"bytes","name":"initializer","type":"bytes"},{"internalType":"uint256","name":"saltNonce","type":"uint256"}],"name":"createProxyWithNonce","outputs":[{"internalType":"contract GnosisSafeProxy","name":"proxy","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"proxyCreationCode","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"proxyRuntimeCode","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"pure","type":"function"}]
`,
  },
  {
    name: "Arbitrum",
    chainId: 42161,
    rpc: "https://1rpc.io/arb",
  },
  {
    name: "Scroll Sepolia",
    chainId: 534351,
    rpc: "https://sepolia-rpc.scroll.io",
  },
  {
    name: "Mantle",
    chainId: 5000,
    rpc: "https://1rpc.io/mantle",
    info: `

To get the ETH price in USD call this API3 Oracle: 0x26690F9f17FdC26D419371315bc17950a0FC90eD with ABI ["function read() external view returns (int224 value, uint32 timestamp)"] and divide by 1e18
    `,
  },
  {
    name: "BASE",
    chainId: 8453,
    rpc: "https://base.llamarpc.com",
  },
  {
    name: "NEON EVM DevNet",
    chainId: 245022926,
    rpc: "https://proxy.devnet.neonlabs.org/solana",
  },
  {
    name: "XDC Network",
    chainId: 50,
    rpc: "https://rpc.ankr.com/xdc",
    info: `

0x951857744785e80e2de051c32ee7b25f9c458c42 is ERC-20 Wrapped XDC with 18 decimals. 0xd4b5f10d61916bd6e0860144a91ac658de8a1437 is ERC-20 USDT with 6 decimals.

To interact with Fathom (compatible with Uniswap V2), first call the tickers API: GET https://api.fathom.fi/tickers

Find this pool (by pool_id) in the response array: {
  "pool_id": "0xfcabba53dac7b6b19714c7d741a46f6dad260107",
  "base_currency": "0x951857744785e80e2de051c32ee7b25f9c458c42",
  "target_currency": "0xd4b5f10d61916bd6e0860144a91ac658de8a1437",
  "ticker_id": "0x951857744785e80e2de051c32ee7b25f9c458c42_0xd4b5f10d61916bd6e0860144a91ac658de8a1437",
  "last_price": 0.002249352085719417,
  "liquidity_in_usd": "130391.299714",
  "base_volume": 31341.923092440527,
  "target_volume": 13933755.987523114
}

Then, after the appropriate ERC-20 approval call, you can perform swaps using the Fathom (compatible with Uniswap V2) router at 0x7e5b4c238a904329596c4094877d48868d739963 with ABI ["function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline
) external returns (uint[] memory amounts)"]

`,
  },
  {
    name: "Gnosis Chain",
    chainId: 100,
    rpc: "https://gnosis.drpc.org",
  },
];

export const getChainName = (chainId: number) => {
  const chain = chains.find((chain) => chain.chainId === chainId);
  return chain ? chain.name : "Unknown chain";
};

export default chains;
