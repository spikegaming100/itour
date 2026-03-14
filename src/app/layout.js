import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "ITour | Наш цифровой туризм",
  description:
    "НАША МИССИЯ - ПРОМЫШЛЕННЫЙ ТУРИЗМ Мы - студенты направления Цифровые сервисы для бизнеса и наша цель - развивать цифровую среду на территории Российской Федерации, включая индустрию туризма.Предлагаем Вам заглянуть за кулисы промышленных центров и отправиться в путешествие по научно-исследовательским институтам, конструкторским бюро, наукоградам и музеям Московской области.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="antialiased w-full flex flex-col min-h-screen justify-between gap-20 max-[768px]:gap-6">
        <div className="overflow-hidden">
          <Header />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
