import type { Metadata } from "next";
<<<<<<< HEAD
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ValarPay",
  description: "ValarPay - The future of finance in Nigeria.",
};

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWidgets from "@/components/FloatingWidgets";
// import CookieConsentModal from "@/components/modals/CookieConsentModal";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white overflow-x-hidden">
        <Header />
        <main className="flex-1 w-full relative">{children}</main>
        <Footer />
        <FloatingWidgets />
        {/* <CookieConsentModal /> */}
=======
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import CustomTopLoader from "@/components/shared/CustomTopLoader";
import "react-loading-skeleton/dist/skeleton.css";
import { Toaster } from "react-hot-toast";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import UserProvider from "@/providers/UserProvider";
import GlobalModalsProvider from "@/components/shared/GlobalModalsProvider";
import "react-datepicker/dist/react-datepicker.css";
// Removed next/font/google due to Turbopack resolution error; using Tailwind's font-sans instead

// Using default Tailwind font stack (font-sans)

export const metadata: Metadata = {
  title: "Valarpay – Smart Payments for Your Business",
  description: "Valarpay offers modern payment solutions to streamline your business transactions.",
  openGraph: {
    title: "Valarpay – Smart Payments for Your Business",
    description: "Valarpay offers modern payment solutions to streamline your business transactions.",
    url: "https://www.valarpay.com",
    siteName: "Valarpay",
    images: [
      {
        url: "https://www.valarpay.com/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark" data-mode="dark">

      <body className="font-sans">
        <ThemeProvider>
          <ReactQueryProvider>
            <UserProvider>
              <GlobalModalsProvider />
              <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                  style: {
                    border: "1px solid #E4E7EC",
                    borderRadius: 15,
                    padding: "16px",
                    color: "#000",
                    fontSize: 15,
                    fontWeight: 400,
                  },
                  duration: 15000,
                }}
              />
              <CustomTopLoader />
              <main className="w-full overflow-hidden">{children}</main>
            </UserProvider>
          </ReactQueryProvider>
        </ThemeProvider>
>>>>>>> prod/master
      </body>
    </html>
  );
}
