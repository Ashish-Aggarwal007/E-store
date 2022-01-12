import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart,removeFromCart} from '../actions/cartActions';
import MessageBox from '../components/MessageBox';
const CartPage = (props) => {
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
    
    // get the cart data from redux store
    const cart = useSelector((state) => state.cart);
    // from cart fetch cartItems then list on cartpage
    const { cartItems } = cart;
    const dispatch = useDispatch();
    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        // delete action
        dispatch(removeFromCart(id));
      };
    
      const checkoutHandler = () => {
          // after signingIn user will redirected to shipping page
        props.history.push('/signin?redirect=shipping');
      };
    return (
        <>
        {/* 2 coloumns and both wil stick to top */}
        <div className="row top">
            <div className="col-2">
            <h1>SHOPPING CART</h1>
            {cartItems.length === 0 ? (
                <MessageBox>
                Your Cart is empty. <Link to="/">Go back to Shopping</Link>
                </MessageBox>
            ) : (
                <ul>
                {cartItems.map((item) => (
                    <li key={item.product}>
                    <div className="row">
                        <div>
                        <img src={item.image} alt={item.name} className="small"
                        ></img>
                        </div>
                        <div className="min-30">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </div>
                        <div>
                        <select
                            value={item.qty}
                            onChange={(e) =>
                            dispatch(
                                // item.product is id of product in select box and Number(having selected-value in
                                // select box ) 
                                addToCart(item.product, Number(e.target.value))
                            )
                            }
                        >
                        {/* code for options  */}
                            {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                                {x + 1}
                            </option>
                            ))}
                        </select>
                        </div>
                        <div>${item.price}</div>
                        <div>
                        <button
                            type="button"
                            onClick={() => removeFromCartHandler(item.product)}>
                            Delete
                        </button>
                        </div>
                    </div>
                    </li>
                ))}
                </ul>
            )}
            </div>
            {/* showing total items with price  */}
           <div className="col-1">
               <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                                {/* a-> accumulator and c-> current item (default value of a=0) */}
                                {/* for total quantity */}
                            Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                            {/* for total price of items  */}
                            {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                            </h2>
                        </li>
                        <li>
                            <button
                            type="button"
                            onClick={checkoutHandler}
                            className="primary block"
                            disabled={cartItems.length === 0} >
                            Proceed to Checkout
                            </button>
                        </li>
                    </ul>
               </div>
            </div>
        </div>
      </>
    );
  }

export default CartPage
