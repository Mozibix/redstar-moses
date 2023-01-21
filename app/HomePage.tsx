"use client";

import Image from "next/image";
import Link from "next/link";
import { motion as m } from "framer-motion";
import home from "../public/home.jpg";

const RoomType = ({ name, link }: { name: string; link: string }) => (
  <div className="mt-2">
    <Link href={link}>
      <p className="mb-2 uppercase font-medium">{name}</p>
      <div className="h-[1px] bg-black w-full"></div>
    </Link>
  </div>
);

const rooms = [
  { name: "room 1", link: "room" },
  { name: "room 2", link: "room" },
  { name: "room 3", link: "room" },
  { name: "room 4", link: "room" },
  { name: "room 5", link: "room" },
  { name: "room 6", link: "room" },
];

export default function HomePage() {
  return (
    <m.div className="absolute top-0 left-0 w-full h-full">
      <section className="relative h-screen w-full text-white">
        <Image
          src="https://images.unsplash.com/photo-1631049421450-348ccd7f8949?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt="hotel room"
          className="object-cover filter brightness-75"
          fill={true}
          unoptimized
        />
        <div className="absolute top-1/2 text-center w-full">
          <p className="text-5xl w-[90%] mx-auto">
            A place in the heart of the <span className="italic">center</span>{" "}
          </p>
        </div>
      </section>
      <section className="h-screen w-5/6 mx-auto text-center">
        <p className="text-2xl pt-[10vh]">
          A sophisticated and cosmopolitan atmosphere that reflects the most
          elegant and exclusive heritage of Madrid and combines it with the
          city’s modernity and multiculturalism.
        </p>
        <button className="uppercase font-semibold mt-4 mb-16">
          Book with us
        </button>
        <div className="relative h-1/3 w-full">
          <Image
            alt="outside"
            fill={true}
            className="bg-contain"
            src="https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
          />
        </div>
      </section>
      <section className="h-screen w-5/6 mx-auto pt-[5vh] text-center flex flex-col justify-between">
        <p className="text-5xl mb-8">
          Choose your <span className="italic">room</span>
        </p>
        {rooms.map(({ name, link }) => (
          <RoomType name={name} link={link} key={name} />
        ))}
        <p className="mt-8 text-3xl">
          Subdued colours, soft textures, designer pieces, the soft touch of the
          Egyptian thread sheets, the pause, the calm, the silence… A private
          and personal space.
        </p>
        <button className="uppercase mt-2 font-semibold">
          Discover all rooms
        </button>
      </section>
      <section className="mt-[10vh]">
        <p className="text-center text-4xl w-1/2 mx-auto">
          Visit the <span className="italic">Bar & Restaurant</span>
        </p>
        <p>Orix Empire Restuarant</p>
        <div className="h-screen w-11/12 mx-auto my-8 relative">
          <Image
            src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            alt="Restuarant"
            fill={true}
          />
        </div>
      </section>
    </m.div>
  );
}
