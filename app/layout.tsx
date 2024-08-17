import { Grain, Header, Providers } from "@/components";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://apik.me/"),
  title: {
    default: "apikmeister",
    template: "%s | apikmeister",
  },
  description: "apik portfolio",
  openGraph: {
    title: "apikmeister",
    description: "apik portfolio",
    url: "https://apik.me/",
    siteName: "apik portfolio",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "apikmeister",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} `}>
        <Grain />
        <main className="">
          <Providers>
            <Header />
            {children}
          </Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}
