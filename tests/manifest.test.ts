/**
 * Contract tests.
 *
 * The most valuable test in this repo is that your manifest still
 * parses through `@lumo/agent-sdk`'s `parseManifest` — a shape
 * change that passes local TS but fails the SDK is the kind of bug
 * you only catch in prod if you don't guard it here.
 *
 * Extend this file as you add tools. A minimal test per tool route:
 *   - Call the handler with a happy-path body.
 *   - Assert the response shape you promised Lumo.
 *   - Assert any confirmation summary is structurally valid.
 */

import { describe, it, expect } from "vitest";
import { parseManifest } from "@lumo/agent-sdk";
import { MANIFEST } from "../lib/manifest";
import { OPENAPI } from "../lib/openapi";

describe("manifest", () => {
  it("parses through @lumo/agent-sdk without errors", () => {
    expect(() => parseManifest(MANIFEST)).not.toThrow();
  });

  it("points to a relative openapi url (so per-env hosts still work)", () => {
    expect(MANIFEST.openapi_url.startsWith("/")).toBe(true);
  });

  it("has at least one intent", () => {
    expect(MANIFEST.intents.length).toBeGreaterThan(0);
  });
});

describe("openapi", () => {
  it("declares at least one operation", () => {
    const paths = OPENAPI.paths;
    const pathCount = Object.keys(paths).length;
    expect(pathCount).toBeGreaterThan(0);
  });

  it("has an operationId on every operation", () => {
    for (const [path, item] of Object.entries(OPENAPI.paths)) {
      for (const [method, op] of Object.entries(item)) {
        if (method.startsWith("_")) continue;
        const opId = (op as { operationId?: string }).operationId;
        expect(
          opId,
          `operationId missing on ${method.toUpperCase()} ${path}`,
        ).toBeTruthy();
      }
    }
  });
});
