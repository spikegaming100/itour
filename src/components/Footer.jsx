import Wrapper from "@/components/Wrapper";
import Logo from "@/assets/Logo.svg";
import Rgutis from "@/assets/Rgutis.png";
import { Link, useLocation } from "react-router-dom";
import { routes } from "@/components/Variables";
import { Fragment } from "react";

const Footer = () => {
  const { pathname } = useLocation();

  return (
    <Wrapper className="grow-0 min-[1588px]:w-full flex max-[768px]:flex-col gap-y-10 bg-white px-20 py-16.5 max-[768px]:p-6 rounded-[20px] mb-22.5 items-center max-[768px]:items-center justify-between z-1">
      <div className="flex flex-col gap-9 max-[768px]:w-full max-[768px]:items-center">
        <div className="flex gap-x-9 gap-y-6 items-center justify-center max-[768px]:flex-col">
          <Link to={"/"}>
            <img src={Logo} alt="logo" />
          </Link>
          <a href="https://rgutis.ru" target="_blank" rel="noreferrer">
            <img src={Rgutis} alt="rgutis" />
          </a>
        </div>
        <div className="flex flex-col text-[15px] gap-3.75">
          <span>Связаться с нами:</span>
          <div className="flex flex-col">
            <Link to="/contact">+7 (945) 888 88-88</Link>
            <Link to="/contact">it_our@gmail.com</Link>
          </div>
        </div>
      </div>
      <nav className="flex flex-col uppercase gap-3.75 max-[768px]:items-center">
        {routes.map((route, index) => {
          const isActive = pathname === route.path;
          return (
            <Fragment key={index}>
              <Link
                to={route.path}
                className={`
                text-[15px]
                transition-colors 
                ease-in-out 
                duration-200
                bg-clip-text
                text-transparent
                bg-linear-to-r from-gray to-gray
                 ${
                   isActive
                     ? "text-orange!"
                     : "hover:bg-linear-to-r hover:from-[#FF7115] hover:to-[#07A274] hover:bg-clip-text hover:text-transparent"
                 }`}
              >
                {route.title}
              </Link>
            </Fragment>
          );
        })}
      </nav>
    </Wrapper>
  );
};

export default Footer;
