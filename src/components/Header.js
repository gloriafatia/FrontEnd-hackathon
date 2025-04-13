import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Brown Vintage Retro Illustration Farming and Organic Product Logo.png";
import { FaRegUserCircle } from "react-icons/fa";
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
      console.log(userName);
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
          <div
            className="text-[#3a6a40] hover:text-[#2d5031] cursor-pointer"
            onClick={handleShowMenu}
          >
            <div className="text-lg text-[#3a6a40] flex items-center">
              <FaRegUserCircle />
              {userName && (
                <span className="ml-2 text-base text-[#3a6a40]">{userName}</span>
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col">
                {isLoggedIn ? (
                  <>
                    {role === "ROLE_SELLER" && (
                      <>
                        <Link
                          to={"/postime"}
                          className="whitespace-nowrap cursor-pointer text-[#3a6a40] hover:text-[#2d5031] w-full text-center"
                        >
                          Postimet e mia
                        </Link>
                        <Link
                          to={"/postime/krijo"}
                          className="whitespace-nowrap cursor-pointer text-[#3a6a40] hover:text-[#2d5031] w-full text-center"
                        >
                          Krijo Postim
                        </Link>
                      </>
                    )}

                    {/* "Post Requests" button for sellers */}
                    <Link
                      to={"/postime/requests"}
                      className="whitespace-nowrap cursor-pointer text-[#3a6a40] hover:text-[#2d5031] w-full text-center"
                    >
                      Made Offers
                    </Link>

                    {/* "Admin Panel" button for admin role */}
                    {role === "ROLE_ADMIN" && (
                      <Link
                        to={"/admin"}
                        className="whitespace-nowrap cursor-pointer text-[#3a6a40] hover:text-[#2d5031] w-full text-center"
                      >
                        Admin Panel
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="whitespace-nowrap cursor-pointer text-[#3a6a40] hover:text-[#2d5031] w-full text-center"
                    >
                      Dil
                    </button>
                  </>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer text-[#3a6a40] hover:text-[#2d5031] w-full text-center"
                  >
                    Kyçu
                  </Link>
                )}
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
