import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Brown Vintage Retro Illustration Farming and Organic Product Logo.png";
import { FaRegUserCircle } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const { token, userName, role, logout } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (token) setIsLoggedIn(true);
  }, [token]);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: localStorage.getItem("authToken") }),
      });

      logout();
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Gabim në server gjatë daljes.");
    }
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "al" ? "en" : "al");
  };

  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-[#eaf1e3]">
      <div className="flex items-center h-full justify-between">
        <Link to="/">
          <div className="h-14">
            <img src={logo} className="h-full" alt="Logo" />
          </div>
        </Link>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden flex items-center gap-3">
          {/* User icon for mobile */}
          <div
            className="text-[#3a6a40] hover:text-[#2d5031] cursor-pointer relative"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <div className="text-lg flex items-center">
              <FaRegUserCircle />
              {userName && (
                <span className="ml-2 text-base text-[#3a6a40]">{userName}</span>
              )}
            </div>

            {showMenu && (
              <div className="absolute right-0 bg-white py-2 px-2 mt-2 shadow-md rounded flex flex-col min-w-max z-10">
                {isLoggedIn ? (
                  <>
                    {role === "ROLE_SELLER" && (
                      <>
                        <Link to="/postime" className="dropdown-link">{t("my_posts")}</Link>
                        <Link to="/postime/krijo" className="dropdown-link">{t("create_post")}</Link>
                      </>
                    )}
                    <Link to="/postime/requests" className="dropdown-link">{t("made_offers")}</Link>
                    {role === "ROLE_ADMIN" && (
                      <Link to="/admin" className="dropdown-link">Admin Panel</Link>
                    )}
                    <button onClick={handleLogout} className="dropdown-link text-left">{t("logout_button")}</button>
                  </>
                ) : (
                  <Link to="/login" className="dropdown-link">{t("login_button")}</Link>
                )}
              </div>
            )}
          </div>

          {/* Hamburger */}
          <div className="text-2xl text-[#3a6a40] cursor-pointer" onClick={() => setShowMobileNav(!showMobileNav)}>
            {showMobileNav ? <HiX /> : <HiMenuAlt3 />}
          </div>
        </div>

        {/* Desktop Navigation + User Info */}
        <div className="hidden md:flex items-center gap-4 md:gap-7">
          <nav className="flex gap-4 md:gap-6 text-base md:text-lg">
            <Link to="/" className="text-[#3a6a40] hover:text-[#2d5031]">{t("home")}</Link>
            <Link to="/katalogu" className="text-[#3a6a40] hover:text-[#2d5031]">{t("catalog")}</Link>
            <Link to="/rreth" className="text-[#3a6a40] hover:text-[#2d5031]">{t("about")}</Link>
            <Link to="/kontakt" className="text-[#3a6a40] hover:text-[#2d5031]">{t("contact")}</Link>
          </nav>

          {/* Desktop User Dropdown */}
          <div className="relative cursor-pointer text-[#3a6a40]" onClick={() => setShowMenu((prev) => !prev)}>
            <div className="text-lg flex items-center">
              <FaRegUserCircle />
              {userName && <span className="ml-2 text-base">{userName}</span>}
            </div>
            {showMenu && (
              <div className="absolute right-0 bg-white py-2 px-3 mt-2 shadow-md rounded flex flex-col min-w-max z-10">
                {isLoggedIn ? (
                  <>
                    {role === "ROLE_SELLER" && (
                      <>
                        <Link to="/postime" className="dropdown-link">{t("my_posts")}</Link>
                        <Link to="/postime/krijo" className="dropdown-link">{t("create_post")}</Link>
                      </>
                    )}
                    <Link to="/postime/requests" className="dropdown-link">{t("made_offers")}</Link>
                    {role === "ROLE_ADMIN" && (
                      <Link to="/admin" className="dropdown-link">{t("Admin Panel")}</Link>
                    )}
                    <button onClick={handleLogout} className="dropdown-link text-left">{t("logout_button")}</button>
                  </>
                ) : (
                  <Link to="/login" className="dropdown-link">{t("login_button")}</Link>
                )}
              </div>
            )}
          </div>

          {/* Desktop Language Toggle */}
          <button onClick={toggleLanguage} className="ml-4 text-[#3a6a40] hover:text-[#2d5031]">
            {i18n.language === "al" ? "EN" : "AL"}
          </button>
        </div>
      </div>

      {/* Mobile Collapsible Nav */}
      {showMobileNav && (
        <div className="md:hidden bg-[#eaf1e3] px-4 py-3 flex flex-col gap-3 text-base">
          <Link to="/" className="text-[#3a6a40]" onClick={() => setShowMobileNav(false)}>{t("home")}</Link>
          <Link to="/katalogu" className="text-[#3a6a40]" onClick={() => setShowMobileNav(false)}>{t("catalog")}</Link>
          <Link to="/rreth" className="text-[#3a6a40]" onClick={() => setShowMobileNav(false)}>{t("about")}</Link>
          <Link to="/kontakt" className="text-[#3a6a40]" onClick={() => setShowMobileNav(false)}>{t("contact")}</Link>
          <button onClick={toggleLanguage} className="text-[#3a6a40]">{i18n.language === "al" ? "EN" : "AL"}</button>
        </div>
      )}
    </header>
  );
};

export default Header;
