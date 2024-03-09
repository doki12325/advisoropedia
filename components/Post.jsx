"use client";

import styles from "@styles/post.module.css";
import { useEffect, useRef } from "react";

import { getRandomColor } from "@utils/colorProvider";

function Post(props) {
  const color = getRandomColor();
  const ref = useRef(null);
  useEffect(() => {
    ref.current.style.setProperty("--themeColor", color);
  }, []);
  const date = new Date(props.createdAt);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  return (
    <div className={styles.main} ref={ref}>
      <div className={styles.postTitle}>
        <h2>{props.title}</h2>
      </div>
      <div className={styles.postBody}>
        <p>{props.content}</p>
      </div>
      <div className={styles.postFooter}>
        <p>Author: {props.author}</p>
        <p>Published: {formattedDate}</p>
      </div>
    </div>
  );
}

export default Post;
