import Wrapper from "@/components/Wrapper";
import Button from "@/components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <Wrapper>
      <div className="radial h-150 rounded-[20px] flex flex-col w-full px-20 py-16.5 max-[768px]:p-6 justify-between max-[768px]:h-fit gap-y-4 max-[768px]:items-center">
        <div className="flex flex-col gap-4.5">
          <h1 className="text-white">
            НАША МИССИЯ -
            <br />
            ПРОМЫШЛЕННЫЙ ТУРИЗМ
          </h1>
          <div className="flex flex-col w-full max-w-163.5 gap-3.75 text-[15px]">
            <span className="text-white">
              Мы - студенты направления Цифровые сервисы для бизнеса и наша цель
              - развивать цифровую среду на территории Российской Федерации,
              включая индустрию туризма.
            </span>
            <span className="text-white">
              Предлагаем Вам заглянуть за кулисы промышленных центров и
              отправиться в путешествие по научно-исследовательским институтам,
              конструкторским бюро, наукоградам и музеям Московской области.
            </span>
          </div>
        </div>
        <Link href="/routes" className="w-fit">
          <Button className="uppercase" variant="secondary">
            ПОДОБРАТЬ МАРШРУТ
          </Button>
        </Link>
      </div>
    </Wrapper>
  );
}
