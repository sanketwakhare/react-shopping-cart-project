import { useDispatch, useSelector } from "react-redux";
import { addToCartRedux, removeFromCartRedux } from "store/cart";

import "./add-to-cart.scss";

const AddToCart = (props) => {
  const { product } = props;
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const isProductPresentInCart = cartItems.find(
    (item) => item?.product?._id === product?._id
  );

  const handleAddToCart = (event) => {
    dispatch(addToCartRedux(product));
    event.stopPropagation();
  };

  const handleRemoveFromCart = (event) => {
    dispatch(removeFromCartRedux(product));
    event.stopPropagation();
  };

  return (
    <div className="add-to-cart-container">
      {isProductPresentInCart && (
        <>
          <button className="button-success" onClick={handleRemoveFromCart}>
            -
          </button>
          <span className="spacing__quantity">
            {isProductPresentInCart.quantity}
          </span>
          <button className="button-success" onClick={handleAddToCart}>
            +
          </button>
        </>
      )}
      {!isProductPresentInCart && (
        <button className="button-success" onClick={handleAddToCart}>
          Add To Cart
        </button>
      )}
    </div>
  );
};

export default AddToCart;
