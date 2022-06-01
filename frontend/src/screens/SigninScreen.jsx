import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const SigninScreen = () => {
    const dispatch = useDispatch();
    const [email, setEmail ] = useState('');
    const [password, setPassword ] = useState('');
    const [ searchParams ] = useSearchParams();
    const queries = [...searchParams];
    const navigate = useNavigate();
    // console.log(queries[0][1], queries)
    const redirect = (queries.length && queries[0][1]) || '/';
    // const location = useLocation();
    
    const userInfo = useSelector(state => state.userSignin.userInfo);
    const loading = useSelector(state => state.userSignin.loading);
    const error = useSelector(state => state.userSignin.error);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    }
    useEffect(() => {
        if(userInfo){
            if(redirect !== '/'){
                navigate('/'+redirect);
            } else {
                navigate(navigate)
            }
        }
    }, [ navigate, redirect, userInfo ]);

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                {
                    loading && <LoadingBox></LoadingBox>
                }
                {
                    error && <MessageBox variant='danger'>{error}</MessageBox>
                }
                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" placeholder='Enter email' required onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password address</label>
                    <input type="password" id="password" placeholder='Enter password' required onChange={e => setPassword(e.target.value)}/>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Sign In</button>
                </div>
                <div>
                    <label />
                    <div>
                        New customer
                        ? <Link to={`/register?redirect=${redirect}`}>Create your account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SigninScreen;