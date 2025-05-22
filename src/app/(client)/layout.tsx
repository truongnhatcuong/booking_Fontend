import { Metadata } from "next";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { Inter } from "next/font/google";
import HeaderTop from "./components/header/HeaderTop";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "XTRAVEL - Travel Agency",
  description: "Your trusted travel agency for unforgettable experiences",
  icons: {
    icon: "/next.svg",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} flex flex-col h-screen`}>
      <header>
        <HeaderTop />
        <Header />
      </header>
      <main className="flex-1">{children}</main>
      <footer className="mt-20">
        <Footer />
      </footer>
    </div>
  );
}
