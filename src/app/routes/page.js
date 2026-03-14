"use client";

import { useEffect, useRef } from "react";
import Wrapper from "@/components/Wrapper";
import mountains from "@/../public/icons/mountains.svg";
import QRCodeStyling from "qr-code-styling";
import { travelURLs } from "@/components/Variables";
import Link from "next/link";
import Button from "@/components/Button";

const Routes = () => {
  const qrRefs = useRef([]);

  useEffect(() => {
    travelURLs.forEach((item, index) => {
      const qr = new QRCodeStyling({
        width: 320,
        height: 320,
        data: item.url,
        dotsOptions: {
          color: "#505050",
          type: "rounded",
        },
        cornersSquareOptions: {
          type: "extra-rounded",
          color: "#505050",
        },
        cornersDotOptions: {
          type: "dot",
        },
        backgroundOptions: {
          color: "#FFFFFF00",
        },
        margin: 0,
      });

      if (qrRefs.current[index]) {
        qr.append(qrRefs.current[index]);
      }
    });
  }, []);

  return (
    <Wrapper>
      <div className="flex flex-col gap-13 w-full">
        <div className="flex bg-white items-center rounded-[20px] w-full px-20 py-13.5 justify-between">
          <h1>МАРШРУТЫ</h1>
          <img src={mountains.src} alt="mountains" />
        </div>

        <div className="grid grid-cols-2 gap-8">
          {travelURLs.map((item, index) => (
            <div key={index}>
              <div className="flex relative overflow-hidden flex-col items-center gap-16.5 bg-white pt-18 pb-15 px-6 rounded-t-[20px]">
                <h2 className="uppercase">{item.title} маршрут</h2>
                <div ref={(el) => (qrRefs.current[index] = el)} />

                <div className="text-center text-sm">
                  {item.path.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
              <Link href={item.url}>
                <Button className="w-full rounded-t-none rounded-b-[20px]">
                  ОТКРЫТЬ В ЯНДЕКС КАРТАХ
                </Button>
              </Link>
            </div>
          ))}
        </div>
        <div className="radial rounded-[20px] flex flex-col w-full px-20 py-16.5 justify-between">
          <div className="flex flex-col gap-4.5">
            <h1 className="text-white">
              ЗНАЕТЕ МЕСТА О КОТОРЫХ
              <br />
              НЕ ЗНАЕМ МЫ?
            </h1>
            <div className="flex flex-col w-full text-[15px]">
              <span className="text-white">
                Напишите нам, а мы рассмотрим Вашу идею и добавим её на сайт
              </span>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Routes;
