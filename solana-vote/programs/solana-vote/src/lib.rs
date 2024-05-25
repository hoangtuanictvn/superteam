use anchor_lang::prelude::*;

declare_id!("FdkMszDtBfxzkJci7Rdd8ubRoUYSa897X8CBMLnGrmg");

const OWNER: &str = "AjCW1equGPXJveDx1Fy2K8aM8516h3PwKovVPB3WGkyN";

#[program]
pub mod solana_vote {
    use std::fmt::LowerExp;
    use anchor_lang::system_program::create_account;
    use super::*;

    #[access_control(check(&ctx))]
    pub fn init_candidate(ctx: Context<InitializeCandidate>, _candidate_name: String) -> Result<()> {
        Ok(())
    }

    pub fn vote_for_candidate(ctx: Context<VoteCandidate>, _candidate_name: String) -> Result<()> {
        // nhận _candidate_name
        // [candidate_name,program_id] -> canonical pda -> địa chỉ của candidate account
        // -> load AccountInfo (dựa trên PDA)
        // Deserialize PDA -> map giá trị của votes_received và model Candidate -> object candidate

        // candidate.votes_received += 1;

        // Serialize candiate
        // lưu vào Account

        ctx.accounts.candidate.votes_received += 1;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(_candidate_name: String)]
pub struct InitializeCandidate<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(
        init,
        space = 8 + Candidate::INIT_SPACE,
        payer = payer,
        seeds = [_candidate_name.as_bytes().as_ref()],
        bump,
        owner = ID
    )]
    pub candidate: Account<'info, Candidate>,
    pub system_program: Program<'info, System>,
}

// Bảng User
// uid - vote_counter
// 1 - 0

// Canonical bump

#[derive(Accounts)]
#[instruction(_candidate_name: String)]
pub struct VoteCandidate<'info> {
    #[account(
        mut,
        seeds = [_candidate_name.as_bytes().as_ref()],
        bump,
    )]
    pub candidate: Account<'info, Candidate>,
}

#[account]
#[derive(InitSpace)]
pub struct Candidate {
    pub votes_received: u8,
}

fn check(ctx: &Context<InitializeCandidate>) -> Result<()> {
    require_keys_eq!(
        ctx.accounts.payer.key(),
        OWNER.parse::<Pubkey>().unwrap(),
        OnlyOwnerError::NotOwner
    );
    Ok(())
}

#[error_code]
pub enum OnlyOwnerError {
    #[msg("Only owner can call this function!")]
    NotOwner,
}
