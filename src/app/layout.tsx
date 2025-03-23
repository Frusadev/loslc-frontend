import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./components/ThemeProvider";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import QueryProvider from "./providers/QueryProvider";

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
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={true}
              disableTransitionOnChange={false}
            >
              {children}
            </ThemeProvider>
            <Toaster />
          </QueryProvider>
        </body>
      </html>
    </>
  );
}
