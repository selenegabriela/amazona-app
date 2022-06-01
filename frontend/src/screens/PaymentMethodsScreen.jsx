import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentMethodScreen = () => {
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    const [ paymentMethod, setPaymentMethod ] = useState('PayPal');
    const dispatch = useDispatch();
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    }
    useEffect(() => {
        if(!shippingAddress.address){
            // console.log(Boolean(shippingAddress.address));
            navigate('/shipping');
        }
    }, [navigate, shippingAddress])

    return ( 
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form onSubmit={submitHandler} className="form">
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                    <div>
                        <input type="radio" id="paypal" value='PayPal' name='paymentMethod' required checked onChange={e => setPaymentMethod(e.target.value)} />
                        <label htmlFor="paypal">PayPal</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="radio" id="stripe" value='Stripe' name='paymentMethod' required onChange={e => setPaymentMethod(e.target.value)} />
                        <label htmlFor="stripe">Stripe</label>
                    </div>
                </div>
                <div>
                    <button className="primary" type='submit'>Continue</button>
                </div>
            </form>
        </div>
     );
}
 
export default PaymentMethodScreen;