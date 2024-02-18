import React, { Fragment, useEffect, useState } from "react";
import Pagination from 'react-js-pagination';

import MetaData from "./layout/metadata";
import Loader from "./layout/loadingAnimation";

import { Link, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from 'react-alert';
import { getProducts } from "../actions/productActions";



const Home = ({ match }) => {

  const { keyword } = useParams();

  const [currentPage, setCurrentPage] = useState(1);

  const alert = useAlert()  
  const dispatch = useDispatch();

  const { loading, products, error, productsCount, resPerPage } = useSelector(state => state.products);

  useEffect(() => {
    
      // add error handling

     dispatch(getProducts(keyword, currentPage));
    
  }, [dispatch, alert, error, keyword, currentPage]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
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
          
          {resPerPage <= productsCount && (
            <div className="d-flex justify-content-center mt-5">
            {productsCount && (
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            )}
          </div>
          )}

        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
