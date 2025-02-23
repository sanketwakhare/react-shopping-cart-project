import ContentLoader from "react-content-loader";

const ProductListLoader = (props) => {
  let { cardCount } = props;
  cardCount = cardCount <= 0 ? 1 : cardCount;

  const getLoaderTemplate = (index) => {
    return (
      <div className="product" key={`product-loader-${index}`}>
        <ContentLoader
          speed={1}
          width={220}
          height={310}
          viewBox="0 0 220 380"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="0" ry="0" width="220" height="200" />
          <rect x="0" y="275" rx="3" ry="3" width="300" height="15" />
          <rect x="0" y="300" rx="3" ry="3" width="150" height="15" />
          <rect x="0" y="350" rx="3" ry="3" width="100" height="15" />
          <rect x="120" y="350" rx="3" ry="3" width="100" height="15" />
        </ContentLoader>
      </div>
    );
  };

  let productList = [];
  for (let index = 0; index < cardCount; index++) {
    productList.push(getLoaderTemplate(index));
  }

  return (
    <div className="products-container">
      <div className="products">
        {productList.map((pItem) => {
          return pItem;
        })}
      </div>
    </div>
  );
};

export default ProductListLoader;
