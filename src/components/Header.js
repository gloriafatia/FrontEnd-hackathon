import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Brown Vintage Retro Illustration Farming and Organic Product Logo.png";
import { FaRegUserCircle } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenu = ()=> {
    setShowMenu(preveious => !preveious)
  }
  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      {/* desktop */}

      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-14">
            <img src={logo} className="h-full" />
          </div>
        </Link>
        <div className="flex items-center gap-4 md:gap-7">
          <nav className="flex gap-4 md:gap-6 text-base md:text-lg">
            <Link to={""}>Krye</Link>
            <Link to={"katalogu"}>Katalogu</Link>
            <Link to={"rreth"}>Rreth Nesh</Link>
            <Link to={"kontakt"}>Kontaktoni</Link>
          </nav>
          <div className="text-2xl text-slate-600 relative">
            <IoCartSharp />
            <div className="absolute -top-2 -right-1 text-white bg-red-500 h-4 w-4 rounded-full flex items-center justify-center text-[10px] leading-none">
              0
            </div>
          </div>
          <div className=" text-slate-600" onClick={handleShowMenu}>
            <div className="text-2xl cursor-pointer " >
              <FaRegUserCircle />
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col">
                <Link to={"login"} className="whitespace-nowrap cursor-pointer">Kyçu</Link>
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
