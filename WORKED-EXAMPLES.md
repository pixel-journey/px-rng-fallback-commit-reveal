# Worked examples — commit / reveal fallback

`T0 = 1_700_000_000`. Timeout is 3600 seconds. Secret is `ab` repeated 32 times (64 hex). `HASH = sha256Hex(SECRET)`.

Phases: `open` → `committed` → `revealed` → `paid`, or `committed` → `slashed`.

## Honest path

```text
openRound(player1, house1, bond 100)
commit(HASH)           → committed
slashTimeout(T0+1)     → too early
reveal(SECRET)         → revealed
settleReveal()         → paid, paidTo house1
slashTimeout(late)     → refused (already settled)
```

## Withheld reveal

```text
commit(HASH)
slashTimeout(T0+3599)  → too early
slashTimeout(T0+3600)  → slashed, paidTo player1
reveal(SECRET)         → refused
```

Bond `250` on the composition path. Same timing rule.

## Mismatch still allows later slash

Commit `HASH`, reveal `cd`×32 → `mismatch`. Round stays committed. Slash at `T0+3600` pays the player (`alice` in that test).

## Independence

Round 10 settles to `house1`. Round 20 stays `committed` until slash pays `player2`. One path does not rewrite the other.

## Coin from secret

| Secret prefix | `coinFromSecret` |
| --- | --- |
| `ab` × 32 | house |
| `aa` × 32 | player |

First byte of the secret, not the hash.

## Refusals

| Case | Error |
| --- | --- |
| player === house | same party |
| bond `0` | bad bond |
| commit hash not 64 hex | bad hash |

No token custody, no wasm, not `orng.wax`.
