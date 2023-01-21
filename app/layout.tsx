"use client";
import "../styles/globals.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <html lang="en">
      <body className="font-beaufort">
        <div>
          <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
          <Navbar showMenu={showMenu} setShowMenu={setShowMenu} />

          <AnimatePresence mode="wait">{children}</AnimatePresence>
        </div>
      </body>
    </html>
  );
}
