import Wrapper from "@/components/Wrapper";
import Button from "@/components/Button";
import Link from "next/link";

const PageGen = ({ section, ico, head, path }) => {
  return (
    <Wrapper>
      <div className="flex flex-col bg-white rounded-[20px] w-full px-20 py-16.5 max-[768px]:p-6 pb-37.5 max-[768px]:pb-10 z-0">
        <div className="flex justify-between items-center w-full pb-37.5 max-[768px]:pb-10 max-[768px]:flex-col-reverse gap-y-4">
          <h1>{head}</h1>
          <img
            src={ico.src}
            alt={ico.name}
            className="shrink-0 max-[768px]:max-h-25"
          />
        </div>
        <div className="flex relative flex-col gap-62.5 max-[768px]:gap-10 z-2">
          {path.src && (
            <img
              src={path.src}
              alt="path"
              draggable="false"
              className="absolute top-0 left-0 select-none pointer-events-none z-0 max-[768px]:hidden"
            />
          )}
          {section.map((item, index) => {
            const isReversed = index % 2 == 0;
            return (
              <div
                key={index}
                className={`flex ${isReversed ? "flex-row-reverse max-[768px]:flex-col-reverse" : "flex-row max-[768px]:flex-col-reverse"} justify-between gap-6 h-full max-[768px]:items-center`}
              >
                <div
                  className={`flex ${isReversed ? "items-end" : "items-start"} flex-col justify-between gap-y-4`}
                >
                  <div
                    className={`flex ${isReversed ? "text-end max-[768px]:text-start" : "text-start"} flex-col gap-6`}
                  >
                    <h2>{item.title}</h2>
                    <span className="text-[20px] max-[768px]:text-[15px]">
                      {item.text}
                    </span>
                  </div>
                  <Link href={item.url} className="w-fit max-[768px]:w-full">
                    <Button className="max-[768px]:w-full">
                      ПОДОБРАТЬ МАРШРУТ
                    </Button>
                  </Link>
                </div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-112.5 h-auto object-cover flex-1 z-2 max-[768px]:w-45 "
                />
              </div>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

export default PageGen;
