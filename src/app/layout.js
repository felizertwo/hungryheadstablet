"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import {ApiProvider} from "@/app/context/ApiContext";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import React from "react";
import {CartProvider} from "@/app/context/CartContext";
import { usePathname } from "next/navigation";
import styled from "styled-components";

const inter = Inter({ subsets: ["latin"] });

const StartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #f4f4f4;
  height: 100vh;
  width: 100%;
`;

// export const metadata = {
//   title: "Hungry heads tablet",
//   description: "An app for quickly buying goods in a caf",
// };

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const noAuthRequired = ['/login'];
  console.log("Current path:", pathname);
  return (
    <html lang="en">
      <body className={inter.className}>
          <ApiProvider>
            {noAuthRequired.includes(pathname) ? (
                <Wrapper>{children}</Wrapper>
            ) : (
                <ProtectedRoute>
                    <CartProvider>
                      <Wrapper> {children}</Wrapper>
                    </CartProvider>
                </ProtectedRoute>

            )}
          </ApiProvider>
      </body>
    </html>
  );
}
