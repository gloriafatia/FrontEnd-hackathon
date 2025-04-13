import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Brown Vintage Retro Illustration Farming and Organic Product Logo.png";
import { FaRegUserCircle } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenu = () => {
    setShowMenu((previous) => !previous);
  };

  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-[#eaf1e3]">
      {/* desktop */}

      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-14">
            <img src={logo} className="h-full" />
          </div>
        </Link>
        <div className="flex items-center gap-4 md:gap-7">
          <nav className="flex gap-4 md:gap-6 text-base md:text-lg">
            <Link to={""} className="text-[#3a6a40] hover:text-[#2d5031]">Krye</Link>
            <Link to={"katalogu"} className="text-[#3a6a40] hover:text-[#2d5031]">Katalogu</Link>
            <Link to={"rreth"} className="text-[#3a6a40] hover:text-[#2d5031]">Rreth Nesh</Link>
            <Link to={"kontakt"} className="text-[#3a6a40] hover:text-[#2d5031]">Kontaktoni</Link>
          </nav>
          <div className="text-2xl text-[#3a6a40] relative">
            <IoCartSharp />
            <div className="absolute -top-2 -right-1 text-white bg-[#4e8b57] h-4 w-4 rounded-full flex items-center justify-center text-[10px] leading-none">
              0
            </div>
          </div>
          <div
            className="text-[#3a6a40] hover:text-[#2d5031] cursor-pointer"
            onClick={handleShowMenu}
          >
            <div className="text-2xl">
              <FaRegUserCircle />
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col">
                <Link to={"login"} className="whitespace-nowrap cursor-pointer text-[#3a6a40] hover:text-[#2d5031]">Kyçu</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
    </header>
  );
};

export default Header;
