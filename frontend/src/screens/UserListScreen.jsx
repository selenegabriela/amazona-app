import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../node_modules/react-redux/es/exports';
import { deleteUser, listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DELETE_RESET } from '../constants/userConstants';

const UserListScreen = () => {
    
    const userList = useSelector(state => state.userList);
    const { loading, users, error } = userList;

    const userDelete = useSelector(state => state.userDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = userDelete;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listUsers());
    }, [ dispatch, successDelete ] );

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure?')){
            dispatch(deleteUser(id));
            dispatch({type: USER_DELETE_RESET})
        }
         
    }

    return(
        <div>
            <h1>Users</h1>
            {loadingDelete ? <LoadingBox></LoadingBox> :
            errorDelete ? <MessageBox variant="danger">{errorDelete}</MessageBox> :
             successDelete ? (
                <MessageBox variant="success">User Deleted Successfully</MessageBox>
            ): <></>}
            {
                loading ? (<LoadingBox></LoadingBox>)
                :
                error ? (<MessageBox variant='danger'>{error}
                </MessageBox>)
                :
                (
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>IS SELLER</th>
                                <th>IS ADMIN</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isSeller ? 'YES' : 'NO'}</td>
                                        <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                                        <td>
                                            <button type='button' className='small'>Edit</button>
                                            <button type='button' className='small' onClick={e => deleteHandler(user._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}

export default UserListScreen;