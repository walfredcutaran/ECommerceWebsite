import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, getSuggestedProducts, clearErrors } from "../../actions/productActions";
import { Carousel } from "react-bootstrap";

import Loader from "../layout/loadingAnimation";
import Metadata from "../layout/metadata";
import { useParams } from "react-router-dom";
import Products from '../layout/SuggestedProducts'

const ProductDetails = () => {


  const { id } = useParams();



  const dispatch = useDispatch();

  const { loading, product } = useSelector((state) => state.productDetails);
  const { productSuggested } = useSelector(state => state.suggestedProducts);

  let excludeProductId = product._id

  useEffect(() => {

    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => { 
    if (product.category) {
      dispatch(getSuggestedProducts(product.category));
    }
  }, [dispatch, product.category, excludeProductId]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={product.name} />
          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              <Carousel pause="hover">
                {product.images &&
                  product.images.map((image) => (
                    <Carousel.Item key={image.public_id}>
                      <img
                        id="product_details_image"
                        className="d-block w-100"
                        src={image.url}
                        alt={product.title}
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3>{product.name}</h3>
              <p id="product_id">Product # {product._id}</p>
              <p>{product.category}</p>

              <hr />

              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(product.ratings / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no_of_reviews">({product.numOfReviews})</span>

              <hr />
              <div className="row container justify-content-lg-center justify-content-sm-start">
                <p id="product_price" className="mt-1">
                  ${product.price}
                </p>
                <div className="stockCounter d-inline ml-3 mt-2">
                  <span className="btn btn-danger minus d-inline">-</span>
                  <input
                    type="number"
                    className="form-control count d-inline"
                    value="1"
                    readOnly
                  />
                  <span className="btn btn-primary plus d-inline">+</span>
                </div>
                <button
                  type="button"
                  id="cart_btn"
                  className="btn btn-primary ml-sm-4 ml-md-4 ml-2 mt-2 d-inline"
                >
                  Add to Cart
                </button>
              </div>

              <hr className="mt-3" />

              <p>
                Status:{" "}
                <span
                  id="stock_status"
                  className={product.stock > 0 ? "greenColor" : "redColor"}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>

              <hr />

              <h4 className="mt-2">Description:</h4>
              <p>{product.description}</p>
              <hr />
              <p id="product_seller mb-3">
                Sold by: <strong>{product.seller}</strong>
              </p>

              <button
                id="review_btn"
                type="button"
                className="btn btn-primary mt-4"
                data-toggle="modal"
                data-target="#ratingModal"
              >
                Submit Your Review
              </button>

              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <div
                    className="modal fade"
                    id="ratingModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="ratingModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">
                            Submit Review
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ul className="stars">
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                          </ul>

                          <textarea
                            name="review"
                            id="review"
                            className="form-control mt-3"
                            style={{ resize: "none" }}
                          ></textarea>

                          <button
                            className="btn my-3 float-right review-btn px-4 text-white"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3 container product-heading mb-3">
            <h2>Related Products</h2>
          </div>
          <div className="row container">
            {productSuggested
              .filter((product) => product._id !== excludeProductId)
              .map((product) => (
                <Products key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};



export default ProductDetails;
