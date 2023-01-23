"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSupabase } from "../components/supabase-provider";

const Rweet = (rweet) => {
  const {
    rweet: { text, created_at, user_id },
  } = rweet;


  return (
    <div className="w-5/6 mx-auto p-4 shadow-sm bg-white rounded-md">
      <p className="text-xl">{text}</p>
      <p className="text-neutral-500 text-right">{created_at}</p>
    </div>
  );
};

export default function HomePage({ serverRweets }) {
  const { supabase, session } = useSupabase();
  const [currentUser, setCurrentUser] = useState({});
  const [rweets, setRweets] = useState(serverRweets);
  const rweetRef = useRef();
  const router = useRouter();

  useEffect(() => {
    setRweets(serverRweets);
  }, [serverRweets]);

  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "rweets" },
        (payload) => setRweets((rweets) => [...rweets, payload.new])
      )
      .subscribe();


    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, setRweets, rweets]);

  const getUser = async () => {

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    setCurrentUser(user);


    if (!user) {
      router.push("/login");
    }

  };

  useEffect(() => {
    getUser();
  }, []);

  const signOut = () => {
    supabase.auth.signOut();
    setCurrentUser({});
    router.push("/login");
  };

  const postRweet = async () => {
    const { data, error } = await supabase
      .from("rweets")
      .insert({ text: rweetRef.current.value, user_id: currentUser.id });


    console.log("data", data);

    console.log("error", error);
  };

  return (
    <div className="bg-neutral-50 h-screen">
      <div className="flex justify-between p-4 bg-red-500 text-white items-start">
        <p className="text-2xl">Redstar</p>
        <button className="border p-2" onClick={signOut}>
          Sign Out
        </button>
      </div>
      <p className="text-right my-4 w-5/6 mx-auto">
        {currentUser?.user_metadata?.username}
      </p>

      <div className="flex flex-col items-start w-5/6 mx-auto justify-between gap-4">
        <textarea className="border p-4 w-full" ref={rweetRef} />
        <button
          onClick={postRweet}
          className="text-white bg-red-600 w-full rounded-sm p-2 uppercase"
        >
          post
        </button>
      </div>
      <div className="flex flex-col gap-2 my-4">
        {rweets.map((rweet, index) => (
          <Rweet rweet={rweet} key={index} />
        ))}
      </div>
    </div>
  );
}
