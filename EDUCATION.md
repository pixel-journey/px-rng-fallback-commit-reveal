# Education — commit-reveal with bond (orng fallback)

> **Rung:** `npm test` passes. Hash is a teaching sha256 hex. No chain broadcast.  
> **The test is the rule.**

Use when `orng.wax` is unavailable or for off-oracle fairness sketches: **house** posts a **bond** and a **commitment**; **player** waits for reveal. If the house never reveals by the deadline, the bond is **slashed to the player**. Honest reveal settles bond back to the house.

Prefer [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) for production WAX randomness when possible. Official: [RNG tutorial](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample).

Siblings: [TAPOS](https://github.com/pixel-journey/px-rng-fallback-future-block-tapos) · [drand](https://github.com/pixel-journey/px-rng-fallback-drand-bls-verifier) · [quorum](https://github.com/pixel-journey/px-rng-fallback-multi-oracle-quorum).

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | open → commit → reveal or timeout |
| Intermediate | slash vs settle; mismatch refuses |
| Masterclass | Bond economics; coinFromSecret is teaching-only |

---

## Beginner

`T0 = 1_700_000_000`. Bond **100**. Timeout **3600** s. Player `player1`, house `house1`.

Secret `ab`×32; `HASH = sha256Hex(SECRET)`.

| Step | Phase / result |
| --- | --- |
| openRound | `open`, commitHash null |
| commit(HASH) | `committed` |
| reveal(SECRET) | `revealed`, secret stored |
| reveal wrong secret | `mismatch` |

```bash
npm test
```

---

## Intermediate

| Step | Result |
| --- | --- |
| slashTimeout at T0+3599 | too early |
| slashTimeout at T0+3600 | `slashed`, paidTo **player1** |
| settleReveal after good reveal | `paid`, paidTo **house1** |

Same party player/house → `same party`. Bond 0 → `bad bond`. Commit not 64 hex → `bad hash`.

`coinFromSecret`: first-byte path `ab`×32 → `"house"`; `aa`×32 → `"player"` (deterministic teaching coin, **not** live RNG fairness proof by itself).

### Attack → test

| Attack | Lab behavior |
| --- | --- |
| Early slash | too early |
| Wrong secret | mismatch; phase not revealed |
| Same party both roles | refused |
| Bond 0 | refused |

---

## Masterclass — economics and honesty

| Design | Intent |
| --- | --- |
| Bond | Skin in the game so house reveals |
| Slash to player | Compensates withheld reveal |
| Settle to house | Returns bond after honest reveal |
| Mismatch | Must not move funds or flip phase to revealed |

### Common mistakes

1. Allowing early slash before timeout.  
2. Paying house on mismatch.  
3. Reusing the same bond across overlapping rounds without isolation.  
4. Treating commit-reveal as a full substitute for threshold RNG without documenting trust in the house key.  
5. Confusing teaching `coinFromSecret` with oracle entropy.

### Nice-to-have extensions (not in this repo)

| Idea | Note |
| --- | --- |
| Mutual player+house commit | Stronger fairness |
| Multi-round / tournament bonds | Isolation tests |
| TAPOS delay before reveal window | Hybrid |
| Host sha256 golden vectors | Antelope intrinsic |
| Auto-switch to orng when online | Funding order |

### Exercises

1. Who receives slash after timeout? (**player**.)  
2. Who receives settle after reveal? (**house**.)  
3. Does mismatch change phase to revealed? (No.)

Numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) · [SECURITY](SECURITY.md) · [SOURCES](SOURCES.md).

---

## What this course will not teach

- Live bond escrow transfers
- That house is cryptographically forced to be fair without bond economics
- Production orng replacement without documenting weaker trust
