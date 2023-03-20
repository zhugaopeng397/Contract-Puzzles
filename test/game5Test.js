const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();
    const account = ethers.provider.getSigner(0);

    return { game, account };
  }
  it('should be a winner', async function () {
    const { game, account } = await loadFixture(deployContractAndSetVariables);

    let find = false;
    while (!find) {
      const wallet = ethers.Wallet.createRandom().connect(ethers.provider);
      console.log(wallet.address);
      if (wallet.address.substring(2, 4) == "00") {
        console.log("ok",wallet.address);
        await account.sendTransaction({
          to: wallet.address, 
          value: ethers.utils.parseEther("1.0")
        })
        await game.connect(wallet).win();
        find = true;
      }
    }
    // good luck

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});


