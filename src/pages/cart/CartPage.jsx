import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "underscore";
import { formatPrice } from "../../utils/Utils";
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
              <div className="subtotal-container">
                <div className="label">Subtotal({subtotalCount} items):</div>
                <div className="subtotal-price">
                  <span className="currency">₹</span>
                  <span className="price-value">{formatPrice(14599)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="payment-options-sidebar">
            <div className="subtotal-container">
              <div className="label">Subtotal({subtotalCount} items):</div>
              <div className="subtotal-price">
                <span className="currency">₹</span>
                <span className="price-value">{formatPrice(14599)}</span>
              </div>
            </div>
            <button type="button" className="button-success proceed-to-buy">
              Proceed to Buy
            </button>
          </div>
        </div>
      )}
      {isEmpty(cartItems) && noItemsInCartMessageTemplate}
    </>
  );
};

export default CartPage;
