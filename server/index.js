import express from 'express';
import data from './data.js';
const app = express();

app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;

    const product = data.products.find(product => product._id === id*1);
    if(product){
        res.send(product);
    } else {
        res.status(404).send({message: 'Product not found'});
    }
});
app.get('/api/products/', (req, res) => {
    
    res.send(data.products);
});
app.get('/', (req, res) => {
    res.send('Server is ready');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});