import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '../../node_modules/react-redux/es/exports';
import { useNavigate } from '../../node_modules/react-router-dom/index';
import { createProduct, deleteProduct, listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants';

const ProductListScreen = () => {
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    const productCreate = useSelector(state => state.productCreate);
    const { loading: loadingCreate, success: successCreate, product: createdProduct, error: errorCreate } = productCreate;

    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete} = productDelete;
    const navigate = useNavigate();

    const dispatch = useDispatch();
    useEffect(() => {
        if(successCreate){
            dispatch({type: PRODUCT_CREATE_RESET})
            navigate(`/product/${createdProduct._id}/edit`)
        }
        if(successDelete){
            dispatch({type: PRODUCT_DELETE_RESET});
        }
        dispatch(listProducts())
    }, [ dispatch, createdProduct, navigate, successCreate, successDelete ]);

    const deleteHandler = (product) => {
        if(window.confirm('Are you sure to delete?')){
            dispatch(deleteProduct(product._id));
        }
    }
    const createHandler = () => {
        dispatch(createProduct());
    }
    return (
        <div>
            <div className="row">
                <h1>Products</h1>
                <button className="primary" type='button' onClick={createHandler}>Create Product</button>
            </div>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant='danger'>{errorDelete}</MessageBox>}

            {loadingCreate && <LoadingBox></LoadingBox>}
            {errorCreate && <MessageBox variant='danger'>{errorCreate}</MessageBox>}
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