import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import Rating from '../components/Rating';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsProduct } from '../actions/productActions';

const ProductScreen = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = params;
    const [ qty, setQty ] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { loading, product, error} = productDetails;
    // console.log(loading, product, error)
    
   
    // const product = data.products.find(p => p._id === id*1);
    // console.log(id, product)


    
    useEffect(() => {
        dispatch( detailsProduct(id) );
    }, [dispatch, id]);

    const addToCartHandler = () => {
        // 👾
        navigate(`/cart/${id}?qty=${qty}`);
    }
     
    return(

        <div>
            {loading
            ? <LoadingBox></LoadingBox>
            : error 
            ? <MessageBox variant="danger">{error}</MessageBox>
            : <div>
            <Link to='/'>Back to result</Link>
            <div className='row top'>
                <div className="col-2">
                    <img className='large' src={product.image} alt={product.name} />
                </div>
                <div className="col-1">
                    <ul>
                        <li><h1>{product.name}</h1></li>
                        <li><Rating rating={product.rating} numReviews={product.numReviews} /></li>
                        <li>Price: ${product.price}</li>
                        <li>
                            Description: 
                            <p>{product.description}</p>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <div className="row">
                                    <div>Price</div>
                                    <div className="price">${product.price}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>

                                    <div>Status</div>
                                    <div>
                                        {product.countInStock>0 
                                        ? (<span className='success'>In Stock</span>) : (<span className='danger'>Unavailable</span>)}
                                    </div>
                                </div>
                            </li>
                            {product.countInStock > 0 
                            &&  (
                                <>
                                    <li>
                                        <div className="row">
                                            <div>Qty</div>
                                            <div>
                                                <select value={qty} onChange={e => setQty(e.target.value)}>
                                                    {
                                                        [...Array(product.countInStock).keys()].map(n => {
                                                            return <option key={n+1} value={n+1}>{n+1}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>  
                                    </li>    
                                    <li>
                                        <button onClick={addToCartHandler} className="primary block">Add to Cart</button>
                                    </li>
                                </>
                            )}
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>}
        </div>

        
    )
}

export default ProductScreen;