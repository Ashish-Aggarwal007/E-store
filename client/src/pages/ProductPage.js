import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { detailsProduct } from '../actions/ProductActions';
import Rating from '../components/Rating'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

// import data from '../data'
const ProductPage = (props) => {
    /* so now we are not showing product from static file in front */
    // const product = data.products.find((x)=> x._id === props.match.params.id)

    // load products fron product details in redux store.
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const productDetails = useSelector((state) => state.productDetails);  
    const {loading, error, product} = productDetails; 
        
    //     if(!product){
    //     return <div>Oops! Product Not Found</div>
    // }
        useEffect(() => {
            dispatch(detailsProduct(productId));
        }, [dispatch, productId]);
    return (
        <>
        {loading ? (
            <LoadingBox/> ) : error ? (
                <MessageBox variant ="danger">{error}</MessageBox>
            ): (
                <>
                <Link to="/">Back to result</Link>
                <div className='row top'>
                    <div className='col-2'>
                     <img className = "large" src={product.image} alt = {product.name} />
                    </div>
                    <div className='col-1'>
                     <ul>
                         {/* as first item set heading-1 to Name , first element */}
                         <li><h1>{product.name}</h1></li>
                         {/* Second ELement is rating */}
                         <li><Rating rating = {product.rating} numReviews={product.numReviews}/></li>
                         <li>
                             {/* next should be the price element*/}
                             Price : ${product.price}
                         </li>
                         <li>
                             Description : <p>{product.description}</p>
                         </li>
                     </ul>
                    </div>
                    <div className='col-1'>
                         <div className='card card-body'>
                         <ul>
                             <li>
                                 {/* because we want to create price label
                                 and price value next to each other */}
                                 <div className='row'>
                                     <div>Price</div>
                                     <div className='price'>${product.price}</div>
                                 </div>
                             </li>
                             <li>
                             <div className='row'>
                                 <div>Status</div>
                                 <div>
                                     {product.countInStock > 0 ? (<span className='success'>
                                         In Stock </span> ) : (
                                             <span className='danger'>Unavailable</span>
                                         )}
                                 </div>
                             </div>
                             </li>
                             <li>
                                 <button className='primary block'>Add to Cart</button>
                             </li>
                         </ul>
                         </div>
                    </div>
                </div> 
                </>
        )}
        
       
       </>
    )
}

export default ProductPage
