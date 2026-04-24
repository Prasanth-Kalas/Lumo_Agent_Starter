import type { ReactNode } from "react";

export const metadata = {
  title: "Lumo Agent Starter",
  description:
    "Fork this repo to publish an agent to the Lumo appstore.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0c0a09", color: "#f5f5f4" }}>
        {children}
      </body>
    </html>
  );
}
