# px-rng-fallback-commit-reveal

> **Trust:** private educational lab (Tier B)  
> **Domain:** RNG fallback — commit-reveal  
> **Sources:** [SOURCES.md](SOURCES.md)  
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

House posts `sha256(secret)`. Player waits. Matching reveal settles the bond back to house. A withheld reveal past `timeoutSec` lets the player claim the bond.

**Real code:** `npm test` (unit + **path composition**). SHA-256 is the algorithm in this process. No live `orng.wax`, no wasm.

Prefer [orng.wax](https://github.com/worldwide-asset-exchange/wax-orng) for production randomness. This lab is the educational fallback. Sibling: [future-block-tapos](https://github.com/pixel-journey/px-rng-fallback-future-block-tapos).

## Composition note

`commit.composition.test.ts` walks the honest path (commit → reveal → settle → house) and the withheld path (commit → timeout → slash → player). Mismatch leave the round committed so slash still works. Two rounds settle/slash independently.

## Run

```bash
npm test
```

MIT — Pixel Journey
