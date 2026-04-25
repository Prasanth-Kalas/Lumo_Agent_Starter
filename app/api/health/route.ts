import { healthResponse } from "@lumo/agent-sdk";
import { MANIFEST } from "@/lib/manifest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  return healthResponse({
    status: "ok",
    agent_id: MANIFEST.agent_id,
    version: MANIFEST.version,
    p95_latency_ms: 0,
    error_rate: 0,
  });
}
