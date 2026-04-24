/**
 * /.well-known/agent.json — public manifest endpoint (reached via
 * the rewrite in next.config.mjs because Next.js refuses to route
 * directory names starting with "." in the file-system router).
 *
 * Lumo's registry fetches this URL once per process (cached until
 * deploy) to discover your agent. Must be publicly reachable — no
 * auth middleware, no IP allowlist. If Lumo can't read this, your
 * agent won't be listed and won't receive tool calls.
 */

import { MANIFEST } from "@/lib/manifest";

export const runtime = "nodejs";
export const dynamic = "force-static";

export async function GET(): Promise<Response> {
  return new Response(JSON.stringify(MANIFEST), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "public, max-age=300",
    },
  });
}
