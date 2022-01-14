/* signin is a function that accept two parameter as
 email and password */

import Axios from 'axios';
import {USER_SIGNIN_REQUEST, USER_SIGNIN_FAIL,
  USER_SIGNIN_SUCCESS, USER_SIGNOUT,
  USER_REGISTER_REQUEST, 
USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS,
USER_DETAILS_FAIL, USER_UPDATE_PROFILE_REQUEST, 
USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL} from '../constants/userContants';

  export const register = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
    try {
      // data to get back to server
      const { data } = await Axios.post('/api/users/register', {name, email, password, });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      // updating store based on signin user because in app.js
      // read and get users using usersignin 
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: error.response && error.response.data.message
            ? error.response.data.message : error.message,
      });
    }
  };

 export const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        // signin api is a post request so  use post
        // second paramer is the data- > email and password
      const { data } = await Axios.post('/api/users/signin', { email, password });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      /* we use localStorage here because we want to keep the users 
      even if user reload the page or close it and open it again*/
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_SIGNIN_FAIL,
        payload:
        // check if response and message exist
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  
  export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    dispatch({ type: USER_SIGNOUT });
  };

  export const detailsUser = (userId) => async (dispatch, getState) => {
    dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
    // getting token from getstate
    const {userSignin: { userInfo },} = getState();
    try {
      const { data } = await Axios.get(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      // after getting data dispatch the success msg with data to client
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_DETAILS_FAIL, payload: message });
    }
  };

  export const updateUserProfile = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
    const { userSignin: { userInfo }, } = getState();
    try {
      // send ajax request to update user profile
      const { data } = await Axios.put(`/api/users/profile`, user, {
        // options for this request
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
      // in header section, we want to show userName and it comes from the user signin dispatch
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      const message = error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
    }
  };