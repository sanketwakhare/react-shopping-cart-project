import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { isEmpty } from "underscore";

import AddToCart from "components/Cart/AddToCart/AddToCart";
import useApi from "hooks/useApi";
import { clearCartRedux, removeProductFromCartAction } from "store/cart";
import Modal from "ui-components/Modal/Modal";
import UrlConfig from "utils/UrlConfig";
import { formatPrice } from "utils/Utils";

import "./cart-page.scss";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { request } = useApi();

  const [
    isRemoveProductConfirmationModalOpen,
    setIsRemoveProductConfirmationModalOpen,
  ] = useState(false);
  const [productToRemove, setProductToRemove] = useState(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [
    isClearCartConfirmationModalOpen,
    setIsClearCartConfirmationModalOpen,
  ] = useState(false);

  const toggleRemoveProductConfirmationModal = () => {
    setIsRemoveProductConfirmationModalOpen(
      !isRemoveProductConfirmationModalOpen
    );
  };

  const toggleClearCartConfirmationModal = () => {
    setIsClearCartConfirmationModalOpen(!isClearCartConfirmationModalOpen);
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
    if (productToRemove) {
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

  // place order
  const placeOrder = async () => {
    try {
      const createOrderPayload = {
        items: [...cartItems],
      };
      setIsCreatingOrder(true);
      const { data, loadError } = await request(UrlConfig.CREATE_ORDER_URL, {
        method: "POST",
        body: JSON.stringify(createOrderPayload),
      });
      setIsCreatingOrder(false);
      if (loadError) {
        throw new Error(loadError.message);
      }
      if (data) {
        dispatch(clearCartRedux());
      }
      return data?.orderId ?? null;
    } catch (error) {
      // TODO: handle error
      console.error("Error creating order", error);
    }
  };

  const handleBuyNow = async () => {
    if (!auth?.isLoggedIn) {
      navigate("/login", { state: { redirectUrl: "/payment" } });
    } else {
      // place order
      const orderId = await placeOrder();
      // navigate to payment page
      navigate("/payment", { state: { orderId, amount: totalAmount } });
    }
  };

  const clearCart = async () => {
    dispatch(clearCartRedux());
    toggleClearCartConfirmationModal();
  };

  const onClearCartClick = (productId) => {
    event.stopPropagation();
    toggleClearCartConfirmationModal();
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
                          onClick={() => onRemoveProduct(product?._id)}
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
            <div className="actions-container">
              <button
                type="button"
                className="button-success"
                onClick={handleBuyNow}
              >
                Proceed to Buy
              </button>
              <button className="button-dark" onClick={onClearCartClick}>
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
      {isEmpty(cartItems) && noItemsInCartMessageTemplate}
      {isRemoveProductConfirmationModalOpen && (
        <Modal
          isOpen={isRemoveProductConfirmationModalOpen}
          onClose={toggleRemoveProductConfirmationModal}
          id="remove-product-from-cart"
        >
          <div>
            <div className="modal-header">
              <div>Remove Product</div>
            </div>
            <div className="modal-body">
              <div>Are you sure you want remove product?</div>
            </div>
            <div className="modal-footer">
              <button
                onClick={toggleRemoveProductConfirmationModal}
                className="button-light"
              >
                Cancel
              </button>
              <button onClick={handleRemoveProductFromCart}>Remove</button>
            </div>
          </div>
        </Modal>
      )}
      {isCreatingOrder && (
        <Modal
          isOpen={() => isCreatingOrder}
          onClose={() => !isCreatingOrder}
          id="placing-order-modal"
        >
          <div>Processing your order... Please wait.</div>
        </Modal>
      )}
      {isClearCartConfirmationModalOpen && (
        <Modal
          isOpen={isClearCartConfirmationModalOpen}
          onClose={toggleClearCartConfirmationModal}
          id="clear-cart-confirmation-modal"
        >
          <div>
            <div className="modal-header">
              <div>Clear Cart</div>
            </div>
            <div className="modal-body">
              <div>Are you sure you want clear cart?</div>
            </div>
            <div className="modal-footer">
              <button
                onClick={toggleClearCartConfirmationModal}
                className="button-light"
              >
                Cancel
              </button>
              <button onClick={clearCart}>Clear</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CartPage;
