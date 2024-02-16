import React, { Fragment, useEffect } from "react";

import MetaData from "./layout/metadata";
import Loader from "./layout/loadingAnimation";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from 'react-alert'
import { getProducts } from "../actions/productActions";



const Home = () => {

  const alert = useAlert()
  const dispatch = useDispatch();

  const { loading, products, error } = useSelector(state => state.products);

  useEffect(() => {
    
      // add error handling

     dispatch(getProducts());
    
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      {loading ? <Loader />: (
        <Fragment>
          <MetaData title={"High Quality Products Online"} />

          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <div
                    key={product._id}
                    className="col-sm-12 col-md-6 col-lg-3 my-3"
                  >
                    <div className="card p-3 rounded">
                      <img
                        className="card-img-top mx-auto"
                        src={product.images[0].url}
                        alt="logo"
                      />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">
                          <Link to={`/product/${product._id}`}>
                            {product.name}
                          </Link>
                        </h5>
                        <div className="ratings mt-auto">
                          <div className="rating-outer">
                            <div
                              className="rating-inner"
                              style={{
                                width: `${(product.ratings / 5) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span
                            id="no_o f_reviews"
                            style={{ color: "grey", fontSize: 15 }}
                          >
                            ({product.numOfReviews})
                          </span>
                        </div>
                        <p className="card-text">${product.price}</p>
                        <Link
                          to={`/product/${product._id}`}
                          id="view_btn"
                          className="btn btn-block"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
