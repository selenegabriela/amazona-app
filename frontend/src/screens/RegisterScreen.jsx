import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const RegisterScreen = () => {
    const dispatch = useDispatch();
    const [name, setName ] = useState('');
    const [email, setEmail ] = useState('');
    const [password, setPassword ] = useState('');
    const [confirmPassword, setConfirmPassword ] = useState('');
    const [ searchParams ] = useSearchParams();
    const queries = [...searchParams];
    const navigate = useNavigate();
    // console.log(queries[0][1], queries)
    const redirect = (queries.length && queries[0][1])|| '/';
    // const location = useLocation();
    
    const userInfo = useSelector(state => state.userRegister.userInfo);
    const loading = useSelector(state => state.userRegister.loading);
    const error = useSelector(state => state.userRegister.error);

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) alert('Password and confirm password are not match');
        else dispatch(register(name, email, password));
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
                    <h1>Create Account</h1>
                </div>
                {
                    loading && <LoadingBox></LoadingBox>
                }
                {
                    error && <MessageBox variant='danger'>{error}</MessageBox>
                }
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder='Enter name' required onChange={e => setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" placeholder='Enter email' required onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder='Enter password' required onChange={e => setPassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" placeholder='Enter confirm password' required onChange={e => setConfirmPassword(e.target.value)}/>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Register</button>
                </div>
                <div>
                    <label />
                    <div>
                        Already have an account? <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegisterScreen;