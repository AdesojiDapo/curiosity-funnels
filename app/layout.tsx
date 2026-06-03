import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curiosity Funnels",
  description: "Mobile-first funnels for high-intent buyers. By Curiosity.",
  metadataBase: new URL("https://funnels.curiositybyade.com")
};

const cfBeaconToken = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        {cfBeaconToken && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: cfBeaconToken })}
          />
        )}
      </body>
    </html>
  );
}
