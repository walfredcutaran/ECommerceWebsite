import React, { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";

const ProductsHome = ({ product, col }) => {

return (
    <div className={`col-12 col-sm-6 col-md-6 col-lg-${col} my-3`}>
    <div className="card p-3 ">
        <Link to={`/product/${product._id}`}>
        {" "}
        <img
            loading="lazy"
            id="product-img-home"
            className="card-img-top mx-auto"
            src={product.images[0].url}
            alt="logo"
        />
        </Link>
        <div className="card-body d-flex flex-column">
        <h5 className="card-title">
            <Link to={`/product/${product._id}`}>{product.name}</Link>
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
            <span id="no_o f_reviews" style={{ color: "grey", fontSize: 15 }}>
            ({product.numOfReviews})
            </span>
        </div>
        <p className="card-text mt-2" id="product-price"><b>${product.price}</b></p>

        <Link
            to={`/product/${product._id}`}
            id="view_btn"
            className="btn btn-block ml-2"
        >
            View
        </Link>

        </div>
    </div>
    </div>
);
};

export default ProductsHome;
