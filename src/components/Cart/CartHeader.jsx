import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./cart-header.scss";

const CartHeader = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="cart-header-container">
      <i className="fa fa-shopping-cart"></i>
      {cartItems?.length > 0 && (
        <span id="cartItemCount" class="badge">
          {cartItems?.length}
        </span>
      )}
    </div>
  );
};

export default CartHeader;
