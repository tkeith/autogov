import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import Web3Container from "~/app/_components/Web3Container";
import { Toaster } from "react-hot-toast";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <div className="mx-auto my-8 flex max-w-3xl flex-col space-y-4 p-4 ">
            <Web3Container>
              <Link href="/">
                <h1 className="cursor-pointer text-3xl font-bold">Autogov</h1>
              </Link>
              {children}
            </Web3Container>
          </div>
        </TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
