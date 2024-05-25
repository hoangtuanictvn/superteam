import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SolanaVote } from "../target/types/solana_vote";
import {PublicKey} from "@solana/web3.js";
import {expect} from "chai";

function getRandomString(length: number = 10): string {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset[randomIndex];
  }

  return randomString;
}

describe("solana-vote", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolanaVote as Program<SolanaVote>;

  it("Is initialized!", async () => {
    const tx = await program.methods.initCandidate(
        getRandomString()
    ).rpc();
    console.log("Your transaction signature", tx);
  });

  describe("Vote", async () => {
    it('init right candidate', async () => {
      const candidateName: string = getRandomString()
      await program.methods.initCandidate(
          candidateName
      ).rpc();

      const [candidatePda] = PublicKey.findProgramAddressSync(
          [Buffer.from(candidateName)],
          program.programId
      );
      const cd = await program.account.candidate.all()
      const address = cd.map((acc) => acc.publicKey.toString())
      expect(address.includes(candidatePda.toString())).eq(true)
    });

    it('vote right candidate', async () => {
      const candidateName: string = getRandomString()
      await program.methods.initCandidate(
          candidateName
      ).rpc();
      const tx = await program.methods.voteForCandidate(
          candidateName
      ).rpc();
      console.log(tx)
      // await program.methods.voteForCandidate(
      //     candidateName
      // ).rpc();
      const [candidatePda] = PublicKey.findProgramAddressSync(
          [Buffer.from(candidateName)],
          program.programId
      );

      const cd = await program.account.candidate.fetch(candidatePda)
      expect(cd.votesReceived).eq(2)
    });
  });
});
