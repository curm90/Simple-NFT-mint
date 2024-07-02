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

  describe('Minting NFTs', async function () {
    it('Should let owner mint NFTs', async function () {
      const { owner, myNft } = await deployContract();
      await myNft.connect(owner).createNFT();

      expect(await myNft.ownerOf(0)).to.equal(owner.address);
    });
    it('Should increment the tokenCounter after NFT is minted', async function () {
      const { owner, myNft } = await deployContract();

      expect(await myNft.tokenCounter()).to.equal(0);
      await myNft.connect(owner).createNFT();
      await myNft.connect(owner).createNFT();
      expect(await myNft.tokenCounter()).to.equal(2);
    });
    it('Should revert with custom error if non owner tries to mint NFT', async function () {
      const { addr1, myNft } = await deployContract();

      await expect(myNft.connect(addr1).createNFT())
        .to.be.revertedWithCustomError(myNft, 'OwnableUnauthorizedAccount')
        .withArgs(addr1.address);
    });
  });
});
