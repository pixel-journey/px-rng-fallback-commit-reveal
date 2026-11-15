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

Same party player/house → `same party`. Bond 0 → `bad bond`. Commit hash not 64 hex → `bad hash`.

## coinFromSecret

First byte even-ish path: `ab`×32 → `"house"`; `aa`×32 → `"player"` (deterministic teaching coin, not live RNG).

Withheld reveal after timeout pays the **player** the bond. Honest reveal settles bond back to **house**.
