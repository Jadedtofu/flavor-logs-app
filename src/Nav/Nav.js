import React, { Component } from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

class Nav extends Component {
    render() {
        return (
            <>
                <nav className="top" role="navigation">
                    <header className="logo" role="banner">
                        <h1><Link to='/'><i className="fas fa-book"></i>Flavor Logs</Link></h1>
                    </header>
                    <ul>
                        <li className="my-logs">
                            <Link to='/myLogs'><i className="far fa-file-alt"></i>My Logs</Link> 
                        </li>
                        <li className="my-eateries">
                            <Link to='/myEateries'><i className="fas fa-utensils"></i>My Eateries</Link>
                        </li>
                    </ul>
                </nav>
            </>
        );
    }
}

export default Nav;