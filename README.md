# px-rng-fallback-commit-reveal

> **Trust:** private educational lab (Tier B)  
> **Quest:** 013 — two-party commit-reveal with bonded timeout  
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

House posts `sha256(secret)`. Player waits. Matching reveal settles the bond back to house. A withheld reveal past `timeoutSec` lets the player claim the bond.

**Real code:** `npm test`. SHA-256 is the algorithm in this process. No live `orng.wax`, no wasm.

## Run

```bash
npm test
```

MIT — Pixel Journey
