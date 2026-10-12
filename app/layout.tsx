import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Ankahi — IIT Delhi Dramatics Club",
    template: "%s | Ankahi",
  },
  description:
    "Ankahi is the Dramatics Club of IIT Delhi — a home for theatre, storytelling, and performance.",
  applicationName: "Ankahi",
  icons: { icon: "/images/brand/logo.svg" },
  openGraph: {
    title: "Ankahi — IIT Delhi Dramatics Club",
    description: "Theatre, storytelling, and performance at IIT Delhi.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
