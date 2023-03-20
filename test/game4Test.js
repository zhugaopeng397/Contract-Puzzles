const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();

    return { game };
  }
  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    const x = ethers.provider.getSigner(0);
    const y = ethers.provider.getSigner(1);

    const addressX = await x.getAddress();
    const addressY = await y.getAddress();

    await game.connect(y).write(addressX);
    await game.connect(x).win(addressY);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
