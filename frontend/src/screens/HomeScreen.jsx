import React, { useEffect } from 'react';

import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
    const productList = useSelector(state => state.productList);
    const dispatch = useDispatch();
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    // WITH STATE ----------------------------------->
    // const [ products, setProducts ] = useState([]);
    // const [ loading, setLoading ] = useState(false);
    // const [ error, setError ] = useState(false);

    // useEffect(() => {
    //     const fecthData = async () => {
    //         try {
    //             setLoading(true);
    //             const { data } = await axios.get('/api/products');
    //             setLoading(false);
    //             setProducts(data);
    //         } catch (err) {
    //             console.log(err)
    //             setError(err.message);
    //             setLoading(false);
    //         }
    //     };
    //     fecthData();
    // }, []);
    return(
        <div>
            {loading
            ? <LoadingBox></LoadingBox>
            : error 
            ? <MessageBox variant="danger">{error}</MessageBox>
            : <div className="row center">
            {
                products?.map((product, i) => {
                    return <Product key={product._id} product={product}/>
                })
            }                
        </div>}
            
        </div>
    )
}

export default HomeScreen;