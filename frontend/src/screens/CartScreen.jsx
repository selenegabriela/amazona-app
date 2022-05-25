import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { addToCart } from "../actions/cartActions";

const CartScreen = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [ searchParams ] = useSearchParams();
    const qty = Number(searchParams.get('qty')) || 1;
    console.log(qty);

    useEffect(() => {
        if(id) dispatch(addToCart(id, qty))
    }, [dispatch, id, qty]);
   
    return (
        <div>
            <h1>Cart Screen</h1>
            <p>
                ADD TO CART : ProductID: {id} Qty: {qty}
            </p>
        </div>
    )
}

export default CartScreen;