import React, { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";

const ProductsHome = ({ product, col }) => {
return (
<div
    className={` col-lg-${col} mt-4`}
    // className={`container col-12 col-sm-6 col-md-6 col-lg-${col} my-3`}
>
    <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
    <div class="container">
    <div className="card p-3 ">
    
    {/* change to flex-column on smaller viewports */}
    <div className="card-body d-flex flex-row">
        <Link to={`/product/${product._id}`}>
        <div class="col">
        <img
            loading="lazy"
            id="product-img-home"
            className="card-img-top"
            src={product.images[0].url}
            alt="logo"
            height={"200px"}
        />
        </div>

        </Link>
        <div className="flex-column col-6">
        <h5 className="card-title">
            {product.name}
        </h5>
        <p className="card-text mt-2" id="product-price">
            <span className="currency">$</span> {product.price.toFixed(0)}{" "}
            <span className="cents">99</span>
        </p>

        <div className="shipping">
            <p> FREE shipping </p> {/* insert random date ranges here */}
        </div>

        <div className="shipping">
            <p>
            {" "}
            <b> Voucher Available </b>{" "}
            </p>
        </div>
        </div>
        <div className="ratings flex-column col-2">
        {/* <div className="rating-outer">
    <div
        className="rating-inner"
        style={{
        width: `${(product.ratings / 5) * 100}%`,
        }}
    ></div>
    </div> */}
        <div className="overall-rating">
            {((product.ratings / 5) * 100) / 10}{" "}
            <span className="smaller-case"> / 10 </span>
        </div>

        <span id="no_o f_reviews" style={{ color: "grey", fontSize: 15 }}>
            {product.numOfReviews}+ reviews
        </span>

        <Link
            to={`/product/${product._id}`}
            id="view_btn"
            className="btn btn-block ml-2 mt-5"
        >
            View
        </Link>
        </div>
    </div>
    </div>
    </div>
    {/* here */}</Link>
</div>

);

};



export default ProductsHome;
