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

const authState = (props) => {
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
            const result = await axios.get('url');
            dispatch({ type: 'user_loaded', payload: result});
        } catch(error) {
            dispatch({ type: 'auth_error' });
        }
    };

    const register = async (formData) => {
        const config = { headers: {
            'content-type': 'application/json'
        } }

        try {
            const result = await axios.post('url', formData, config);
            dispatch({ type: 'reg_sucess', payload: result.data });
            loadUser();
        } catch(error) {
            alert(error.response.data);
        }
    };

    return (
        <AuthContext.Provider
        value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            loadUser,
        }}>
        {props.children}
        </AuthContext.Provider>
    )
}

export default authState;