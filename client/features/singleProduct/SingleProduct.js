import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editProductAsync, selectSingleProduct } from './singleProductSlice';
import { fetchSingleProductAsync } from './singleProductSlice';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [SKU, setSKU] = useState('');
  const [price, setPrice] = useState('');
  const [imageURL, setImageURL] = useState('');

  const product = useSelector(selectSingleProduct);

  useEffect(() => {
    dispatch(fetchSingleProductAsync(id));
    setName(product.name);
  }, [dispatch]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const update = { id };
    if (name) update.name = name;
    if (description) update.description = description;
    if (price) update.price = parseInt(price);
    if (SKU) update.SKU = SKU;
    if (imageURL) update.imageURL = imageURL;
    dispatch(editProductAsync(update));
    setName('');
    setDescription('');
    setSKU('');
    setPrice('');
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
      <h2>Update Info:</h2>
      <form id="editProduct" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          placeholder="name"
          name="name"
          value={name}
          onChange={(evt) => {
            setName(evt.target.value);
          }}
        ></input>

        <label>Description</label>
        <textarea
          placeholder="description"
          name="description"
          value={description}
          onChange={(evt) => {
            setDescription(evt.target.value);
          }}
        ></textarea>

        <label>Price</label>
        <input
          placeholder="price"
          name="price"
          value={price}
          onChange={(evt) => {
            if (parseInt(evt.target.value)) {
              setPrice(evt.target.value);
            }
          }}
        ></input>

        <label>SKU</label>
        <input
          placeholder="SKU"
          name="SKU"
          value={SKU}
          onChange={(evt) => {
            setSKU(evt.target.value);
          }}
        ></input>

        <label>Image URL</label>
        <input
          placeholder="image URL"
          name="imageURL"
          value={imageURL}
          onChange={(evt) => {
            setimageURL(evt.target.value);
          }}
        ></input>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SingleProduct;
