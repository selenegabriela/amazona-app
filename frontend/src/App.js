import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen.jsx';
import ProductScreen from './screens/ProductScreen.jsx';
import CartScreen from './screens/CartScreen.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
              <header className="row">
                  <div>
                      <a className="brand" href="/">amazona</a>
                  </div>
                  <div>
                      <a href="/cart">Cart</a>
                      <a href="/signin">Sign in</a>
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
