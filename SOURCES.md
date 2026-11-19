# Sources

| Source | Use |
| --- | --- |
| [docs.wax.io](https://docs.wax.io/) | Contract patterns, auth, time |
| [docs.eosnetwork.com](https://docs.eosnetwork.com/) | Permissions, action design |
| [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) | **Preferred** production RNG on WAX |
| [RNG tutorial](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample) | Sample dapp path |

Commit–reveal is a classic crypto-game pattern (bond + hash preimage). This lab is an **educational fallback**, not a substitute for `orng.wax` on mainnet.

## Product facts locked by tests

- House posts a **bond** and a **commitment**; player waits for reveal.
- Timeout without reveal: bond is **slashed to the player**.
- Honest reveal: bond settles back to the **house**.
- Wrong secret is `mismatch` — does **not** move funds or flip phase to revealed.
- Same party as player and house is refused. Bond 0 and non-64-hex commit are refused.
- `coinFromSecret` is a teaching map from the secret, not live RNG fairness proof by itself.

## Related labs

| Lab | Topic |
| --- | --- |
| [TAPOS](https://github.com/pixel-journey/px-rng-fallback-future-block-tapos) | Future-block delay |
| [drand](https://github.com/pixel-journey/px-rng-fallback-drand-bls-verifier) | Post-bet public beacon |
| [quorum](https://github.com/pixel-journey/px-rng-fallback-multi-oracle-quorum) | M-of-N reports |
| [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) | Once-resolve on orng paths |
| [ORNG path](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md) | Full curriculum order |
