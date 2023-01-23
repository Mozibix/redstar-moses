"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import supabase from "../../utils/supabase";

const page = () => {
  const signUp = async (email, username, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      // options: {
      //   data: { username },
      // },
    });
    console.log("error", error);
    console.log("data", data);
  };

  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  return (
    <div className=" bg-neutral-100">
      <div className="max-w-sm mx-auto flex flex-col justify-center h-screen gap-4">
        <p className="text-center w-full">Redstar</p>
        <div className="p-8 bg-white rounded-md">
          <div className="flex flex-col gap-1">
            <input
              ref={emailRef}
              className="border p-3"
              type="email"
              placeholder="email"
              name=""
              id=""
            />
            <input
              ref={usernameRef}
              className="border p-3"
              placeholder="username"
              type="text"
            />
            <input
              ref={passwordRef}
              className="border p-3"
              type="password"
              placeholder="password"
              name=""
              id=""
            />
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <button
              onClick={() => {
                signUp(
                  emailRef.current.value,
                  usernameRef.current.value,
                  passwordRef.current.value
                );
              }}
              className="p-2 uppercase text-white text-center w-full bg-red-400"
            >
              sign up
            </button>
            <Link href="/login">
              <button className="p-2 uppercase text-red-400 border w-full">
                sign in
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
