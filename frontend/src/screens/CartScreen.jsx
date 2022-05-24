import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

const CartScreen = () => {
    const { id } = useParams();
    const [ searchParams ] = useSearchParams();
    const qty = Number(searchParams.get('qty')) || 1;
    console.log(qty)
   
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