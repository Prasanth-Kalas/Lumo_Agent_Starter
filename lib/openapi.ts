/**
 * Your agent's OpenAPI 3.1 document.
 *
 * Lumo reads this to learn every tool your agent provides: name,
 * description, input schema. The description is what Claude actually
 * reads to decide when to call your tool — write it with intent.
 *
 * Shape notes:
 *   - Paths ≡ tool routes. One path per tool.
 *   - The `operationId` becomes the tool name Claude sees. Match the
 *     slug to the manifest's conventions: `<domain>_<verb>`, e.g.
 *     `weather_forecast`, `flight_search`, `hotel_book`.
 *   - Input schema lives under `requestBody.content.application/json.schema`.
 *     Standard JSON Schema. Lumo passes it through untouched.
 *   - Responses are documented but not validated strictly — Lumo's
 *     router is permissive here because tool outputs vary widely.
 */

export const OPENAPI = {
  openapi: "3.1.0",
  info: {
    title: "Acme Weather Agent",
    version: "0.1.0",
  },
  paths: {
    "/api/weather/forecast": {
      post: {
        operationId: "weather_forecast",
        summary: "Multi-day weather forecast for a named place.",
        description:
          "Return a forecast of high/low temperatures and precipitation chance for " +
          "the next 1-7 days at `location`. Use this when the user asks about weather, " +
          "rain, snow, temperatures, or whether to pack warm clothes. Not for historical " +
          "weather — this is a forward-looking forecast only.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["location"],
                properties: {
                  location: {
                    type: "string",
                    description:
                      "Free-form place name, e.g. 'Austin, TX' or 'Paris'. The " +
                      "agent geocodes internally.",
                  },
                  days: {
                    type: "integer",
                    minimum: 1,
                    maximum: 7,
                    default: 3,
                    description: "Number of days to forecast. Default 3.",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "OK",
            content: { "application/json": { schema: { type: "object" } } },
          },
        },
      },
    },
  },
} as const;
