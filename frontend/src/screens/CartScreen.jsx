import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from '../components/MessageBox';

const CartScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [ searchParams ] = useSearchParams();
    const qty = Number(searchParams.get('qty')) || 1;
    console.log(qty);

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if(id) dispatch(addToCart(id, qty))
    }, [dispatch, id, qty]);
    
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }
    const checkoutHandler = () => {
        navigate('/signin?redirect=shipping')
    }
   
    return (
        <div className="row top">
            <div className="col-2">
                <h1>Shopping Cart</h1>
                {cartItems.length === 0
                ? <MessageBox>Cart is empty. <Link to='/'>Go shopping</Link></MessageBox> 
                : (
                    <ul>
                        {cartItems.map(item => {
                            return <li key={item.product}>
                                <div className="row">
                                    <div>
                                        <img src={item.image} alt={item.name} className='small'/>
                                    </div>
                                    <div className="min-30">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>
                                    <div>
                                        <select value={item.qty} onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                            {[...Array(item.countInStock).keys()].map(x => {
                                                return <option key={x+1} value={x+1}>
                                                    {x+1}
                                                </option>
                                            })}
                                        </select>
                                    </div>
                                    <div>${item.price}</div>
                                    <div>
                                        <button type="button" onClick={() => removeFromCartHandler(item.product)}>Delete</button>
                                    </div>
                                </div>
                            </li>
                        })}
                    </ul>
                )}
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : ${cartItems.reduce((a,c) => a + c.price*c.qty, 0)}
                            </h2>
                        </li>
                        <li>
                            <button disabled={cartItems.length === 0} type='button' onClick={checkoutHandler} className="primary block">
                                Proceed to checkout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CartScreen;