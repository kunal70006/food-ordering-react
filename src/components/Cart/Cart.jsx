import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Cart.module.css";

const Cart = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof location.id === "undefined") {
      var item = sessionStorage.getItem("item");
      console.log(item);
    } else {
      sessionStorage.setItem("item", location.id);
      console.log(item);
    }
  }, []);
  return (
    <div>
      <main>
        <h1>Hello from Cart</h1>
      </main>
    </div>
  );
};

export default Cart;
