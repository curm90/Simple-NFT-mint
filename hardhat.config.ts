import { HardhatUserConfig, vars } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const ETHERSCAN_API_KEY = vars.get('ETHERSCAN_API_KEY');
const ALCHEMY_API_KEY = vars.get('ALCHEMY_API_KEY');
const TEST_ACCOUNT_PRIVATE_KEY = vars.get('TEST_ACCOUNT_PRIVATE_KEY');

const config: HardhatUserConfig = {
  solidity: '0.8.24',

  networks: {
    hardhat: { chainId: 1337 },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [TEST_ACCOUNT_PRIVATE_KEY],
    },
  },

  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

export default config;
