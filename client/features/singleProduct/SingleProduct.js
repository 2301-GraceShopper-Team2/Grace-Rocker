import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editProductAsync, selectSingleProduct } from "./singleProductSlice";
import { fetchSingleProductAsync } from "./singleProductSlice";
import { deleteProductAsync } from "../allProducts/allProductsSlice";
import { addProductToCartAsync } from "../cart/cartSlice";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [SKU, setSKU] = useState("");
  const [price, setPrice] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [numItems, setNumItems] = useState(1);

  const isAdmin = useSelector((state) => state.auth.me.isAdmin);
  const product = useSelector(selectSingleProduct);

  useEffect(() => {
    dispatch(fetch);
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
        <h2>{product.name} </h2>
        <p>Description: {product.description} </p>
        <p>Price: ${product.price} </p>
        <p>SKU: {product.SKU}</p>
        <img />
      </div>
      {isAdmin && (
        <div id="updateProduct">
          <h2>Update Info:</h2>
          <form id="editProduct" onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              name="name"
              type="text"
              value={name}
              onChange={(evt) => {
                setName(evt.target.value);
              }}
            ></input>

            <label>Description</label>
            <textarea
              name="description"
              type="text"
              value={description}
              onChange={(evt) => {
                setDescription(evt.target.value);
              }}
            ></textarea>

            <label>Price</label>
            <input
              name="price"
              type="text"
              value={price}
              onChange={(evt) => {
                setPrice(evt.target.value);
              }}
            ></input>

            <label>SKU</label>
            <input
              name="SKU"
              type="text"
              value={SKU}
              onChange={(evt) => {
                setSKU(evt.target.value);
              }}
            ></input>

            <label>Image URL</label>
            <input
              name="imageURL"
              type="text"
              value={imageURL}
              onChange={(evt) => {
                setImageURL(evt.target.value);
              }}
            ></input>

            <button type="submit">Submit</button>
          </form>
        </div>
      )}

     

      <button
        onClick={() => {
          dispatch(addProductToCartAsync(id));
        }}
      >
        Add To Cart
      </button>

      {isAdmin && (
        <button
          onClick={() => {
            dispatch(deleteProductAsync(id));
            navigate("/products");
          }}
        >
          Delete Product
        </button>
      )}
    </>
  );
};

export default SingleProduct;
