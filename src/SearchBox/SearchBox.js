import React, { Component } from 'react';
import './SearchBox.css';

class SearchBox extends Component {
    render() {
        return (
            <div className="searchbox">
                <i className="fas fa-search"></i>
                <input className="search-input" 
                placeholder="Search by name"
                value={this.props.searchTerm}
                onChange={e => this.props.handleUpdate(e.target.value)} />
            </div>
        );
    }
}

export default SearchBox;