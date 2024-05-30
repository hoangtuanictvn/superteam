import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("Vote", function () {
  async function deployVote() {
    const [deployer, exampleCandidate] = await hre.ethers.getSigners();

    const Voting = await hre.ethers.getContractFactory("Voting");
    const voting = await Voting.deploy([exampleCandidate.address])

    return { voting, deployer, exampleCandidate };
  }

  describe("Vote", function () {
    it("init right candidate", async function () {
      const { voting, deployer, exampleCandidate } = await loadFixture(deployVote);
      expect(await voting.candidateList(0)).eq(exampleCandidate.address)
    });

    it("vote right candidate", async function () {
      const { voting, deployer, exampleCandidate } = await loadFixture(deployVote);
      await voting.voteForCandidate(exampleCandidate.address)
      await voting.voteForCandidate(exampleCandidate.address)
      expect(await voting.totalVotesFor(exampleCandidate.address)).to.equal(1);
    });
  });
});
