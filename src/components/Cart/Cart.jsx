import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";

import Nav from "../Nav/Nav";

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    //setting the item id to retrieve the item from the api

    // let item = JSON.parse(localStorage.getItem("item"));
    // setItems(item);

    let tempItems = [];

    for (let index = 0; index < localStorage.length; index++) {
      let key = localStorage.key(index);
      let tempKey = key.toString();
      let item = JSON.parse(localStorage.getItem(tempKey));
      tempItems.push(item);
    }

    setItems(tempItems);
  }, []);
  return (
    <div>
      <Nav />
      <main>
        <div className={styles.outerContainer}>
          <h1>Orders</h1>
        </div>
      </main>
    </div>
  );
};

export default Cart;
