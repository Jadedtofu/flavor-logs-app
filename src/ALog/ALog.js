import React, { Component } from 'react';
import './ALog.css';
import Rating from '../Rating/Rating';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
import config from '../config';

class ALog extends Component {
    static defaultProps = {
        match: {
          params: {}
        },

        history: {
            push: () => { }
        },

        onDeleteLog: () => {}
    }

    static contextType = ApiContext;

    handleClickDeleteLog = e => {
        e.preventDefault();
        const flavorLog_id = this.props.id;

        fetch(`${config.API_ENDPOINT}/flavorLogs/${flavorLog_id}`, {
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
            this.context.deleteLog(flavorLog_id)
            this.props.onDeleteLog(flavorLog_id)
        })
        .catch(error => {
            console.error({ error })
        });
    }

    render() {      // turn rating into stars !! 
        // const { logs=[] } = this.context;
        const { id, title, info, ordered, rating, date, image, image_alt, eatery} = this.props;
        // console.log(this.props);

        return(
            <section>
                <header role="banner">
                    <h2 className="log-name">{title}</h2>
                    <h3 className="eatery-name">{eatery}</h3>
                </header>

                <ul className='item-info'>
                    {!this.props.ordered ? null : 
                    <li><span className="ordered-text">Ordered:</span> {ordered}</li>}
                    <li className="rating"><span className="rating-text">Rating:</span> <Rating value={rating} /></li>
                    {!this.props.date ? null : 
                    <li className="last-date"><span className="last-date-text">Last Date Eaten:</span> {date}</li>}
                </ul>

                <blockquote>
                    {info}
                </blockquote>
                {!this.props.image ? null : 
                <img className="food-img" alt={image_alt} src={image} />}

                <div className="edit-delete-btns">
                    <button className="edit-log-btn">
                        <Link to={`/editLog/${id}`}><i className="fas fa-pencil-alt"></i></Link>
                    </button>
                    <button className="delete-log-btn"
                      onClick={this.handleClickDeleteLog}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            </section>
        );
    }
}

export default ALog;