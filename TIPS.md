# Tips — commit-reveal bond (fallback)

Educational alternative when `orng.wax` is unavailable. Prefer [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) on WAX mainnet.

## Do

- Distinct **player** and **house** accounts.
- Positive bond; fixed timeout.
- Slash only **after** the deadline; settle only after a valid reveal.
- Keep commitment/reveal **mismatch** non-mutating for funds (no silent flip).

## Don't

- Let house be player.
- Accept non-64-hex commitments.
- Market this as orng-equivalent without caveats (house can always withhold until slash economics favor them).

## Common mistakes

1. Revealing early and still allowing a second different reveal.
2. Slashing before the timeout.
3. Using the bond as the wager without a separate escrow field.
4. Skipping the hash check (`reveal` must match `commit`).

## Nice-to-have extensions (not in this repo)

| Idea | Note |
| --- | --- |
| Multi-party commit | Higher coordination cost |
| TAPOS delay instead of house reveal | [future-block TAPOS](https://github.com/pixel-journey/px-rng-fallback-future-block-tapos) |
| League of Entropy time gate | [drand](https://github.com/pixel-journey/px-rng-fallback-drand-bls-verifier) |

Related: [TAPOS](https://github.com/pixel-journey/px-rng-fallback-future-block-tapos) · [drand](https://github.com/pixel-journey/px-rng-fallback-drand-bls-verifier) · [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) · `px-contract-examples-vault` (private index; not this public course)
