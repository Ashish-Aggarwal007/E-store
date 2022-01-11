import {BrowserRouter, Route} from 'react-router-dom';
import Homepage from './pages/Homepage';
import ProductPage from './pages/ProductPage';
function App() {
  return (
    <BrowserRouter>
    <div className = "grid-container">
      <header className = "row">
          <div>
              <a className="brand" href = "index.html">E-Store</a>
          </div>
          <div>
              <a href = "cart.html">Cart</a>
              <a href="signin.html">Sign In</a>
          </div>
      </header>
      <main>
        <Route path = "/product/:id" component={ProductPage} />
        <Route path = "/" component={Homepage} exact />
         
      </main>
     <footer className = "row center"> All right reserved  </footer>
    </div>
  </BrowserRouter>
  );
}

export default App;
