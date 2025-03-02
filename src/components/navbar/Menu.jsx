import React from "react";
import { useNavigate } from "react-router-dom";

const genericHamburgerLine = `h-[2px] w-6 my-1 rounded-full bg-black transition ease transform duration-300`;

export const Menu = ({ isOpen, toggleMenu }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("gToken");
    window.location.href = "/";
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("gToken");

  return (
    <>
      {/* 햄버거 아이콘 */}
      <button
        className="relative z-30 flex flex-col h-12 w-12 rounded justify-center items-center group"
        onClick={toggleMenu}
      >
        <div
          className={`${genericHamburgerLine} ${
            isOpen ? "rotate-45 translate-y-0" : "translate-y-[-8px]"
          } absolute`}
        />
        <div
          className={`${genericHamburgerLine} ${
            isOpen ? "opacity-0" : "opacity-100"
          } absolute`}
        />
        <div
          className={`${genericHamburgerLine} ${
            isOpen ? "-rotate-45 translate-y-0" : "translate-y-[8px]"
          } absolute`}
        />
      </button>

      {/* 슬라이드 다운 메뉴 */}
      <div
        className={`fixed top-0 w-full bg-white transform transition-transform duration-300 z-20 ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ height: "60vh" }}
      >
        <div className="pt-[30px] pl-2">
          <h2 className="text-lg font-bold">Menu</h2>
          <ul className="mt-4">
            <li className="py-2">
              <a href="/admin">Admin</a>
            </li>
            <li className="py-2">
              <button onClick={isLoggedIn ? handleLogout : handleLogin}>
                {isLoggedIn ? "Logout" : "Login"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
