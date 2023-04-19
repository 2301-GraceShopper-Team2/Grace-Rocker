import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "./allProductsSlice";



export const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts.products); // state.allProducts.products is the name of the slice of state in the store

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

    
  return (
    <div>
      <h1>AllProducts</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AllProducts;