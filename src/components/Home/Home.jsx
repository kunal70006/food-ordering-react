import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Home.module.css";

import Nav from "../Nav/Nav";
import Cart from "../Cart/Cart";

const REACT_APP_ID = "7ded3bd9";
const REACT_APP_KEY = "87a502b83b30c46bed897f74a39cacac";

const Home = () => {
  //API req to dynamically get the items
  const sampleReq = `https://api.edamam.com/search?q=chicken&app_id=${REACT_APP_ID}&app_key=${REACT_APP_KEY}`;

  const history = useHistory();

  const [items, setItems] = useState([]);

  //To Change the styles of +, - & Edit btns
  const [btnDisp, setBtnDisp] = useState({
    display: "none",
  });

  const [editBtn, setEditBtn] = useState({
    display: "inline-block",
  });

  const getData = async () => {
    // Using async await and fetch api to get the data and setting it using useState hook
    const response = await fetch(sampleReq);
    const data = await response.json();
    console.log(data.hits);
    setItems(data.hits);
  };

  useEffect(() => {
    getData();
  }, []);

  //Making my own object to pass to the edit component
  let [foodItem, setFoodItem] = useState({
    name: "",
    price: 0,
    size: "",
    quantity: 1,
  });

  const handleChanges = (event, item) => {
    event.preventDefault();
    let tempFoodItem = JSON.parse(JSON.stringify(foodItem));
    tempFoodItem.name = item.recipe.label;
    tempFoodItem.price =
      Math.round(item.recipe.calories / 100) * foodItem.quantity;
    setFoodItem(tempFoodItem);
  };

  return (
    <div>
      <Nav />
      <main>
        <div className={styles.outerContainer}>
          <h1 className={styles.heading}>Menu</h1>
          {items.map((item, index) => {
            let price = Math.round(item.recipe.calories / 100);
            return (
              <div className={styles.innerContainer} key={index}>
                <img src={item.recipe.image} alt={item.recipe.label} />
                <div className={styles.textContainer}>
                  <h1>{item.recipe.label}</h1>

                  <div className={styles.btnContainer} key={item.recipe.label}>
                    <button className={styles.qtyBtns}>small</button>
                    <button className={styles.qtyBtns}>medium</button>
                    <button className={styles.qtyBtns}>large</button>
                  </div>

                  <div className={styles.btnContainer} key={item.recipe.image}>
                    <button
                      className={styles.qtyBtns}
                      style={btnDisp}
                      onClick={() => {
                        let tempItems = { ...foodItem };
                        tempItems.quantity += 1;
                        setFoodItem(tempItems);
                      }}
                    >
                      +
                    </button>
                    <span>{foodItem.quantity}</span>
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
                        if (foodItem.quantity > 1) {
                          let tempItems = { ...foodItem };
                          tempItems.quantity -= 1;
                          setFoodItem(tempItems);
                        }
                      }}
                    >
                      -
                    </button>
                    <button
                      className={styles.qtyBtns}
                      style={btnDisp}
                      onClick={(event) => {
                        handleChanges(event, item);
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
                      console.log(foodItem);
                      history.push({
                        pathname: "/cart",
                        id: foodItem,
                      });
                    }}
                  >
                    Add to Cart
                  </button>
                  <h1>${price * foodItem.quantity}</h1>
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
