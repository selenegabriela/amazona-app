import React from 'react';
import { useSelector } from '../../node_modules/react-redux/es/exports';
import { Navigate } from '../../node_modules/react-router-dom/index';

const AdminRoute = ({ children }) => {
    
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    return userInfo && userInfo.isAdmin ? children : <Navigate to='/signin'/>;

}
export default AdminRoute;