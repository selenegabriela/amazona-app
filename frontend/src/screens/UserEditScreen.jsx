import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../node_modules/react-redux/es/exports';
import { useParams } from '../../node_modules/react-router-dom/index';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET } from '../constants/userConstants';

const UserEditScreen = () => {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ isSeller, setIsSeller ] = useState(false);
    const [ isAdmin, setIsAdmin ] = useState(false);
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;
    const { id } = useParams();

    const dispatch = useDispatch();
    useEffect(() => {
        if(!user){
            dispatch(detailsUser(id))
        } else {
            setName(user.name);
            setEmail(user.email);
            setIsSeller(user.isSeller);
            setIsAdmin(user.isAdmin);
        }
        dispatch({type: USER_DETAILS_RESET})
    }, [dispatch, id, user])
    const submitHandler = (e) => {
        e.preventDefault();
        //dispatch update user
    }

    return(
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Edit User {name}</h1>
                </div>
                {loading ? <LoadingBox></LoadingBox>
                :
                error ? <MessageBox variant='danger'>{error}</MessageBox>
                :
                (
                    <>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input id='name' type="text" placeholder='Enter name' value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input id='email' type="email" placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="isSeller">Is Seller</label>
                            <div>
                                <input id='isSeller' type="checkbox" checked={isSeller} onChange={e => setIsSeller(e.target.checked)} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="isAdmin">Is Admin</label>
                            <div>
                                <input id='isAdmin' type="checkbox" checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} />
                            </div>
                        </div>
                        <div>
                            <button type='submit' className='primary'>Update</button>
                        </div>
                    </>
                )}
            </form>
        </div>
    )
}

export default UserEditScreen