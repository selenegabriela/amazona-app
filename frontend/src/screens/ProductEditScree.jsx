import React, { useEffect, useState } from 'react';
import axios from '../../node_modules/axios/index';
import { useDispatch, useSelector } from '../../node_modules/react-redux/es/exports';
import { useNavigate, useParams } from '../../node_modules/react-router-dom/index';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [ name, setName ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ image, setImage ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ countInStock, setCountInStock ] = useState('');
    const [ brand, setBrand ] = useState('');
    const [ description, setDescription ] = useState('');
    
    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector(state => state.productUpdate);
    const {loading: loadingUpdate, success: successUpdate, error: errorUpdate} = productUpdate;

    const dispatch = useDispatch();
    useEffect(() => {
        if(successUpdate) navigate('/productlist');
        if(!product || product._id !== id || successUpdate){
            dispatch({type: PRODUCT_UPDATE_RESET});
            dispatch(detailsProduct(id));
        } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setBrand(product.brand)
            setDescription(product.description)
        }
    }, [ dispatch, id, product, navigate, successUpdate ]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            _id: id,
            name,
            price,
            image,
            category,
            brand, 
            countInStock,
            description
        }))
    }
    // Upload image handler
    const [ loadingUpload, setLoadingUpload ] = useState(false)
    const [ errorUpload, setErrorUpload ] = useState('');
    const userInfo  = useSelector(state => state.userSignin.userInfo);
    const uploadFileHandler = async (e) => {
        
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);
        try {
            const {data} = await axios.post('/api/uploads', bodyFormData, {
                headers: { 'Content-Type': 'multipart/form-data', authorization: `Bearer ${userInfo.token}`}
            });
            setImage(data);
            setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Edit product</h1>
                </div>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant='danger'>{error}</MessageBox>}


                {loading? <LoadingBox></LoadingBox>
                :
                error? <MessageBox variant='danger'>{error}</MessageBox>
                :
                <>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input id="price" type="text" placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="image">Image</label>
                        <input id="image" type="text" placeholder='Enter image' value={image} onChange={(e) => setImage(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="imageFile">Image File</label>
                        <input type="file" id="imageFile" label='Choose Image' onChange={uploadFileHandler} />
                        {loadingUpload && <LoadingBox></LoadingBox>}
                        {errorUpload && (
                            <MessageBox variant='danger'>{errorUpload}</MessageBox>
                        )}
                    </div>
                    <div>
                        <label htmlFor="category">Category</label>
                        <input id="category" type="text" placeholder='Enter category' value={category} onChange={(e) => setCategory(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="brand">Brand</label>
                        <input id="brand" type="text" placeholder='Enter brand' value={brand} onChange={(e) => setBrand(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="countInStock">Count In Stock</label>
                        <input id="countInStock" type="text" placeholder='Enter count In Stock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea id="description" type="text" placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div>
                        <label></label>
                        <button className="primary" type='submit'>Update</button>
                    </div>
                </>
                }
            </form>
        </div>
    )
}

export default ProductEditScreen;