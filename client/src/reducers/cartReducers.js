/* updating store based on actions performed */

import {CART_ADD_ITEM} from '../constants/cartConstant';

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
        default:
            return state;
    }
}