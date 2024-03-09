"use client";

import styles from "@styles/signup.module.css";
import { getRandomColor } from "@utils/colorProvider";

import { useState, useEffect, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Signin = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    username: undefined,
    password: undefined,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    const usernameRegex = /^[a-zA-Z0-9_]{3,}[0-9]*$/;
    if (!username.match(usernameRegex)) {
      setError((prev) => ({ ...prev, username: "Invalid username" }));
      return;
    }
    setError({ username: undefined, password: undefined });
    await fetch("/api/auth/user/signin", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("user", JSON.stringify(data));
          router.push("/");
        } else {
          setError((prev) => ({ ...prev, password: "Invalid password" }));
        }
      });
  };
  const color = getRandomColor();
  const ref = useRef(null);
  useEffect(() => {
    ref.current.style.setProperty("--themeColor", color);
  }, []);
  return (
    <div className={styles.main} ref={ref}>
      <div className={styles.formWrapper}>
        <h1>Sign In</h1>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Username"
            className={styles.formInput}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ borderColor: error.username ? "red" : "" }}
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.formInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ borderColor: error.password ? "red" : "" }}
          />
          <button type="submit" className={styles.formButton}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
export default Signin;
