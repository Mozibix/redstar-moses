"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSupabase } from "../components/supabase-provider";
import { AiFillDelete, AiFillEdit, AiFillMessage } from "react-icons/ai";

const Rweet = ({ rweet, userId }) => {
  const { text, created_at, user_id, id } = rweet;

  const [edit, setEdit] = useState(text);

  const { supabase } = useSupabase();

  const deleteRweet = async () => {
    console.log("id", id);

    const x = await supabase.from("rweets").delete().eq("id", id);

    console.log("data", x);
  };

  const editRweet = async () => {
    const x = await supabase.from("rweets").update({ text: edit }).eq("id", id);

    console.log(edit);

    console.log("data", x);
  };

  const [showComments, setShowComments] = useState(false);

  return (
    <div className="w-5/6 mx-auto p-4 shadow-sm bg-white rounded-md">
      <div className="flex w-full justify-end gap-4 cursor-pointer">
        <AiFillDelete onClick={deleteRweet} className="text-red-600" />
        <AiFillEdit onClick={editRweet} className="text-green-600" />
      </div>
      <p className="text-xl">{text}</p>
      <textarea value={edit} onChange={(e) => setEdit(e.target.value)} />
      <p className="text-neutral-500 text-right">{created_at}</p>
      <AiFillMessage
        onClick={() => {
          setShowComments(!showComments);
        }}
        className="text-neutral-500"
      />

      {showComments ? <Comment userId={userId} rweetId={id} /> : <></>}
    </div>
  );
};

const Comment = ({ userId, rweetId }) => {
  const commentRef = useRef();
  const { supabase } = useSupabase();
  const [postComments, setPostComments] = useState([]);

  const postComment = async () => {
    const { data, error } = await supabase.from("comments").insert([
      {
        comment: commentRef.current.value,
        user_id: userId,
        rweet_id: rweetId,
      },
    ]);
  };

  const getComments = async () => {
    let { data: comments, error } = await supabase.from("comments").select("*");
    setPostComments(comments);
  };

  // Moses Write the code to delete this comment
  const deleteComment = () => {};

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="">
      <div className="my-4 flex gap-2">
        <textarea className="border" type="text" ref={commentRef} />
        <button
          onClick={postComment}
          className="border px-4 uppercase bg-red-400 text-white"
        >
          post
        </button>
      </div>
      {postComments.map((comment, index) => (
        <div className="flex gap-1">
          <div className="">
            <p className="w-full">{comment.user_id}</p>
            <p>{comment.comment}</p>
          </div>
          <AiFillDelete className="" />
        </div>
      ))}
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
          <Rweet userId={currentUser.id} rweet={rweet} key={index} />
        ))}
      </div>
    </div>
  );
}
