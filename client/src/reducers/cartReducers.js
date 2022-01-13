/* updating store based on actions performed */

import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS} from '../constants/cartConstant';

export const cartReducer = (state= {cartItems: []}, action) => {
    switch (action.type){
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.product === item.product);
            // if item alredy exit in cart
            if(existItem){
                return {
                    // other properties are same
                    ...state,
                    // if previous items (x) equal to the new items (item) in cart then update it 
                    // with the new item (due to its updated properties like qty or date etc)
                    // return previous item. 
                    cartItems: state.cartItems.map((x) => x.product === existItem.product ?
                    item : x),
                };
            }else{
                // ...state.cartItems concatenate cart items with the new item
                return {...state, cartItems: [...state.cartItems, item]} ;
            }
        case CART_REMOVE_ITEM:
            // to persist other properties as it is. (...state)
            return {...state, cartItems: state.cartItems.filter((x) => x.product !== action.payload),
                // filter accept a  function & inside this function we return true or false
                // so this function is filtering out the product that id is equal to action.payload
                // so cartReducer will update the redux store & delete product from cartItems.
                
            };
        case CART_SAVE_SHIPPING_ADDRESS:
            return { ...state, shippingAddress: action.payload};
        default:
            return state;
    }
}