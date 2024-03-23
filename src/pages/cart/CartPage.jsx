import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isEmpty } from "underscore";
import AddToCart from "../../components/AddToCart/AddToCart";
import { removeProductFromCartAction } from "../../store/cart";
import { formatPrice } from "../../utils/Utils";
import "./cart-page.scss";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log(cartItems);

  const noItemsInCartMessageTemplate = (
    <div className="cart-container">
      <div className="no-items-in-cart">
        Your cart is currently empty. Start shopping now to add items.
      </div>
    </div>
  );
  const subtotalCount = cartItems.reduce((acc, item) => {
    acc += Number(item?.quantity ?? 0);
    return acc;
  }, 0);

  const totalAmount = cartItems.reduce((acc, item) => {
    acc += +(Number(item?.quantity ?? 0) * Number(item?.product?.price ?? 0));
    return acc;
  }, 0);

  const handleDeleteProductFromCart = (productId) => {
    dispatch(removeProductFromCartAction(productId));
  };

  return (
    <>
      {!isEmpty(cartItems) && (
        <div className="cart-container">
          <div className="cart-items-container">
            <div className="cart-header">
              <div className="title">Shopping Cart</div>
              <div className="price-label">Price</div>
            </div>
            <div className="cart-items">
              {cartItems.map((cartItem) => {
                return (
                  <div className="cart-item" key={cartItem?.product?._id}>
                    <img className="image" src={cartItem?.product?.image}></img>
                    <div className="item-details">
                      <div className="title">{cartItem?.product?.title}</div>
                      <div className="note">
                        <i className="fas fa-truck"></i>
                        <span>Eligible for FREE Shipping</span>
                      </div>
                      <div className="quantity">
                        <div className="qty-label">Quantity:</div>
                        <AddToCart product={cartItem?.product} />
                      </div>
                      <div className="actions">
                        <Link
                          className="link"
                          onClick={() =>
                            handleDeleteProductFromCart(cartItem?.product?._id)
                          }
                        >
                          Delete
                        </Link>
                      </div>
                    </div>
                    <div className="item-price-section">
                      <div className="subtotal-container">
                        <div className="subtotal-price">
                          <span className="currency">₹</span>
                          <span className="price-value">
                            {formatPrice(cartItem?.product?.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="cart-footer">
              <div className="subtotal-container">
                <div className="label">Subtotal({subtotalCount} items):</div>
                <div className="subtotal-price">
                  <span className="currency">₹</span>
                  <span className="price-value">
                    {formatPrice(totalAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="payment-options-sidebar">
            <div className="subtotal-container">
              <div className="label">Subtotal({subtotalCount} items):</div>
              <div className="subtotal-price">
                <span className="currency">₹</span>
                <span className="price-value">{formatPrice(totalAmount)}</span>
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
