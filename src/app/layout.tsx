"use client";

import "./globals.css";
import { Header } from "@/components/common";
import { LoadingProvider } from "@/context/LoadingContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface RootLayoutProps {
  children: React.ReactNode;
}
const queryClient = new QueryClient();

const RootLayout = ({ children }: RootLayoutProps): JSX.Element => {
  return (
    <html lang="es">
      <body className="bg-white">
        <QueryClientProvider client={queryClient}>
          <LoadingProvider>
            <Header />
            {children}
          </LoadingProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
