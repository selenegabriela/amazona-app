import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '../../node_modules/react-redux/es/exports';
import { useNavigate } from '../../node_modules/react-router-dom/index';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const ProductListScreen = () => {
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;
    const navigate = useNavigate();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts())
    }, [ dispatch ]);

    const deleteHandler = (product) => {

    }
    return (
        <div>
            <h1>Products</h1>
            {loading? <LoadingBox></LoadingBox>
            : 
            error? <MessageBox variant='danger'>{error}</MessageBox>
            :
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => {
                        return <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <button type='button' className='small' onClick={() => navigate(`/product/${product._id}/edit`)}>Edit</button>
                                <button type='button' className='small' onClick={() => deleteHandler(product)}>Delete</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
            }
        </div>
    )
}

export default ProductListScreen;