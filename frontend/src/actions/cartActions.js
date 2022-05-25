import axios from "axios"
import { CART_ADD_ITEM } from "../constants/cartConstants"

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({type: CART_ADD_ITEM, payload: {
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        product: data._id,
        qty,
    } })
    // LOCAL STORAGE
    // setItem accept two parameters: the key and the value. Value should be a string, not an object, so we have to use JSON.stringify. And we need to get access to redux store. We doi throug getState. After this, we need to go to the store and make some changes.
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}