import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://prepmate-download.iva100.chatgpt.site"),
  title: {
    default: "PrepMate · AI interview practice for macOS",
    template: "%s · PrepMate",
  },
  description:
    "Practice behavioral and technical interviews in a private macOS desktop app, then turn each answer into evidence and focused improvement.",
  applicationName: "PrepMate",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    title: "Practice the interview. Keep the advantage.",
    description: "PrepMate is a private AI interview practice studio built for macOS.",
    siteName: "PrepMate",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "PrepMate for macOS" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Practice the interview. Keep the advantage.",
    description: "PrepMate is a private AI interview practice studio built for macOS.",
    images: ["/og.png"],
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
