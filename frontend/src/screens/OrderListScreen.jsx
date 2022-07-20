import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../node_modules/react-redux/es/exports';
import { useNavigate } from '../../node_modules/react-router-dom/index';
import { deleteOrder, listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';

const OrderListScreen = () => {
    const navigate = useNavigate();
    const orderList = useSelector(state => state.orderList);
    const { loading, orders, error } = orderList;

    const orderDelete = useSelector(state => state.orderDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type: ORDER_DELETE_RESET});
        dispatch(listOrders());
    }, [ dispatch, successDelete ]);

    const deleteHandler = (order) => {
        if(window.confirm('Are you sure to delete?')){
            dispatch(deleteOrder(order._id))
        }
    }

    return(
        <div>
            <div>
                <h1>Orders</h1>
                {loadingDelete && <LoadingBox></LoadingBox>}
                {errorDelete && <MessageBox variant='danger'>{errorDelete}</MessageBox>}
                {loading 
                ? (<LoadingBox></LoadingBox>)
                : error
                ? (<MessageBox variant='danger'>{error}</MessageBox>)
                :
            (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        { orders.map(order => {
                            return <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user.name}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>{order.totalPrice.toFixed(2)}</td>
                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                            <td>
                            {order.isDelivered
                                ? order.deliveredAt.substring(0, 10)
                                : 'No'}
                            </td>
                            <td>
                            <button
                                type="button"
                                className="small"
                                onClick={() => {
                                navigate(`/order/${order._id}`);
                                }}
                            >
                                Details
                            </button>
                            <button type='button' className="small" onClick={() => deleteHandler(order)}>Delete</button>
                            </td>
                        </tr>
                        })}
                    </tbody>
                </table>
            )}
            </div>
        </div>
    )
}

export default OrderListScreen;