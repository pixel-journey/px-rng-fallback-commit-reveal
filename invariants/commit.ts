/**
 * Two-party commit-reveal RNG fallback (educational).
 * Bonded timeout: withheld reveal pays the player.
 * No live orng.wax. No wasm. No broadcast.
 */

import { createHash } from "node:crypto";

export const MIN_BOND = 1n;
export const MAX_BOND = 1_000_000_00000000n;
export const MIN_TIMEOUT = 60;
export const MAX_TIMEOUT = 86400 * 7;
export const MAX_SECRET_HEX = 64;

export type Phase = "open" | "committed" | "revealed" | "slashed" | "paid";

export type Round = {
  id: number;
  player: string;
  house: string;
  bond: bigint;
  timeoutSec: number;
  commitTs: number;
  commitHash: string | null;
  secret: string | null;
  phase: Phase;
  paidTo: string | null;
};

export type ActionResult =
  | { ok: true; round: Round }
  | { ok: false; reason: string };

const NAME = /^[a-z1-5.]{1,12}$/;
const HEX64 = /^[0-9a-f]{64}$/;
const HEX_SECRET = /^[0-9a-f]{8,64}$/;

function assertName(name: string, label: string): void {
  if (!NAME.test(name) || name.startsWith(".") || name.endsWith(".")) {
    throw new Error("bad " + label);
  }
}

export function sha256Hex(hex: string): string {
  const h = hex.toLowerCase();
  if (!HEX_SECRET.test(h)) throw new Error("bad secret");
  return createHash("sha256").update(Buffer.from(h, "hex")).digest("hex");
}

export function openRound(input: {
  id: number;
  player: string;
  house: string;
  bond: bigint;
  timeoutSec: number;
  nowTs: number;
}): Round {
  if (!Number.isInteger(input.id) || input.id < 1) throw new Error("bad id");
  assertName(input.player, "player");
  assertName(input.house, "house");
  if (input.player === input.house) throw new Error("same party");
  if (input.bond < MIN_BOND || input.bond > MAX_BOND) throw new Error("bad bond");
  if (
    !Number.isInteger(input.timeoutSec) ||
    input.timeoutSec < MIN_TIMEOUT ||
    input.timeoutSec > MAX_TIMEOUT
  ) {
    throw new Error("bad timeout");
  }
  if (!Number.isInteger(input.nowTs) || input.nowTs < 0) throw new Error("bad nowTs");
  return {
    id: input.id,
    player: input.player,
    house: input.house,
    bond: input.bond,
    timeoutSec: input.timeoutSec,
    commitTs: input.nowTs,
    commitHash: null,
    secret: null,
    phase: "open",
    paidTo: null,
  };
}

export function commit(round: Round, commitHash: string): ActionResult {
  if (round.phase !== "open") return { ok: false, reason: "bad phase" };
  const hash = commitHash.toLowerCase();
  if (!HEX64.test(hash)) return { ok: false, reason: "bad hash" };
  return {
    ok: true,
    round: { ...round, commitHash: hash, phase: "committed" },
  };
}

export function reveal(round: Round, secretHex: string): ActionResult {
  if (round.phase !== "committed") return { ok: false, reason: "bad phase" };
  if (!round.commitHash) return { ok: false, reason: "no commit" };
  let secret: string;
  let hash: string;
  try {
    secret = secretHex.toLowerCase();
    hash = sha256Hex(secret);
  } catch {
    return { ok: false, reason: "bad secret" };
  }
  if (hash !== round.commitHash) return { ok: false, reason: "mismatch" };
  return {
    ok: true,
    round: { ...round, secret, phase: "revealed" },
  };
}

export function slashTimeout(round: Round, nowTs: number): ActionResult {
  if (round.phase !== "committed") return { ok: false, reason: "bad phase" };
  if (!Number.isInteger(nowTs) || nowTs < 0) return { ok: false, reason: "bad nowTs" };
  if (nowTs < round.commitTs + round.timeoutSec) {
    return { ok: false, reason: "too early" };
  }
  return {
    ok: true,
    round: {
      ...round,
      phase: "slashed",
      paidTo: round.player,
    },
  };
}

export function settleReveal(round: Round): ActionResult {
  if (round.phase !== "revealed") return { ok: false, reason: "bad phase" };
  return {
    ok: true,
    round: {
      ...round,
      phase: "paid",
      paidTo: round.house,
    },
  };
}

export function coinFromSecret(secretHex: string): "player" | "house" {
  const h = secretHex.toLowerCase();
  if (!HEX_SECRET.test(h)) throw new Error("bad secret");
  const byte = parseInt(h.slice(0, 2), 16);
  return byte % 2 === 0 ? "player" : "house";
}
