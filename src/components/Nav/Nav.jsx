import React from "react";
import styles from "./Nav.module.css";

const Nav = () => {
  return (
    <div>
      <nav>
        <ul className={styles.nav}>
          <li className={styles.navLinks}>
            <div className={styles.header}>
              <i className="fas fa-hamburger"></i>
              <h1>FOOOD!</h1>
            </div>
          </li>
          <li className={styles.navLinks}>
            <a href="/">Home</a>
          </li>
          <li className={styles.navLinks}>
            <a href="/cart">Cart</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
