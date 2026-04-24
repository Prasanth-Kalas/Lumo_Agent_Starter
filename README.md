# Lumo Agent Starter

Fork this repo to publish an agent to the Lumo appstore. An agent is a
small web service that Lumo's Super Agent calls on behalf of a user to
do one thing well — book a flight, reserve a table, check the weather,
play a playlist. You own the business logic; Lumo handles
orchestration, confirmation cards, price integrity, and the user
conversation around it.

This starter runs as a Next.js 14 app. It's the simplest path because
three things Lumo requires come for free: a public `/.well-known/`
route for the manifest, a public `/openapi.json` for the OpenAPI
document, and a set of HTTP handlers under `/app/api/` that map to the
OpenAPI paths. Any framework that can serve those is fine — this
template is the reference.

## What it implements

A toy "Weather Agent" with a single read-only tool: `weather_forecast`.
It's scoped deliberately narrow so you can see the full protocol on
one screen and then rip it apart to replace with your own logic.

The interesting plumbing:

* `/.well-known/agent.json` → the `AgentManifest`. Lumo reads this to
  learn your agent's identity, intents, tools, connection model, PII
  scope, and cancellation protocol.
* `/openapi.json` → the OpenAPI 3.1 document. Lumo reads this to
  generate the tool list it hands to Claude (name, description, input
  schema).
* `/api/weather/forecast` → the one example tool route. It parses
  args, does the real work (a mock), and returns an `AgentSummary`
  attached via the SDK's `attachSummary` helper. The summary is
  what shows up as a confirmation card in the Lumo chat.

## 30-minute onboarding

1. `git clone` this repo and `cd` in.
2. Edit `lib/manifest.ts`: change `agent_id`, `display_name`,
   `one_liner`, and `intents`. Pick a URL-friendly slug for
   `agent_id` (no spaces, lowercase, hyphen or dot separators).
3. Edit `lib/openapi.ts`: rename the tool, adjust the input schema,
   and write the real description. The description is what Claude
   actually reads to decide when to call your tool — it matters.
4. Edit `app/api/weather/forecast/route.ts`: replace the mock with
   your real backend. Return an `AgentSummary` via `attachSummary`
   so Lumo can render a confirmation card and hash-verify on the
   book turn.
5. `npm install && npm run dev`. Visit
   `http://localhost:3000/.well-known/agent.json` — you should see
   your manifest. Visit `/openapi.json` — you should see the spec.
6. Deploy (Vercel, Fly, your own infra — anywhere that gives you
   HTTPS). Your manifest URL is
   `https://your-domain.com/.well-known/agent.json`.
7. Submit that URL to the Lumo publisher portal (`/publisher` on
   Lumo). Once approved, your tools show up in the Lumo marketplace
   and users can connect them.

## The protocol

Four moving pieces your agent must implement correctly:

**Manifest contract.** Your `AgentManifest` declares your identity,
intents, tools, and `connect.model` (how users authenticate to you:
OAuth 2.0, Lumo-issued session, or none). Lumo won't call a tool
that isn't listed in your manifest.

**Tool routes.** Every tool in your manifest maps to an HTTP route
declared in your `openapi.json`. Lumo sends `POST` (or `GET` /
`DELETE` per the OpenAPI) with the user's tool arguments in the
body plus two fields — `_pii` (filtered identity data) and `_ctx`
(region + device_kind). Respond with the tool result; if it's a
confirmation-triggering tool, attach a summary.

**Confirmation summaries.** Any tool result that moves money or
otherwise commits something on the user's behalf should carry an
`AgentSummary` envelope. Use `attachSummary()` from `@lumo/agent-sdk`
— it hashes the payload with a canonical representation so Lumo can
detect tampering between the "preview" turn (user sees the card)
and the "commit" turn (user says yes).

**Error codes.** Throw a `LumoAgentError` with a well-known
`AgentErrorCode` so Lumo renders the right message — `price_changed`,
`out_of_stock`, `connection_required`, etc. The code drives the
user-facing copy.

## Testing

```
npm test
```

Runs Vitest against the manifest and one tool route. Extend as you
add tools. The contract test in `tests/manifest.test.ts` validates
that your manifest parses through `@lumo/agent-sdk`'s `parseManifest`
without errors — if you break the schema, you'll find out here
before Lumo does.

## Hosting

Anywhere you can put a Node process behind HTTPS works. Vercel is the
easiest path since Next.js is already wired; the included
`vercel.json` sets sensible timeouts. Fly.io / Railway / your own
Kubernetes all work too — the only thing Lumo needs is a publicly
reachable HTTPS URL serving `/.well-known/agent.json`.

## License

MIT. Fork, strip, rebrand. This is a starter, not a product.
