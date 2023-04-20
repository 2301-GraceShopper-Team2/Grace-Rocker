import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectSingleProduct } from './singleProductSlice';
import { fetchSingleProductAsync } from './singleProductSlice';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [SKU, setSKU] = useState('');
  const [price, setPrice] = useState(0);
  const [imageURL, setImageURL] = useState('');
  const product = useSelector(selectSingleProduct);

  useEffect(() => {
    dispatch(fetchSingleProductAsync(id));
    setName(product.name);
  }, [dispatch]);

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
      <form id="editProduct">
        <label>Name</label>
        <input></input>

        <label>Description</label>
        <textarea></textarea>

        <label>Price</label>
        <input></input>

        <label>SKU</label>
        <input></input>

        <label>Image URL</label>
        <input></input>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SingleProduct;
