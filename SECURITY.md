# Security notes — commit-reveal

| Mitigated | Behavior |
| --- | --- |
| Bad phase transitions | refused |
| Hash / secret format | refused |
| Mismatch | no false settle; slash still possible |
| Early slash | refused |
| Same party open | refused |

Production: real token bond escrow, auth on commit/reveal/slash, bond economic design. Prefer oracle over this pattern on WAX.
