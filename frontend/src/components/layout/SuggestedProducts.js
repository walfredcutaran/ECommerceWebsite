import React from 'react'
import { Link } from "react-router-dom";

const SuggestedProducts = ( { product } ) => {
return (
    <div className={`col-sm-6 col-md-4 col-lg-3 my-2`}>
    <div className="card card-suggested p-3">
        <Link to={`/product/${product._id}`}>
        <img
            loading="lazy"
            className="card-img-left img-fluid"
            src={product.images[0].url}
            alt="logo"
        />
        </Link>
        <h6 className="card-title my-2">
        <Link to={`/product/${product._id}`}>{product.name}</Link>
        </h6>
        <div className="ratings">
        <div className="rating-outer mb-2">
            <div
            className="rating-inner"
            style={{
                width: `${(4 / 5) * 100}%`,
            }}
            ></div>
        </div>
        <span id="no_o f_reviews" style={{ color: "grey", fontSize: 15 }}>
            {product.numOfReviews}
        </span>
        </div>
        <p id="product_price_suggested" className="mb-0">
        <Link to={`/product/${product._id}`} style={{ color: "black" }}>
            ${product.price}
        </Link>
        </p>
        <p className="mt-1 mb-0" style={{ color: "orange", fontSize: 20 }}>
        {" "}
        less 20%{" "}
        </p>
    </div>  
    </div>
);
}

export default SuggestedProducts;
