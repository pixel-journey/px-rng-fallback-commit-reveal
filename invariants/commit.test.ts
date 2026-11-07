import assert from "node:assert/strict";
import test from "node:test";
import {
  coinFromSecret,
  commit,
  openRound,
  reveal,
  settleReveal,
  sha256Hex,
  slashTimeout,
} from "./commit.ts";

const T0 = 1_700_000_000;
const SECRET = "ab".repeat(32);
const HASH = sha256Hex(SECRET);

function base() {
  return openRound({
    id: 1,
    player: "player1",
    house: "house1",
    bond: 100n,
    timeoutSec: 3600,
    nowTs: T0,
  });
}

test("open round starts in open phase", () => {
  const r = base();
  assert.equal(r.phase, "open");
  assert.equal(r.commitHash, null);
});

test("commit stores hash and moves to committed", () => {
  const r = commit(base(), HASH);
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.equal(r.round.phase, "committed");
    assert.equal(r.round.commitHash, HASH);
  }
});

test("reveal matching secret succeeds", () => {
  let r = commit(base(), HASH);
  assert.equal(r.ok, true);
  if (!r.ok) return;
  r = reveal(r.round, SECRET);
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.equal(r.round.phase, "revealed");
    assert.equal(r.round.secret, SECRET);
  }
});

test("reveal mismatch refused", () => {
  let r = commit(base(), HASH);
  assert.equal(r.ok, true);
  if (!r.ok) return;
  r = reveal(r.round, "cd".repeat(32));
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.reason, "mismatch");
});

test("slash before timeout refused", () => {
  let r = commit(base(), HASH);
  assert.equal(r.ok, true);
  if (!r.ok) return;
  r = slashTimeout(r.round, T0 + 3599);
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.reason, "too early");
});

test("slash after timeout pays player the bond", () => {
  let r = commit(base(), HASH);
  assert.equal(r.ok, true);
  if (!r.ok) return;
  r = slashTimeout(r.round, T0 + 3600);
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.equal(r.round.phase, "slashed");
    assert.equal(r.round.paidTo, "player1");
  }
});

test("settle after reveal returns bond to house", () => {
  let r = commit(base(), HASH);
  assert.equal(r.ok, true);
  if (!r.ok) return;
  r = reveal(r.round, SECRET);
  assert.equal(r.ok, true);
  if (!r.ok) return;
  r = settleReveal(r.round);
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.equal(r.round.phase, "paid");
    assert.equal(r.round.paidTo, "house1");
  }
});

test("same party and bad bond refused", () => {
  assert.throws(
    () =>
      openRound({
        id: 1,
        player: "sameacct",
        house: "sameacct",
        bond: 1n,
        timeoutSec: 60,
        nowTs: T0,
      }),
    /same party/,
  );
  assert.throws(
    () =>
      openRound({
        id: 1,
        player: "player1",
        house: "house1",
        bond: 0n,
        timeoutSec: 60,
        nowTs: T0,
      }),
    /bad bond/,
  );
});

test("commit hash must be 64 hex", () => {
  const r = commit(base(), "abcd");
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.reason, "bad hash");
});

test("coinFromSecret is deterministic from first byte", () => {
  assert.equal(coinFromSecret("ab".repeat(32)), "house");
  assert.equal(coinFromSecret("aa".repeat(32)), "player");
});
