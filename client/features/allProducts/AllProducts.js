import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteProductAsync,
  fetchAllProductsAsync,
  selectProducts,
} from "./allProductsSlice.js"; //case is weird

const AllProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  const products = useSelector(selectProducts); // state.allProducts.products is the name of the slice of state in the store

  return (
    <div style={{ marginBottom: "50px" }}>
      <h2 className="text-center">Products</h2>
      {products.length ? (
        <div className="row row-cols-4 g-3">
          {products.map((product) => (
            <div className="col">
              <div key={product.id} className="card border-light">
                <Link to={`/products/${product.id}`}>
                  <img
                    className="card-img-top"
                    src={product.imageURL}
                    style={{
                      height: "200px",
                      width: "auto",
                    }}
                    alt="instrument"
                  />
                </Link>
                <div className="card-body" style={{ fontSize: "small" }}>
                  <Link to={`/products/${product.id}`}>
                    <h4
                      className="link-secondary"
                      style={{ fontSize: "medium" }}
                    >
                      {product.name}
                    </h4>
                  </Link>
                  <div>SKU: {product.SKU}</div>
                  <div className="text-right">Price: ${product.price}</div>
                  {isAdmin && (
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        dispatch(deleteProductAsync(product.id));
                      }}
                    >
                      Delete Product
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h4>No Products Found</h4>
      )}
    </div>
  );
};

export default AllProducts;
