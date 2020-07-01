import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";

import Nav from "../Nav/Nav";

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    //setting the item id to retrieve the item from the api
    // let item = JSON.parse(localStorage.getItem("item"));
    // setItems(item);
    /*
 //To Change the styles of +, - & Edit btns
  const [btnDisp, setBtnDisp] = useState({
    display: "none",
  });

  const [editBtn, setEditBtn] = useState({
    display: "inline-block",
  });

<div className={styles.btnContainer} key={item.image}>
                    <button
                      className={styles.qtyBtns}
                      style={btnDisp}
                      onClick={() => {}}
                    >
                      +
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className={styles.qtyBtns}
                      onClick={() => {
                        setBtnDisp(editBtn);
                        setEditBtn(btnDisp);
                      }}
                      style={editBtn}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.qtyBtns}
                      style={btnDisp}
                      onClick={() => {}}
                    >
                      -
                    </button>
                    <button
                      className={styles.qtyBtns}
                      style={btnDisp}
                      onClick={(event) => {
                        //handleChanges(event, item);
                        setEditBtn(btnDisp);
                        setBtnDisp(editBtn);
                      }}
                    >
                      Confirm Changes?
                    </button>
                  </div>

    */
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
