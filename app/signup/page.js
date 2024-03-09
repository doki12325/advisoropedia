"use client";

import styles from "@styles/signup.module.css";
import { getRandomColor } from "@utils/colorProvider";
import { useRouter } from "next/navigation";

import { useState, useEffect, useRef } from "react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
    terms: undefined,
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const usernameRegex = /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/;
    if (!username.match(usernameRegex)) {
      setError((prev) => ({ ...prev, username: "Invalid username" }));
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
      setError((prev) => ({ ...prev, email: "Invalid email" }));
      return;
    }
    if (password !== confirmPassword) {
      setError((prev) => ({ ...prev, password: "Passwords do not match" }));
      return;
    }
    if (!terms) {
      setError((prev) => ({ ...prev, terms: "You must agree to the terms" }));
      return;
    }
    setError({ username: undefined, email: undefined, password: undefined });
    await fetch("/api/auth/user/signup", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("user", JSON.stringify(data));
          router.push("/");
        } else {
          setError((prev) => ({ ...prev, username: "User already exists" }));
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
        <h1>Signup</h1>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder={error.username ? error.username : "Username"}
            className={styles.formInput}
            value={username}
            onChange={(e) => {
              setError((prev) => ({ ...prev, username: undefined }));
              setUsername(e.target.value);
            }}
            style={{ borderColor: error.username ? "red" : "" }}
          />
          <input
            type="text"
            placeholder="Email"
            className={styles.formInput}
            value={email}
            onChange={(e) => {
              setError((prev) => ({ ...prev, email: undefined }));
              setEmail(e.target.value);
            }}
            style={{ borderColor: error.email ? "red" : "" }}
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.formInput}
            value={password}
            onChange={(e) => {
              setError((prev) => ({ ...prev, password: undefined }));
              setPassword(e.target.value);
            }}
            style={{ borderColor: error.password ? "red" : "" }}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className={styles.formInput}
            value={confirmPassword}
            onChange={(e) => {
              setError((prev) => ({ ...prev, password: undefined }));
              setConfirmPassword(e.target.value);
            }}
            style={{ borderColor: error.password ? "red" : "" }}
          />
          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className={styles.checkboxInput}
              value={terms}
              onChange={(e) => setTerms(e.target.checked)}
            />
            <label
              htmlFor="terms"
              style={{
                color: error.terms ? "red" : "",
                fontWeight: error.terms ? "bold" : "normal",
              }}
            >
              I agree to the terms and conditions
            </label>
          </div>
          <button type="submit" className={styles.formButton}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
export default Signup;
