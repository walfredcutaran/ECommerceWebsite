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

  const { keyword } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000])

  const alert = useAlert()  
  const dispatch = useDispatch();

  const { loading, products, error, productsCount, resPerPage } = useSelector(state => state.products);

  useEffect(() => {
    
      // add error handling

    dispatch(getProducts(keyword, currentPage, price));
    
  }, [dispatch, alert, error, keyword, currentPage, price]);

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

          {keyword ? (
            <Fragment>
              <div className="col-6 col-md-3 mt-5 mb-5">
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
              </div>

              <div className="col-6 col-md-9">
                <div class="row">
                  {products &&
                    products.map((product) => (
                      <Products key={product._id} product={product} col={4} />
                    ))}
                </div>
              </div>
            </Fragment>
          ) : (
            <section id="products" className="container mt-5">
              <div className="row">
                {products &&
                  products.map((product) => (
                    <Products key={product._id} product={product} col={3} />
                  ))}
              </div>
            </section>
          )}

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
