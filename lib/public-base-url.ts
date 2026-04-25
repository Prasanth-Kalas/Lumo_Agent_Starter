export function publicBaseUrl(): string {
  const explicit = process.env.PUBLIC_BASE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const prod = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (prod) return `https://${prod.replace(/^https?:\/\//, "").replace(/\/+$/, "")}`;

  const deploy = process.env.VERCEL_URL?.trim();
  if (deploy) return `https://${deploy.replace(/^https?:\/\//, "").replace(/\/+$/, "")}`;

  return "http://localhost:3005";
}
