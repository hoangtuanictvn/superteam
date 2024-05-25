import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  // networks: {
  //   local: {
  //     url: "http://127.0.0.1:7545",
  //   },
  //   bsc: {
  //     url: "https://bsc-dataseed.binance.org/",
  //     chainId: 56,
  //     gas: 21513780,
  //     gasPrice: 5300000000,
  //     accounts: { mnemonic: process.env.PRIVATE_KEY || 'blank' }
  //   },
  //   testnet: {
  //     url: "https://data-seed-prebsc-1-s1.binance.org:8545",
  //     chainId: 97,
  //     gas: 21513780,
  //     gasPrice: 10000000000,
  //     accounts: { mnemonic: process.env.TEST_PRIVATE_KEY }
  //   }
  // },
  // gasReporter: {
  //   enabled: process.env.REPORT_GAS !== undefined,
  //   currency: "USD",
  // },
  // etherscan: {
  //   apiKey: process.env.BSCSCAN_API_KEY,
  // },
  // paths: {
  //   sources: "./contracts",
  //   tests: "./test",
  //   cache: "./cache",
  //   artifacts: "./artifacts"
  // },
  // mocha: {
  //   timeout: 20000
  // }
};

export default config;
