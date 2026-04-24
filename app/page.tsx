/**
 * Landing page — what a developer sees when they visit the root of
 * their deployed agent in a browser. Kept minimal: a wordmark, one
 * sentence explaining what this is, and deep links to the manifest
 * and OpenAPI so ops can verify the agent is alive.
 *
 * This page has no user-facing product purpose. Lumo never navigates
 * here; it only reads /.well-known/agent.json and /openapi.json.
 */

import { MANIFEST } from "@/lib/manifest";

export default function Home() {
  return (
    <main
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
        maxWidth: 640,
        margin: "64px auto",
        padding: "0 24px",
        color: "#f5f5f4",
        background: "transparent",
        lineHeight: 1.6,
      }}
    >
      <div style={{ fontSize: 14, color: "#a8a29e", letterSpacing: "0.12em" }}>
        LUMO AGENT
      </div>
      <h1 style={{ fontSize: 32, margin: "8px 0 4px", color: "#f5f5f4" }}>
        {MANIFEST.display_name}
      </h1>
      <p style={{ fontSize: 15, color: "#d6d3d1", margin: 0 }}>
        {MANIFEST.one_liner}
      </p>

      <div
        style={{
          marginTop: 32,
          padding: 16,
          border: "1px solid #44403c",
          borderRadius: 10,
          background: "#1c1917",
        }}
      >
        <div style={{ fontSize: 12, color: "#a8a29e", marginBottom: 8 }}>
          Health endpoints
        </div>
        <ul
          style={{
            margin: 0,
            paddingLeft: 16,
            fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace",
            fontSize: 13,
            color: "#f5f5f4",
          }}
        >
          <li>
            <a
              href="/.well-known/agent.json"
              style={{ color: "#5eeaac", textDecoration: "none" }}
            >
              /.well-known/agent.json
            </a>
          </li>
          <li>
            <a
              href="/openapi.json"
              style={{ color: "#5eeaac", textDecoration: "none" }}
            >
              /openapi.json
            </a>
          </li>
        </ul>
      </div>

      <p style={{ marginTop: 32, fontSize: 13, color: "#a8a29e" }}>
        Fork of{" "}
        <a
          href="https://github.com/Prasanth-Kalas/Lumo_Agent_Starter"
          style={{ color: "#5eeaac" }}
        >
          Lumo_Agent_Starter
        </a>
        . Replace this page with whatever you want; Lumo never looks at it.
      </p>
    </main>
  );
}
