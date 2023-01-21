"use client";
import Link from "next/link";
import React, { MouseEventHandler, useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const MenuLink = ({
  link,
  handleMenu,
}: {
  link: string;
  handleMenu: MouseEventHandler;
}) => {
  return (
    <Link
      onClick={handleMenu}
      className="text-4xl font-clashBold capitalize mt-4"
      href={link === "home" ? "/" : link}
    >
      {link}
    </Link>
  );
};

const links = ["home", "about", "works"];

const Menu = ({
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
    <div
      className={`${
        showMenu ? "block" : "hidden"
      } fixed h-screen w-full z-50`}
    ></div>
  );
};

export default Menu;
