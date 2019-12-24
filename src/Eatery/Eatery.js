import React, { Component } from 'react';
import './Eatery.css';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
// import config from '../config';

class Eatery extends Component {
        static defaultProps = {
        match: {
          params: {}
        },
    }

    static contextType = ApiContext;
    
    render() {
        const { name, phone, address, notes } = this.props;

        return(
            <section className="eatery">
                <header role="banner">
                    <h2 className="eatery-name">{name}</h2>
                </header>

                <ul className="eatery-info">
                    <li>Phone Number: {phone}</li>
                    <li>Address: {address}</li>
                    <li>Additional Notes: {notes}</li>
                </ul>

                <div className="edit-delete-btns">
                    <button className="edit-eatery-btn">
                        <Link to='/editEatery'><i className="fas fa-pencil-alt"></i></Link>
                    </button>
                    <button className="delete-eatery-btn"><i className="fas fa-trash-alt"></i>
                    </button><span className="disclaimer">*</span>
                </div>
            </section>
        );
    }
}

export default Eatery;
