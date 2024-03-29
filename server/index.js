import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import path from 'path';

dotenv.config();
const app = express();

// To read body data in a json format:
app.use(express.json());
// If extended is false, you can not post "nested object"
// If extended is true, you can do whatever way that you like.
app.use(express.urlencoded({extended: true}))

// To connect mongodb with express
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/amazona' //  ←←← When you install MongoDB Community Edition the addres is going to be this and after the lasta slash we put the database name.
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
app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
// .env => PayPal config
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads' || '/server/uploads')));
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'frontend/build/index.html')))
// app.get('/', (req, res) => {
//     res.send('Server is ready');
// });

// Middleware error catcher
app.use((err, req, res, next) => {
    res.status(500).send({message: err.message})
})
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});