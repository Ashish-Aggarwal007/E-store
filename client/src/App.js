import { useSelector } from 'react-redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Homepage from './pages/Homepage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/cartPage';


function App() {
 
  /* To add badges in cart we need to get access cart from redux */
  // for this 
  const cart = useSelector(state => state.cart);
  // get cartItems from cart object
  const {cartItems} = cart;

  return (
    <BrowserRouter>
    <div className = "grid-container">
      <header className = "row">
          <div>
              <Link className="brand" to = "/">E-Store</Link>
          </div>
          <div>
              <Link to = "/cart">Cart
              {cartItems.length> 0 && ( <span 
              className='badges'>{cartItems.length}</span>
              )}
              </Link>
              <Link to="/signin">Sign In</Link>
          </div>
      </header>
      <main>
        <Route path = "/cart/:id?" component={CartPage} />
        <Route path = "/product/:id" component={ProductPage} />
        <Route path = "/" component={Homepage} exact />
         
      </main>
     <footer className = "row center"> All right reserved  </footer>
    </div>
  </BrowserRouter>
  );
}

export default App;
