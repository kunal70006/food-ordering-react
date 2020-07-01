import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Home.module.css";

import { Nav } from "../../components";

import firebase from "../../Firebase";

const Home = () => {
  const history = useHistory();
  const [items, setItems] = useState([]);

  //To Change the styles of +, - & Edit btns
  const [btnDisp, setBtnDisp] = useState({
    display: "none",
  });

  const [editBtn, setEditBtn] = useState({
    display: "inline-block",
  });

  useEffect(() => {
    let tempItems = [];
    firebase
      .firestore()
      .collection("menuItems")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          const itemObj = {
            name: doc.data().name,
            price: Math.round(doc.data().price / 100),
            quantity: doc.data().quantity,
            size: doc.data().size,
            image: doc.data().imgUrl,
            id: doc.id,
          };
          tempItems.push(itemObj);
        });
      })
      .then(() => {
        setItems(tempItems);
      });
  }, []);

  const handleChanges = () => {};

  return (
    <div>
      <Nav />
      <main>
        <div className={styles.outerContainer}>
          <h1 className={styles.heading} onClick={() => console.log(items)}>
            Menu
          </h1>
          {items.map((item, index) => {
            return (
              <div className={styles.innerContainer} key={index}>
                <img src={item.image} alt={item.image} />
                <div className={styles.textContainer}>
                  <h1>{item.name}</h1>

                  <div className={styles.btnContainer} key={item.name}>
                    <button className={styles.qtyBtns}>small</button>
                    <button className={styles.qtyBtns}>medium</button>
                    <button className={styles.qtyBtns}>large</button>
                  </div>

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

                  <button
                    className={styles.qtyBtns}
                    onClick={(event) => {
                      //handleChanges(event, item);
                      //history.push("/cart");
                    }}
                  >
                    Add to Cart
                  </button>
                  <h1>${item.price * item.quantity}</h1>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Home;
