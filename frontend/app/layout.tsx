import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/context/(companyAuth)/AuthContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Lite Ticket",
  description:
    "Lite Ticket is a platform for event and party and travel tours ticket sales",
  icons: {
    icon: "/assets/images/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthContextProvider>
        <body className={poppins.variable}>{children}</body>
      </AuthContextProvider>
    </html>
  );
}
