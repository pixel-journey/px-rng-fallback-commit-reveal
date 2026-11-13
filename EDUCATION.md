# Education — commit–reveal with bonded timeout

> **Rung:** `npm test` passes. Prefer [orng.wax](https://github.com/worldwide-asset-exchange/wax-orng) on WAX.  
> This is a **fallback** teaching model, not production randomness for mainnet games.

## What you should be able to do

| Level | Skill |
| --- | --- |
| Beginner | House commits `sha256(secret)`; reveal must match |
| Intermediate | Timeout slash pays the player if house withholds |
| Masterclass | Why this is weaker than orng.wax and when mismatch leaves slash available |

## Beginner

Phases: `open` → `committed` → (`revealed` → `paid` to house) **or** (`slashed` → bond to player).

Honest path: commit → reveal matching secret → settle → house receives bond accounting.

## Intermediate

Timeout: after `commitTs + timeoutSec`, player can slash while still `committed`. Too early refused. Wrong secret → `mismatch`, phase stays `committed` so slash can still fire later.

Composition: two rounds settle/slash independently.

## Masterclass

- House can choose not to reveal if the secret would lose a larger game — **bond must exceed** the value of cheating.
- Commit-reveal is interactive and slow; oracles remove the withhold attack by design.
- `coinFromSecret` is a toy parity bit, not a full game engine.

## Will not teach

Live escrow token moves, orng credits, or that this replaces wax-orng on WAX.
