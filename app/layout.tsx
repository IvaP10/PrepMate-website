import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "PrepMate · Local-first interview practice",
    template: "%s · PrepMate",
  },
  description:
    "A local-first desktop workspace for deliberate interview practice, evidence-backed reports, Performance, and Improve coaching.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
