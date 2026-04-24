/**
 * /openapi.json — public OpenAPI 3.1 document.
 *
 * Lumo reads this after the manifest to build the tool list it
 * passes to Claude. Like the manifest, this must be public.
 */

import { OPENAPI } from "@/lib/openapi";

export const runtime = "nodejs";
export const dynamic = "force-static";

export async function GET(): Promise<Response> {
  return new Response(JSON.stringify(OPENAPI), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "public, max-age=300",
    },
  });
}
