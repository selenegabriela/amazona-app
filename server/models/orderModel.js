import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    // To declare an array which has objects and inside this object we declare what type of elements it contains:
    orderItems: [{
        name: {type: String, required: true},
        qty: {type: Number, required: true},
        image: {type: String, required: true},
        price: {type: Number, required: true},
        //Relation between models: n -> m?
        product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true}
    }],
    shippingAddress: {
        fullName: {type: String, required: true},
        address: {type: String, required: true},
        city: {type: String, required: true},
        postalCode: {type: String, required: true},
        country: {type: String, required: true},
    }, 
    paymentMethod: {type: String, required: true},
    itemsPrice: {type: Number, required: true},
    shippingPrice: {type: Number, required: true},
    taxPrice: {type: Number, required: true},
    totalPrice: {type: Number, required: true},
    // 1 -> N?
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    isPaid: {type: Boolean, default: false},
    paidAt: {type: Date},
    isDelivered: {type: Boolean, default: false},
    deliveredAt: {type: Date},
},
{
    timestamps: true,
}
);
const Order = mongoose.model('Order', orderSchema);
export default Order;