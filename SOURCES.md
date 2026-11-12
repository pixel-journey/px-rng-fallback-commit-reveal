# Official sources

Commit-reveal is a classic two-party protocol. On WAX, prefer [orng.wax](https://github.com/worldwide-asset-exchange/wax-orng) when you need oracle randomness; this lab is a **fallback** teaching shape when the oracle is unavailable or for off-oracle games.

| Source | Use |
| --- | --- |
| [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) | Primary WAX randomness service (not this lab) |
| [WAX RNG sample](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample) | Oracle path docs |
| [docs.wax.io](https://docs.wax.io/) | WAX development |
| [docs.eosnetwork.com](https://docs.eosnetwork.com/) | Crypto helpers / actions |

SHA-256 here is the host process algorithm. Bond custody is not implemented.

## Domain map

| Repo | Role |
| --- | --- |
| ORNG domain | Primary oracle path (starter, dual, coinflip, …) |
| **This repo** | Commit hash + reveal match + timeout slash |
| [px-rng-fallback-future-block-tapos](https://github.com/pixel-journey/px-rng-fallback-future-block-tapos) | Delayed block id + memo seed |
| [px-invariant-kit](https://github.com/pixel-journey/px-invariant-kit) | Hex / once helpers |
