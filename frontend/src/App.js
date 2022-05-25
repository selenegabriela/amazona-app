import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen.jsx';
import ProductScreen from './screens/ProductScreen.jsx';
import CartScreen from './screens/CartScreen.jsx';
import { useSelector } from 'react-redux';

function App() {
  const cartItems = useSelector(state => state.cart.cartItems)

  return (
    <BrowserRouter>
      <div className="grid-container">
              <header className="row">
                  <div>
                      <Link className="brand" to="/">amazona</Link>
                  </div>
                  <div>
                      <Link to="/cart">Cart
                      {cartItems.length > 0 && (
                        <span className='badge'>{cartItems.length}</span>
                      )}
                      </Link>
                      <Link to="/signin">Sign in</Link>
                  </div>
              </header>
              <main>
                <Routes>

                  <Route exact path='/' element={<HomeScreen />} />
                  <Route exact path='/product/:id' element={<ProductScreen />} />
                  <Route exact path='/cart/:id' element={<CartScreen />} />
                </Routes>
              </main>
              <footer className="row center">All right reserved</footer>
          </div>
    </BrowserRouter>
  );
}

export default App;
