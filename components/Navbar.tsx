"use client";
import React from "react";

const Navbar = ({
  showMenu,
  setShowMenu,
}: {
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="fixed w-full top-0 z-50">
      <nav className="font-semibold flex justify-between uppercase items-start m-6 text-white">
        <button className="uppercase">menu</button>
        <div className="text-center tracking-widest">
          <p className="text-3xl">Orix</p>
          <p className="text-xs">empire</p>
        </div>
        <button className="uppercase">book</button>
      </nav>
    </header>
  );
};

export default Navbar;
