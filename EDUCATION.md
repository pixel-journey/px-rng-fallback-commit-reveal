# Education — commit / reveal as an RNG fallback

## Beginner

House commits to a hash of a secret. Player waits. House must reveal the preimage before timeout. If it does not, the bond goes to the player.

This is **not** WAX ORNG. It is a two-party game when an oracle is unavailable.

## Intermediate

| Step | Rule |
| --- | --- |
| open | Distinct player and house; bond > 0; timeout > 0 |
| commit | 64 lowercase hex hash |
| reveal | `sha256(secret)` must equal the stored hash |
| settle | After a good reveal, bond returns to house |
| slash | Only at or after `nowTs + timeoutSec`; pays player |

A wrong reveal does **not** move the phase. The house can still be slashed later if it never reveals the matching secret.

## Masterclass (not in this repo)

- Holding the bond as a real token transfer.
- `require_auth` of house on commit/reveal and player on open.
- Combining the revealed bit with a player seed so neither party alone picks the outcome.

## Outcomes

1. Draw the honest path and the slash path.
2. Show why mismatch leaves the round slashable.
3. State that `coinFromSecret` is teaching-only and uses the first byte.
