# Tips

- Timeout is measured from `nowTs` at open, not from the commit timestamp, in this lab. Port carefully.
- Slash and settle are mutually exclusive ends. Tests refuse slash after settle and reveal after slash.
- Hash the **secret bytes**, not a JSON string of the secret, or the reveal will always mismatch.
- Player and house must be different names so a self-deal cannot slash itself for free.
