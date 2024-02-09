import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import '@nomicfoundation/hardhat-ethers';
import 'hardhat-deploy';

const accounts = process.env.PRIVATE_KEY ?  [process.env.PRIVATE_KEY]:[];

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  typechain: {
    outDir: "app/src/typechain-types",
  },
  networks: {
    testnet: {
      // chainId: 80001,
      // url: 'https://polygon-testnet.public.blastapi.io',

      chainId: 420, // Optimism Goerli
      // url: 'https://goerli.optimism.io',
      url: 'https://endpoints.omniatech.io/v1/op/goerli/public',
      // optimism goerli deployment is only reliable if a gas price is set - the gas oracles are not reliable
      gasPrice: 1_000_000_000,

      saveDeployments: true,
      accounts,
    },
    testnetLiveness: {
      // chainId: 80001,
      // url: 'https://polygon-testnet.public.blastapi.io',

      chainId: 420, // Optimism Goerli
      // url: 'https://goerli.optimism.io',
      url: 'https://endpoints.omniatech.io/v1/op/goerli/public',
      // optimism goerli deployment is only reliable if a gas price is set - the gas oracles are not reliable
      gasPrice: 1_000_000_000,

      saveDeployments: true,
      accounts,
    }
  },
  namedAccounts: {
    deployer: {
      default: 0
    }
  }
};

export default config;
