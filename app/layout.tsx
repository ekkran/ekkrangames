import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EKKRAN GAMES",
  description: "Game dev studio based in Costa Rica",
};

let menuItems = [
  {
      href:"/Games",
      name:"Games"
  },
  {
    href:"/News",
    name:"News"
  },
  {
    href:"/About",
    name:"About"
  }
];


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
      <NavBar items={menuItems} ></NavBar>
        {children}
        </body>
    </html>
  );
}
