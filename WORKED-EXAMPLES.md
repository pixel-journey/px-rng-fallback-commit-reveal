# Worked examples — commit-reveal

## Example A — honest path

```text
secret = "aabbccdd" (and enough hex)
hash = sha256Hex(secret)
openRound → commit(hash) → reveal(secret) → settleReveal
phase paid, paidTo = house
```

## Example B — withheld reveal

```text
commit → (no reveal) → slashTimeout(now >= commitTs + timeout)
phase slashed, paidTo = player
```

## Example C — mismatch

`reveal` with wrong secret → `mismatch`; phase stays **committed**. Later slash still valid after timeout.

## Example D — too early slash

`nowTs < commitTs + timeoutSec` → `too early`.

## Example E — bounds

| Input | Error |
| --- | --- |
| player === house | same party |
| bond 0 | bad bond |
| timeout < 60 | bad timeout |
| commit hash not 64 hex | bad hash |

## Example F — independent rounds

Round 1 slashed, round 2 settled — no shared phase (composition).
