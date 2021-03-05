import React from "react";
import CartItems from "./CartItems";
import CartTotal from "./CartTotal";

const Cart = () => {
  return (
    <div className="cart">
      <div className="cart-title">Cart</div>
      <CartItems />
      <CartTotal />
    </div>
  );
};

export default Cart;
