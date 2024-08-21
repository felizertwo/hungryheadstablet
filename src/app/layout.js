"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ApiProvider } from "@/app/context/ApiContext";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import React from "react";
import { CartProvider } from "@/app/context/CartContext";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import InactivityRedirect from "@/app/components/InactivityRedirect";
import TabletErrorBoundary from "@/app/components/ErrorBoundary";

const inter = Inter({ subsets: ["latin"] });

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const noAuthRequired = ["/login"];

  return (
    <html lang="en">
      <body className={inter.className}>
        <TabletErrorBoundary>
          <ApiProvider>
            {noAuthRequired.includes(pathname) ? (
              <Wrapper>{children}</Wrapper>
            ) : (
              <ProtectedRoute>
                <InactivityRedirect timeout={120_000} warningTime={10_000} />
                <CartProvider>
                  <Wrapper> {children}</Wrapper>
                </CartProvider>
              </ProtectedRoute>
            )}
          </ApiProvider>
        </TabletErrorBoundary>
        <script src={cordovaUrl} />
      </body>
    </html>
  );
}
