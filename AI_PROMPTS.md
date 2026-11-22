# AI handoff — commit–reveal fallback

## Agent tooling

```bash
git clone https://github.com/wharfkit/skill.git ~/.claude/skills/wharfkit
```

| Source | Role |
| --- | --- |
| [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) | **Preferred** production RNG on WAX |
| [TAPOS](https://github.com/pixel-journey/px-rng-fallback-future-block-tapos) | Other fallback |
| [drand](https://github.com/pixel-journey/px-rng-fallback-drand-bls-verifier) | Post-bet public beacon |

## Non-negotiables

1. This is an **educational fallback**, not a substitute for `orng.wax` on WAX mainnet.
2. House posts **bond** + **commitment**; player waits for reveal.
3. Timeout without reveal: bond is **slashed to the player**.
4. Honest reveal: bond settles back to the **house**.
5. Wrong secret is `mismatch` — does **not** move funds or flip phase to revealed.
6. Same party as player and house is refused. Bond 0 and non-64-hex commit are refused.
7. `coinFromSecret` is a teaching map, not live fairness proof by itself.
8. Do **not** tag this lab `orng` — it is section E fallback.

## Prompt seeds

- "Timeout without reveal — who receives the bond?"
- "Wrong secret — funds moved?"
- "When is commit–reveal allowed on WAX if orng is available?"
- "Contrast with dual-callback once-resolve on the orng path."

## Do not

- Ship this as primary RNG on WAX without documenting why orng is skipped.
- Move funds on mismatch.
- Allow player === house.
