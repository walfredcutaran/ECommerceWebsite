import axios from 'axios';

import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    GET_SUGGESTED_PRODUCTS_REQUEST,
    GET_SUGGESTED_PRODUCTS_SUCCESS,
    GET_SUGGESTED_PRODUCTS_FAIL,
    CLEAR_ERRORS

} from '../constants/productConstants'

export const getProducts = (keyword = '', currentPage = 1, price, category) => async (dispatch) => {
    try {

        dispatch({ type: ALL_PRODUCTS_REQUEST });

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`

        if (category) {
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}`
        }

        const { data } = await axios.get(link);

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getSuggestedProducts = (category) => async (dispatch) => {
    try {

        dispatch({ type: GET_SUGGESTED_PRODUCTS_REQUEST });

        let link = `/api/v1/products?category=${category}`;

        const { data } = await axios.get(link);

        dispatch({
            type: GET_SUGGESTED_PRODUCTS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: GET_SUGGESTED_PRODUCTS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getProductDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/product/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product 
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}