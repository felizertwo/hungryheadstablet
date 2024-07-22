"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import {ApiProvider} from "@/app/context/ApiContext";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import React from "react";
import {CartProvider} from "@/app/context/CartProvider";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Hungry heads tablet",
//   description: "An app for quickly buying goods in a caf",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const noAuthRequired = ['/login'];
  console.log("Current path:", pathname);
  return (
    <html lang="en">
      <body className={inter.className}>
          <ApiProvider>
            {noAuthRequired.includes(pathname) ? (
                children
            ) : (
                <ProtectedRoute>
                    <CartProvider>
                        <div className="startBody">
                            {children}
                        </div>
                    </CartProvider>
                </ProtectedRoute>

                )}
          </ApiProvider>
      </body>
    </html>
);
}
