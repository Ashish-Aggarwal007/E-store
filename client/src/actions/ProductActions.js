/* actions tells 
 what to do with action-types
*/  
import {
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,
    PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, 
    PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL} from '../constants/productConstants';
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

export const createProduct = () => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    const { userSignin: { userInfo },} = getState();
    try {
        // send ajax request to update product
      const { data } = await Axios.post( '/api/products', {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: data.product,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_CREATE_FAIL, payload: message });
    }
  };

  export const updateProduct = (product) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
    const {
      // getting token from userinfo and usersignin
      userSignin: { userInfo },} = getState();
    try {
      const { data } = await Axios.put(`/api/products/${product._id}`, product, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_UPDATE_FAIL, error: message });
    }
  };

  export const deleteProduct = (productId) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const {
      userSignin: { userInfo },} = getState();
    try {
      const { data } = Axios.delete(`/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      console.log(data);
      dispatch({ type: PRODUCT_DELETE_SUCCESS });
    } catch (error) {
      const message = error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
    }
  };