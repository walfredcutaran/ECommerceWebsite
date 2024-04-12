import React, { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";

const ProductsHome = ({ product, col }) => {
return (
<div
    className={`col-12 col-sm-6 col-md-6 col-lg-${col} my-3 `}
    id="card-container"
>
    <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
    <div className="card p-3">
    
    <div className="card-body d-flex flex-row">
        <Link to={`/product/${product._id}`}>
        <img
            loading="lazy"
            id="product-img-home"
            className="card-img-top mx-auto"
            src={product.images[0].url}
            alt="logo"
        />
        </Link>
        <div className="flex-column">
        <h5 className="card-title">
            <Link to={`/product/${product._id}`}>{product.name}</Link>
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
        <div className="ratings flex-column">
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
    {/* here */}</Link>
</div>

);

};



export default ProductsHome;
