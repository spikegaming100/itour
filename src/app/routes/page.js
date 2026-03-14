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
        width: 295,
        height: 295,
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
      <div className="flex flex-col gap-10 w-full">
        <div className="flex justify-between items-center w-full max-[768px]:pb-10 max-[768px]:flex-col-reverse gap-y-4 bg-white rounded-[20px] px-20 py-16.5 max-[768px]:p-6">
          <h1>МАРШРУТЫ</h1>
          <img src={mountains.src} alt="mountains" />
        </div>

        <div className="grid grid-cols-2 gap-10 max-[768px]:grid-cols-1">
          {travelURLs.map((item, index) => (
            <div key={index}>
              <div className="flex relative overflow-hidden flex-col items-center gap-16.5 max-[768px]:gap-6 bg-white pt-18 pb-15 px-6 max-[768px]:p-6 rounded-t-[20px]">
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
        <div className="radial rounded-[20px] flex flex-col w-full px-20 py-16.5 max-[768px]:p-6 justify-between">
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
