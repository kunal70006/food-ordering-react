import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./Nav.module.css";

const Nav = () => {
  const history = useHistory();
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
            <button onClick={() => history.push("/cart")}>Cart</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
