import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="antialiased w-full flex flex-col min-h-screen justify-between gap-20">
        <div className="overflow-hidden">
          <Header />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
