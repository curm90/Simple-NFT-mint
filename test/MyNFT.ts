import { expect } from 'chai';
import hre from 'hardhat';

describe('MyMFT', function () {
  async function deployContract() {
    const MyNft = await hre.ethers.getContractFactory('MyNFT');
    const [owner, addr1, addr2] = await hre.ethers.getSigners();

    const myNft = await MyNft.deploy(owner.address);

    return { owner, addr1, addr2, myNft };
  }

  describe('Deployment', async function () {
    it('Should set the right owner', async function () {
      const { owner, myNft } = await deployContract();

      expect(await myNft.owner()).to.equal(owner.address);
    });
    it('Should set the tokenCounter correctly', async function () {
      const { myNft } = await deployContract();

      expect(await myNft.tokenCounter()).to.equal(0);
    });
  });
});
