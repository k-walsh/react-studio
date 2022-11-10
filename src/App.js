import "./App.css";
import { useState } from "react";
import bakeryData from "./assets/bakery-data.json";
import BakeryItem from "./components/BakeryItem";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  // TODO: use useState to create a state variable to hold the state of the cart
  /* add your cart state code here */
  const [cartItems, setCartItems] = useState({});

  /*
   * Takes in an item and adds one to its count if already in cart, ow adds to cart
   * cartItems is of the form {name: [count, total_price]}
   */
  function updateCart(item_name, item_price) {
    console.log("item", item_name);
    console.log("cartitems", cartItems);
    if (item_name in cartItems) {
      let count = cartItems[item_name][0];
      let all_price = (count + 1) * item_price;
      cartItems[item_name] = [count + 1, all_price];
      setCartItems({ ...cartItems }); // to make a new copy of the dict so its rerendered
    } else {
      cartItems[item_name] = [1, item_price];
      setCartItems({ ...cartItems });
    }
  }

  function totalPrice() {
    let sum = 0;
    let prices = Object.keys(cartItems).map((item) => cartItems[item][1]);

    for (const p of prices) {
      sum = sum + p;
    }
    return Math.round(sum * 100) / 100;
  }

  function displayCart() {
    if (Object.keys(cartItems).length === 0) {
      return <p>Nothing here just yet!</p>;
    } else {
      return (
        <div>
          {Object.keys(cartItems).map((item) => (
            <p key={item}>
              {cartItems[item][0]}x {item}
            </p>
          ))}
          <p>
            <b>Total: ${totalPrice()}</b>
          </p>
        </div>
      );
    }
  }

  return (
    <div className="App">
      <div className="RightCol">
        <h1>My Bakery</h1>

        <div className="Items">
          {bakeryData.map((item, index) => (
            <BakeryItem
              key={index}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              updateCart={updateCart}
            />
          ))}
        </div>
      </div>

      <div>
        <h2>Cart</h2>
        {displayCart()}
      </div>
    </div>
  );
}

export default App;
