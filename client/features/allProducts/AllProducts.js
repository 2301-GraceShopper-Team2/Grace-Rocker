import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductAsync, fetchAllProductsAsync } from './AllProductsSlice'; //case is weird
import { selectProducts } from './AllProductsSlice';
import { Link, useNavigate } from 'react-router-dom';
const AllProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);
  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  const products = useSelector(selectProducts); // state.allProducts.products is the name of the slice of state in the store

  return (
    <div>
      <h1>AllProducts</h1>
      {products.length ? (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Link to={`/products/${product.id}`}>
                <h4>{product.name}</h4>
              </Link>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>SKU: {product.SKU}</p>
              <img src={product.imageURL} />
              {isAdmin && (
                <button
                  onClick={() => {
                    dispatch(deleteProductAsync(product.id));
                    navigate('/products');
                  }}
                >
                  Delete Product
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <h4>No Products Found</h4>
      )}
    </div>
  );
};

export default AllProducts;
