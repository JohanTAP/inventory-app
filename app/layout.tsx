import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist( {
  variable: "--font-geist-sans",
  subsets: [ "latin" ],
} );

const geistMono = Geist_Mono( {
  variable: "--font-geist-mono",
  subsets: [ "latin" ],
} );

export const metadata: Metadata = {
  title: "Inventory App",
  description: "An inventory app built with Next.js",
};

export default function RootLayout ( {
  children,
}: Readonly<{
  children: React.ReactNode;
}> )
{
  return (
    <html lang="es">
      <body
        className={ `${ geistSans.variable } ${ geistMono.variable } antialiased` }
      >
        <header className="bg-gray-800 text-white p-4">
          <nav>
            <Link href="/" className="mr-4">Inicio</Link>
            <Link href="/inventario">Inventario</Link>
          </nav>
        </header>
        { children }
      </body>
    </html>
  );
}
