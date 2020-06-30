import React from "react";
import styles from "./Home.module.css";

import Nav from "../Nav/Nav";

const Home = () => {
  return (
    <div>
      <Nav />
      <main>
        <h1>Hello from home</h1>
      </main>
    </div>
  );
};

export default Home;
