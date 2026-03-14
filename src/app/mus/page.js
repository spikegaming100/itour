import lamp from "../../../public/mus/lamp.svg";
import Wrapper from "@/components/Wrapper";
import Button from "@/components/Button";
import { sections4 } from "@/components/Variables";
import Link from "next/link";

const Sri = () => {
  return (
    <Wrapper>
      <div className="flex flex-col bg-white rounded-[20px] w-full px-20 py-13.5 pb-[150px] z-0">
        <div className="flex justify-between items-center w-full pb-37.5">
          <h1>МУЗЕИ</h1>
          <img src={lamp.src} alt="lamp" className="shrink-0" />
        </div>
        <div className="flex relative flex-col gap-62.5 z-2">
          {sections4.map((item, index) => {
            const isReversed = index % 2 == 0;
            return (
              <div
                key={index}
                className={`flex ${isReversed ? "flex-row-reverse" : "flex-row"} justify-between gap-6 h-full`}
              >
                <div
                  className={`flex ${isReversed ? "items-end" : "items-start"} flex-col justify-between`}
                >
                  <div
                    className={`flex ${isReversed ? "text-end items-end" : "text-start"} flex-col gap-6`}
                  >
                    <h2>{item.title}</h2>
                    <span className="text-[20px]">{item.text}</span>
                  </div>
                  <Link href={item.url} className="w-fit">
                    <Button>ПОДОБРАТЬ МАРШРУТ</Button>
                  </Link>
                </div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-112.5 h-auto object-cover flex-1 z-2"
                />
              </div>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

export default Sri;
