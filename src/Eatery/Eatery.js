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

        onDeleteEatery: () => {},
        onDeleteEateryLog: () => {}
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
    // deletes the eatery, but the log remains in myLogs until refresh !! how to fix this ? 
    
    render() {
        const { id, name, phone, address, notes } = this.props;

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
                        <Link to={`/editEatery/${id}`}><i className="fas fa-pencil-alt"></i></Link>
                    </button>
                    <button className="delete-eatery-btn"
                      onClick={this.handleClickDeleteEatery}>
                          <i className="fas fa-trash-alt"></i>
                    </button><span className="disclaimer">*</span>
                </div>
            </section>
        );
    }
}

export default Eatery;
