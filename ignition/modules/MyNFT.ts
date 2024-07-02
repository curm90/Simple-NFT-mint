import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const MyNFTModule = buildModule('MyNFTModule', (m) => {
  const owner = m.getAccount(0);
  const myNFT = m.contract('MyNFT', [owner]);

  return { myNFT };
});

export default MyNFTModule;
