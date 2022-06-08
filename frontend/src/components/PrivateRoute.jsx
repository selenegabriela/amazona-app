import React from 'react';
import { useSelector } from '../../node_modules/react-redux/es/exports';
import { Navigate } from '../../node_modules/react-router-dom/index';

const PrivateRoute = ({ children }) => {
    
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    return userInfo ? children : <Navigate to='/signin'/>;

}
export default PrivateRoute;