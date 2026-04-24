/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lumo fetches `/.well-known/agent.json` per the AgentManifest spec.
  // Next's file-system router refuses to match directory names that
  // start with ".", so we route via a rewrite to /well-known/agent.json
  // which IS valid.
  async rewrites() {
    return [
      {
        source: "/.well-known/agent.json",
        destination: "/well-known/agent.json",
      },
    ];
  },
};

export default nextConfig;
