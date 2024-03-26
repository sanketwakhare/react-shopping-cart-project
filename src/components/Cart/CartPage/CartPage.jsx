import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { isEmpty } from "underscore";

import AddToCart from 'components/Cart/AddToCart/AddToCart';
import { removeProductFromCartAction } from "store/cart";
import Modal from "ui-components/Modal/Modal";
import { formatPrice } from "utils/Utils";

import "./cart-page.scss";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isRemoveProductConfirmationModalOpen, setIsRemoveProductConfirmationModalOpen] = useState(false);
  const [productToRemove, setProductToRemove] = useState(null);

  const toggleRemoveProductConfirmationModal = () => {
    setIsRemoveProductConfirmationModalOpen(!isRemoveProductConfirmationModalOpen);
  };

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

  const handleRemoveProductFromCart = () => {
    if(productToRemove) {
      dispatch(removeProductFromCartAction(productToRemove));
      setProductToRemove(null);
    }
    toggleRemoveProductConfirmationModal();
  };

  const onRemoveProduct = (productId) => {
    event.stopPropagation();
    toggleRemoveProductConfirmationModal();
    setProductToRemove(productId);
  };

  const handleBuyNow = () => {
    if (!auth?.isLoggedIn) {
      navigate("/login", { state: { redirectUrl: "/payment" } });
    } else {
      navigate("/payment");
    }
  };

  return (
    <>
      {!isEmpty(cartItems) && (
        <div className="cart-container">
          <div className="cart-items-container box-shadow">
            <div className="cart-header">
              <div className="title">Shopping Cart</div>
              <div className="price-label">Price</div>
            </div>
            <div className="cart-items">
              {cartItems.map((cartItem) => {
                const product = cartItem?.product;
                return (
                  <div className="cart-item" key={product?._id}>
                    <Link to={`/products/${product._id}`} className="link">
                      <img className="image" src={product?.image}></img>
                    </Link>
                    <div className="item-details">
                      <div className="title">
                        <Link to={`/products/${product._id}`} className="link">
                          {product.title}
                        </Link>
                      </div>
                      <div className="note">
                        <i className="fas fa-truck"></i>
                        <span>Eligible for FREE Shipping</span>
                      </div>
                      <div className="quantity">
                        <div className="qty-label">Quantity:</div>
                        <AddToCart product={product} />
                      </div>
                      <div className="actions">
                        <Link
                          className="link"
                          onClick={() =>
                            onRemoveProduct(product?._id)
                          }
                        >
                          Remove
                        </Link>
                      </div>
                    </div>
                    <div className="item-price-section">
                      <div className="subtotal-container">
                        <div className="subtotal-price">
                          <span className="currency">₹</span>
                          <span className="price-value">
                            {formatPrice(product?.price)}
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
          <div className="payment-options-sidebar box-shadow">
            <div className="subtotal-container">
              <div className="label">Subtotal({subtotalCount} items):</div>
              <div className="subtotal-price">
                <span className="currency">₹</span>
                <span className="price-value">{formatPrice(totalAmount)}</span>
              </div>
            </div>
            <button
              type="button"
              className="button-success proceed-to-buy"
              onClick={handleBuyNow}
            >
              Proceed to Buy
            </button>
          </div>
        </div>
      )}
      {isEmpty(cartItems) && noItemsInCartMessageTemplate}
      {isRemoveProductConfirmationModalOpen && (
        <Modal isOpen={isRemoveProductConfirmationModalOpen} onClose={toggleRemoveProductConfirmationModal} key={'remove-product-from-cart'}>
          <div className="delete-product-modal-container">
            <div className="modal-header">
              <div>Remove Product</div>
            </div>
            <div className="modal-body">
              <div>Are you sure you want remove product?</div>
            </div>
            <div className="modal-footer">
              <button onClick={toggleRemoveProductConfirmationModal} className="button-light">Cancel</button>
              <button onClick={handleRemoveProductFromCart}>Remove</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CartPage;
