/**
 * POST /api/weather/forecast — the one example tool route.
 *
 * Replace the mock forecast with your real backend. The rest of the
 * handler is the reference pattern for every Lumo tool route you
 * ever write:
 *
 *   1. Parse body as { ...tool_args, _pii, _ctx }.
 *   2. Validate tool_args against your own schema (belt-and-
 *      suspenders; Lumo already validated against OpenAPI).
 *   3. Do your real work. Throw `LumoAgentError` with a well-known
 *      code when anything recoverable goes wrong.
 *   4. Return the result. If it's a side-effectful tool (booking,
 *      paying, anything the user confirms) attach an AgentSummary
 *      via `attachSummary()` so Lumo can render a confirmation card
 *      AND hash-verify on the commit turn.
 *
 * `weather_forecast` is READ-ONLY so it doesn't attach a summary —
 * no user confirmation needed for asking about the weather. For a
 * reference pattern that DOES attach one, see Lumo_Flight_Agent_Web
 * or Lumo_Restaurant_Agent_Web in the Lumo-Agents monorepo.
 */

import type { NextRequest } from "next/server";
import { LumoAgentError } from "@lumo/agent-sdk";

interface Body {
  location?: unknown;
  days?: unknown;
  _pii?: Record<string, unknown>;
  _ctx?: { region?: string; device?: string };
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest): Promise<Response> {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    throw new LumoAgentError("invalid_input", "Body is not valid JSON.");
  }

  const location = typeof body.location === "string" ? body.location.trim() : "";
  if (!location) {
    throw new LumoAgentError("invalid_input", "`location` is required.");
  }
  const days = clampDays(body.days);

  // ---- REPLACE BELOW ----------------------------------------------
  // Real implementation: geocode `location`, call your weather API,
  // shape the response. The mock here is deterministic and offline
  // so tests and local dev work without any env setup.
  const forecast = mockForecast(location, days);
  // ----------------------------------------------------------------

  return new Response(
    JSON.stringify({
      location,
      days,
      forecast,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  );
}

function clampDays(raw: unknown): number {
  const n = typeof raw === "number" ? Math.floor(raw) : 3;
  if (!Number.isFinite(n)) return 3;
  return Math.max(1, Math.min(7, n));
}

function mockForecast(
  location: string,
  days: number,
): Array<{ date: string; high_f: number; low_f: number; precip_chance: number }> {
  // Seeded by the location string so the same city returns the same
  // sequence — useful for tests. Not a real model; swap out for your
  // weather backend.
  let seed = [...location].reduce((a, c) => a + c.charCodeAt(0), 0);
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const out = [];
  const today = new Date();
  for (let i = 0; i < days; i++) {
    const d = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
    const high = 55 + Math.round(rand() * 40);
    const low = high - (10 + Math.round(rand() * 15));
    out.push({
      date: d.toISOString().slice(0, 10),
      high_f: high,
      low_f: low,
      precip_chance: Math.round(rand() * 100) / 100,
    });
  }
  return out;
}
