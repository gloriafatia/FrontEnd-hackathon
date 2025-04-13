import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Brown Vintage Retro Illustration Farming and Organic Product Logo.png";
import { FaRegUserCircle } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { token, userName, role, logout } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true); 
    }
  }, [token]);

  const handleShowMenu = () => {
    setShowMenu((previous) => !previous);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("authToken"),
        }),
      });

 
        logout();
        setIsLoggedIn(false);
        navigate("/login");
    
      
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Gabim në server gjatë daljes.");
    }
  };

  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-14">
            <img src={logo} className="h-full" />
          </div>
        </Link>
        <div className="flex items-center gap-4 md:gap-7">
          <nav className="flex gap-4 md:gap-6 text-base md:text-lg">
            <Link to={"krye"}>Krye</Link>
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
          <div className="text-slate-600" onClick={handleShowMenu}>
            <div className="text-2xl cursor-pointer">
              <FaRegUserCircle />
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="whitespace-nowrap cursor-pointer"
                  >
                    Dil
                  </button>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer"
                  >
                    Kyçu
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
