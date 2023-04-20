import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProductsAsync } from './AllProductsSlice'; //case is weird
import { selectProducts } from './AllProductsSlice';

const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts); // state.allProducts.products is the name of the slice of state in the store

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  return (
    <div>
      <h1>AllProducts</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>SKU: {product.SKU}</p>
            <img src={product.imageURL} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllProducts;