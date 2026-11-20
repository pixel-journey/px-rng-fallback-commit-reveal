# Worked examples — commit-reveal with bond

`T0 = 1_700_000_000`. Bond **100**. Timeout **3600** s. Player `player1`, house `house1`.

Secret `ab`×32; `HASH = sha256Hex(SECRET)`.

## Lifecycle

| Step | Phase / result |
| --- | --- |
| openRound | `open`, commitHash null |
| commit(HASH) | `committed` |
| reveal(SECRET) | `revealed`, secret stored |
| reveal wrong secret | `mismatch` |
| slashTimeout at T0+3599 | `too early` |
| slashTimeout at T0+3600 | `slashed`, paidTo **player1** |
| settleReveal after good reveal | `paid`, paidTo **house1** |

## Shape refusals

| Input | Result |
| --- | --- |
| same party player/house | `same party` |
| bond 0 | `bad bond` |
| commit hash not 64 hex | `bad hash` |

## coinFromSecret (teaching only)

| Secret | coin |
| --- | --- |
| `ab`×32 | `"house"` |
| `aa`×32 | `"player"` |

Deterministic teaching coin — **not** live RNG fairness by itself.

## Bond economics (locked)

| Outcome | Who gets the bond |
| --- | --- |
| Timeout (no reveal) | **player** (slash) |
| Honest reveal + settle | **house** |
| Mismatch | funds **not** moved; phase stays unrevealed |
