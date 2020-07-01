import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Home.module.css";

import { Nav } from "../../components";

import firebase from "../../Firebase";

const Home = () => {
  const [items, setItems] = useState([]);

  const [isSmallPressed, setisSmallPressed] = useState(false);
  const [isMediumPressed, setisMediumPressed] = useState(false);
  const [isLargePressed, setisLargePressed] = useState(false);

  const history = useHistory();

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

  const handleChanges = (event, item) => {
    let tempItem = {
      ...item,
    };
    if (isSmallPressed) {
      tempItem.size = "small";
    } else if (isMediumPressed) {
      tempItem.size = "medium";
    } else if (isLargePressed) {
      tempItem.size = "large";
    }
    console.log(tempItem.id);

    firebase
      .firestore()
      .collection("cart")
      .where("id", "==", tempItem.id)
      .get()
      .then((snapshot) => {
        if (tempItem.size !== snapshot.docs[0].data().size) {
          const itemObj = {
            name: snapshot.docs[0].data().name,
            image: snapshot.docs[0].data().image,
            id: snapshot.docs[0].data().id,
            price: snapshot.docs[0].data().price,
            quantity: snapshot.docs[0].data().quantity,
            size: tempItem.size,
          };
          firebase
            .firestore()
            .collection("cart")
            .doc(snapshot.docs[0].id)
            .update(itemObj);
          alert("Done");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addToCart = (event, item) => {
    event.preventDefault();
    const itemInCartObj = {
      name: item.name,
      size: item.size,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
      id: item.id,
    };

    firebase
      .firestore()
      .collection("cart")
      .where("id", "==", itemInCartObj.id)
      .get()
      .then((snapshot) => {
        console.log(snapshot.docs.length);
        if (snapshot.docs.length === 0) {
          firebase
            .firestore()
            .collection("cart")
            .add(itemInCartObj)
            .then(() => {
              alert("Item added successfully");
            });
        } else {
          alert("Item already in cart");
        }
      });
  };

  return (
    <div>
      <Nav />
      <main>
        <div className={styles.outerContainer}>
          <h1 className={styles.heading}>Menu</h1>
          {items.map((item, index) => {
            return (
              <div className={styles.innerContainer} key={index}>
                <img src={item.image} alt={item.image} />
                <div className={styles.textContainer}>
                  <h1>{item.name}</h1>

                  <div className={styles.btnContainer} key={item.name}>
                    <button
                      className={styles.qtyBtns}
                      onClick={(event) => {
                        setisSmallPressed(true);
                        setisMediumPressed(false);
                        setisLargePressed(false);
                        handleChanges(event, item);
                      }}
                    >
                      small
                    </button>
                    <button
                      className={styles.qtyBtns}
                      onClick={(event) => {
                        setisSmallPressed(false);
                        setisMediumPressed(true);
                        setisLargePressed(false);
                        handleChanges(event, item);
                      }}
                    >
                      medium
                    </button>
                    <button
                      className={styles.qtyBtns}
                      onClick={(event) => {
                        setisSmallPressed(false);
                        setisMediumPressed(false);
                        setisLargePressed(true);
                        handleChanges(event, item);
                      }}
                    >
                      large
                    </button>
                  </div>

                  <button
                    className={styles.qtyBtns}
                    onClick={(event) => {
                      addToCart(event, item);
                    }}
                  >
                    Add to Cart
                  </button>
                  <h1>${item.price * item.quantity}</h1>
                </div>
              </div>
            );
          })}
          <button
            className={styles.qtyBtns}
            onClick={() => history.push("/cart")}
          >
            Checkout
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
