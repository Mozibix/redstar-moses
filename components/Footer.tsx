import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="h-screen flex flex-col justify-around text-center bg-neutral-800 text-white text-xl uppercase">
      <div className="">
        <p>Contact</p>

        <div className="">
          <p>+234 810 2437 899</p>
          <p>orixempirex@gmail.com</p>
        </div>
      </div>

      <p>Orix Empire Investment</p>
      <p>
        Built By <span className="text-red-500">red</span>
        <span className="">pill</span>
      </p>
    </footer>
  );
};

export default Footer;
