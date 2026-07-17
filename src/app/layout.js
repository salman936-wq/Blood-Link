import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ImageKitProvider } from "@imagekit/next";
  import { ToastContainer } from 'react-toastify';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BloodLink — Find & Become a Blood Donor",
  description: "A verified network connecting willing donors to patients who need blood, fast.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className="font-body bg-white text-gray-900 antialiased">
        <ImageKitProvider
          publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}
          urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
        >
          <ToastContainer />
          {children}
        </ImageKitProvider>
      </body>
    </html>
  );
}
