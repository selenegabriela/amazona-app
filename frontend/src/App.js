import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen.jsx';
import ProductScreen from './screens/ProductScreen.jsx';
import CartScreen from './screens/CartScreen.jsx';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen.jsx';
import { signout } from './actions/userActions.js';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodsScreen.jsx';
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx';

function App() {
  const cartItems = useSelector(state => state.cart.cartItems);
  const userInfo = useSelector(state => state.userSignin.userInfo);
  console.log(userInfo);
  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  }
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
                      {
                        userInfo ? (
                          <div className='dropdown'>
                            <Link to='#'>{userInfo.name} <i className='fa fa-caret-down'></i>{' '}</Link>
                            <ul className='dropdown-content'>
                              <Link to='#signout' onClick={signoutHandler}>Sign Out</Link>
                            </ul>
                          </div>
                        )
                       : (
                       <Link to="/signin">Sign in</Link>
                       )
                      }
                  </div>
              </header>
              <main>
                <Routes>

                  <Route exact path='/' element={<HomeScreen />} />
                  <Route exact path='/product/:id' element={<ProductScreen />} />
                  <Route exact path='/signin' element={<SigninScreen />} />
                  <Route exact path='/register' element={<RegisterScreen />} />
                  <Route exact path='/shipping' element={<ShippingAddressScreen />} />
                  <Route exact path='/payment' element={<PaymentMethodScreen />} />
                  <Route exact path='/placeorder' element={<PlaceOrderScreen />} />
                  <Route exact path='/cart/:id' element={<CartScreen />} />
                  <Route exact path='/cart/' element={<CartScreen />} />
                </Routes>
              </main>
              <footer className="row center">All right reserved</footer>
          </div>
    </BrowserRouter>
  );
}

export default App;
