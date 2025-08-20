import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import WhatsAppMessage from "@/component/calltoaction/WhatsAppMessage";
import CallButton from "@/component/calltoaction/CallButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dikshant IAS Coaching Center In India",
  description: "Dikshant IAS is the one of the best ias coaching center in India",
};

export default function RootLayout({children,}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        
      <body>
        <Header />
        {children}
        <Footer />
        <WhatsAppMessage />
        <CallButton />

      </body>
      </html>
   
    </>
  );
}
