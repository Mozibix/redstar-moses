"use client";
import Link from "next/link";
import React, { MouseEventHandler, useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const MenuLink = ({ name, link }: { link: string; name: string }) => {
  return (
    <Link className="text-5xl mt-4 capitalize" href={link}>
      {name}
    </Link>
  );
};

const links = [
  { name: "The hotel", link: "hotel" },
  { name: "Rooms", link: "rooms" },
  { name: "Bar & restaurant", link: "barandrestaurant" },
  { name: "contact", link: "contact" },
];

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
      } fixed h-screen w-full z-50 bg-neutral-800 flex flex-col justify-between text-center text-white p-6`}
    >
      <div className="flex justify-between uppercase text-lg">
        <button onClick={handleMenu} className="uppercase">
          close
        </button>
        <p>Empire</p>
        <button className="uppercase">book</button>
      </div>
      <div className="flex flex-col">
        {links.map(({ name, link }) => (
          <div key={name} onClick={handleMenu} className="my-4">
            <MenuLink name={name} link={link} />
          </div>
        ))}
      </div>
      <div className="">
        Made by <span className="text-red-500">red</span>pill
      </div>
    </div>
  );
};

export default Menu;
