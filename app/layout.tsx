import { Grain, Header, Providers } from "@/components";
import "./globals.css";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "apik portfolio",
  description: "apik portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Grain />
        <main className="min-w-0 px-2 md:px-0 max-w-4xl mb-40 mx-4 lg:mx-auto">
          <Providers>
            <Header />
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}
