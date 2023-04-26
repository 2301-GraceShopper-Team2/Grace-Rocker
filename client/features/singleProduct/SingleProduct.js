import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteProductAsync } from "../allProducts/allProductsSlice";
import { addProductToCartAsync } from "../cart/cartSlice";
import {
  editProductAsync,
  fetchSingleProductAsync,
  selectSingleProduct,
} from "./singleProductSlice";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [SKU, setSKU] = useState("");
  const [price, setPrice] = useState("");
  const [imageURL, setImageURL] = useState("");

  const isAdmin = useSelector((state) => state.auth.me.isAdmin);
  const product = useSelector(selectSingleProduct);

  useEffect(() => {
    // dispatch(fetch);
    dispatch(fetchSingleProductAsync(id));
    setName(product.name);
  }, [dispatch]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const update = { id };
    if (name) update.name = name;
    if (description) update.description = description;
    if (price) update.price = parseFloat(price);
    if (SKU) update.SKU = SKU;
    if (imageURL) update.imageURL = imageURL;
    dispatch(editProductAsync(update));
    setName("");
    setDescription("");
    setSKU("");
    setPrice("");
    setImageURL();
  };

  return (
    <>
      <div>
        <div className="row row-cols-2">
          <div style={{ width: "30%" }}>
            <img
              src={product.imageURL}
              style={{ width: "200px", border: "1px black solid" }}
            />
          </div>
          <div style={{ width: "70%" }}>
            <h2 className="text-left">{product.name} </h2>
            <p>Description: {product.description} </p>
            <p>Price: ${product.price} </p>
            <p>SKU: {product.SKU}</p>
          </div>
          <div>
            <button
              className="btn btn-primary"
              onClick={() => {
                dispatch(addProductToCartAsync(id));
              }}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
      {isAdmin && (
        <div id="updateProduct">
          <h2>Update Product Info</h2>
          <form id="editProduct" onSubmit={handleSubmit}>
            <div>
              <div>
                <label>Name:</label>
              </div>
              <input
                name="name"
                type="text"
                value={name}
                onChange={(evt) => {
                  setName(evt.target.value);
                }}
              ></input>
            </div>
            <div>
              <div>
                <label>Description:</label>
              </div>
              <textarea
                name="description"
                type="text"
                value={description}
                onChange={(evt) => {
                  setDescription(evt.target.value);
                }}
              ></textarea>
            </div>
            <div>
              <div>
                <label>Price:</label>
              </div>
              <input
                name="price"
                type="text"
                value={price}
                onChange={(evt) => {
                  setPrice(evt.target.value);
                }}
              ></input>
            </div>
            <div>
              <div>
                <label>SKU:</label>
              </div>
              <input
                name="SKU"
                type="text"
                value={SKU}
                onChange={(evt) => {
                  setSKU(evt.target.value);
                }}
              ></input>
            </div>
            <div>
              <div>
                <label>Image URL:</label>
              </div>
              <input
                name="imageURL"
                type="text"
                value={imageURL}
                onChange={(evt) => {
                  setImageURL(evt.target.value);
                }}
              ></input>
            </div>
            <div>
              <button className="btn btn-success" type="submit">
                Update Product
              </button>
            </div>
          </form>
        </div>
      )}
      {isAdmin && (
        <div>
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch(deleteProductAsync(id));
              navigate("/products");
            }}
          >
            Delete Product
          </button>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
