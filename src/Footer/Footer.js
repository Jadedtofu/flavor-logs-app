import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
    render() {
        return (
            <footer>
                &copy; <span className="app-footer">Flavor Logs</span> 2020
            </footer>
        );
    }
}

export default Footer;
