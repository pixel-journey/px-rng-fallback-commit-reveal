# Education — commit-reveal fallback

Use when orng.wax is unavailable. House posts a bond and a commitment. Player waits for reveal. If the house never reveals by the deadline, the bond is slashed to the player.

## Beginner

1. Open a round with distinct player and house and positive bond.
2. House commits a 64-hex hash.
3. House reveals the preimage or times out.

## Intermediate

Slash only at `nowTs >= openTs + timeoutSec`. Mismatch reveal must not change phase. Settle after reveal returns bond to house.

## Masterclass (not in this repo)

Live chain TAPOS delay, real sha256 in WASM, multi-round tables.

## Outcomes

1. Show slash pays player after timeout.
2. Show settle after reveal pays house.
3. Show mismatch and early slash refuse without state corruption.
