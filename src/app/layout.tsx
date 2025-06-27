import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SessionProvider from "./components/SessionProvider";
import Navbar from "./components/Navbar";
import ReduxProvider from "@/app/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ecommerce App",
  description: "A Next.js e-commerce site",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ReduxProvider>
            <Navbar />
            {children}
            <Toaster />
          </ReduxProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
