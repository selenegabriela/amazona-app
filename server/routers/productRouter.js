import express from 'express';
import expressAsyncHandler from "express-async-handler";
import data from '../data.js';
import Product from '../models/productModel.js';
import { isAuth, isAdmin } from '../utils.js';

const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(
    async(req, res) => {
        const products = await Product.find({});
        res.send(products);
    }
));
productRouter.get('/seed', expressAsyncHandler(
    async (req, res) => {
        //await Product.deleteMany();

        const createdProducts = await Product.insertMany(data.products);
        res.send({ createdProducts });
    }
));
productRouter.get('/:id', expressAsyncHandler(
    async(req, res) => {
        const { id } = req.params;

        const product = await Product.findById(id);
        if(product) res.send(product);
        else res.status(404).send({message: 'Product Not Found'})
    }
));

productRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
    const product = new Product({
        name: 'sample name' + Date.now(),
        image: '/images/p1.jpg',
        price: 0,
        category: 'sample category',
        brand: 'sample brand',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        description: 'sample description',
    });
    const createdProduct = await product.save();
    res.send({message: 'Product Created', product: createdProduct});
}));

productRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
    const { id } = req.params;
    const { name, price, image, category, brand, countInStock, description} = req.body;
    const product = await Product.findById(id);
    if(product){
        product.name = name;
        product.price = price;
        product.image = image;
        product.category = category;
        product.brand = brand;
        product.countInStock = countInStock;
        product.description = description;

        const updatedProduct = await product.save();
        res.send({message: 'Product Updated', product: updatedProduct});
    } else {
        res.status(404).send({message: 'Product Not Found'});
    }
}));

productRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if(product){
        const deleteProduct = await product.remove();
        res.send({message: 'Product deleted', product: deleteProduct}); 
    } else {
        res.status(404).send({message: 'Product not found'});
    }
}));

export default productRouter;