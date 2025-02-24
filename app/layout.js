import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/molecules/Header";
import Footer from "@/molecules/Footer";
import GlobalProvider from "@/context/GlobalProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Contact Center",
  description: "Aplicación para Contact Center",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <GlobalProvider>
          <main>{children}</main>
        </GlobalProvider>
        <Footer />
      </body>
    </html>
  );
}
