import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProductAsync } from "../allProducts/allProductsSlice.js";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [description, setDescription] = useState("");
  const [SKU, setSKU] = useState("");
  const [price, setPrice] = useState("");
  const [imageURL, setImageURL] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (name && description && price && SKU) {
      const newProduct = {
        name,
        description,
        price: parseFloat(price),
        SKU,
      };

      dispatch(addProductAsync(newProduct));
      navigate("/products");
    } else {
      alert("Please complete all required fields before submitting");
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Create Product</h2>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card mt-4 mb-4">
            <div className="card-body">
              <form id="createProduct" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    className="form-control"
                    name="name"
                    type="text"
                    onChange={(evt) => {
                      setName(evt.target.value);
                    }}
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    type="text"
                    onChange={(evt) => {
                      setDescription(evt.target.value);
                    }}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Price</label>
                  {/* need input validation on price to make sure it's only 2 decimal places */}
                  <input
                    className="form-control"
                    name="price"
                    type="text"
                    onChange={(evt) => {
                      setPrice(evt.target.value);
                    }}
                  ></input>
                </div>
                <div className="form-group">
                  <label>SKU</label>
                  <input
                    className="form-control"
                    name="SKU"
                    type="text"
                    onChange={(evt) => {
                      setSKU(evt.target.value);
                    }}
                  ></input>
                </div>
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    className="form-control"
                    name="imageURL"
                    type="text"
                    onChange={(evt) => {
                      setImageURL(evt.target.value);
                    }}
                  ></input>
                </div>
                <div className="text-center mt-4">
                  <button className="btn btn-warning " type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
