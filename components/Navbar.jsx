"use client";

import styles from "@styles/navbar.module.css";
import { getRandomColor } from "@utils/colorProvider";
import { useEffect, useRef } from "react";

function Navbar() {
  const color = getRandomColor();
  const ref = useRef(null);
  useEffect(() => {
    ref.current.style.setProperty("--themeColor", color);
  }, []);
  return (
    <div className={styles.main} ref={ref}>
      <h1>Advisoropedia</h1>
    </div>
  );
}

export default Navbar;
