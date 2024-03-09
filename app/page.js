"use client";

import Post from "@components/Post";
import styles from "@styles/page.module.css";
import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState();
  const getPosts = async () => {
    const res = await fetch(`/api/post?page=${posts.length / 10 + 1}`);
    const data = await res.json();
    setPosts((prev) => [...prev, ...data]);
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
      getPosts();
    } else {
      router.push("/signin");
    }
  }, []);
  const [posts, setPosts] = useState([]);
  return (
    <div
      className={styles.main}
      onScroll={(e) => {
        if (
          e.target.scrollHeight - e.target.scrollTop ===
          e.target.clientHeight
        ) {
          getPosts();
        }
      }}
    >
      <div className={styles.postContainer}>
        {posts.map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </div>
    </div>
  );
}
