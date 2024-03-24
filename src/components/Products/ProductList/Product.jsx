import { Link } from "react-router-dom";

import AddToCart from "components/Cart/AddToCart/AddToCart";
import { formatPrice } from "utils/Utils";

const Product = (props) => {
  const { product } = props;

  return (
    <div className="product">
      <Link to={`/products/${product._id}`} className="link">
        <img src={product.image}></img>
      </Link>
      <div className="product-info">
        <div className="product-title ellipsis-2-lines">
          <Link to={`/products/${product._id}`} className="link">
            {product.title}
          </Link>
          <span className="tooltip-text">{product.title}</span>
        </div>
        <div className="product-actions">
          <div className="product-price">
            <span className="currency">₹</span>
            <span className="price-value">{formatPrice(product?.price)}</span>
          </div>
          <AddToCart product={product} />
        </div>
      </div>
    </div>
  );
};

export default Product;
