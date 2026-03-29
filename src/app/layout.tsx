import type { Metadata } from "next";
import { Playfair_Display, Josefin_Sans } from "next/font/google";
import { AuthKitProvider } from "@workos-inc/authkit-nextjs/components";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-headline",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "CampusCompass — Discover Resources Near You",
  description:
    "Find scholarships, mental health resources, and learning programs for NYC college students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${playfair.variable} ${josefin.variable} font-body antialiased bg-background text-on-surface`}
      >
        <AuthKitProvider>{children}</AuthKitProvider>
      </body>
    </html>
  );
}
