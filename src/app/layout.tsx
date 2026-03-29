import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const plusJakarta = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-headline",
});

const beVietnam = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Scholar Soft - Discover Resources Near You",
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
        className={`${plusJakarta.variable} ${beVietnam.variable} font-body antialiased bg-background text-on-surface`}
      >
        {children}
      </body>
    </html>
  );
}
