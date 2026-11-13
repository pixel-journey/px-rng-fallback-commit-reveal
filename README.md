# Commit–reveal with bonded timeout

> **Domain:** RNG fallback — commit-reveal  
> **Sources:** [SOURCES.md](SOURCES.md)  
> **Catalog:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)  
> **Path:** [ORNG-LEARNING-PATH.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)

**Goal:** House posts `sha256(secret)`. Matching reveal settles the bond to house. A withheld reveal past `timeoutSec` lets the player claim the bond.

**Code under test:** `npm test` (unit + path composition). Prefer [orng.wax](https://github.com/worldwide-asset-exchange/wax-orng) in production.

## Learning materials

| Doc | Role |
| --- | --- |
| [EDUCATION.md](EDUCATION.md) | Beginner → masterclass |
| [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) | Honest, slash, mismatch |
| [TIPS.md](TIPS.md) | Bond sizing; prefer oracle |
| [SECURITY.md](SECURITY.md) | Phase machine |
| [SOURCES.md](SOURCES.md) | Official + related |

## Composition

Honest path (commit → reveal → settle → house) and withheld path (commit → timeout → slash → player). Mismatch leaves committed so slash still works. Two rounds independent.

```bash
npm test
```

MIT — Pixel Journey
