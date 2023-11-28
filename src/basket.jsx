import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function Basket() {
  const [data, setData] = useState([]);
  const [basket, setBasket] = useState(
    localStorage.getItem("basket")
      ? JSON.parse(localStorage.getItem("basket"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  fetch("https://northwind.vercel.app/api/products")
    .then((res) => res.json())
    .then((api) => setData(api));

  function handleAddBasket(item) {
    setBasket([...basket, item]);
  }
  function handleRemove(id) {
    setBasket(basket.filter((x) => x.id !== id));
  }
  return (
    <div>
      <p>Umumi hisse</p>
      <h2>Basket</h2>
      {basket.map((item) => (
        <ul key={item.id}>
          <li>{item.id}</li>
          <li>{item.name}</li>

          <button onClick={() => handleRemove(item.id)}>Remove</button>
        </ul>
      ))}
      <hr />
      {data.map((item) => (
        <ul key={item.id}>
          <li>{item.id}</li>
          <li>{item.name}</li>
          <button onClick={() => handleAddBasket(item)}>add basket</button>
        </ul>
      ))}
    </div>
  );
}

export default Basket;
