import React, { Component } from 'react';
import './SearchBox.css';

class SearchBox extends Component {
    render() {
        return (
            <div className="searchbox">
                <i className="fas fa-search"></i>
                <input placeholder="Search by name" />
            </div>
        );
    }
}

export default SearchBox;