import { useEffect } from "react";
import { useSelector } from "react-redux";

import useToggle from "hooks/useToggle";
import "./cart-header.scss";

const CartHeader = () => {
  const cartItems = useSelector((state) => state.cart);

  const [isItemAdded, setItemAdded] = useToggle(false);

  useEffect(() => {
    if (cartItems.length) {
      setItemAdded(true);
      setTimeout(() => {
        setItemAdded(false);
      }, 500);
    }
  }, [cartItems.length]);

  const faShakeClass = "fa-shake";
  const faShoppingCart = "fa fa-shopping-cart";
  const faCartClasses = [faShoppingCart];
  if (isItemAdded) {
    faCartClasses.push(faShakeClass);
  }

  return (
    <div className="cart-header-container">
      <i className={faCartClasses.join(" ")}></i>
      {cartItems?.length > 0 && (
        <span id="cartItemCount" className="badge ">
          {cartItems?.length}
        </span>
      )}
    </div>
  );
};

export default CartHeader;
