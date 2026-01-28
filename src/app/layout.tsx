import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../../components/theme/themeprovider";
import ThemeCustomizer from "../../components/theme/ThemeCustomizer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Supermart - Multi-Vendor Marketplace",
  description: "Shop from multiple independent stores in one marketplace platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          {children}
          <ThemeCustomizer />
        </ThemeProvider>
      </body>
    </html>
  );
}