import express from 'express';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';

const orderRouter = express.Router();

//middleware: second parameter
orderRouter.post('/', isAuth, expressAsyncHandler( async(req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body;
    if(req.body.orderItems.length === 0){
        res.status(400).send({message: 'Cart is empty'});
    } else {
        const order = new Order({
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
            // autenticate user with a middleware -> utils.js
            // We need the id user because it's needed in the order model.
            user: req.user._id
        });
        const createdOrder = await order.save();
        res.status(201).send({message: 'New Order Created', order: createdOrder})
    }
}));

orderRouter.get('/:id', isAuth, expressAsyncHandler( async(req, res) => {
    const { id } = req.params;
    
    const order = await Order.findById(id);
    if(order) res.send(order)
    else res.status(404).send({message: 'Order Not Found'});
    
}));

export default orderRouter;