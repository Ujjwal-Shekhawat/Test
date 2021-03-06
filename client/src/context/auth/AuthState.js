import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';
//import authContext from './authContext';

// Set auth token
const setAuthToken = (token) => {
    if(token) {
        axios.defaults.headers.common['auth-token'] = token;
    }
    else {
        delete axios.defaults.headers.common['auth-token'];
    }
};

const AuthState = (props) => {
    const initState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initState);

    const loadUser = async () => {
        if(localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const result = await axios.get('/api/auth');
            console.log(result.data);
            dispatch({ type: 'user_loaded', payload: result.data});
        } catch(error) {
            dispatch({ type: 'auth_error' });
        }
    };

    const register = async (formData) => {
        const config = { headers: {
            'content-type': 'application/json'
        } }
        console.log(formData);
        try {
            const result = await axios.post('/api/users', formData, config);
            dispatch({ type: 'reg_success', payload: result.data });
            loadUser();
        } catch(error) {
            console.log(error.response.data);
        }
    };

    const login = async (formData) => {
        const config = {headers: {'content-type': 'application/json'}};
        console.log(formData);
        try {
            const result = await axios.post('/api/auth', formData, config);
            dispatch({ type: 'login_success', payload: result.data });
            loadUser();
        } catch(err) {
            console.log(err.response.data);
        }
    };

    const logout = () => dispatch({ type: 'logout' });

    return (
        <AuthContext.Provider
        value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            login,
            logout,
            loadUser,
        }}>
        {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;