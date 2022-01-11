/* actions tells 
 what to do with action-types
*/  

import {PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS} from '../constants/productConstants';
import Axios from 'axios';

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
}