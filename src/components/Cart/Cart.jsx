import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";

import { Nav } from "../../components";

import firebase from "../../Firebase";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);

  //To Change the styles of +, - & Edit btns
  const [btnDisp, setBtnDisp] = useState({
    display: "none",
  });

  const [editBtn, setEditBtn] = useState({
    display: "inline-block",
  });

  let total = 0;

  useEffect(() => {
    firebase
      .firestore()
      .collection("cart")
      .onSnapshot((snapshot) => {
        if (isEmpty === true && snapshot.docs.length > 0) {
          setIsEmpty(false);
        }
        setCartItems([]);
        snapshot.forEach((doc) => {
          const cartItemObj = {
            name: doc.data().name,
            price: doc.data().price,
            quantity: doc.data().quantity,
            image: doc.data().image,
            id: doc.data().id,
            size: doc.data().size,
          };
          setCartItems((cartItems) => [...cartItems, cartItemObj]);
        });
      });
  }, []);

  const handleQtyChange = (event, item) => {
    firebase
      .firestore()
      .collection("cart")
      .where("id", "==", item.id)
      .get()
      .then((snapshot) => {
        if (item.quantity !== snapshot.docs[0].data().quantity) {
          const itemObj = {
            name: snapshot.docs[0].data().name,
            image: snapshot.docs[0].data().image,
            id: snapshot.docs[0].data().id,
            price: snapshot.docs[0].data().price,
            size: snapshot.docs[0].data().size,
            quantity: item.quantity,
          };
          firebase
            .firestore()
            .collection("cart")
            .doc(snapshot.docs[0].id)
            .update(itemObj);
        }
      });
  };

  return (
    <div>
      <Nav />
      <main>
        <div className={styles.outerContainer}>
          <h1 className={styles.heading}>Orders</h1>
          {!isEmpty ? (
            cartItems.map((item, index) => {
              total += item.price * item.quantity;
              return (
                <div className={styles.innerContainer} key={index}>
                  <img src={item.image} alt={item.image} />
                  <div className={styles.textContainer}>
                    <h1>{item.name}</h1>
                    <h3>{item.size}</h3>

                    <div className={styles.btnContainer} key={item.image}>
                      <button
                        className={styles.qtyBtns}
                        style={btnDisp}
                        onClick={() => {
                          let newItems = [...cartItems];
                          item.quantity = item.quantity + 1;
                          newItems[index] = item;
                          setCartItems(newItems);
                        }}
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
                        onClick={() => {
                          if (item.quantity > 1) {
                            let newItems = [...cartItems];
                            item.quantity--;
                            newItems[index] = item;
                            setCartItems(newItems);
                          }
                        }}
                      >
                        -
                      </button>
                      <button
                        className={styles.qtyBtns}
                        style={btnDisp}
                        onClick={(event) => {
                          handleQtyChange(event, item);
                          setEditBtn(btnDisp);
                          setBtnDisp(editBtn);
                        }}
                      >
                        Confirm Changes?
                      </button>
                    </div>
                    <h1>${item.price * item.quantity}</h1>
                  </div>
                </div>
              );
            })
          ) : (
            <h1 className={styles.emptyCart}>Empty cart</h1>
          )}

          <h1 className={styles.heading} style={{ borderBottom: "none" }}>
            Total: ${total}
          </h1>
        </div>
      </main>
    </div>
  );
};

export default Cart;
