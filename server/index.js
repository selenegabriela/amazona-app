import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';

dotenv.config();
const app = express();

// To read body data in a json format:
app.use(express.json());
// If extended is false, you can not post "nested object"
// If extended is true, you can do whatever way that you like.
app.use(express.urlencoded({extended: true}))

// To connect mongodb with express
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona' 
// {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // useFindAndModify: true,
// }
)

// app.get('/api/products/:id', (req, res) => {
//     const { id } = req.params;

//     const product = data.products.find(product => product._id === id*1);
//     if(product){
//         res.send(product);
//     } else {
//         res.status(404).send({message: 'Product not found'});
//     }
// });
// app.get('/api/products/', (req, res) => {
    
//     res.send(data.products);
// });
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
// .env => PayPal config
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
})
app.get('/', (req, res) => {
    res.send('Server is ready');
});

// Middleware error catcher
app.use((err, req, res, next) => {
    res.status(500).send({message: err.message})
})
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});