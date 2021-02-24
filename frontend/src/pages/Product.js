import React, { Fragment } from "react";
import ProductCta from "../components/productInfo/ProductCta";
import ProductFeatures from "../components/productInfo/ProductFeatures";
import ProductFixed from "../components/productInfo/ProductFixed";

const Product = () => {
  return (
    <Fragment>
      <ProductCta />
      <ProductFeatures />
      <ProductFixed />
    </Fragment>
  );
};

export default Product;
