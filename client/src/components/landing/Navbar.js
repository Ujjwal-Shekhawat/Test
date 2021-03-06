import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
// import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar(props) {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, logout, user, loading } = authContext;
    
    const onLogout = () => {
        logout();
    }

    const colorScheme = e => {
        props.onChange(e.target.value);
        console.log(e.target.value);
    }

    const visitor = (
        <Fragment>
            {/* <nav className='Navbar'>
                <ul>
                    <h4>Money Record</h4>
                    <li><Link to='/auth/register'>Register</Link></li>
                    <li><Link to='/auth/login'>Login</Link></li>
                </ul>
            </nav> */}
            <nav class='navbar navbar-light navbar-expand-sm fixed-top custom-nav-bar'>
            <div class='container'>
                <button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#Navbar'>
                    <span class='navbar-toggler-icon' href='#'></span>
                </button>
                <a class='navbar-brand mr-auto' href='/'>Money Record</a>
                <div class='collapse navbar-collapse' id='Navbar'>
                    <ul class='navbar-nav mr-auto'>
                        <li class='nav-item'><Link to='/auth/register' class='nav-link active'>Register</Link></li>
                        <li class='nav-item'><Link to='/auth/login' class='nav-link active'>Login</Link></li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                More Actions
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="https://primchatapp.herokuapp.com/">Chat Section</a>
                                <a class="dropdown-item" href="#">Coming Soon ...</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Developer Home Page</a>
                            </div>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Themes
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <button class="dropdown-item" value='pink' onClick={(e) => colorScheme(e)}>Pink</button>
                                <button class="dropdown-item" value='blue' onClick={(e) => colorScheme(e)}>Blue</button>
                                <button class="dropdown-item" value='pink' onClick={(e) => colorScheme(e)}>White (Working default pink)</button>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Request a theme (Coming soon)</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        </Fragment>
    )

    const auth = (
        <Fragment>
        {/* <nav className='Navbar'>
            <ul>
                <h4>Money Record</h4>
                <li><Link to='/auth/register'>Register</Link></li>
                <li><Link to='/auth/login'>Login</Link></li>
            </ul>
        </nav> */}
        <nav class='navbar navbar-light navbar-expand-sm fixed-top custom-nav-bar'>
        <div class='container'>
            <button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#Navbar'>
                <span class='navbar-toggler-icon' href='#'></span>
            </button>
            <a class='navbar-brand mr-auto' href='#'>Money Record</a>
            <div class='collapse navbar-collapse' id='Navbar'>
                <ul class='navbar-nav mr-auto'>
                    <li class='nav-item'><Link to='/auth/login' class='nav-link active' onClick={onLogout}>Logout</Link></li>
                    <li class='nav-item'><a href='https://primchatapp.herokuapp.com/' class='nav-link active'>Chat Section</a></li> {/** Later conver this ro chat window */}
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            More Actions
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="https://primchatapp.herokuapp.com/">Chat Section</a>
                            <a class="dropdown-item" href="#">Coming Soon ...</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Developer Home Page</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Themes
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <button class="dropdown-item" value='pink' onClick={(e) => colorScheme(e)}>Pink</button>
                            <button class="dropdown-item" value='blue' onClick={(e) => colorScheme(e)}>Blue</button>
                            <button class="dropdown-item" value='pink' onClick={(e) => colorScheme(e)}>White (Working default pink)</button>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Request a theme (Coming soon)</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    </Fragment>
    )

    useEffect(() => {

    }, [isAuthenticated, user]);

    return (
        <Fragment>
            { (isAuthenticated && !loading) ? auth : visitor }
        </Fragment>
    )
}

export default Navbar
