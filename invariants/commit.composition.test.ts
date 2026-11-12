/**
 * Composition: honest path vs slash path.
 * open → commit → reveal → settle pays house.
 * open → commit → wait → slash pays player.
 * Two rounds stay independent.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  commit,
  openRound,
  reveal,
  settleReveal,
  sha256Hex,
  slashTimeout,
  type Round,
} from "./commit.ts";

const T0 = 1_700_000_000;
const SECRET = "ab".repeat(32);
const HASH = sha256Hex(SECRET);
const SECRET2 = "cd".repeat(32);
const HASH2 = sha256Hex(SECRET2);

function open(id: number, player: string, house: string, bond: bigint): Round {
  return openRound({
    id,
    player,
    house,
    bond,
    timeoutSec: 3600,
    nowTs: T0,
  });
}

function mustOk(r: { ok: boolean; round?: Round; reason?: string }): Round {
  assert.equal(r.ok, true);
  if (!r.ok || !r.round) throw new Error("expected ok");
  return r.round;
}

describe("composition: commit-reveal paths", () => {
  it("honest path: commit → reveal → settle pays house", () => {
    let r = open(1, "player1", "house1", 100n);
    r = mustOk(commit(r, HASH));
    assert.equal(r.phase, "committed");
    assert.equal(slashTimeout(r, T0 + 1).ok, false);
    r = mustOk(reveal(r, SECRET));
    assert.equal(r.phase, "revealed");
    r = mustOk(settleReveal(r));
    assert.equal(r.phase, "paid");
    assert.equal(r.paidTo, "house1");
    assert.equal(slashTimeout(r, T0 + 99999).ok, false);
  });

  it("withheld reveal: slash after timeout pays player", () => {
    let r = open(2, "player1", "house1", 250n);
    r = mustOk(commit(r, HASH));
    assert.equal(slashTimeout(r, T0 + 3599).ok, false);
    r = mustOk(slashTimeout(r, T0 + 3600));
    assert.equal(r.phase, "slashed");
    assert.equal(r.paidTo, "player1");
    assert.equal(reveal(r, SECRET).ok, false);
  });

  it("mismatch reveal leaves round committed for later slash", () => {
    let r = open(3, "alice", "house1", 50n);
    r = mustOk(commit(r, HASH));
    const bad = reveal(r, SECRET2);
    assert.equal(bad.ok, false);
    if (!bad.ok) assert.equal(bad.reason, "mismatch");
    r = mustOk(slashTimeout(r, T0 + 3600));
    assert.equal(r.paidTo, "alice");
  });

  it("two rounds independent: one settles, one slashes", () => {
    let a = open(10, "player1", "house1", 100n);
    let b = open(20, "player2", "house2", 200n);
    a = mustOk(commit(a, HASH));
    b = mustOk(commit(b, HASH2));
    a = mustOk(reveal(a, SECRET));
    a = mustOk(settleReveal(a));
    assert.equal(a.paidTo, "house1");
    assert.equal(b.phase, "committed");
    b = mustOk(slashTimeout(b, T0 + 3600));
    assert.equal(b.paidTo, "player2");
    assert.equal(a.phase, "paid");
  });
});
