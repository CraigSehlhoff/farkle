import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Farkle!",
  description: "Farkle dice game made by Virtual Sobriety for fun!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="max-w-3xl mx-auto">{children}</body>
    </html>
  );
}
