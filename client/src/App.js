import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Homepage from './pages/Homepage';
import PaymentMethodPage from './pages/PaymentMethodPage';
import ProductPage from './pages/ProductPage';
import signinPage from './pages/singinPage';
import registerPage from './pages/registerPage';
import CartPage from './pages/cartPage';
import { signout } from './actions/userActions';
import ShippingAddressPage from "./pages/ShippingAddressPage";
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import OrderHistoryPage from './pages/OrderHistryPage';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ProfilePage from './pages/ProfilePage';
import ProductListPage from './pages/ProductListPage';
import ProductEditPage from './pages/ProductEditPage';
import OrderListPage from './pages/OrderListPage';

function App() {
 
  /* To add badges in cart we need to get access cart from redux */
  // for this 
  const cart = useSelector(state => state.cart);
  // get cartItems from cart object
  const {cartItems} = cart;

  /* to make the signed-named instead if signin after */
  /* we need to get info first so 
  access the usersignin info from redux */
  const userSignin = useSelector(state => state.userSignin );
  const {userInfo} = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  }
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
              {userInfo ? (
              <div className="dropdown">
                <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link> 
                   <ul className="dropdown-content">
                   <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                   <li>
                    <Link to="/orderhistory">History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out  </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )} 
             {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}           
          </div>
      </header>
      <main>
        <Route path = "/cart/:id?" component={CartPage} />
        <Route path = "/product/:id" component={ProductPage} exact/>
        <Route path="/product/:id/edit" component={ProductEditPage} exact />
        <Route path = "/signin" component={signinPage} />
        <Route path = "/register" component={registerPage} />
        <Route path = "/shipping" component= {ShippingAddressPage} />
        <Route path = "/payment" component={PaymentMethodPage} />
        <Route path = "/placeorder" component={PlaceOrderPage} />
        <Route path= "/order/:id"  component ={OrderPage} />
        <Route path="/orderhistory" component={OrderHistoryPage} />
        <PrivateRoute path="/profile" component={ProfilePage} />
        <AdminRoute path = "/productlist" component={ProductListPage} />
        <AdminRoute path="/orderlist" component={OrderListPage} />
        <Route path = "/" component={Homepage} exact />
         
      </main>
     <footer className = "row center"> All right reserved  </footer>
    </div>
  </BrowserRouter>
  );
}

export default App;
