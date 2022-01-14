import Axios from 'axios';
import { CART_EMPTY } from '../constants/cartConstant';
import {ORDER_CREATE_REQUEST,
ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL} from '../constants/orderConstants';

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    try {
    // get userinfo inusersignin from redux
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
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };