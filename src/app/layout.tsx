import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./components/ThemeProvider";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Linux and Open-Source Lovers",
  icons: "/favicon.png",
  description: "A community of Linux and open-source lovers",
  openGraph: {
    title: "Linux and Open-Source lovers",
    description: "A community of Linux and open-source lovers",
    url: "https://loslc.netlify.app",
    siteName: "LOSLC",
    images: [
      {
        url: "/loslcb.png",
        width: 1200,
        height: 825,
      }
    ],
    type: "website",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={true}
            disableTransitionOnChange={false}
          >
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </>
  );
}
