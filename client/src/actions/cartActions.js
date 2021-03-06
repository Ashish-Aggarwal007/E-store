/* actions tells 
 what to do with action-types
*/
import Axios from 'axios';
import {CART_ADD_ITEM, CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD} from '../constants/cartConstant';


/* first creating add to cart action*/
/* we add a extra parameter with dispatch (getState), in redux thunk it
make it possible to dispatch an action and get access to the state of redux store.*/
export const addToCart = (productId, qty) => async (dispatch, getState) => {
    // sending ajax request to server to get the information about product
    const {data} = await Axios.get(`/api/products/${productId}`);

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            name : data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            product: data._id,
            qty,
        },
    });
    // add cart items to local storage so even we refresh the page items persists in cart (prevent to empty)
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  };
// accept data about address
  export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  };

  export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_PAYMENT_METHOD, payload: data});
  };