import Wrapper from "@/components/Wrapper";
import Logo from "@/assets/Logo.svg";
import { Link, useLocation } from "react-router-dom";
import { Fragment } from "react";
import { routes } from "@/components/Variables";

const Header = () => {
  const { pathname } = useLocation();

  return (
    <Wrapper className="py-14.25 justify-between flex items-center max-[768px]:flex-col gap-y-4 max-[768px]:pb-6">
      <Link to={"/"}>
        <img src={Logo} alt="logo" />
      </Link>
      <nav className="flex items-center gap-3.25 uppercase flex-wrap max-[768px]:justify-center">
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
              {index !== routes.length - 1 && <span>/</span>}
            </Fragment>
          );
        })}
      </nav>
    </Wrapper>
  );
};

export default Header;
