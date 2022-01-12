/* actions tells 
 what to do with action-types
*/  
import {
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS} from '../constants/productConstants';
import Axios from 'axios';

/* 1. defining very first action to get list of products from server*/
export const listProducts = () => async(dispatch) => {
    dispatch({
        type:PRODUCT_LIST_REQUEST
    });
    try{
        //Here, we sending a Ajax request to get list of products.
        const {data} = await Axios.get('/api/products');
        dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload:data
    });
    }catch(error){
        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload: error.message
        });
    }
};

/* we get a product by its id from backend & update redux-store based on it */

export const detailsProduct = (productId) => async(dispatch) => {
    dispatch({
        type: PRODUCT_DETAILS_REQUEST,
        payload: productId
    });
    // to detect the error in backend api using try-catch block
    try{
        // get data from backend using Axios 
        const {data} = await Axios.get(`/api/products/${productId}`);
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload: data
        });
    }catch(error)
    {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload : error.response && error.response.data.message
                        ? error.response.data.message : error.message,
        });
    }
};