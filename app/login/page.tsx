"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { useSupabase } from "../../components/supabase-provider";

const page = () => {
  const { supabase, session } = useSupabase();
  const router = useRouter();
  const signIn = async (email, password) => {
    console.log("email", email, password);

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (user) {
        console.log("user", user);
        router.push("/");
      } else {
        console.log("no user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <div className=" bg-neutral-100">
      <div className="max-w-sm mx-auto flex flex-col justify-center h-screen gap-4">
        <p className="text-center w-full text-red-600 font-bold text-lg">Redstar</p>
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
                signIn(emailRef.current.value, passwordRef.current.value);
              }}
              className="p-2 uppercase text-white text-center w-full bg-red-400"
            >
              sign in
            </button>
            <Link href="/signup">
              <button className="p-2 uppercase text-red-400 border w-full">
                sign up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
