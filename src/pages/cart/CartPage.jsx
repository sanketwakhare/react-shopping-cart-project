import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "underscore";
import "./cart-page.scss";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log(cartItems);

  const noItemsInCartMessageTemplate = <div>No items in cart</div>;
  const subtotalCount = cartItems.reduce((acc, item) => {
    acc += item.quantity;
    return acc;
  }, 0);

  return (
    <>
      {!isEmpty(cartItems) && (
        <div className="cart-container">
          <div className="cart-items-container">
            <div className="cart-header">Shopping Cart</div>
            <div className="cart-items">
              {cartItems.map((cartItem) => {
                return (
                  <div className="cart-item">
                    <div className="title">{cartItem?.product?.title}</div>
                    <div className="title">{cartItem?.quantity}</div>
                  </div>
                );
              })}
            </div>
            <div className="cart-footer">
              <div className="label">Subtotal({subtotalCount} items):</div>
              <div className="subtotal">$ 2343.49</div>
            </div>
          </div>
          <div className="payment-options-sidebar">Payment Options</div>
        </div>
      )}
      {isEmpty(cartItems) && noItemsInCartMessageTemplate}
    </>
  );
};

export default CartPage;
