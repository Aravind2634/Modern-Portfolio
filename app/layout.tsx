import type { Metadata, Viewport } from "next";
import { Inter, Oswald, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Aravindkumar R | Full Stack Developer",
  description:
    "Portfolio of Aravindkumar R, a Full Stack Developer building Python services, React applications, REST APIs, automation, and applied AI solutions.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08091d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${oswald.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
