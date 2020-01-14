import React, { Component } from 'react';
import './Eatery.css';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
import config from '../config';

class Eatery extends Component {
        static defaultProps = {
        match: {
          params: {}
        },

        history: {
            push: () => { }
        },

        onDeleteEatery: () => {}
    }

    static contextType = ApiContext;

    handleClickDeleteEatery = e => {
        e.preventDefault();
        const eatery_id = this.props.id;

        fetch(`${config.API_ENDPOINT}/eateries/${eatery_id}`, {
            method: `DELETE`,
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => {
            if(!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
        })
        .then(() => {
            this.context.deleteEatery(eatery_id)
            this.props.onDeleteEatery(eatery_id)
        })
        .catch(error => {
            console.error({ error })
        });
    }

    render() {
        const { id, name, phone, address, notes } = this.props;

        return(
            <section className="eatery">
                <header role="banner">
                    <h2 className="eatery-name">{name}</h2>
                </header>

                <ul className="eatery-info">
                    {!this.props.phone ? null : 
                    <li><span className="phone-text">Phone Number:</span> {phone}</li>}
                    {!this.props.address ? null :
                    <li><span className="address-text">Address:</span> {address}</li>}
                    {!this.props.notes ? null : 
                    <li><span className="notes-text">Additional Notes:</span> {notes}</li>}
                </ul>

                <div className="edit-delete-btns">
                    <button className="edit-eatery-btn">
                        <Link to={`/editEatery/${id}`}><i className="blue-pencil fas fa-pencil-alt"></i></Link>
                    </button>
                    <button className="delete-eatery-btn"
                      onClick={this.handleClickDeleteEatery}>
                          <i className="eatery-trash-can fas fa-trash-alt"></i>
                    </button><span className="disclaimer-star">*</span>
                </div>
            </section>
        );
    }
}

export default Eatery;
