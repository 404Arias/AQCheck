import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { CustomScripts } from "@/components/custom-scripts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AQ Test - Tests de Autismo",
  description: "Tests científicamente validados AQ-10 y AQ-50 para evaluar rasgos autistas. Desarrollados por el Cambridge Autism Research Centre.",
  keywords: ["AQ Test", "Autismo", "AQ-10", "AQ-50", "Test de Autismo", "Salud Mental"],
  authors: [{ name: "AQ Test Team" }],
  openGraph: {
    title: "AQ Test - Tests de Autismo",
    description: "Tests científicamente validados para evaluar rasgos autistas",
    url: "https://aq-test.com",
    siteName: "AQ Test",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AQ Test - Tests de Autismo",
    description: "Tests científicamente validados para evaluar rasgos autistas",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <CustomScripts>
          {children}
          <Toaster />
        </CustomScripts>
      </body>
    </html>
  );
}
