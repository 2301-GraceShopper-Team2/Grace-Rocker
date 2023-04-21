import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const fetchFeaturedProducts = async () => {
    const { data } = await axios.get(`/api/products/featured`);
    console.log("data: ", data);
    setFeaturedProducts(data);
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  return (
    <div>
      <div>
        <h2>Welcome {username || `Guest`}!</h2>
        {!username && (
          <h4>
            For the best experience, <Link to="/login">log in</Link> or{" "}
            <Link to="/signup">create an account!</Link>
          </h4>
        )}
      </div>
      <div>
        <h3>Featured Products</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {featuredProducts &&
            featuredProducts.map((product) => (
              <span
                key={product.id}
                width="300px"
                style={{
                  border: "1px solid black",
                  margin: "5px",
                  padding: "5px",
                }}
              >
                <p>
                  <img src={product.imageURL} />
                </p>
                <p>
                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                </p>
                <p>{product.description}</p>
                <p>
                  <button>Add to Cart</button>
                </p>
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
