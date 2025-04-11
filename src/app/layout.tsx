'use client';
// import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "antd/dist/reset.css";
import Providers from "./providers"; // 👈 Import the client-side wrapper
import { AuthProvider, useAuth } from "@/auth/context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

function AuthRedirect({ children }: { children: React.ReactNode }) {
  const { state } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!state.isLoading && !state.isAuthenticated && window.location.pathname !== '/login') {
      router.push('/login');
    }
  }, [state.isAuthenticated, state.isLoading, router]);

  if (state.isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
        <AuthProvider>
          <AuthRedirect>
            {children}
          </AuthRedirect>
        </AuthProvider>
          </Providers>
      </body>
    </html>
  );
}
