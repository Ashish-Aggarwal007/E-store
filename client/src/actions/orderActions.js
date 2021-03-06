import Axios from 'axios';
import { CART_EMPTY } from '../constants/cartConstant';
import { ORDER_DELETE_FAIL, ORDER_DELETE_SUCCESS } from '../constants/orderConstants';
import {ORDER_CREATE_REQUEST,
ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL,
MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_FAIL,
ORDER_LIST_REQUEST,ORDER_LIST_SUCCESS, ORDER_LIST_FAIL,
ORDER_DELETE_REQUEST,
ORDER_DELIVER_REQUEST,
ORDER_DELIVER_SUCCESS, 
ORDER_DELIVER_FAIL,} from '../constants/orderConstants';

export const createOrder = (order) => async (dispatch, getState) => {
  // dispatching order details request
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    try {
    // get userinfo in usersignin from redux
      const {userSignin: { userInfo }, } = getState();
      const { data } = await Axios.post('/api/orders', order, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
      dispatch({ type: CART_EMPTY });
      localStorage.removeItem('cartItems');
    } catch (error) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
        /* IF error from the web application exist, use it and otherwise use the 
        general network error*/
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  // here, we use getstate to the token of current user
  export const detailsOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const { userSignin: { userInfo },} = getState();
    try {
      const { data } = await Axios.get(`/api/orders/${orderId}`, {
        // get userinfo from the getstate
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      // dispatch data to use it in UI.
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
    }
  };

  export const payOrder = (order, paymentResult) => async (
    dispatch,
    getState
  ) => {
    dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } });
    const { userSignin: { userInfo }, } = getState();
    try {
      const { data } = Axios.put(`/api/orders/${order._id}/pay`, paymentResult, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_PAY_FAIL, payload: message });
    }
  };

  export const listOrderMine = () => async (dispatch, getState) => {
    dispatch({ type: MY_ORDER_LIST_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.get('/api/orders/mine', {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: MY_ORDER_LIST_FAIL, payload: message });
    }
  };

  export const listOrders = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_LIST_REQUEST });
    const {userSignin: { userInfo },  } = getState();
    try {
      const { data } = await Axios.get('/api/orders', {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      console.log(data);
      dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_LIST_FAIL, payload: message });
    }
  };

  export const deleteOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
    const { userSignin: { userInfo },} = getState();
    try {
      const { data } = Axios.delete(`/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_DELETE_FAIL, payload: message });
    }
  };

  export const deliverOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DELIVER_REQUEST, payload: orderId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = Axios.put(`/api/orders/${orderId}/deliver`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_DELIVER_FAIL, payload: message });
    }
  };