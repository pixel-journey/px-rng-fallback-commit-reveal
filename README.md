# Commit–reveal with bonded timeout

> **Domain:** RNG fallback — commit-reveal  
> **Sources:** [SOURCES.md](SOURCES.md)  
> **Catalog:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

**Goal:** House posts `sha256(secret)`. Player waits. Matching reveal settles the bond back to house. A withheld reveal past `timeoutSec` lets the player claim the bond.

**Code under test:** `npm test` (unit + path composition). SHA-256 runs in-process. No live `orng.wax`, no wasm.

Prefer [orng.wax](https://github.com/worldwide-asset-exchange/wax-orng) for production randomness. This lab is the educational fallback when an oracle is unavailable. Sibling: [future-block-tapos](https://github.com/pixel-journey/px-rng-fallback-future-block-tapos).

## Composition

`commit.composition.test.ts` walks the honest path (commit → reveal → settle → house) and the withheld path (commit → timeout → slash → player). A mismatch leaves the round committed so slash still works. Two rounds settle/slash independently.

```bash
npm test
```

MIT — Pixel Journey
