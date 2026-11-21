# Security — commit-reveal bond (fallback)

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Same party as player and house | refused |
| Bond 0 / bad 64-hex commit | refused |
| Slash before deadline | too early |
| Reveal mismatch | mismatch; **funds and phase unchanged** |
| Slash after timeout | pays **player** |
| Settle after honest reveal | pays **house** |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| House key leak before reveal | Bond economics only; orng is stronger |
| Bond size vs game EV | Undersized bond → house may prefer slash economics |
| Live custody of bond tokens | Real transfer in/out |
| Host vs Node sha256 | Golden vectors on target chain |
| Auth | `require_auth(house)` on commit/reveal; player on open |

## Attack angles

1. Early slash (steal bond before timeout).  
2. Paying house on a mismatched reveal.  
3. Reusing one bond across overlapping rounds without isolation.  
4. Marketing this as threshold RNG without stating house trust.  
5. Shipping on WAX mainnet while `orng.wax` is available.

## Honesty limits

Teaching state machine only. Prefer [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) on WAX.

| Sibling | Distinction |
| --- | --- |
| [TAPOS fallback](https://github.com/pixel-journey/px-rng-fallback-future-block-tapos) | Future-block delay |
| [drand](https://github.com/pixel-journey/px-rng-fallback-drand-bls-verifier) | Post-bet time gate |
| [ORNG dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) | Preferred once-resolve |

[docs.wax.io RNG](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample).
