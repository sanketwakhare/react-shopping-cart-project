import React from 'react';
import ContentLoader from 'react-content-loader';

const ProductDetailsLoader = (props) => {
  return (
    <ContentLoader
      speed={1}
      viewBox="0 0 1000 500"
      height={500}
      width={1000}
      {...props}
    >
      <rect x="64" y="18" rx="0" ry="0" width="400" height="400" />
      <rect x="229" y="300" rx="0" ry="0" width="0" height="0" />
      <rect x="500" y="20" rx="0" ry="0" width="400" height="30" />
      <rect x="500" y="100" rx="0" ry="0" width="200" height="20" />
      <rect x="500" y="180" rx="0" ry="0" width="400" height="20" />
      <rect x="500" y="210" rx="0" ry="0" width="400" height="10" />
      <rect x="500" y="230" rx="0" ry="0" width="400" height="10" />
      <rect x="500" y="260" rx="0" ry="0" width="300" height="10" />
      <rect x="500" y="320" rx="0" ry="0" width="400" height="10" />
      <rect x="500" y="340" rx="0" ry="0" width="400" height="10" />
      <rect x="500" y="360" rx="0" ry="0" width="400" height="10" />
      <rect x="500" y="380" rx="0" ry="0" width="400" height="10" />
      <rect x="500" y="400" rx="0" ry="0" width="300" height="10" />
    </ContentLoader>
  );
};

export default ProductDetailsLoader;
