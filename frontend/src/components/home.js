import React, { Fragment, useEffect, useState } from "react";
import Pagination from 'react-js-pagination';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Products from '../components/layout/productsHome'
import MetaData from "./layout/metadata";
import Loader from "./layout/loadingAnimation";

import { Link, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from 'react-alert';
import { getProducts } from "../actions/productActions";

const createSliderWithTooltip = Slider.createSliderWithTooltip;

const Home = () => {

  const { keyword } = useParams()

  const [currentPage, setCurrentPage] = useState(1)
  const [price, setPrice] = useState([1, 5000])
  const [category, setCategory] = useState('')

  const categories = [
    "Clothing",
    "Electronics",
    "Food",
    "Grocery",
    "Books",
    "Beauty/Health",
    "Accessory",
    "Home/Living",
    "Kitchen",
  ];

  const alert = useAlert()  
  const dispatch = useDispatch();

  const { loading, products, error, productsCount, resPerPage } = useSelector(state => state.products);

  useEffect(() => {
    
      // add error handling

    dispatch(getProducts(keyword, currentPage, price, category));
    
  }, [dispatch, alert, error, keyword, currentPage, price, category]);

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

          <h1 id="products_heading">Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {keyword ? (
                <Fragment>
                  {/* <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <Slider
                        range
                        marks={{
                          1: `$1`,
                          1000: `$1000`,
                        }}
                        min={1}
                        max={1000}
                        defaultValue={[1, 1000]}
                        tipFormatter={(value) => `%${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true,
                        }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />
                    </div>
                  </div> */}

                  {/* <hr className="my-5" /> */}

                  <div className="mt-5 mr-5">
                    <h4 className="mb-3">Categories</h4>

                    <ul className="pl-0">
                      {categories.map((category) => (
                        <li
                          style={{
                            cursor: "pointer",
                            listStyleType: "none",
                          }}
                          key={category}
                          onClick={() => setCategory(category)}
                        >
                          {category}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products.map((product) => (
                        <Products key={product._id} product={product} col={4} />
                      ))}
                    </div>
                  </div>
                </Fragment>
              ) : (
                products.map((product) => (
                  <Products key={product._id} product={product} col={3} />
                ))
              )}
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
