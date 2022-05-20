import { Component, useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({children}) => {
    const { currentUser } = useContext(AuthContext);
    return currentUser != null ? children : <Navigate to='/'/>    
};

export default PrivateRoute;