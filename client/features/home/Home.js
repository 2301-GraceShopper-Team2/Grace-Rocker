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
    setFeaturedProducts(data);
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  return (
    <div className="container">
      <div>
        <h2 className="text-center">Welcome {username || `Guest`}!</h2>
        {!username && (
          <div>
            <div className="text-center" style={{ fontSize: "small" }}>
              For the best experience, <Link to="/login">log in</Link> or{" "}
              <Link to="/signup">create an account!</Link>
            </div>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-center">Featured Products</h3>
        <div
          className="row"
          // style={{
          //   display: 'flex',
          //   flexDirection: 'row',
          // }}
        >
          {featuredProducts &&
            featuredProducts.map((product) => (
              <span
                className="col card border-light"
                key={product.id}
                width="300px"
              >
                <p>
                  <Link to={`/products/${product.id}`}>
                    <img
                      className="card-img-top p-3 mx-auto d-block"
                      style={{ height: "200px", width: "auto" }}
                      src={product.imageURL}
                    />
                  </Link>
                </p>
                <div>
                  <Link
                    className="link-secondary"
                    to={`/products/${product.id}`}
                  >
                    <h5 className="card-title text-center">{product.name}</h5>
                  </Link>
                </div>
                <p className="card-body">{product.description}</p>
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
