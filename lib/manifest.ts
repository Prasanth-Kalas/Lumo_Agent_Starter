/**
 * Your agent's manifest.
 *
 * Lumo's Super Agent loads this from `/.well-known/agent.json` to
 * learn your identity, the tools you provide, and how users
 * authenticate to you. Edit every field here — the defaults are
 * placeholders.
 *
 * CHANGE ME
 *   agent_id          → URL-safe slug, e.g. "acme.weather" or "hertz"
 *   display_name      → the pretty name shown in the marketplace
 *   one_liner         → one sentence explaining what you do
 *   intents           → keywords Lumo's router uses to find you
 *   connect.model     → how users auth: "oauth2" | "lumo_id" | "none"
 *   pii_scope         → fields you need Lumo to send you per call
 */

import type { AgentManifest } from "@lumo/agent-sdk";

export const MANIFEST: AgentManifest = {
  agent_id: "acme.weather",
  version: "0.1.0",
  domain: "weather",
  display_name: "Acme Weather",
  one_liner: "Multi-day forecast for anywhere on Earth.",
  intents: ["weather", "forecast", "temperature", "rain", "snow"],
  example_utterances: [
    "what's the weather in Austin tomorrow",
    "will it rain in Chicago on Saturday",
    "temperature in Paris next weekend",
  ],
  openapi_url: "/openapi.json",
  ui: {
    components: [],
  },
  // "none" = public endpoint, no per-user auth. Flip to "oauth2" and
  // fill in the scopes block once you have a real user-scoped API.
  connect: {
    model: "none",
  },
  // PII fields you want Lumo to pass on every call. Keep this as
  // small as possible — Lumo's router enforces the intersection with
  // the user's current profile, so asking for less is safer.
  pii_scope: [],
  // Cancellation protocol. Return "ok" or "not_required" from your
  // cancel route; see /app/api/cancel/route.ts for the template.
  on_call_escalation: "page",
  listing: {
    category: "Utility",
    pricing_note: "Free (fair use)",
  },
};
