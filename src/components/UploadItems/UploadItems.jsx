import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../Firebase";

const UploadItem = () => {
  const REACT_APP_ID = "7ded3bd9";
  const REACT_APP_KEY = "87a502b83b30c46bed897f74a39cacac";

  //API req to dynamically get the items
  const sampleReq = `https://api.edamam.com/search?q=chicken&app_id=${REACT_APP_ID}&app_key=${REACT_APP_KEY}`;

  const [tempItems, setTempItems] = useState([]);

  const getData = async () => {
    let tempitems = [];
    // Using async await and fetch api to get the data and setting it using useState hook
    const response = await fetch(sampleReq);
    const data = await response.json();
    const tempData = await data.hits;

    for (let i = 0; i < tempData.length; i++) {
      tempitems.push(tempData[i].recipe);
    }

    setTempItems(tempitems);
  };

  const setData = () => {
    tempItems.map((item) => {
      const itemObj = {
        name: item.label,
        price: item.calories,
        quantity: 1,
        size: "small",
        imgUrl: item.image,
      };
      firebase
        .firestore()
        .collection("menuItems")
        .add(itemObj)
        .catch((error) => {
          console.error(error);
        });
    });
  };

  useEffect(() => {
    getData();
    setData();
  }, [tempItems.length]);

  return <h1>Hello</h1>;
};

export default UploadItem;
